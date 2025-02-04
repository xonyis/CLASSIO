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
  <div class=" h-screen flex left-0 top-0">
    <SideBarComponent class="w-75"/>
    <main class="border h-200 w-screen">
      {{user}}
    </main>
  </div>
</template>

<style scoped>

</style>