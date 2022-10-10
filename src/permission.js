import router from '@/router'
import { authStore } from '@/stores/auth'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getStorageToken } from '@/utils/storage/auth'
import { ElMessage } from 'element-plus'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  const _authStore = authStore()
  const token = _authStore.token || getStorageToken()
  const whiteList = ['/login'] // 路由白名单
  const accessedMenu = authStore().accessedMenu

  // const menuPermission = authStore().menuPermission || getStorageMenusPermission()
  // const routes = router.getRoutes()
  // console.log('menuPermission: ', menuPermission)
  // console.log('accessedMenu: ', accessedMenu)
  // console.log('routes: ', routes)

  // NProgress.start()
  if (token) {
    if (accessedMenu && accessedMenu.length) {
      //   to.meta.title ? (document.title = to.meta.title) : false
      next()
    } else {
      authStore().getMenusPermission()
      next({ ...to, replace: true }) // replace设置为true不会留历史记录
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      ElMessage.error('请先登录！')
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
