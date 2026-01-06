const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./shareease.db');

app.use(express.json());
app.use(cors({
  origin: 'https://share-ease-theta.vercel.app', // Ton URL Vercel officielle
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

// --- INITIALISATION DES TABLES (Security by Design) ---
db.serialize(() => {
    // Table Utilisateurs
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT UNIQUE, 
        password_hash TEXT, 
        role TEXT, 
        full_name TEXT
    )`);

    // Table Services (Incluant image_url)
    db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        description TEXT, 
        price REAL, 
        category TEXT, 
        image_url TEXT, 
        provider_id INTEGER, 
        FOREIGN KEY(provider_id) REFERENCES users(id)
    )`);

    // Table Commandes
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        service_id INTEGER, 
        client_id INTEGER, 
        provider_id INTEGER, 
        status TEXT DEFAULT 'En attente', 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY(service_id) REFERENCES services(id), 
        FOREIGN KEY(client_id) REFERENCES users(id), 
        FOREIGN KEY(provider_id) REFERENCES users(id)
    )`);
});

// --- 1. AUTHENTIFICATION ---

app.post('/api/register', async (req, res) => {
    const { email, password, role, name } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (email, password_hash, role, full_name) VALUES (?, ?, ?, ?)`;
        db.run(sql, [email, hash, role, name], function(err) {
            if (err) return res.status(400).json({ error: "Email déjà utilisé." });
            res.json({ message: "Utilisateur créé", id: this.lastID });
        });
    } catch (e) {
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: "Identifiants incorrects" });
        const match = await bcrypt.compare(password, user.password_hash);
        if (match) {
            res.json({ id: user.id, name: user.full_name, role: user.role, email: user.email, isLoggedIn: true });
        } else {
            res.status(401).json({ error: "Mot de passe incorrect" });
        }
    });
});

// --- 2. GESTION DES UTILISATEURS ---

app.get('/api/users', (req, res) => {
    db.all("SELECT id, email, role, full_name FROM users", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

app.put('/api/users/:id', (req, res) => {
    const { full_name, email } = req.body;
    db.run(`UPDATE users SET full_name = ?, email = ? WHERE id = ?`, 
    [full_name, email, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Profil mis à jour" });
    });
});

app.delete('/api/users/:id', (req, res) => {
    db.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Utilisateur supprimé" });
    });
});

// --- 3. GESTION DES COMMANDES ---

app.post('/api/orders', (req, res) => {
    const { service_id, client_id, provider_id } = req.body;
    const sql = `INSERT INTO orders (service_id, client_id, provider_id) VALUES (?, ?, ?)`;
    db.run(sql, [service_id, client_id, provider_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Succès", orderId: this.lastID });
    });
});

app.get('/api/provider/orders/:providerId', (req, res) => {
    const sql = `SELECT orders.*, services.title, users.full_name as client_name FROM orders 
                 JOIN services ON orders.service_id = services.id
                 JOIN users ON orders.client_id = users.id
                 WHERE orders.provider_id = ? ORDER BY created_at DESC`;
    db.all(sql, [req.params.providerId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

app.patch('/api/orders/:id', (req, res) => {
    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [req.body.status, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Statut mis à jour" });
    });
});

// --- 4. GESTION DES SERVICES ---

app.get('/api/services', (req, res) => {
    db.all("SELECT * FROM services", (err, rows) => res.json(rows || []));
});

app.post('/api/services', (req, res) => {
    const { title, description, price, category, image_url, provider_id } = req.body;
    const sql = `INSERT INTO services (title, description, price, category, image_url, provider_id) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [title, description, price, category, image_url, provider_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Service ajouté" });
    });
});

// --- NOUVELLE ROUTE : MODIFIER UN SERVICE ---
app.put('/api/services/:id', (req, res) => {
    const { title, description, price, category, image_url } = req.body;
    const sql = `UPDATE services SET title = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?`;
    
    db.run(sql, [title, description, price, category, image_url, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Service mis à jour avec succès" });
    });
});

app.delete('/api/services/:id', (req, res) => {
    const serviceId = req.params.id;
    db.serialize(() => {
        db.run(`DELETE FROM orders WHERE service_id = ?`, [serviceId]);
        db.run(`DELETE FROM services WHERE id = ?`, [serviceId], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Service et données liées supprimés" });
        });
    });
});

app.listen(5000, () => console.log("🚀 Port 5000 OK - ShareEase Backend fully active"));
