const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shareease.db'); // Le fichier sera créé ici

db.serialize(() => {
  // 1. Table Utilisateurs (Sécurité Personne D)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    role TEXT,
    full_name TEXT
  )`);

  // 2. Table Services (Catalogue Personne C)
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    provider_id INTEGER
  )`);

  // 3. Table Commandes (Flux de travail)
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER,
    client_id INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log("✅ Base de données initialisée avec succès (Fichier shareease.db créé)");
});
db.close();