import { keepPoint } from '../../../utils/function'
let that
export default {
  name: 'index',
  data () {
    return {
      approve_amount: 0,
      earn_amount: 0,
      wei: '',
      is_approve: true,
      token_info: {
        balance_amount: '--', // 余额
        balance_amount_origin: '--',
        deposit_amount: '--', // 我的存入数量
        deposit_amount_origin: '--',
        unclaimed_profit: '--', // 待提取
        unclaimed_profit_origin: '--',
        total_amount: '--', // 存入总量
        total_amount_origin: '--',
        rate: '--'
      }
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    setAccount () {
      that.getBalanceInfo()
    },
    initPage () {
      that = this
      that.wei = 'mwei'
      if (that.account) {
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
        // 授权数量
        that.approve_amount = await that.$COIN.methods.allowance(that.$account, process.env.machine_gun_vault_USDT).call()
        that.is_approve = that.approve_amount !== '0'
        // 账户余额
        const balance_amount = await that.$COIN.methods.balanceOf(that.$account).call()
        that.token_info.balance_amount_origin = that.$web3.utils.fromWei(balance_amount, that.wei)
        that.token_info.balance_amount = parseFloat(keepPoint(that.token_info.balance_amount_origin, 6))
        const global_ = await that.$VAULT.methods.global_(0).call()
        const total_amount = global_.total_stake
        that.token_info.total_amount_origin = that.$web3.utils.fromWei(total_amount + '', that.wei)
        that.token_info.total_amount = parseFloat(keepPoint(that.token_info.total_amount_origin, 6))
        // 未质押的数量
        const available = await that.$VAULT.methods.available().call()
        that.earn_amount = parseFloat(keepPoint(that.$web3.utils.fromWei(available + '', that.wei), 6))
        // 待取收益
        const unclaimed_profit = await that.$VAULT.methods.cal_out(that.$account).call()
        that.token_info.unclaimed_profit_origin = that.$web3.utils.fromWei(unclaimed_profit, 'ether')
        that.token_info.unclaimed_profit = parseFloat(keepPoint(that.token_info.unclaimed_profit_origin, 6))
        // 我的存入数量
        const player = await that.$VAULT.methods.player_(that.$account).call()
        that.token_info.deposit_amount_origin = that.$web3.utils.fromWei(player.stake, that.wei)
        that.token_info.deposit_amount = parseFloat(keepPoint(that.token_info.deposit_amount_origin, 6))
        console.log(that.token_info)
      } catch (e) {
        console.log(e)
        console.log('获取资产信息失败')
      }
    },
    approve () {}
  }
}
