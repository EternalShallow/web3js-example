<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-dialog
      v-model="dialogAccount"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div class="dialog-account-box">
        <div class="display-flex box-center-Y account-title">
          <div class="fs36 fw5 box-flex1">Account</div>
          <v-btn
            icon
            @click="$store.dispatch('updateDialogAccount', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="account-info-box">
          <div class="account-info-con">
            <div>Connect to MeatMask</div>
            <div class="fs36 fw5" v-if="account">{{account.substring(0,6)}}...{{account.substring(account.length - 4, account.length)}}</div>
          </div>
        </div>
        <div class="transaction-list" v-if="all_transaction.length > 0">
          <div class="recent-transaction display-flex box-center-Y">
            <div class="box-flex1">Recent Transactions</div>
            <div class="clear-transaction" @click="clearAll">（Clear All）</div>
          </div>
          <div class="transaction-item display-flex box-center-Y" v-for="(v, i) in all_transaction" :key="`transaction${i}`">
            <div class="box-flex1">{{v.summary}}</div>
            <div class="status">{{getTransactionStatus(v)}}</div>
          </div>
        </div>
      </div>
    </v-dialog>
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
