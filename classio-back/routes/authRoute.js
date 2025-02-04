const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Importer la connexion MySQL
const checkRole = require('../checkRole');
// checkRole('ROLE_ADMIN')
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post("/register", async(req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }
    role_id = 2
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

                const userId = result.insertId;
                db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, role_id], (err) => {
                    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

                    res.status(201).json({ message: "Inscription réussie !" });
                });

            }
        );

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

            const userId = result.insertId;
            db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, role_id], (err) => {
                if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

                res.json({ message: "Utilisateur créé !" });
            });
        });
    });
});


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    db.query(`
        SELECT users.id, users.email, users.username, users.password, roles.name AS role
        FROM users
        JOIN user_roles ON users.id = user_roles.user_id
        JOIN roles ON user_roles.role_id = roles.id
        WHERE users.username = ?
    `, [username], (err, result) => {
        if (err) {
            console.error("Erreur serveur :", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const user = result[0];

        // Vérification du mot de passe avec `bcrypt.compare()`
        bcrypt.compare(password, user.password)
            .then(passwordMatch => {
                if (!passwordMatch) {
                    return res.status(401).json({ message: "Mot de passe incorrect" });
                }

                const token = jwt.sign(
                    { userId: user.id, role: user.role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                return res.json({
                    message: "Connexion réussie !",
                    token,
                    user: { id: user.id, email: user.email, username: user.username }
                });
            })
            .catch(error => {
                console.error("Erreur bcrypt :", error);
                return res.status(500).json({ message: "Erreur de vérification du mot de passe" });
            });
    });
});

module.exports = router;