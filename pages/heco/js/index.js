import { useTokenContract } from '../../../utils/web3/web3Utils'
import COIN_ABI from '../../../utils/web3/coinABI'

let that
export default {
  data () {
    return {
      tokenContract: null
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    mint () {
      that.tokenContract.mint(that.account, 1)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('Failed to approve token', error)
        })
    },
    burn () {
      that.tokenContract.burn(that.account, 1)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('Failed to approve token', error)
        })
    },
    transfer () {
      that.tokenContract.transfer('0xE0f7ed46B07682e9F0Ae649EFF4Ee14AeBc3307B', 1)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('Failed to approve token', error)
        })
    },
    setAccount () {
      this.initPage()
    },
    initPage () {
      that = this
      if (that.$account) {
        console.log(that.$web3_http)
        that.account = that.$account
        that.initContract()
      }
    },
    async initContract () {
      try {
        that.tokenContract = useTokenContract('0xfc84727e575bb68fa5205f542e43130f33be868d', COIN_ABI.heco_abi)
        // console.log(await that.tokenContract.balanceOf(that.account))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
