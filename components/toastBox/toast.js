/**
 * Created by suiyanxin on 2018/6/22.
 */
import toastVue from './index.vue'
// 定义插件对象
const ToastBox = {}
// vue的install方法，用于定义vue插件
ToastBox.install = function (Vue, options) {
  const ToastBoxInstance = Vue.extend(toastVue)
  let currentMsg
  const initInstance1 = () => {
    // 实例化vue实例
    currentMsg = new ToastBoxInstance()
    const msgBoxEl = currentMsg.$mount().$el
    document.body.appendChild(msgBoxEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$toastBox = {
    showToastBox (options) {
      if (!currentMsg) {
        initInstance1()
      }
      if (typeof options === 'string') {
        currentMsg.content = options
        currentMsg.done = null
      } else if (typeof options === 'object') {
        if (!options.done) {
          currentMsg.done = null
        }
        Object.assign(currentMsg, options)
      }
      return currentMsg.showToastBox(options.time || 1000)
    }
  }
}
export default ToastBox
