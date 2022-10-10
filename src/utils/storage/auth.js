import storage from 'good-storage'

const TOKEN = 'token'
const USER_INFO = 'user-info'
const IMAGE_CAPTCHA = 'image-captcha'
const MENU_PERMISSION = 'menus-permission'

// token
export function getStorageToken() {
  return storage.get(TOKEN, '')
}

export function setStorageToken(token) {
  return storage.set(TOKEN, token)
}

export function removeStorageToken() {
  return storage.remove(TOKEN)
}

//user info
export function getStorageUserInfo() {
  return storage.get(USER_INFO, '')
}
export function setStorageUserInfo(info) {
  return storage.set(USER_INFO, info)
}

export function removeStorageUserInfo() {
  return storage.remove(USER_INFO)
}

//image-captcha(登录图形验证码)
export function getImageCaptcha() {
  return storage.get(IMAGE_CAPTCHA, '')
}

export function setImageCaptcha(info) {
  return storage.set(IMAGE_CAPTCHA, info)
}

export function removeImageCaptcha() {
  return storage.remove(IMAGE_CAPTCHA)
}

//menus-permission（登录用户权限列表）
export function getStorageMenusPermission() {
  return storage.get(MENU_PERMISSION, null)
}

export function setStorageMenusPermission(info) {
  return storage.set(MENU_PERMISSION, info)
}

export function removeStorageMenusPermission() {
  return storage.remove(MENU_PERMISSION)
}
