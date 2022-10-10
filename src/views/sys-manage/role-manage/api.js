import request from '@/utils/request'

/**
 * 获取系统角色列表
 */
export function fetchSysRoleList() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

/**
 * 获取系统角色详情
 * @param {*} roleId 角色ID
 * @returns
 */
export function fetchSysRoleDetail(roleId) {
  return request({
    url: `/role/${roleId}`,
    method: 'GET'
  })
}

/**
 * 获取全部部门树形数据
 */
export function fetchDepartments() {
  return request({
    url: 'department/tree',
    method: 'GET'
  })
}

/**
 * 新增角色
 * @param {*} data 
 * {
  "permissionIds": [
    0
  ],
  "roleDescription": "string",
  "roleName": "string"
}
 * @returns
 */
export function addRole(data) {
  return request({
    url: '/role',
    method: 'POST',
    data
  })
}

/**
 * 编辑角色
 * @param {*} data 
 * {
  "permissionIds": [
    0
  ],
  "roleDescription": "string",
  "roleId": 0,
  "roleName": "string"
}
 * @returns
 */
export function editRole(data) {
  return request({
    url: '/role',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 * @param {*} roleId 角色ID
 * @returns
 */
export function delRole(roleId) {
  return request({
    url: `/role/${roleId}`,
    method: 'DELETE'
  })
}

/**
 * 权限列表
 */
export function fetchPermissionsTree() {
  return request({
    url: '/permission/tree',
    method: 'GET'
  })
}
