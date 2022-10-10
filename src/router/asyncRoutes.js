const Layout = () => import('@/components/Layout')

/**
 * 动态路由，需要与后台登录返回的grantedPermissions权限匹配后才可访问
 * 只列出自定义字段的说明，其余字段请参考vue-router
 * name唯一，不可重复，否则动态路由无法匹配`
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
export const asyncRoutes = [
  {
    name: 'Home',
    path: '/home',
    component: Layout,
    children: [
      {
        name: 'HomeIndex',
        path: 'index',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
        meta: {
          title: '首页',
          icon: 'House',
          affix: true
        }
      }
    ]
  },
  {
    name: 'ManageCenter',
    path: '/manage-center',
    component: Layout,
    meta: {
      title: '管理中心',
      icon: 'OfficeBuilding'
    },
    children: [
      {
        name: 'CustomerManage',
        path: 'customer-manage',
        component: () => import(/* webpackChunkName: "customer-manage" */ '@/views/customer-manage'),
        meta: {
          title: '客户管理'
        }
      },
      {
        name: 'PersonManage',
        path: 'person-manage',
        component: () => import(/* webpackChunkName: "person-manage" */ '@/views/person-manage'),
        meta: {
          title: '人员管理'
        }
      }
    ]
  },
  {
    name: 'DataCenter',
    path: '/data-center',
    component: Layout,
    meta: {
      title: '数据中心',
      icon: 'DataLine'
    },
    children: [
      {
        name: 'bdReport',
        path: 'bd-report',
        component: () => import(/* webpackChunkName: "bd-report" */ '@/views/bd-report'),
        meta: {
          title: '业务员报表'
        }
      },
      {
        name: 'OrderList',
        path: 'order-list',
        component: () => import(/* webpackChunkName: "order-list" */ '@/views/order-list'),
        meta: {
          title: '订单列表'
        }
      }
    ]
  },

  {
    path: '/sys',
    name: 'SysManage',
    component: Layout,
    meta: {
      hidden: true,
      title: '系统管理',
      icon: 'Setting'
    },
    children: [
      {
        path: 'user-manage',
        name: 'UserManage',
        component: () => import(/* webpackChunkName: "user-manage" */ '@/views/sys-manage/user-manage'),
        meta: {
          title: '人员管理'
        }
      },
      {
        path: 'role-manage',
        name: 'RoleManage',
        component: () => import(/* webpackChunkName: "role-manage" */ '@/views/sys-manage/role-manage'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'permissions-manage',
        name: 'PermissionsManage',
        component: () => import(/* webpackChunkName: "permissions-manage" */ '@/views/sys-manage/permissions-manage'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'department-manage',
        name: 'DepartmentManage',
        component: () => import(/* webpackChunkName: "department-manage" */ '@/views/sys-manage/department-manage'),
        meta: {
          title: '部门管理'
        }
      }
    ]
  },
  {
    name: 'Account',
    path: '/account',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        name: 'AccountIndex',
        path: 'index',
        component: () => import(/* webpackChunkName: "home" */ '@/views/account/account'),
        meta: {
          title: '我的账号',
          showTagView: true
        }
      }
    ]
  }
]

// 404页面单独提出，在动态路由加载后再加入，防止页面初始加载404
export const notFoundPage = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
  meta: {
    hidden: true
  }
}
