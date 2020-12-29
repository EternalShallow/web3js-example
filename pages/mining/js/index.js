import {
  keepPoint,
  numSub
} from '../../../utils/function'
import { checkLastBlock } from '../../../utils/web3/transactionChecker'
// const tx = require('ethereumjs-tx')
let that
let interval_transaction = null
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
      balance_of_UNIV2: {
        balance_of_univ2: '--',
        balance_of_univ2_original: '0',
        balance_of_yf_eran: '--',
        balance_of_yf_eran_original: '0',
        balance_of_yf: '--',
        balance_of_univ2_pledge: '--',
        balance_of_univ2_pledge_original: '0'
      },
      balance_of_eth_accounts: []
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    setAccount () {
      this.initPage()
    },
    initPage () {
      that = this
      if (that.$account) {
        // watchTransactions({
        //   web3: that.$web3,
        //   web3_http: that.$web3_http,
        //   account: that.$account
        // })
        if (interval_transaction) {
          clearInterval(interval_transaction)
        }
        interval_transaction = setInterval(async () => {
          await checkLastBlock({
            web3: that.$web3,
            web3_http: that.$web3_http,
            account: that.$account
          })
        }, 2000)
        that.getBalanceInfo()
      }
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
        if (that.balance_of_eth_accounts.length < 1) {
          if (that.$accounts.length > 0) {
            for (let i = 0; i < that.$accounts.length; i++) {
              const account_info = {
                account: that.$accounts[i],
                balance: keepPoint(that.$web3_http.utils.fromWei(await that.$web3_http.eth.getBalance(that.$account), 'ether'), 6)
              }
              that.balance_of_eth_accounts.push(account_info)
            }
          } else {
            return
          }
          console.log(that.balance_of_eth_accounts)
        }
        const balance_of_univ2 = await that.$UNIV2.methods.balanceOf(that.$account).call()
        // univ2 未质押数量
        that.balance_of_UNIV2.balance_of_univ2_original = that.$web3_http.utils.fromWei(balance_of_univ2, that.wei)
        that.balance_of_UNIV2.balance_of_univ2 = keepPoint(that.balance_of_UNIV2.balance_of_univ2_original, that.default_point)
        // 可取YF数量
        const balance_of_yf_eran = await that.$REAWORDPOOL.methods.earned(that.$account).call()
        that.balance_of_UNIV2.balance_of_yf_eran_original = that.$web3_http.utils.fromWei(balance_of_yf_eran, that.wei)
        that.balance_of_UNIV2.balance_of_yf_eran = keepPoint(that.balance_of_UNIV2.balance_of_yf_eran_original, that.default_point)
        // univ2 质押数量
        const balance_of_univ2_pledge = await that.$REAWORDPOOL.methods.balanceOf(that.$account).call()
        that.balance_of_UNIV2.balance_of_univ2_pledge_original = that.$web3_http.utils.fromWei(balance_of_univ2_pledge, that.wei)
        that.balance_of_UNIV2.balance_of_univ2_pledge = keepPoint(that.balance_of_UNIV2.balance_of_univ2_pledge_original, that.default_point)
        const balance_of_yf = await that.$YF.methods.balanceOf(that.$account).call()
        console.log('balance_of_yf', keepPoint(that.$web3_http.utils.fromWei(balance_of_yf, 'ether')))
        that.total_yf_info.total_yf_earn = keepPoint(that.$web3_http.utils.fromWei(await that.$REAWORDPOOL.methods.rewardPerToken().call(), that.wei), that.default_point)
        that.total_yf_info.total_yf_remain = keepPoint(numSub(that.total_yf_info.total_supply, that.total_yf_info.total_yf_earn), that.default_point)
        that.isAccountInfo = true
      } catch (e) {
        console.log(e)
        console.log('获取univ2资产信息失败')
      }
    },
    async transactionETH () {
      const get_gas_price = await that.$web3_http.eth.getGasPrice()
      try {
        const transaction = await that.$web3_http.eth.sendTransaction({
          from: that.$account,
          to: '0x53e988f9390Ee7A29B8F674566a5e88cbF39D641',
          value: that.$web3_http.utils.toWei('0.01', that.wei),
          gas: 21000,
          gasPrice: '0x' + get_gas_price.toString(16)
        })
        console.log(transaction)
      } catch (e) {
        that.$toastBox.showToastBox({
          type: 'none',
          text: e.message
        })
        console.log(e)
      }
    }
  }
}
