<script>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from "vue-router"; // Importer Vue Router

import api from '../../config/axios.js'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      message: '',
      errorMessage: '',
      router: useRouter()
    };
  },
  methods: {
    async login() {
      this.errorMessage = ""; // Réinitialisation des erreurs
      this.message = "";

      // Vérification des champs vides
      if (!this.password || !this.username) {
        this.errorMessage = "Tous les champs sont obligatoires.";
        return;
      }

      try {
        const response = await api.post("/auth/login", {
          password: this.password,
          username: this.username,
        });

        const { token, user } = response.data;

        // ✅ Stocker le token dans localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        this.message = response.data.message;
        // ✅ Redirection vers "/dashboard" après connexion réussie
        this.router.push("/dashboard")
        this.email = "";
        this.password = "";
        this.username = "";
      } catch (error) {
        console.log(error)
        this.errorMessage = error.response?.data?.error || "Une erreur est survenue.";
      }
    }
  }
}
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen">
    <div class="w-100 flex flex-col justify-around border border-violet-500 rounded-xl p-10 gap-5">
      <h2 class="text-3xl text-center">Classio</h2>
      <div class="flex flex-col justify-between h-20 ">
        <label>Username</label>
        <input v-model="username" type="text" class="mt-4  border-2 border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
      </div>
      <div class="flex flex-col justify-between h-20 ">
        <label>Mot de passe</label>
        <input v-model="password" type="password" class=" border-2 border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
      </div>
      <button @click="login" class="bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-600 transition-all shadow-md active:scale-95">
        S'identifier
      </button>
      <RouterLink to="register" class="text-center color text-violet-500 underline">Créer un compte</RouterLink>
    </div>
  </main>
</template>

<style scoped>

</style>