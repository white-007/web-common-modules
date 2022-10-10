export const globalPaginationConfig = {
  pageSize: 20, // 初始默认20条/页
  pageSizes: [10, 20, 30, 50],
  currentPage: 1
}

// 初始默认请求参数
export const globalPageConfig = {
  page: 1,
  size: 20
}

export const enums = {
  // 性别枚举
  genderEnum: [
    { label: '男', value: 'MALE' },
    { label: '女', value: 'FEMALE' }
  ],

  // 员工状态
  staffState: [
    { label: '启用', value: 'ENABLED' },
    { label: '禁用', value: 'DISABLED' }
  ],

  // 权限http请求方式
  httpMethod: [
    { label: 'GET', value: 'GET' },
    { label: 'HEAD', value: 'HEAD' },
    { label: 'POST', value: 'POST' },
    { label: 'PATCH', value: 'PATCH' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'OPTIONS', value: 'OPTIONS' },
    { label: 'TRACE', value: 'TRACE' }
  ],

  // 权限类型
  permissionType: [
    { label: '菜单', value: 'MENU' },
    { label: '按钮', value: 'BUTTON' }
  ],

  // 档案归档
  archivList: [
    {
      label: '已归档',
      value: 'true'
    },
    {
      label: '未归档',
      value: 'false'
    }
  ],

  // 档案类型
  docTypeList: [
    {
      label: '电子档',
      value: 'ELECTRONIC'
    },
    {
      label: '纸质档',
      value: 'PAPER'
    },
    {
      label: '未知',
      value: 'UNKNOWN'
    }
  ],

  // 档案状态
  docStatusList: [
    {
      label: '已登记',
      value: 'REGISTERED'
    },
    {
      label: '已借调',
      value: 'LENDING'
    },
    {
      label: '已销毁',
      value: 'DESTROYED'
    }
  ],

  // 档案密级
  levelList: [
    {
      label: '公开',
      value: 'PUBLIC'
    },
    {
      label: '受控',
      value: 'CONTROLLED'
    },
    {
      label: '内部',
      value: 'INTERNAL'
    },
    {
      label: '秘密',
      value: 'SECRET'
    },
    {
      label: '机密',
      value: 'CONFIDENTIAL'
    },
    {
      label: '绝密',
      value: 'TOP_SECRET'
    }
  ],

  // 时间快捷栏
  shortcuts: [
    {
      text: '今天',
      value: new Date()
    },
    {
      text: '明天',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24)
        return date
      }
    },
    {
      text: '下周',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
        return date
      }
    },
    {
      text: '下月',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
        return date
      }
    },
    {
      text: '明年',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
        return date
      }
    },
    {
      text: '长期',
      value: '2099-12-31'
    }
  ],

  // 人员
  userTypeList: [
    {
      label: '内部人员',
      value: 'INNER'
    },
    {
      label: '外部人员',
      value: 'OUTER'
    }
  ],

  // 人员
  useStateList: [
    {
      label: '借阅中',
      value: 'USING'
    },
    {
      label: '已归还',
      value: 'RETURNED'
    },
    {
      label: '已取消',
      value: 'CANCELED'
    }
  ]
}
