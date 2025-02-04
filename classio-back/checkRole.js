const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Vérifie si l'utilisateur a le rôle requis
const checkRole = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "Token requis" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.role !== role) {
            return res.status(403).json({ message: "Accès interdit" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = checkRole;