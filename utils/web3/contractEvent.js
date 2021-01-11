import { TRANSACTION_ACTIONS } from './constants'

export function useCallback (response, { summary, approval }) {
  if (process.client) {
    const { $store } = window.$nuxt
    const { hash } = response
    $store.dispatch('updateTransactions', {
      hash,
      type: TRANSACTION_ACTIONS.ADDED,
      summary,
      approval
    })
    response.wait().then(res => {
      console.log(res)
      const { transactionHash } = res
      $store.dispatch('updateTransactions', {
        hash: transactionHash,
        type: TRANSACTION_ACTIONS.CONFIRMED
      })
    })
  }
}

export function sendTransactionEvent (sendEvent, { summary, approval }) {
  if (process.client) {
    const { $store } = window.$nuxt
    sendEvent.on('transactionHash', function (hash) {
      console.log('transactionHash')
      $store.dispatch('updateTransactions', {
        hash,
        type: TRANSACTION_ACTIONS.ADDED,
        summary,
        approval
      })
    }).on('receipt', function (receipt) {
      console.log('receipt')
      $store.dispatch('updateTransactions', {
        hash: receipt.transactionHash,
        type: TRANSACTION_ACTIONS.CONFIRMED
      })
    }).catch(error => {
      console.log(JSON.stringify(error))
      console.log('授权拒绝')
    })
  }
}
