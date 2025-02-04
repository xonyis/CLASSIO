require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute"); // Import des routes d'auth

const app = express();
app.use(express.json());
app.use(cors());

// Utiliser les routes d'authentification
app.use("/api/auth", authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
});