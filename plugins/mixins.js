import Vue from 'vue'
import { mapState } from 'vuex'
import { getWeb3 } from '../utils/web3/getWeb3'
import COIN_ABI from '../utils/web3/coinABI'
import { TRANSACTION_ACTIONS } from '../utils/web3/constants'
export default {
  computed: {
    'store.state.accounts': function () {
      return this.$store.state.accounts
    },
    ...mapState({})
  },
  watch: {
    // 获取用户信息
    '$store.state.accounts': function (val) {
      this.setAccount(val)
    }
  },
  data () {
    return {
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    }
  },
  mounted () {
  },
  methods: {
    async initWeb3 () {
      const that = this
      that.promise = new Promise((resolve, reject) => {
        that.reject = reject
        that.resolve = resolve
      })
      if (typeof window.Web3 === 'undefined') {
        setTimeout(function () {
          that.initWeb3()
        }, 500)
      }
      const { web3, web3_http, library } = await getWeb3()
      try {
        Vue.prototype.$web3_http = web3_http
        Vue.prototype.$web3 = web3
        Vue.prototype.$library = library
        // usdt 机枪池合约初始化 需要连接主网
        // Vue.prototype.$COIN = new web3.eth.Contract(
        //   COIN_ABI.coin_abi_USDT,
        //   process.env.coin_address_USDT
        // )
        // Vue.prototype.$VAULT = new web3.eth.Contract(
        //   COIN_ABI.coin_vault_machine_USDT,
        //   process.env.machine_gun_vault_USDT
        // )
        // Vue.prototype.$STRATEGY = new web3.eth.Contract(
        //   COIN_ABI.abi_machine_strategy,
        //   process.env.machine_gun_strategy_USDT
        // )
        // YF-USDT 挖矿合约初始化
        Vue.prototype.$YF = new web3_http.eth.Contract(
          COIN_ABI.coin_abi_YF,
          process.env.coin_address_YF
        )
        Vue.prototype.$UNIV2 = new web3_http.eth.Contract(
          COIN_ABI.coin_abi_UNIV2,
          process.env.coin_UNIV2_YF_USDT
        )
        Vue.prototype.$REAWORDPOOL = new web3_http.eth.Contract(
          COIN_ABI.abi_reaword_pool,
          process.env.pool_coin_UNIV2_YF_USDT
        )
        let accounts
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
          // 请求账号授权
          await window.ethereum.enable()
          accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else {
          accounts = await web3.eth.getAccounts()
        }
        console.log(accounts)
        Vue.prototype.$account = accounts[0]
        Vue.prototype.$accounts = accounts
        await that.$store.dispatch('updateAccounts', accounts)
        that.initTransactions()
        if (!accounts) {
          setTimeout(function () {
            that.initWeb3()
          }, 500)
        } else {
          if (accounts.length < 1) {
            console.log('no accounts')
          }
          that.resolve({
            code: 200,
            message: 'success',
            data: accounts
          })
          return that.promise
        }
      } catch (err) {
        console.log(err)
        that.resolve(err)
        return that.promise
      }
    },
    initTransactions () {
      this.$store.dispatch('updateTransactions', {
        hash: null,
        type: TRANSACTION_ACTIONS.INIT
      })
    },
    sendTransactionEvent (sendEvent, { summary, approval }) {
      const that = this
      sendEvent.on('transactionHash', function (hash) {
        console.log('transactionHash')
        console.log(hash)
        that.$store.dispatch('updateTransactions', {
          hash,
          type: TRANSACTION_ACTIONS.ADDED,
          summary,
          approval
        })
      }).on('receipt', function (receipt) {
        console.log('receipt')
        console.log(receipt)
        that.$store.dispatch('updateTransactions', {
          hash: receipt.transactionHash,
          type: TRANSACTION_ACTIONS.CONFIRMED
        })
      }).catch(error => {
        console.log(JSON.stringify(error))
        that.isApprove = false
        console.log('授权拒绝')
      })
    },
    setAccount (val) {},
    closeLoading () {
      this.$store.dispatch('updateLoading', false)
    },
    openLoading () {
      this.$store.dispatch('updateLoading', true)
    }
  }
}
