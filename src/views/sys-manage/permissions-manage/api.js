import request from '@/utils/request'

/**
 * 获取系统用户列表
 */
export function fetchPermissionsTree() {
  return request({
    url: '/permission/tree',
    method: 'GET'
  })
}

/**
 * 新增权限
 * @param {*} data http://182.43.236.6:18080/swagger-ui.html#/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86/savePermissionUsingPOST
 * @returns
 */
export function addPermissions(data) {
  return request({
    url: '/permission',
    method: 'POST',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 修改权限
 * @param {*} data http://182.43.236.6:18080/swagger-ui.html#/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86/updatePermissionUsingPUT
 * @returns
 */
export function editPermissions(data) {
  return request({
    url: '/permission',
    method: 'PUT',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 删除权限
 * @param {*} data http://182.43.236.6:18080/swagger-ui.html#/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86/updatePermissionUsingPUT
 * @returns
 */
export function deletePermissions(permissionId) {
  return request({
    url: `/permission/${permissionId}`,
    method: 'DELETE',
    custom: {
      showInfo: true
    }
  })
}
