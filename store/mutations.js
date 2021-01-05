import { nowTime } from '../utils/function'
import CheckTransactions from '../utils/web3/checkerTransactions'
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
        const new_transaction = {
          ...payload,
          ...{
            confirmed_time: nowTime(),
            added_Time: local_transaction[i].added_Time,
            summary: local_transaction[i].summary,
            approval: local_transaction[i].approval
          }
        }
        local_transaction.splice(i, 1, new_transaction)
      }
    }
    state.transactions = [...local_transaction]
    state.confirm_transactions = state.transactions.filter(item => item.confirmed_time)
    state.pending_transactions = state.transactions.filter(item => !item.confirmed_time)
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
          added_Time: nowTime()
        }
      }]
    ]
    state.confirm_transactions = state.transactions.filter(item => item.confirmed_time)
    state.pending_transactions = state.transactions.filter(item => !item.confirmed_time)
    localStorage.setItem('store_transaction', JSON.stringify(state.transactions))
  },
  initTransactions (state, payload) {
    state.transactions = payload.transactions || payload
    state.confirm_transactions = state.transactions.filter(item => item.confirmed_time)
    state.pending_transactions = state.transactions.filter(item => !item.confirmed_time)
    localStorage.setItem('store_transaction', JSON.stringify(state.transactions))
    if (payload.store && payload.web3_http) {
      // eslint-disable-next-line no-new
      const check_transactions = new CheckTransactions({
        web3_http: payload.web3_http,
        store: payload.store
      })
      check_transactions.setInterval()
    }
  }
}
