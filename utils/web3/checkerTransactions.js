// let internal_transactions = null
// CheckTransactions.prototype.clearInterval = function () {
//   clearInterval(internal_transactions)
// }
// CheckTransactions.prototype.setInterval = async function () {
//   const that = this
//   internal_transactions = setInterval(async function () {
//     for (let i = 0; i < that.transactions_len; i++) {
//       const hash = that.transactions_pending[i].hash
//       const transaction = await that.web3_http.eth.getTransaction(hash)
//       if (transaction.blockHash !== that.transactions_pending[i].blockHash) {
//         that.transactions_pending.splice(i, 1, transaction)
//       }
//     }
//     that.store.dispatch('updateTransactions', JSON.parse(JSON.stringify(that.transactions_pending)))
//     const pendingTransaction = that.transactions_pending.filter(item => item.blockHash === null)
//     if (pendingTransaction.length < 1) {
//       console.log('clearInterval')
//       that.clearInterval()
//     }
//   }, that.time)
// }
// function CheckTransactions (config) {
//   this.store = config.store
//   this.web3_http = config.web3_http
//   this.time = config.time || 2000
//   if (internal_transactions) {
//     this.clearInterval()
//   }
//   this.transactions_len = this.store.state.transactions.length
//   if (this.transactions_len < 1) {
//     this.clearInterval()
//     return
//   }
//   this.transactions_pending = JSON.parse(JSON.stringify(this.store.state.transactions))
//   this.setInterval()
// }
// export default CheckTransactions
export default class CheckTransactions {
  constructor (config) {
    this.store = config.store
    this.web3_http = config.web3_http
    this.time = config.time || 2000
    this.transactions_len = config.store.state.transactions.length
    this.internal_transactions = null
  }

  async setInterval () {
    const that = this
    that.clearInterval()
    if (that.transactions_len < 1) {
      return
    }
    that.transactions_pending = JSON.parse(JSON.stringify(that.store.state.transactions))
    that.internal_transactions = setInterval(async function () {
      for (let i = 0; i < that.transactions_len; i++) {
        const hash = that.transactions_pending[i].hash
        const transaction = await that.web3_http.eth.getTransaction(hash)
        if (transaction.blockHash !== that.transactions_pending[i].blockHash) {
          that.transactions_pending.splice(i, 1, transaction)
        }
      }
      that.store.dispatch('updateTransactions', JSON.parse(JSON.stringify(that.transactions_pending)))
      const pendingTransaction = that.transactions_pending.filter(item => item.blockHash === null)
      if (pendingTransaction.length < 1) {
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
