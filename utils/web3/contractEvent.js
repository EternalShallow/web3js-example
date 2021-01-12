import { TRANSACTION_ACTIONS } from './constants'
import { getGasLimit } from './web3Utils'

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
      console.log(error)
      if (error?.code === 4001) {
        console.log('Transaction rejected.')
      } else {
        const errInfo = JSON.parse(JSON.stringify(error))
        console.log(errInfo)
        console.log(`actions is failed: ${error.message}`)
        if (errInfo.receipt.transactionHash) {
          $store.dispatch('updateTransactions', {
            hash: errInfo.receipt.transactionHash,
            type: TRANSACTION_ACTIONS.CONFIRMED
          })
        }
      }
    })
  }
}

export async function useContractMethods ({ contract, methodName, parameters, summary }) {
  if (!contract) {
    console.error('no contract')
    return
  }
  if (!methodName) {
    console.error('no methodName')
    return
  }
  const estimatedGas = await getGasLimit(contract, methodName, parameters)
  contract[methodName](parameters, {
    ...estimatedGas
  })
    .then((response) => {
      useCallback(response, {
        summary: summary
      })
    })
    .catch((error) => {
      console.error('Failed to approve token', error)
    })
}
