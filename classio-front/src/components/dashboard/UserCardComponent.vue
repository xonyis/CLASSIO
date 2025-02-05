<script >

import {CirclePlus, Pencil, Save} from "lucide-vue-next";
import SideBarComponent from "@/components/SideBarComponent.vue";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      isChangeEmail: false,
      isChangeUsername: false,
      isHovered1: false,
      isHovered2: false,
    }
  },
  components: {
    SideBarComponent,
    Pencil,
    Save,
    CirclePlus
  },
  methods: {
    saveInfos() {
      this.isChangeEmail = false
      this.isChangeUsername = false
    },
    changePicture() {
      return
    }
  }
}
</script>

<template>
  <div class="p-5 w-125 border-2 border-violet-500 profils-container bg-white flex gap-6 relative rounded-xl shadow-md" >
    <button @click="saveInfos()" type="button" class="absolute top-3 right-5"><Save  class="transition-all duration-200 hover:text-blue-500  cursor-pointer " /></button>
    <button @click="changePicture()" type="button" class="absolute bottom-5 left-32"><CirclePlus fill="#4ADE80" size="45" color="#404040" class="hover:text-blue-500  cursor-pointer " /></button>

    <img src="https://placehold.co/150x150" class="border-4 border-neutral-700" >
    <div class="flex flex-col gap-3">
      <div class="flex flex-col ">
        <label class=" !mb-1">Username :</label>
        <div class="flex gap-1">

          <input v-if="isChangeUsername" v-model="user.username" type="text" :class="{ 'border-2': isChangeUsername }" class="w-50  border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
          <input v-else disabled v-model="user.username" type="text"  class="w-50 border-2 border-gray-100 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
          <button class="rounded-lg p-2 border-2 border-gray-100 transition-all duration-200"
                  @mouseover="isHovered1 = true"
                  @mouseleave="isHovered1 = false"
                  :class="{ 'border-neutral-700 border-2': isHovered1 }"
                  @click="isChangeUsername = !isChangeUsername"><Pencil color="#737373"/></button>

        </div>
      </div>
      <div class="flex flex-col ">
        <label class=" !mb-1">Email :</label>
        <div class="flex gap-1">

          <input v-if="isChangeEmail" v-model="user.email" type="text"  :class="{ 'border-2': isChangeEmail }"  class="w-50 mt-2  border-violet-300 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
          <input v-else disabled v-model="user.email" type="text"  class="w-50 border-2 border-gray-100 focus:border-violet-400 focus:ring focus:ring-violet-400 rounded-lg p-2 outline-none" >
          <button class="rounded-lg p-2 border-2 border-gray-100 transition-all duration-200"
                  @mouseover="isHovered2 = true"
                  @mouseleave="isHovered2 = false"
                  :class="{ 'border-neutral-700 border-2': isHovered2 }"
                  @click="isChangeEmail = !isChangeEmail"><Pencil color="#737373"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profils-container img{
  border-radius: 100px;
}

.profils-container {
  font-size: .85em;
}
.profils-container label{
  font-weight: bold;
  font-size: 1.2em;
}

.CirclePlus {
  border-radius: 50px;
}
</style>