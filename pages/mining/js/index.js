import {
  keepPoint,
  numSub
} from '../../../utils/function'
import WatchTransactions from '../../../utils/web3/transactionChecker'
import CheckTransactions from '../../../utils/web3/checkerTransactions'
let that
export default {
  name: 'index',
  data () {
    return {
      approve_amount: 0,
      default_point: 6,
      wei: 'ether',
      is_approve: true,
      total_yf_info: {
        total_supply: 1000,
        total_yf_remain: '',
        total_yf_earn: '',
        year_earn: '--',
        DURATION: 0,
        DURATION_DAY: 0,
        total_cycle: 10
      },
      balance_UNIV2: {
        balance_univ2: '--',
        balance_univ2_wei: '',
        balance_univ2_original: '0',
        balance_yf_eran: '--',
        balance_yf_eran_original: '0',
        balance_yf: '--',
        balance_univ2_stake: '--',
        balance_univ2_stake_wei: '',
        balance_univ2_stake_original: '0'
      },
      balance_eth_accounts: [],
      transactions: []
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    '$store.state.transactions': function (val) {
      return this.$store.state.transactions
    }
  },
  watch: {
    '$store.state.transactions': function (val) {
      console.log(val)
    }
  },
  methods: {
    setAccount () {
      this.initPage()
    },
    async initPage () {
      that = this
      if (that.$account) {
        console.log(await that.$web3_http.eth.getBlock('latest'))
        console.log(await that.$web3_http.eth.getTransactionReceipt('0x1fc5522b66b3ea67ee986b3efe280b5bade262f4b3497a47fbeb75774f4fc353'))
        // eslint-disable-next-line no-new
        const watch_transactions = new WatchTransactions({
          account: that.$account,
          contract: that.$REAWORDPOOL,
          store: that.$store,
          web3_http: that.$web3_http
        })
        watch_transactions.setInterval()
        // const watch_transactions_UNIV2 = new WatchTransactions({
        //   account: that.$account,
        //   contract: that.$UNIV2,
        //   event: 'Approval'
        // })
        // watch_transactions_UNIV2.setInterval()
        that.getBalanceInfo()
        // that.checkTransactionsEvent()
      }
    },
    checkTransactionsEvent () {
      // eslint-disable-next-line no-new
      const check_transactions = new CheckTransactions({
        web3_http: that.$web3_http,
        store: that.$store
      })
      check_transactions.setInterval()
    },
    async connectWallet () {
      const init_wab3 = await this.initWeb3()
      console.log(init_wab3)
      that.$toastBox.showToastBox({
        type: 'none',
        text: init_wab3.message
      })
      if (init_wab3.code === 200) {
        await that.getBalanceInfo()
      }
    },
    async getBalanceInfo () {
      try {
        if (that.balance_eth_accounts.length < 1) {
          if (that.$accounts.length > 0) {
            for (let i = 0; i < that.$accounts.length; i++) {
              const account_info = {
                account: that.$accounts[i],
                balance: keepPoint(that.$web3_http.utils.fromWei(await that.$web3_http.eth.getBalance(that.$account), 'ether'), 6)
              }
              that.balance_eth_accounts.push(account_info)
            }
          } else {
            return
          }
          console.log(that.balance_eth_accounts)
        }
        const balance_univ2 = await that.$UNIV2.methods.balanceOf(that.$account).call()
        // univ2 未质押数量
        that.balance_UNIV2.balance_univ2_wei = balance_univ2
        that.balance_UNIV2.balance_univ2_original = that.$web3_http.utils.fromWei(balance_univ2, that.wei)
        that.balance_UNIV2.balance_univ2 = keepPoint(that.balance_UNIV2.balance_univ2_original, that.default_point)
        // 可取YF数量
        const balance_yf_eran = await that.$REAWORDPOOL.methods.earned(that.$account).call()
        that.balance_UNIV2.balance_yf_eran_original = that.$web3_http.utils.fromWei(balance_yf_eran, that.wei)
        that.balance_UNIV2.balance_yf_eran = keepPoint(that.balance_UNIV2.balance_yf_eran_original, that.default_point)
        // univ2 质押数量
        const balance_univ2_stake = await that.$REAWORDPOOL.methods.balanceOf(that.$account).call()
        console.log(balance_univ2_stake)
        that.balance_UNIV2.balance_univ2_stake_wei = balance_univ2_stake
        that.balance_UNIV2.balance_univ2_stake_original = that.$web3_http.utils.fromWei(balance_univ2_stake, that.wei)
        that.balance_UNIV2.balance_univ2_stake = keepPoint(that.balance_UNIV2.balance_univ2_stake_original, that.default_point)
        const balance_yf = await that.$YF.methods.balanceOf(that.$account).call()
        console.log('balance_yf', keepPoint(that.$web3_http.utils.fromWei(balance_yf, 'ether')))
        that.total_yf_info.total_yf_earn = keepPoint(that.$web3_http.utils.fromWei(await that.$REAWORDPOOL.methods.rewardPerToken().call(), that.wei), that.default_point)
        that.total_yf_info.total_yf_remain = keepPoint(numSub(that.total_yf_info.total_supply, that.total_yf_info.total_yf_earn), that.default_point)
        console.log(that.balance_UNIV2)
      } catch (e) {
        console.log(e)
        console.log('获取univ2资产信息失败')
      }
    },
    async transactionETH () {
      const get_gas_price = await that.$web3_http.eth.getGasPrice()
      try {
        // 两种方式， 一种是Promise 另外一种是时事件监听机制
        const transaction = await that.$web3_http.eth.sendTransaction({
          from: that.$account,
          to: '0xb55AdD32e4608Eb7965eC234E6C0b3f009c3d9D6',
          value: that.$web3_http.utils.toWei('0.01', that.wei),
          gas: 21000,
          gasPrice: '0x' + get_gas_price.toString(16)
        })
          .on('transactionHash', async function (hash) {
            console.log('在交易发出并得到有效的交易哈希值后立刻触发')
            console.log(hash)
            console.log(await that.$web3_http.eth.getTransaction(hash))
            const getTransaction = await that.$web3_http.eth.getTransaction(hash)
            that.transactions.push(getTransaction)
            const pendingTransactions = await that.$web3_http.eth.getPendingTransactions()
            console.log(pendingTransactions)
            // that.$store.dispatch('updateTransactions', that.transactions)
            // that.checkTransactionsEvent()
          })
          .on('receipt', function (receipt) {
            console.log('交易收据有效后立刻触发')
            console.log(receipt)
          })
          .on('confirmation', function (confirmationNumber, receipt, latestBlockHash) {
            console.log('在每次确认后立刻触发，最多12次确认。确认编号为第一个参数，收据为第二个参数。从0号确认开始触发')
            console.log(confirmationNumber, receipt, latestBlockHash)
          })
          .on('error', function (error) {
            console.error(error)
          }) // If a out of gas error, the second parameter is the receipt.
        console.log(transaction)
      } catch (e) {
        that.$toastBox.showToastBox({
          type: 'none',
          text: e.message
        })
        console.log(e)
      }
    },
    approve () {
      that.$UNIV2.methods.approve(process.env.coin_UNIV2_YF_USDT, that.balance_UNIV2.balance_univ2_stake_wei).send({
        from: that.$account
      }).on('transactionHash', async function (hash) {
        console.log('transactionHash')
        console.log(hash)
        that.$store.dispatch('updateTransactions', {
          hash,
          web3_http: that.$web3_http,
          type: 'added',
          summary: `Approve ${that.balance_UNIV2.balance_univ2_stake}`
        })
      }).on('receipt', function (receipt) {
        console.log('receipt')
        console.log(receipt)
        that.$store.dispatch('updateTransactions', {
          hash: receipt.transactionHash,
          web3_http: that.$web3_http,
          type: 'confirmed'
        })
      }).catch(error => {
        console.log(JSON.stringify(error))
        that.isApprove = false
        console.log('授权拒绝')
      })
    },
    stake () {}
  }
}
