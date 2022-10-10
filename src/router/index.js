import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './constantRoutes'

/**
 * 只列出自定义字段的说明，其余字段请参考vue-router
 * name唯一，不可重复，否则动态路由无法匹配
 *
 * @param {Boolean} meta.hidden         菜单是否显示/隐藏，因为菜单是直接使用路由进行渲染，一些页面如：登录、404不用显示在菜单里，所以可以使用该属性隐藏这些页面
 * @param {String}  meta.title          菜单名称，在页面显示的名字
 * @param {String}  meta.icon           菜单前面的图标，目前支持ant-design-vue和iconfont两种图标，填入图标名字可自动生成
 * @param {String}  meta.link           用于设置外链地址，如：link: https://www.baidu.com，设置了link后path属性不生效
 * @param {Boolean} meta.keepAlive      是否缓存页面组件
 * @param {Boolean} meta.auth           是否需要登录授权
 * @param {Boolean} meta.affix          此路由是否在页面初始渲染便显示tagView，且不可关闭
 * @param {Boolean} meta.showTagView    是否显示此路由的tagView（在meta.hidden为true时设置该值为true可以显示此菜单的tagView）
 */

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// 添加多个路由
export function _addRoutes(accessRoutes) {
  accessRoutes.forEach(route => {
    router.addRoute(route)
  })
}

export default router
