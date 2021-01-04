export default {
  updateLoading (context, item) {
    context.commit('changeLoading', item)
  },
  updateAccounts (context, item) {
    context.commit('changeAccounts', item)
  },
  updateTransactions (context, item) {
    context.commit('changeTransactions', item)
  },
  async addTransactions (context, { hash, web3_http }) {
    const transaction_by_hash = await web3_http.eth.getTransaction(hash)
    const payload = {
      to: transaction_by_hash.to,
      from: transaction_by_hash.from,
      contractAddress: '',
      transactionIndex: transaction_by_hash.transactionIndex || 0,
      blockHash: transaction_by_hash.blockHash,
      transactionHash: hash,
      blockNumber: transaction_by_hash.blockNumber,
      status: false
    }
    console.log(payload)
    console.log(transaction_by_hash)
    context.commit('addTransactions', {})
  }
}
