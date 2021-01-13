<template>
  <div class="Page display-flex box-column">
    <div class="display-flex box-center-Y title-box">
      <div class="box-flex1"></div>
      <div class="account-box title-sec display-flex box-center-Y" @click="$store.dispatch('updateDialogAccount', true)"
           v-if="account && $store.state.pending_transactions.length < 1">{{account ? (account.substring(1,7) + '...' + account.substring(account.length-4, account.length)) : ''}}</div>
      <div class="pending-box title-sec display-flex box-center-Y" @click="$store.dispatch('updateDialogAccount', true)" v-show="account && $store.state.pending_transactions.length > 0">{{$store.state.pending_transactions.length}} Pending...
        <div class="loading-con"><img src="../../assets/image/loading.gif" alt=""></div>
      </div>
    </div>
    <div class="box-flex1 content no-scroller">
      <y-btn class="mt24" :color="'select'" @submitAction="connectWallet">Connect Wallet</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="transactionETH">Transaction ETH</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="approve">Approve</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="approveLibrary">ApproveLibrary</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="stake">Stake</y-btn>
      <y-btn class="mt24" :color="'select'" @submitAction="stakeLibrary">StakeLibrary</y-btn>
    </div>
  </div>
</template>

<script>
export { default } from './js/index'
</script>

<style scoped lang="scss">
  @import "../../assets/css/main";
  .title-box{
    padding: 30px 40px;
    .title-sec{
      padding: 10px 20px;
      border-radius: 10px;
      background-color: $bdColorf2;
      border: 1PX solid $bdColorddd; /*no*/
      font-size: 32px;
      .loading-con{
        width: 48px;
        height: 48px;
      }
    }
    .title-sec.pending-box{
      background-color: $colorTip;
      color: $colorFFF;
    }
  }

</style>
