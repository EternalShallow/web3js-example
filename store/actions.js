import { nowTime } from '../utils/function'
async function getPayload ({ hash, web3_http, type }) {
  let payload = {}
  let transaction_by_hash = await web3_http.eth.getTransaction(hash)
  if (transaction_by_hash.blockNumber) {
    transaction_by_hash = await web3_http.eth.getTransactionReceipt(hash)
    if (type === 'init') {
      payload = {
        confirmed_time: nowTime()
      }
    }
  }
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
  payload = {
    ...payload,
    ...{
      hash: hash,
      from: receipt.from,
      receipt: receipt
    }
  }
  return payload
}

export default {
  updateLoading (context, item) {
    context.commit('changeLoading', item)
  },
  updateAccounts (context, item) {
    context.commit('changeAccounts', item)
  },
  /**
   * approval?: { tokenAddress: string; spender: string }
   * @param context
   * @param hash
   * @param web3_http
   * @param summary
   * @param approval
   * @param type
   * @param store
   * @returns {Promise<void>}
   */
  async updateTransactions (context, { hash, web3_http, summary, approval, type, store }) {
    try {
      let payload
      let latest_block
      switch (type) {
        case 'added':
          payload = await getPayload({ hash, web3_http, type })
          latest_block = await web3_http.eth.getBlock('latest')
          payload.lastCheckedBlockNumber = latest_block.number
          if (summary) {
            payload.summary = summary
          }
          if (approval) {
            payload.approval = approval
          }
          payload = {
            ...payload,
            ...{
              summary,
              approval
            }
          }
          context.commit('addTransactions', payload)
          break
        case 'confirmed':
          payload = await getPayload({ hash, web3_http, type })
          context.commit('changeTransactions', payload)
          break
        case 'init':
          var local_transaction = JSON.parse(localStorage.getItem('store_transaction'))
          if (!local_transaction) {
            return
          }
          var pending_transactions = local_transaction.filter(item => !item.confirmed_time)
          if (pending_transactions.length < 1) {
            context.commit('initTransactions', local_transaction)
            return
          }
          var new_pending_transactions = []
          for (const item of pending_transactions) {
            const transaction_info = await getPayload({ hash: item.hash, web3_http, type })
            new_pending_transactions.push(
              {
                ...transaction_info,
                ...{
                  added_Time: item.added_Time,
                  summary: item.summary,
                  approval: item.approval
                }
              }
            )
          }
          var confirm_transactions = local_transaction.filter(item => item.confirmed_time)
          context.commit('initTransactions', {
            store: store,
            web3_http: web3_http,
            transactions: [
              ...confirm_transactions,
              ...new_pending_transactions
            ]
          })
          break
      }
    } catch (e) {
      console.error(e)
    }
  }
}
