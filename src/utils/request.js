import axios from 'axios'
import { ElMessage } from 'element-plus'
// import store from '@/store'
import { getStorageToken } from '@/utils/storage/auth'
import { authStore } from '@/stores/auth'

// const SUCCESS_CODE = 200 // 成功
const UNLOGIN = 'AUTHENTICATION_ENTRY_POINT' // 重新登录
const ILLEGAL = -1005 // 非法请求（跨站请求伪造）

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  custom: {
    showInfo: false
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    const _authStore = authStore()
    const token = _authStore.token || getStorageToken()
    // store.commit('app/SET_LOADING', { data: { status: true } }) // Open global loading
    // do something before request is sent

    if (token && config && config.headers) {
      // let each request carry token
      // ['X-CSRF-TOKEN'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['supplier-token'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const _authStore = authStore()
    const WHITE_LIST = ['/v1/supplier/login', '/v1/supplier/image-captcha', '/v1/supplier/logout'] // 白名单内的接口返回全部完整的response
    // 登录接口单独处理
    if (WHITE_LIST.includes(response.config.url)) {
      // 登录接口单独处理response
      return response
    }
    const res = response
    // if the custom code is not SUCCESS_CODE, it is judged as an error.
    if (res.data.failed) {
      // store.commit('app/SET_LOADING', { data: { status: false } }) // Close global loading
      ElMessage.error({
        message: res.data.message || '失败啦！',
        grouping: true,
        center: true
      })

      // 重新登录
      if (res.data.code === UNLOGIN || res.data.code === ILLEGAL) {
        _authStore.logout()
      }
    } else {
      response.config.custom.showInfo
        ? ElMessage.success({
            message: res.data.message || '操作成功！',
            grouping: true,
            center: true
          })
        : false
    }
    // store.commit('app/SET_LOADING', { data: { status: false } }) // Close global loading
    return res
  },
  error => {
    // store.commit('app/SET_LOADING', { data: { status: false } }) // Close global loading
    console.error('err' + error) // for debug
    ElMessage.error({
      message: error.message || '出错啦！',
      grouping: true,
      center: true
    })
    return Promise.reject(error)
  }
)

export default service
