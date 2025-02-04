<script>
import UserCardComponent from "@/components/dashboard/UserCardComponent.vue";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      isChangeEmail: false,
      isChangeUsername: false,
      isHovered: false
    }
  },
  components: {
    UserCardComponent
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
  <main class="flex gap-10 p-5">
    <UserCardComponent/>

  </main>
</template>

<style scoped>

</style>