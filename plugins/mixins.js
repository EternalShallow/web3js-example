import Vue from 'vue'
import { mapState } from 'vuex'
import { getWeb3 } from '../utils/web3/getWeb3'
import COIN_ABI from '../utils/web3/coinABI'
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
      const web3 = await getWeb3()
      try {
        Vue.prototype.$web3 = web3
        Vue.prototype.$COIN = new web3.eth.Contract(
          COIN_ABI.coin_abi_USDT,
          process.env.coin_address_USDT
        )
        Vue.prototype.$VAULT = new web3.eth.Contract(
          COIN_ABI.coin_vault_machine_USDT,
          process.env.machine_gun_vault_USDT
        )
        Vue.prototype.$STRATEGY = new web3.eth.Contract(
          COIN_ABI.abi_machine_strategy,
          process.env.machine_gun_strategy_USDT
        )
        let accounts
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
          // 请求账号授权
          await window.ethereum.enable()
          accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        } else {
          accounts = await web3.eth.getAccounts()
        }
        Vue.prototype.$account = accounts[0]
        Vue.prototype.$accounts = accounts
        await that.$store.dispatch('updateAccounts', accounts)
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
            msg: 'success',
            data: accounts
          })
          return that.promise
        }
      } catch (err) {
        console.log(err)
        that.reject(err)
        return that.promise
      }
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
