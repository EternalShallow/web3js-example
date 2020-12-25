<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <div class="loading-box" v-show="isLoading">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </v-app>
</template>

<script>
export { default } from './js/default'
</script>
<style scoped lang="scss">
  @import "./css/loading";
</style>
