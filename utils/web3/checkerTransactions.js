export default class CheckTransactions {
  constructor (config) {
    this.store = config.store
    this.web3_http = config.web3_http
    this.time = config.time || 2000
    this.transactions_len = config.store.state.pending_transactions.length
    this.internal_transactions = null
  }

  async setInterval () {
    const that = this
    that.clearInterval()
    if (that.transactions_len < 1) {
      return
    }
    that.pending_transactions = that.store.state.pending_transactions
    that.internal_transactions = setInterval(async function () {
      for (let i = 0; i < that.transactions_len; i++) {
        const hash = that.pending_transactions[i].hash
        const transaction = await that.web3_http.eth.getTransaction(hash)
        if (!transaction.blockHash) {
          that.store.dispatch('updateTransactions', {
            hash: transaction.hash,
            web3_http: that.web3_http,
            type: 'confirmed'
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
