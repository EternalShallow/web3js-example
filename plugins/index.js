import Vue from 'vue'
import API from '../api/http'
import '../assets/css/fun.scss'
import '../assets/css/resetVuetify.scss'
import '../assets/css/color.scss'
import '../assets/css/font.scss'
import '../assets/css/space.scss'
import '../assets/css/common.scss'
import '../assets/css/main.scss'
import yHeader from '../components/yHeader'
import yNumberInput from '../components/yNumberInput'
import yBtn from '../components/yBtn'
import MessageBox from '../components/confirmBox/confirm'
import ToastBox from '../components/toastBox/toast'
// 复制功能
import VueClipboard from 'vue-clipboard2'
import LoadMore from '../components/loadmoreBox/loadMore'
import yNoData from '../components/yNoData'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
const lang = require('../lang/zn.json')
Vue.component('y-loadmore', LoadMore)
Vue.component('y-header', yHeader)
Vue.component('y-no-data', yNoData)
Vue.component('y-btn', yBtn)
Vue.component('y-number-input', yNumberInput)
Vue.use(MessageBox)
Vue.use(ToastBox)
Vue.prototype.$get = API.getJson
Vue.prototype.$post = API.postJson
Vue.prototype.$lang = lang
Vue.use(API)
