<template>
  <div class="Page display-flex box-column">
    <y-header>mining</y-header>
    <div class="box-flex1 content no-scroller">
      <y-btn class="mt24" :color="'select'" @submitAction="connectWallet">Connect Wallet</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="transactionETH">Transaction ETH</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="approve">Approve</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="stake">Stake</y-btn>
    </div>
  </div>
</template>

<script>
export { default } from './js/index'
</script>

<style scoped lang="scss">

</style>
