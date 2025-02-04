const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Importer la connexion MySQL

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // ⚠️ À mettre dans .env !

router.post("/register", async(req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // Vérifier si l'email existe déjà
    db.query("SELECT id FROM users WHERE email = ?", [email], async(err, result) => {
        if (err) return res.status(500).json({ error: "Erreur serveur." });

        if (result.length > 0) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insérer l'utilisateur avec le mot de passe hashé
        db.query(
            "INSERT INTO users (email, password, username) VALUES (?, ?, ?)", [email, hashedPassword, username],
            (err, result) => {
                if (err) return res.status(500).json({ error: "Erreur lors de l'inscription." });

                res.status(201).json({ message: "Inscription réussie !" });
            }
        );
    });
});


router.post("/login", async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    // Vérifier si l'utilisateur existe
    db.query("SELECT * FROM users WHERE username = ?", [username], async(err, result) => {
        if (err) return res.status(500).json({ error: "Erreur serveur." });

        if (result.length === 0) {
            return res.status(400).json({ error: "Utilisateur non trouvé." });
        }

        const user = result[0];

        // Comparer le mot de passe hashé
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id, email: user.username }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Connexion réussie !", token, user: { id: user.id, email: user.email, username: user.username } });
    });
});

module.exports = router;