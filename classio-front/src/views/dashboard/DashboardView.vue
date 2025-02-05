<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    }
  },
  components: {
    SideBarComponent
  }
}
</script>

<template>
  <div class=" flex min-h-screen w-full">
    <SideBarComponent />
    <!-- Contenu principal -->
    <main class="pl-64 flex-1 p-5 bg-slate-100 ">
      <router-view></router-view>
    </main>


  </div>
</template>

<style scoped>

</style>