export default {
  updateLoading (context, item) {
    context.commit('changeLoading', item)
  },
  updateAccounts (context, item) {
    context.commit('changeAccounts', item)
  }
}
