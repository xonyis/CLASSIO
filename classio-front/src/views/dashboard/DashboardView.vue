<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
export default {
  data() {
    return {
      user: localStorage.getItem("user"),
    }
  },
  components: {
    SideBarComponent
  }
}
</script>

<template>
  <div class=" flex min-h-screen w-full">
    <SideBarComponent class="fixed top-0 left-0 w-64 h-full "/>
    <main class="w-full pl-75">
      {{user}}
    </main>


  </div>
</template>

<style scoped>

</style>