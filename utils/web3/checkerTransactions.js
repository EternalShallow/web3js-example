import { TRANSACTION_ACTIONS } from './constants'

export default class CheckTransactions {
  constructor (config) {
    config = config || {}
    this.store = null
    this.web3_http = null
    this.time = config.time || 2000
    this.transactions_len = 0
    this.internal_transactions = null
  }

  async setInterval () {
    const that = this
    that.clearInterval()
    if (process.client) {
      that.web3_http = window.$nuxt.$web3_http
      that.store = window.$nuxt.$store
    }
    if (!that.web3_http || !that.store) {
      return
    }
    that.transactions_len = that.store.state.pending_transactions.length
    if (that.transactions_len < 1) {
      return
    }
    that.pending_transactions = that.store.state.pending_transactions
    that.internal_transactions = setInterval(async function () {
      for (let i = 0; i < that.transactions_len; i++) {
        const hash = that.pending_transactions[i].hash
        const transaction = await that.web3_http.eth.getTransaction(hash)
        if (transaction.blockHash) {
          that.store.dispatch('updateTransactions', {
            hash: transaction.hash,
            type: TRANSACTION_ACTIONS.CONFIRMED
          })
        }
      }
      if (that.store.state.pending_transactions.length < 1) {
        console.log('clearInterval')
        that.clearInterval()
      }
    }, that.time)
  }

  clearInterval () {
    if (this.internal_transactions) {
      clearInterval(this.internal_transactions)
    }
  }
}
