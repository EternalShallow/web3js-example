import { clearVuexLocalItem, getVuexLocalItem, setVuexLocalItem } from './localUtils'

export const localTransaction = {
  get: function () {
    return getVuexLocalItem('store_transaction') ? JSON.parse(getVuexLocalItem('store_transaction')) : null
  },
  set: function () {
    if (process.client) {
      const { $store } = window.$nuxt
      setVuexLocalItem('store_transaction', JSON.stringify($store.state.transactions))
    }
  },
  clear: function () {
    clearVuexLocalItem('store_transaction')
  }
}
