const mysql = require("mysql2");

// Connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Par défaut sous WAMP
    password: "root", // Laisse vide si tu n’as pas mis de mot de passe
    database: "classio",
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à MySQL :", err);
        return;
    }
    console.log("🟢 Connexion à MySQL réussie !");
});

module.exports = db;