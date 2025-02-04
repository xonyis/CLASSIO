<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import { Pencil } from "lucide-vue-next";


export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      isChange: false,
    }
  },
  components: {
    SideBarComponent,
    Pencil,
  },

}
</script>

<template>
  <div class=" flex min-h-screen w-full">
    <main class="w-full p-11 flex justify-center items-center">
    <div class="border border-violet-500 w-200 h-100 py-10 rounded-4xl relative flex  justify-between items-center profils-container">
      <button @click="isChange =+ !isChange" class="absolute top-2 right-4 cursor-pointer p-2 rounded-lg color">
        <Pencil class="w-6 h-6 text-gray-400 hover:text-violet-400" />

      </button>
      <div class="w-100 py-10 h-100 flex flex-col justify-between items-center">
        <img :src="user.img" v-if="user.img" >
        <img src="https://placehold.co/100x100" v-else>
        <div v-if="isChange" class="profil-info w-30 text-center flex-col gap-5 flex items-center">
          <input class="text-center border-2 border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" v-model="user.username">
          <input class="text-center border-2 border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" v-model="user.email" type="email" placeholder="E-mail" >
          <button class="w-full text-xs inline-block border-2 border-violet-500 hover:bg-violet-500 hover:text-white text-violet-500 font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-center">
            Enregistrer
          </button>

        </div>
        <div v-else class="profil-info w-30 text-center h-35 flex-col flex items-center">
          <span class="text-3xl ">{{user.username}}</span>
          <span class="text-xl">{{user.email}}</span>
        </div>
      </div>
      <div class="w-100">
        dddd
      </div>
    </div>
    </main>


  </div>
</template>

<style scoped>
.profils-container img{
  border-radius: 100px;
}

.profil-info span:nth-child(1){
  font-weight: bold;
  margin-bottom: .5em;
}
</style>