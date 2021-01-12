import {
  keepPoint,
  numSub
} from '../../../utils/function'
import { getGasPrice, getMiningInfo, useTokenContract, useTokenContractWeb3 } from '../../../utils/web3/web3Utils'
import { approveEvent } from '../../../utils/web3/contractApprove'
import { sendTransactionEvent, useContractMethods } from '../../../utils/web3/contractEvent'
import COIN_ABI from '../../../utils/web3/coinABI'

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
      account: null,
      univ2Contract: null,
      reawordPoolContract: null
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
        that.initContract()
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
    initContract () {
      that.univ2Contract = useTokenContractWeb3(COIN_ABI.coin_abi_UNIV2, process.env.coin_UNIV2_YF_USDT)
      that.reawordPoolContract = useTokenContractWeb3(COIN_ABI.abi_reaword_pool, process.env.pool_coin_UNIV2_YF_USDT)
      that.getBalanceInfo()
    },
    async getBalanceInfo () {
      try {
        console.log(await that.$web3_http.eth.getTransactionReceipt('0x03276c6b5b6fd0d413b82fa651d713f0a5f731f1e4b8cd2ee9819697ace3cf4b'))
        that.balance_UNIV2 = await getMiningInfo({
          univ2Contract: that.univ2Contract,
          reawordPoolContract: that.reawordPoolContract,
          default_point: that.default_point,
          wei: that.wei
        })
        that.total_yf_info.total_yf_earn = keepPoint(that.$web3_http.utils.fromWei(await that.reawordPoolContract.methods.rewardPerToken().call(), that.wei), that.default_point)
        that.total_yf_info.total_yf_remain = keepPoint(numSub(that.total_yf_info.total_supply, that.total_yf_info.total_yf_earn), that.default_point)
      } catch (e) {
        console.log(e)
        console.log('获取univ2资产信息失败')
      }
    },
    async transactionETH () {
      const get_gas_price = await that.$web3_http.eth.getGasPrice()
      sendTransactionEvent(
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
      sendTransactionEvent(
        that.univ2Contract.methods.approve(process.env.pool_coin_UNIV2_YF_USDT, that.balance_UNIV2.balance_univ2_stake_wei).send({
          ...{
            from: that.$account
          },
          ...await getGasPrice()
        }),
        {
          summary: 'Approve YF',
          approval: {
            tokenAddress: process.env.coin_address_YF,
            spender: process.env.coin_UNIV2_YF_USDT
          }
        }
      )
    },
    async approveLibrary () {
      console.log(that.balance_UNIV2)
      approveEvent(process.env.pool_coin_UNIV2_YF_USDT, {
        approve_amount: that.balance_UNIV2.balance_univ2_original,
        symbol: 'UNIV2',
        address: process.env.coin_UNIV2_YF_USDT,
        wei: 'ether'
      })
    },
    async stake () {
      sendTransactionEvent(
        that.reawordPoolContract.methods.stake(that.balance_UNIV2.balance_univ2_wei).send({
          from: that.$account
        }),
        {
          summary: 'Stake univ2'
        }
      )
    },
    async stakeLibrary () {
      const contract = useTokenContract(process.env.pool_coin_UNIV2_YF_USDT, COIN_ABI.abi_reaword_pool)
      await useContractMethods({
        contract,
        methodName: 'stake',
        parameters: that.balance_UNIV2.balance_univ2_wei,
        summary: 'Stake UNIV2'
      })
    }
  }
}
