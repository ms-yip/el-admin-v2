// import Vue from 'vue'
import axios from 'axios' // api: https://github.com/axios/axios
import router from '@/router'
// import i18n from '@/plugins/i18n'
import qs from 'qs'
// import { clearLoginInfo } from '@/utils'
// import message from '@/utils/message'
// import JSONBIG from 'json-bigint'
// axios.defaults.baseURL = 'http://localhost:8080/api'
const toLoginPage = () => {
  router.push({ name: 'login' })
}

const http = axios.create({
  timeout: 1000 * 20,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

http.interceptors.request.use(
  (config) => {
    // const token = Vue.cookie.get('token')
    // const tokenType = Vue.cookie.get('tokenType')
    // config.headers.Authorization = `${tokenType} ${token}` // 请求头带上token
    config.url = '/api' + config.url
    if (config.method.toLowerCase() === 'post') {
      config.data = config.contentType === 'json' ? JSON.stringify(config.data) : qs.stringify(config.data)
      if (config.contentType === 'json') config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code === 401) {
      // 401, token失效
      toLoginPage()
    }
    return response.data
  },
  (error) => {
    console.log(error)
    // 删除 tab 触发的取消请求，不进行提醒
    // const errorMessage = String(error.message || '')

    // if (
    //   errorMessage.indexOf('504') !== -1 ||
    //   (errorMessage.indexOf('cancelToken') === -1 &&
    //     errorMessage.indexOf('timeout') !== -1 &&
    //     error.code === 'ECONNABORTED')
    // ) {
    //   // message.error({
    //   //   message: i18n.t('msg.requestTimeout'),
    //   //   duration: 1000
    //   // });
    // } else if (errorMessage) {
    //   // message.error({
    //   //   message: i18n.t('msg.networkError'),
    //   //   duration: 1000
    //   // })
    // }
    //
    console.error('[httpRequest.js] http.interceptors.response got a error return value', error)
    return Promise.reject(error)
  }
)

http.requestList = async function (url, methods, data, config) {
  let requestObj = {
    url,
    methods,
    ...config
  }
  const temp = methods.toLowerCase()
  if (temp === 'post') {
    requestObj.data = data
  } else if (temp === 'get') {
    requestObj.params = { ...data }
  }
  const result = await http(requestObj).then(res => {
    if (res.code === 0) {
      console.log(res.data)
      return res.data
    } else {
      return []
    }
  }).catch(e => {
    console.log(`${url}: ${e}`)
    return []
  })
  return result
}

export default {
  install (Vue) {
    Vue.prototype.$http = http
  }
}
