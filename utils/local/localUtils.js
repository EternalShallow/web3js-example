import { LOCAL_PREFIX_VUEX } from '../web3/constants'

export function getLocalItem (name, prefix = '') {
  return localStorage.getItem(`${prefix}${name}`)
}
export function setLocalItem (name, value, prefix = '') {
  localStorage.setItem(`${prefix}${name}`, value)
}
export function clearLocalItem (name, prefix = '') {
  localStorage.clear(`${prefix}${name}`)
}

export function getVuexLocalItem (name) {
  return getLocalItem(name, LOCAL_PREFIX_VUEX)
}

export function setVuexLocalItem (name, value) {
  setLocalItem(name, value, LOCAL_PREFIX_VUEX)
}

export function clearVuexLocalItem (name) {
  localStorage.clear(name, LOCAL_PREFIX_VUEX)
}
