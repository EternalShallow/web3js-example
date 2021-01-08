import Axios from 'axios' // 引入Axios
import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到
import {
  messageError
} from '../utils/function'
const getHeaders = () => {
  return {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}
Axios.defaults.headers = getHeaders()
Axios.defaults.timeout = 10000
Axios.defaults.withCredentials = false

function postJsonIndicator (url, params, successFun, failFun, errorFun, showIndicator) {
  // eslint-disable-next-line no-empty
  if (showIndicator) {
  }
  var req = {
    url: process.env.base_bingoo + process.env.base_path + url,
    method: 'POST',
    data: params
  }
  Axios(req).catch(
    function (err) {
      if (typeof errorFun === 'function') {
        errorFun(err.response.data)
      } else {
        messageError(err.response && err.response.data.msg ? err.response.data.msg : '服务器通讯异常，请检查网络')
      }
    }
  ).then(
    function (res) {
      if (res.data.code !== 1000) {
        if (res.data.code === 1300) {
          return messageError('参数错误')
        } else {
          return messageError(res.data.message)
        }
      }
      successFun(res ? res.data : {})
    }
  )
}
export default {
  /**
   * 封装ajax的get请求
   * @param url
   * @param params
   * @param successFun
   * @param errorFun
   */
  getJson: function (url, params, successFun, errorFun) {
    // indicatorOpen()
    // console.log(process.env.base)
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty('is_base') && params.is_base) {
      // eslint-disable-next-line no-self-assign
    } else {
      url = process.env.base_bingoo + process.env.base_path + url
    }
    var req = {
      url: url,
      method: 'get',
      params: params,
      async: false
    }
    Axios(req).catch(
      function (err) {
        if (typeof errorFun === 'function') {
          const error = JSON.parse(JSON.stringify(err))
          console.log(error.message)
          errorFun(error.message)
        } else {
          errorFun(err.response && err.response.data.msg ? err.response.data.msg : '服务器通讯异常，请检查网络')
          console.log(err.response && err.response.data.msg ? err.response.data.msg : '服务器通讯异常，请检查网络')
        }
      }
    ).then(
      function (res) {
        console.log(res)
        if (!res) {
          return
        }
        if (res.data.code !== 1000) {
          if (res.data.code === 1300) {
            return messageError('参数错误')
          } else {
            return messageError(res.data.message)
          }
        }
        successFun(res ? res.data : {})
      }
    )
  },
  postJson: function (url, params, successFun, failFun, errorFun) {
    postJsonIndicator(url, params, successFun, failFun, errorFun, true)
  },
  postJsonIndicator: function (url, params, successFun, failFun, errorFun, showIndicator) {
    // eslint-disable-next-line no-empty
    if (showIndicator) {
    }
    var req = {
      url: process.env.base + process.env.base_path + url,
      // url: 'http://10.2.0.144:10086' + url,
      method: 'POST',
      data: {
        wallet_address: '111111.bh',
        product_type: 1,
        page: 1,
        page_size: 100
      }
    }
    Axios(req).catch(
      function (err) {
        if (typeof errorFun === 'function') {
          errorFun(err.response.data)
        } else {
          messageError(err.response && err.response.data.msg ? err.response.data.msg : '服务器通讯异常，请检查网络')
        }
      }
    ).then(
      function (res) {
        successFun(res ? res.data : {})
      }
    )
  },
  postJsonFrom: function (url, params, successFun, failFun, errorFun) {
    const data = qs.stringify(params)

    var req = {
      url: url,
      method: 'POST',
      data: data
    }
    Axios(req).catch(
      function (err) {
        // eslint-disable-next-line no-empty
        if (typeof errorFun === 'function') {
        } else {
          messageError(err.response && err.response.data.msg ? err.response.data.msg : '服务器通讯异常，请检查网络')
        }
      }
    ).then(
      function (res) {
        successFun(res ? res.data : {})
      }
    )
  }
}
