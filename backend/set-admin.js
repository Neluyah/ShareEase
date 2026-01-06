const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shareease.db');

// On cible ton email précis
const targetEmail = 'admin@a1.com'; 

db.run(`UPDATE users SET role = 'admin' WHERE email = ?`, [targetEmail], function(err) {
  if (err) {
    return console.error("❌ Erreur :", err.message);
  }
  console.log(`✅ Succès ! ${targetEmail} est maintenant ADMIN.`);
  console.log(`Rows affected: ${this.changes}`);
});

db.close();