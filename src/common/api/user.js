import request from '@/utils/request'
import md5 from 'js-md5'

/**
 * 登录
 * @param {Object} data login form
 * @param {String} validImgId 图形验证码id
 * @returns
 */
export function login(data, validImgId) {
  let md5Data = { ...data }
  md5Data.password = md5(data.password)
  return request({
    headers: validImgId ? { 'content-disposition': validImgId } : null,
    url: '/v1/supplier/login',
    method: 'POST',
    data: md5Data
  })
}

// 获取验证码图片流
export function fetchImgCaptcha() {
  return request({
    url: '/v1/supplier/image-captcha',
    method: 'GET',
    responseType: 'arraybuffer'
  })
}

// 修改密码
export function changePsw(data) {
  let md5Data = { ...data }
  md5Data.newPassword = md5(data.newPassword)
  md5Data.oldPassword = md5(data.oldPassword)
  return request({
    url: '/v1/supplier/modify-password',
    method: 'PUT',
    data: md5Data,
    custom: {
      showInfo: true
    }
  })
}

// 获取用户信息
export function fetchUserInfo() {
  return request({
    url: '/my-account',
    method: 'GET'
  })
}

// 修改用户信息
export function editUserInfo(data) {
  return request({
    url: '/my-account',
    method: 'PUT',
    data: data,
    custom: {
      showInfo: true
    }
  })
}

// 修改用户信息
export function logout() {
  return request({
    url: '/v1/supplier/logout',
    method: 'POST',
    custom: {
      showInfo: true
    }
  })
}
