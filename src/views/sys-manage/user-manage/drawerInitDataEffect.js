/**
 * 初始化drawer表单枚举数据
 */
import { ref } from 'vue'
import { fetchDepartments, fetchRoles } from './api'

const drawerInitDataEffect = props => {
  // 获取部门数据
  const departmentDatas = ref([])
  const fetchDepartmentDatas = () => {
    if (departmentDatas.value.length) return
    return fetchDepartments().then(res => {
      if (res.success) {
        departmentDatas.value = res.data
      }
    })
  }

  // 获取角色数据
  const roleDatas = ref([])
  const selectedRoles = ref([])
  const fetchRoleDatas = () => {
    const staffId = props?.drawerDetail?.staffId ? props.drawerDetail.staffId : null
    return fetchRoles(staffId).then(res => {
      if (res.success) {
        roleDatas.value = res.data
        // 过滤选中的角色
        roleDatas.value.forEach(item => {
          if (item.granted) {
            selectedRoles.value.push(item.roleId)
          }
        })
      }
    })
  }

  return { departmentDatas, roleDatas, selectedRoles, fetchDepartmentDatas, fetchRoleDatas }
}

export default drawerInitDataEffect
