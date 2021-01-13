export default {
  getLoading (state) {
    return state.isLoading
  },
  getDialogAccount (state) {
    return state.dialogAccount
  },
  getAccounts (state) {
    return state.accounts
  },
  getTransactions (state) {
    return state.transactions
  }
}
