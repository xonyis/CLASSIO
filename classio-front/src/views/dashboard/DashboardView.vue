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
    <SideBarComponent :user="user" class="fixed top-0 left-0 w-64 h-full "/>
    <main class="w-full pl-75">
      {{user}}
    </main>


  </div>
</template>

<style scoped>

</style>