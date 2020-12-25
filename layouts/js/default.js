import Vue from 'vue'
import mixins from '~/plugins/mixins'
import { mapState } from 'vuex'
const package_json = require('../../package.json')
Vue.mixin(mixins)
const version_info = '%c Target is ' + process.env.branch_name + ' version: ' + package_json.version + ' build: ' + process.COMMITHASH.substr(0, 8)
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },
  mounted () {
    console.info(version_info, 'color:#FC4343;')
  },
  methods: {}
}
