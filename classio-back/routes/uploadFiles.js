const express = require("express");
const path = require('path');
const fs = require('fs');
const db = require("../db"); // Importer la connexion MySQL
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

// Config Multer
const uploadDir = "/www/wwwroot/46.202.153.153/profils-pictures";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

async function uploadToVPS(userId, filePath) {
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath));

    try {
        const response = await axios.post(`http://46.202.153.153:4000/upload/${userId}`, form, {
            headers: { ...form.getHeaders() }
        });
        return response.data.imagePath; // L'URL de l'image sur le VPS
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        return null;
    }
}




const upload = multer({ storage });

router.post('/upload/:userId', upload.single('image'), async (req, res) => {
    const userId = req.params.userId;

    if (!req.file) return res.status(400).json({ message: "Aucun fichier envoyé." });

    const imageUrl = await uploadToVPS(userId ,req.file.path);
    if (!imageUrl) return res.status(500).json({ message: "Échec de l'upload." });

    res.json({ message: "Image uploadée avec succès !", imageUrl });
});

module.exports = router;