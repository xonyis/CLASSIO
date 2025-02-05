const mysql = require("mysql2");

// Connexion à la base de données
const db = mysql.createConnection({
    host: "46.202.153.153",
    user: "root", // Par défaut sous WAMP
    password: "f5d4e80a310b7a06", // Laisse vide si tu n’as pas mis de mot de passe
    database: "classio",
    port: "3306",
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à MySQL :", err);
        return;
    }
    console.log("🟢 Connexion à MySQL réussie !");
});

module.exports = db;