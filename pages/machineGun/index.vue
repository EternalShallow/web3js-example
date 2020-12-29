<template>
  <div class="Page display-flex box-column">
    <y-header>transaction</y-header>
    <div class="box-flex1 content no-scroller">
      <y-btn class="mt24" :color="'select'" @submitAction="connectWallet">connect wallet</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="approve">approve</y-btn>
    </div>
  </div>
</template>

<script>
export { default } from './js/index'
</script>

<style scoped lang="scss">

</style>
