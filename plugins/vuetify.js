import Vue from 'vue'
import Vuetify, { VSwitch, VDialog } from 'vuetify/lib'
Vue.use(Vuetify, {
  components: {
    VSwitch,
    VDialog
  }
})

const opts = {}

export default new Vuetify(opts)
