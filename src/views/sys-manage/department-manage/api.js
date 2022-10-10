import request from '@/utils/request'

/**
 * 获取部门tree数据
 */
export function fetchDepartmentsTree() {
  return request({
    url: '/department/tree',
    method: 'GET'
  })
}

/**
 * 添加部门
 * @param {*} data http://182.43.236.6:18080/swagger-ui.html#/%E9%83%A8%E9%97%A8%E7%AE%A1%E7%90%86/saveDepartmentUsingPOST
 * @returns
 */
export function addDepartment(data) {
  return request({
    url: '/department',
    method: 'POST',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 修改部门
 * @param {*} data http://182.43.236.6:18080/swagger-ui.html#/%E9%83%A8%E9%97%A8%E7%AE%A1%E7%90%86/updateDepartmentUsingPUT
 * @returns
 */
export function editDepartment(data) {
  return request({
    url: '/department',
    method: 'PUT',
    data,
    custom: {
      showInfo: true
    }
  })
}

/**
 * 删除部门
 * @param {*} departmentId 部门id
 * @returns
 */
export function deleteDepartment(departmentId) {
  return request({
    url: `/department/${departmentId}`,
    method: 'DELETE',
    custom: {
      showInfo: true
    }
  })
}

/**
 * 获取当前节点的所有父节点
 * @param {*} departmentId 部门id
 * @returns
 */
export function fetchParentDepartmentsTree(departmentId) {
  return request({
    url: `/department/tree/${departmentId}`,
    method: 'GET'
  })
}

/**
 * 同级部门上移
 * @param {*} departmentId 部门id
 * @returns
 */
export function moveUpDepartment(departmentId) {
  return request({
    url: `/department/move-up/${departmentId}`,
    method: 'PUT',
    custom: {
      showInfo: true
    }
  })
}

/**
 * 同级部门下移
 * @param {*} departmentId 部门id
 * @returns
 */
export function moveDownDepartment(departmentId) {
  return request({
    url: `/department/move-down/${departmentId}`,
    method: 'PUT',
    custom: {
      showInfo: true
    }
  })
}
