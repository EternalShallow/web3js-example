<template>
  <div class="Page display-flex box-column">
    <div class="box-flex1 content no-scroller">
      <y-btn class="mt24" :color="'select'" @submitAction="mint">Mint</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="burn">Burn</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="transfer">Transfer</y-btn>
    </div>
  </div>
</template>

<script>
export { default } from './js/index'
</script>

<style scoped lang="scss">
  @import "../../assets/css/main";

</style>
