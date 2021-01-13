import Vue from 'vue'
import mixins from '~/plugins/mixins'
import { mapState } from 'vuex'
import { isTransactionRecent, newTransactionsFirst } from '../../utils/function'
const package_json = require('../../package.json')
Vue.mixin(mixins)
const version_info = '%c Target is ' + process.env.branch_name + ' version: ' + package_json.version + ' build: ' + process.COMMITHASH.substr(0, 8)
export default {
  data () {
    return {
      account: null,
      all_transaction: []
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      dialogAccount: state => state.dialogAccount
    }),
    'store.state.accounts': function () {
      return this.$store.state.accounts
    }
  },
  watch: {
    // 获取用户信息
    '$store.state.accounts': function (val) {
      this.setAccount(val)
    },
    '$store.state.transactions': function (val) {
      this.all_transaction = val.filter(item => isTransactionRecent(item)).sort(newTransactionsFirst)
    }
  },
  async mounted () {
    console.info(version_info, 'color:#FC4343;')
    if (this.$accounts === undefined || (this.$accounts && this.$accounts.length < 1)) {
      const init_wab3 = await this.initWeb3()
      this.$toastBox.showToastBox({
        type: 'none',
        text: init_wab3.message
      })
    }
  },
  methods: {
    setAccount (val) {
      this.account = this.$store.state.accounts[0]
    },
    getTransactionStatus (v) {
      return v?.confirmedTime ? (v?.receipt?.status ? 'confirmed' : 'error') : 'pending'
    },
    clearAll () {
      this.$store.dispatch('clearAllTransactions')
    }
  }
}
