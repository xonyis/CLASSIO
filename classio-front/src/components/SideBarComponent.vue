<script>
import router from "@/router/index.js";
import {useRouter} from "vue-router";
import { Users, Mail, BookUser, Backpack, FileBadge } from 'lucide-vue-next';
import { logout } from "@/config/auth.js";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      router: useRouter()
    }
  },
  components : {
    Users,
    Mail,
    BookUser,
    Backpack,
    FileBadge
  },
  methods: {

    logout() {
      logout()
      this.router.push('/login')
    }

  }
}
</script>

<template>
  <!-- Sidebar fixe -->
  <aside class="fixed flex flex-col justify-between gap-10 top-0 left-0 w-64 h-screen border-r-2 border-violet-500 p-5">
    <h2 @click="this.router.push('/dashboard/dashboardHome')" class="text-3xl font-bold cursor-pointer">Classio</h2>
    <ul class="space-y-4 flex flex-col justify-between h-80">

      <li>
        <router-link to="/dashboard/profile" class="text-sm flex items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
          <BookUser />
          Agenda
        </router-link>
      </li>
      <li>
        <router-link to="/settings"  class="text-sm flex  items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
          <Mail /> Messagerie
        </router-link>
      </li>
      <li>
        <router-link to="/settings"  class="text-xs flex items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
          <Backpack />Gestion des Classes
        </router-link>
      </li>
      <li>
        <router-link to="/settings"  class="text-xs flex items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
          <Users />Gestion des Élèves
        </router-link>
      </li>
      <li>
        <router-link to="/settings"  class="text-xs flex items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
          <FileBadge />Mes fichiers
        </router-link>
      </li>
    </ul>

    <div class="flex-col flex gap-5 cursor-pointer" @click="this.router.push('/dashboard/profile')">

      <div class="flex items-center gap-2 profil-container">
        <img :src="user.img" v-if="user.img" class="profil-picture">
        <img src="https://placehold.co/30x30" class="profil-picture" v-else>
        <div class="flex flex-col ">
          <span class="profil-username">{{user.username}}</span>
          <span class="profil-email">{{user.email}}</span>
        </div>
      </div>
      <button @click="logout" to="/settings" class="text-sm justify-center flex items-center gap-2 p-2 border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-xl transition-all duration-200 text-center">
        Déconnexion
      </button>
    </div>

  </aside>
</template>

<style scoped>
nav {
  top: 0;
  left: 0;
  overflow-y: auto;
  outline: solid #8B5CF6;
}

.profil-picture {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

.profil-username {
  font-weight: bold;
}

.profil-email {
  font-size: .8em;
}
</style>