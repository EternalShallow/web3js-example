export default {
  updateLoading (context, item) {
    context.commit('changeLoading', item)
  },
  updateAccounts (context, item) {
    context.commit('changeAccounts', item)
  },
  // updateTransactions (context, item) {
  //   context.commit('changeTransactions', item)
  // },
  /**
   * approval?: { tokenAddress: string; spender: string }
   * @param context
   * @param hash
   * @param web3_http
   * @param summary
   * @param approval
   * @param type
   * @returns {Promise<void>}
   */
  async updateTransactions (context, { hash, web3_http, summary, approval, type }) {
    try {
      let transaction_by_hash
      if (type === 'added') {
        transaction_by_hash = await web3_http.eth.getTransaction(hash)
      } else {
        transaction_by_hash = await web3_http.eth.getTransactionReceipt(hash)
      }
      console.log(transaction_by_hash)
      const latest_block = await web3_http.eth.getBlock('latest')
      const receipt = {
        to: transaction_by_hash.to,
        from: transaction_by_hash.from,
        contractAddress: transaction_by_hash.contractAddress,
        transactionIndex: transaction_by_hash.transactionIndex,
        blockHash: transaction_by_hash.blockHash,
        transactionHash: hash,
        blockNumber: transaction_by_hash.blockNumber,
        status: transaction_by_hash.status
      }
      const payload = {
        hash: hash,
        from: receipt.from,
        receipt: receipt
      }
      switch (type) {
        case 'added':
          payload.lastCheckedBlockNumber = latest_block.number
          if (summary) {
            payload.summary = summary
          }
          if (approval) {
            payload.approval = approval
          }
          console.log(payload)
          context.commit('addTransactions', payload)
          break
        case 'confirmed':
          console.log(payload)
          context.commit('changeTransactions', payload)
          break
      }
    } catch (e) {
      console.error(e)
    }
  }
}
