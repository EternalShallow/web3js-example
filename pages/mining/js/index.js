import {
  keepPoint,
  numSub
} from '../../../utils/function'
import { MaxUint256 } from '@ethersproject/constants'
import { calculateGasMargin, getGasPrice, useTokenContract } from '../../../utils/web3/web3Utils'
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
      transactions: [],
      account: null
    }
  },
  mounted () {
    this.initPage()
  },
  computed: {
    '$store.state.transactions': function (val) {
      return this.$store.state.transactions
    },
    '$store.state.pending_transactions': function (val) {
      console.log(val)
      return this.$store.state.pending_transactions
    }
  },
  watch: {
    '$store.state.transactions': function (val) {
      console.log(val)
    },
    '$store.state.pending_transactions': function (val) {
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
        console.log(that.$web3_http)
        that.account = that.$account
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
      that.sendTransactionEvent(
        that.$web3_http.eth.sendTransaction({
          from: that.$account,
          to: '0xb55AdD32e4608Eb7965eC234E6C0b3f009c3d9D6',
          value: that.$web3_http.utils.toWei('0.01', that.wei),
          gas: 21000,
          gasPrice: '0x' + get_gas_price.toString(16)
        }),
        {
          summary: 'transfer 0.01 ETH'
        }
      )
    },
    async approve () {
      that.sendTransactionEvent(
        that.$UNIV2.methods.approve(process.env.coin_UNIV2_YF_USDT, that.balance_UNIV2.balance_univ2_stake_wei).send({
          from: that.$account,
          gasPrice: await getGasPrice()
        }),
        {
          summary: `Approve ${that.balance_UNIV2.balance_univ2_stake}`,
          approval: { tokenAddress: process.env.coin_address_YF, spender: process.env.coin_UNIV2_YF_USDT }
        }
      )
    },
    async approveLibrary () {
      const spender = process.env.coin_UNIV2_YF_USDT
      const tokenContract = useTokenContract(spender)
      let useExact = false
      // const get_gas_price = await that.$web3_http.eth.getGasPrice()
      const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true
        return tokenContract.estimateGas.approve(spender, that.balance_UNIV2.balance_univ2_stake_wei)
      })
      console.log(estimatedGas)
      tokenContract
        .approve(spender, useExact ? that.balance_UNIV2.balance_univ2_stake_wei : MaxUint256, {
          gasLimit: calculateGasMargin(estimatedGas),
          gasPrice: await getGasPrice()
        })
        .then((response) => {
          console.log(response)
          response.wait(confirmations => {
            console.log(confirmations)
          })
        })
        .catch((error) => {
          console.error('Failed to approve token', error)
          throw error
        })
    },
    stake () {}
  }
}
