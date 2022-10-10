import { defineStore } from 'pinia'
import _ from 'lodash'
import { login, logout, fetchImgCaptcha, fetchUserInfo } from '@/common/api/user'
import { tagsViewStore } from '@/stores/tagsView'
import {
  setStorageToken,
  // setStorageMenusPermission,
  setStorageUserInfo,
  getStorageMenusPermission,
  getStorageUserInfo,
  removeStorageToken,
  removeStorageUserInfo,
  removeStorageMenusPermission
} from '@/utils/storage/auth'
import { _addRoutes } from '@/router'
import { constantRoutes } from '@/router/constantRoutes.js'
import { asyncRoutes, notFoundPage } from '@/router/asyncRoutes'

export const AUTH_SUCCESS = 'AUTHENTICATION_SUCCESS'

export const authStore = defineStore('authStore', {
  state: () => {
    return {
      token: '',
      userInfo: getStorageUserInfo(),
      usePermission: false, // 是否开启路由权限控制，true为路由从后端返回并动态生成，false路由直接使用本地路由
      menusPermission: null, // 菜单权限表
      accessedMenu: [], // 根据权限生成的异步路由菜单
      routes: [], // 同步菜单和根据权限生成的异步菜单组成的路由菜单
      validImgId: '' // 登录图片验证码id
    }
  },

  getters: {},

  actions: {
    // user login
    __login(accountInfo) {
      const { account, password, imageCaptcha } = accountInfo
      return new Promise((resolve, reject) => {
        login({ account, password, imageCaptcha }, this.validImgId).then(res => {
          if (!res.data.failed) {
            const token = res.data.token
            this.token = token
            // 存储用户信息
            this.userInfo = {
              userId: res.data.userId,
              username: res.data.username,
              supplierId: res.data.supplierId,
              supplierName: res.data.supplierName,
              shortName: res.data.shortName
            }
            setStorageUserInfo(this.userInfo)

            // this.menusPermission = res.data.data.grantedPermissions
            setStorageToken(token)
            // setStorageMenusPermission(this.menusPermission)
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },

    // fetch image captcha
    __fetchImgCaptcha() {
      return fetchImgCaptcha().then(res => {
        const url = URL.createObjectURL(new Blob([res.data]))
        const token = res.data.token // 验证码获取的token只供登录接口临时鉴权使用
        this.token = token
        this.validImgId = res.headers['content-disposition']
        setStorageToken(token)
        return url
      })
    },

    // user logout
    logout() {
      logout().then(() => {
        const _tagsViewStore = tagsViewStore()
        this.token = ''
        this.userInfo = null
        this.menusPermission = null
        this.accessedMenu = []
        removeStorageToken()
        removeStorageUserInfo()
        removeStorageMenusPermission()

        // reset visited views and cached views
        _tagsViewStore.delAllViews()
        // router.push('/login')
        location.reload() // 刷新清空路由缓存
      })
    },

    // fetch user info
    getUserInfo() {
      return fetchUserInfo().then(res => {
        if (res.success) {
          this.userInfo = res.data
        }
      })
    },

    getMenusPermission() {
      let routes = _.cloneDeep(constantRoutes)
      let accessedMenu = []
      if (this.usePermission) {
        // 开启后端路由权限控制
        accessedMenu = filterMenu(asyncRoutes, this.menusPermission || getStorageMenusPermission()) // 异步路由（根据权限生成）
      } else {
        // 关闭路由权限控制，使用本地路由
        accessedMenu = asyncRoutes
      }

      accessedMenu.push(notFoundPage) // 添加404到路由最后
      _addRoutes(accessedMenu) // 使用vue-router的addRoute方法动态打入异步路由
      this.accessedMenu = accessedMenu
      routes.push(...accessedMenu) // 同步路由和异步路由组成的菜单路由
      this.routes = routes
    }
  }
})

/**
 * 本地异步菜单路由与服务端返回的权限菜单路由的type进行比对，因为数据涉及多层结构，所以本地路由与服务端路由均使用递归调用，深层过滤
 * @param {*} asyncRoutes 本地异步菜单路由
 * @param {*} menusPermission 服务端返回的权限菜单路由
 * @returns 整合后可直接用于页面渲染的路由
 */
function filterMenu(asyncRoutes, menusPermission) {
  if (!menusPermission || !menusPermission.length) return []

  var result = asyncRoutes.filter(item => {
    if (checkPermission(item, menusPermission)) {
      if (item.children && item.children.length) {
        // 一个子节点的路由直接验证通过，大于1个子节点的路由进行递归
        if (item.children.length > 1) {
          var child = filterMenu(item.children, menusPermission) // 子级继续递归
          item.children = child // 将子级重新赋值到父级
        }
      }
      return true
    }
  })
  return result
}

/**
 * 服务端权限菜单路由递归检查过滤方法，本地路由name和服务端permissionCode一一对应
 * @param {*} asyncRoute 遍历后的单层本地异步菜单路由
 * @param {*} menuPermission 服务端返回的权限菜单路由
 * @returns true/false
 */
function checkPermission(asyncRoute, menuPermission) {
  return menuPermission.some(item => {
    if (asyncRoute.name === item.permissionCode) {
      asyncRoute.meta = asyncRoute.meta || {} // 初始化meta
      asyncRoute.meta.buttonCodes = item.buttonCodes // 将页面按钮级别权限赋值与当前菜单，permission字段是服务端返回的页面按钮级别权限数据
      return true
    } else {
      if (item.children && item.children.length) {
        return checkPermission(asyncRoute, item.children) // 子级继续递归
      } else {
        return false
      }
    }
  })
}
