<script>
export default {
  data() {
    return {
      user: localStorage.getItem("user"),
    }
  }
}
</script>

<template>
  <main>
    {{user}}
  </main>
</template>

<style scoped>

</style>