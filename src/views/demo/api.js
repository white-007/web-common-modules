// import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} data 列表筛选条件
 * @returns
 */
export function fetchDemoList(data) {
  console.log(data)
  return new Promise(resolve => {
    const res = {
      code: 200,
      data: {
        success: true,
        number: 0,
        size: 20,
        totalElements: 2,
        totalPages: 1,
        content: [
          {
            id: 0,
            account: 'admin',
            genderTxt: '男',
            mobile: '13438045555',
            realName: '张三',
            status: 1
          },
          {
            id: 1,
            account: 'test',
            genderTxt: '女',
            mobile: '13438022555',
            realName: '李四',
            status: 0
          }
        ]
      }
    }
    // 模拟请求接口
    setTimeout(() => {
      resolve(res)
    }, 200)
  })
}

export function fetchDemoDetail(id) {
  console.log(id)
  return new Promise(resolve => {
    const res = {
      code: 200,
      data: { content: 'demo content' }
    }
    setTimeout(() => {
      resolve(res)
    }, 200)
  })
}
