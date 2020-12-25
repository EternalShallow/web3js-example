/* eslint-disable */ // 避开代码检测
import msgboxVue from './index.vue'

// 定义插件对象
const MessageBox = {}

// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue, options) {
  const MessageBoxInstance = Vue.extend(msgboxVue)
  let currentMsg
  const initInstance = () => {
    // 实例化Vue 实例
    currentMsg = new MessageBoxInstance()
    let msgBoxEl = currentMsg.$mount().$el
    document.body.appendChild(msgBoxEl)
  }

  //在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = {
    showMsgBox (options) {
      if (!currentMsg) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentMsg.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options)
      }

      return currentMsg.showMsgBox()
        .then(val => {
          currentMsg = null
          return Promise.resolve(val)
        })
        .catch(err => {
          currentMsg = null
          return Promise.reject(err)
        })
    }
  }
}
export default MessageBox
