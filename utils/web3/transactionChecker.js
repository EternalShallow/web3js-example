export default class WatchTransactions {
  constructor (config) {
    // this.account = config.account
    this.account = '0xb55AdD32e4608Eb7965eC234E6C0b3f009c3d9D6'
    this.contract = config.contract
    this.event = config.event || 'allEvents'
    this.time = config.time || 2000
    this.internal_transactions = null
  }

  setInterval () {
    const that = this
    that.clearInterval()
    console.log(that.account)
    console.log(that.contract)
    console.log(that.event)
    // that.internal_transactions = setInterval(function () {
    const allEvents = that.contract.events.allEvents({
      filter: {
        owner: that.account,
        address: that.account,
        user: that.account
      },
      address: that.account,
      fromBlock: 0,
      toBlock: 'latest',
      topics: []
    })
    allEvents
      .on('data', (event) => {
        // console.log(event)
      })
      .on('changed', (data) => {
        console.log(data)
      })
      .on('connected', (subscriptionId) => {
        console.log(subscriptionId)
      })
      .on('error', console.error)
  }

  clearInterval () {
    if (this.internal_transactions) {
      clearInterval(this.internal_transactions)
    }
  }
  // const filter = web3_http.eth.filter({
  //   fromBlock: 0,
  //   toBlock: 'latest',
  //   address: account,
  //   topics: [web3_http.utils.sha3('newtest(string,uint256,string,string,uint256)')]
  // })
  // // eslint-disable-next-line handle-callback-err
  // filter.watch((error, result) => {
  //   //
  //   console.log(result)
  //   console.log(error)
  // })
  // const subscription = web3.eth.subscribe('logs', {
  //   address: account,
  //   topics: []
  // }, (err, res) => {
  //   console.log(res)
  //   if (err) console.error(err)
  // })
  // console.log('[+] Watching transactions...')
  // subscription
  //   .on('data', (txHash) => {
  //     console.log(txHash)
  //     setTimeout(async () => {
  //       try {
  //         const tx = await web3_http.eth.getTransaction(txHash)
  //         if (tx.from) {
  //           console.log(tx.from.toLowerCase(), account)
  //           if (tx.from.toLowerCase() === account) {
  //             console.log({
  //               from: tx.from,
  //               to: tx.to,
  //               value: web3_http.utils.fromWei(tx.value, 'ether')
  //             })
  //           }
  //         }
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }, 1000)
  //   })
  //   .on('changed', (data) => {
  //     console.log(data)
  //   })
  //   .on('connected', (subscriptionId) => {
  //     console.log(subscriptionId)
  //   })
  //   .on('error', (data) => {
  //     console.log(data)
  //   })
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
