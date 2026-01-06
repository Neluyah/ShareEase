const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shareease.db');

// On cible l'ID 3 qui correspond à votre admin sans email
const adminId = 3; 
const correctEmail = 'admin@a1.com';

db.run(`UPDATE users SET email = ? WHERE id = ?`, [correctEmail, adminId], function(err) {
  if (err) {
    return console.error("❌ Erreur :", err.message);
  }
  console.log(`✅ Succès ! L'email de l'admin (ID: ${adminId}) est maintenant : ${correctEmail}`);
});

db.close();