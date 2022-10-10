import request from '@/utils/request'
import md5 from 'js-md5'

/**
 * 获取系统用户列表
 * @param {*} data 列表筛选条件
 * @returns
 */
export function fetchSysUserList(data) {
  return request({
    url: '/staff/page',
    method: 'POST',
    data
  })
}

/**
 * 获取系统用户详情
 * @param {*} staffId 用户ID
 * @returns
 */
export function fetchSysUserDetail(staffId) {
  return request({
    url: `/staff/${staffId}`,
    method: 'GET'
  })
}

/**
 * 添加用户
 * @param {*} data 用户表单
 * @returns
 */
export function addSysUser(data) {
  data.password = md5(data.password)
  return request({
    url: '/staff',
    method: 'POST',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 编辑用户
 * @param {*} data 用户表单
 * @returns
 */
export function editSysUser(data) {
  data.password ? (data.password = md5(data.password)) : delete data.password
  return request({
    url: '/staff',
    method: 'PUT',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 获取全部部门树形数据
 */
export function fetchDepartments() {
  return request({
    url: '/common/department/tree',
    method: 'GET'
  })
}

/**
 * 获取全部角色信息
 */
export function fetchRoles(staffId) {
  return request({
    url: '/staff/roles',
    method: 'GET',
    params: { staffId }
  })
}
