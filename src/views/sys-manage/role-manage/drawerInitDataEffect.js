/**
 * 初始化drawer表单枚举数据
 */
import { ref } from 'vue'
import { fetchPermissionsTree } from './api'

const drawerInitDataEffect = props => {
  const drawerLoading = ref(false)
  // 获取权限数据
  const permissionDatas = ref([])
  const fetchPermissionsDatas = () => {
    if (permissionDatas.value.length) return
    return fetchPermissionsTree().then(res => {
      if (res.success) {
        permissionDatas.value = res.data
        // console.log(permissionDatas, 'permissionsDatas')
      }
    })
  }
  // 获取角色数据
  const selectedPermissionData = ref([])
  const selectedPermissions = () => {
    selectedPermissionData.value = []
    // console.log(selectedPermissionData.value, 'drawerDetail2')
    if (props.drawerDetail) recurveTree(props?.drawerDetail?.permissions || [], selectedPermissionData.value)
  }

  // 递归数据
  const recurveTree = (list, arr) => {
    let checked = true
    list.forEach(item => {
      if (item.children?.length) {
        // if (!item.granted) arr1.push(1)
        let isChecked = recurveTree(item.children, arr)
        if (isChecked) arr.push(item.permissionId)
      } else item.granted ? arr.push(item.permissionId) : (checked = false)
    })
    return checked
  }

  return { drawerLoading, permissionDatas, fetchPermissionsDatas, selectedPermissions, selectedPermissionData }
}

export default drawerInitDataEffect
