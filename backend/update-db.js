const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shareease.db');

// Cette commande rajoute la colonne manquante sans toucher aux données existantes
db.run(`ALTER TABLE services ADD COLUMN image_url TEXT`, (err) => {
    if (err) {
        if (err.message.includes("duplicate column name")) {
            console.log("ℹ️ La colonne 'image_url' existe déjà.");
        } else {
            console.error("❌ Erreur lors de la mise à jour :", err.message);
        }
    } else {
        console.log("✅ Succès ! La colonne 'image_url' a été ajoutée à la table services.");
    }
    db.close();
});