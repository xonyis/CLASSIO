import axios from "axios";

// Créer une instance Axios avec une configuration par défaut
const api = axios.create({
    baseURL: "http://localhost:3000/api", // URL de ton backend Node.js
    headers: {
        "Content-Type": "application/json",
    },
});

// Intercepteur pour gérer les erreurs globales (optionnel)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erreur API :", error.response?.data || "Problème inconnu");
        return Promise.reject(error);
    }
);

export default api;
