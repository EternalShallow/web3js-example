export function watchTransactions ({ web3, web3_http, account }) {
  account = account.toLowerCase()
  console.log(account)
  const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
    console.log(res)
    if (err) console.error(err)
  })
  console.log('[+] Watching transactions...')
  subscription
    .on('data', (txHash) => {
      console.log(txHash)
      setTimeout(async () => {
        try {
          const tx = await web3_http.eth.getTransaction(txHash)
          if (tx.from) {
            console.log(tx.from.toLowerCase(), account)
            if (tx.from.toLowerCase() === account) {
              console.log({
                from: tx.from,
                to: tx.to,
                value: web3_http.utils.fromWei(tx.value, 'ether')
              })
            }
          }
        } catch (err) {
          console.error(err)
        }
      }, 1000)
    })
    .on('changed', (data) => {
      console.log(data)
    })
    .on('connected', (subscriptionId) => {
      console.log(subscriptionId)
    })
    .on('error', (data) => {
      console.log(data)
    })
}

export async function checkLastBlock ({ web3, web3_http, account }) {
  const blocks = await web3_http.eth.getBlock('latest')
  console.log(blocks)
  if (blocks && blocks.transactions) {
    for (const txHash of blocks.transactions) {
      try {
        const tx = await web3_http.eth.getTransaction(txHash)
        if (tx.from) {
          if (tx.from.toLowerCase() === account) {
            console.log({
              from: tx.from,
              to: tx.to,
              value: web3_http.utils.fromWei(tx.value, 'ether')
            })
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
