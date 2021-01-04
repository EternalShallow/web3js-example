const nowTime = () => new Date().getTime() / 1000
export default {
  changeLoading (state, payload) {
    state.isLoading = payload
  },
  changeAccounts (state, payload) {
    state.accounts = payload
  },
  changeTransactions (state, payload) {
    let local_transaction = []
    if (localStorage.getItem('store_transaction')) {
      local_transaction = JSON.parse(localStorage.getItem('store_transaction'))
    }
    const transaction_len = local_transaction.length
    for (let i = 0; i < transaction_len; i++) {
      if (local_transaction[i].hash === payload.hash) {
        local_transaction.splice(1, i, {
          ...payload,
          confirm_time: nowTime()
        })
      }
    }
    state.transactions = [...local_transaction]
    state.confirm_transactions = state.transactions.filter(item => item.confirm_time)
    state.pending_transactions = state.transactions.filter(item => item.confirm_time)
    localStorage.setItem('store_transaction', JSON.stringify(state.transactions))
  },
  addTransactions (state, payload) {
    let local_transaction = []
    if (localStorage.getItem('store_transaction')) {
      local_transaction = JSON.parse(localStorage.getItem('store_transaction'))
    }
    const same_hash = local_transaction.filter(item => item.hash === payload.hash)
    if (same_hash.length > 0) {
      return console.warn('this transaction hash exiting!!!')
    }
    state.transactions = [
      ...local_transaction,
      ...[{
        ...payload,
        ...{
          add_time: nowTime()
        }
      }]
    ]
    state.confirm_transactions = state.transactions.filter(item => item.confirm_time)
    state.pending_transactions = state.transactions.filter(item => !item.confirm_time)
    localStorage.setItem('store_transaction', JSON.stringify(state.transactions))
  }
}
