<script>
import router from "@/router/index.js";
import {useRouter} from "vue-router";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      router: useRouter()
    }
  },
  methods: {
    goTo() {
      this.router.push('/login')
    }
  }
}
</script>

<template>
  <nav class="p-5 fixed h-screen left-0 top-0 flex flex-col justify-between ">
    <ul class="side-list flex flex-col h-80 gap-2  justify-between">
      <h2 class="text-4xl">Classio</h2>
      <div class="flex flex-col gap-4" >
        <li class="nav-item">
          <a class="w-full inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
            Bouton Outline
          </a>
        </li>
        <li class="nav-item">
          <i class="bi bi-card-list"></i>
          <a class="  w-full inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
            Bouton Outline
          </a>
        </li>
        <li class="nav-item">
          <a class="  w-full inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
            Bouton Outline
          </a>
        </li>
        <li class="nav-item">
          <a class="  w-full inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
            Bouton Out
          </a>
        </li>
      </div>

    </ul>
    <div class="flex-col flex gap-5 cursor-pointer
" @click="goTo()">
      <div class="flex items-center gap-2 profil-container">
        <img :src="user.img" v-if="user.img" class="profil-picture">
        <img src="https://placehold.co/30x30" class="profil-picture" v-else>
        <div class="flex flex-col ">
          <span class="profil-username">{{user.username}}</span>
          <span class="profil-email">{{user.email}}</span>
        </div>
      </div>

      <a class="  w-full inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
        Déconnexion
      </a>
    </div>

  </nav>
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