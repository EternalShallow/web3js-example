import { nowTime } from '../utils/function'
import { TRANSACTION_ACTIONS } from '../utils/web3/constants'
import { localTransaction } from '../utils/local/vuexLocal'
async function getPayload ({ hash, web3_http, type }) {
  let payload = {}
  try {
    let transaction_by_hash = await web3_http.eth.getTransaction(hash)
    if (transaction_by_hash.blockHash) {
      transaction_by_hash = await web3_http.eth.getTransactionReceipt(hash)
      if (type === 'init') {
        payload = {
          confirmedTime: nowTime()
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
  } catch (e) {
    console.log(e)
    return null
  }
}

export default {
  updateLoading (context, item) {
    context.commit('changeLoading', item)
  },
  updateDialogAccount (context, item) {
    context.commit('changeDialogAccount', item)
  },
  updateAccounts (context, item) {
    context.commit('changeAccounts', item)
  },
  clearAllTransactions (context) {
    context.commit('clearTransactions')
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
  async updateTransactions (context, { hash, summary, approval, type, store }) {
    let web3_http = null
    if (process.client) {
      web3_http = window.$nuxt.$web3_http
    }
    if (!web3_http) {
      return
    }
    try {
      let payload
      let latest_block
      switch (type) {
        case TRANSACTION_ACTIONS.ADDED:
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
              approval,
              addedTime: nowTime()
            }
          }
          context.commit('addTransactions', payload)
          break
        case TRANSACTION_ACTIONS.CONFIRMED:
          payload = await getPayload({ hash, web3_http, type })
          payload = {
            ...payload,
            ...{
              confirmedTime: nowTime()
            }
          }
          context.commit('changeTransactions', payload)
          break
        case TRANSACTION_ACTIONS.INIT:
          var local_transaction = localTransaction.get()
          if (!local_transaction) {
            return
          }
          var pending_transactions = local_transaction.filter(item => !item.confirmedTime)
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
                  addedTime: item.addedTime,
                  summary: item.summary,
                  approval: item.approval
                }
              }
            )
          }
          var confirm_transactions = local_transaction.filter(item => item.confirmedTime)
          context.commit('initTransactions', [
            ...confirm_transactions,
            ...new_pending_transactions
          ])
          break
      }
    } catch (e) {
      console.error(e)
    }
  }
}
