import { ref, reactive, toRefs } from 'vue'
import { addRole, editRole } from './api'
// import { statusTypeConversion } from '@/utils/tools'
import _ from 'lodash'

/**
 * Drawer表单业务逻辑处理
 * @param {*} props 父组件props
 * @param {*} emit vue emit
 * @param {Array} selectedPermissionData 当前用户所属的角色
 * @param {function} selectedPermissions 获取部门数据方法
 * @param {function} fetchPermissionsDatas 获取部门数据方法
 * @returns
 */
const drawerEffect = (
  props,
  emit,
  selectedPermissionData,
  selectedPermissions,
  fetchPermissionsDatas,
  permissionTree
) => {
  const formRef = ref(null)
  const drawerLoading = ref(false)
  // 表单项
  const form = reactive({
    roleId: null,
    roleName: null,
    roleDescription: null,
    permissionIds: []
  })

  // 表单验证规则
  const rules = {
    roleName: [{ required: true, message: '角色名称必填', trigger: 'blur' }],
    permissionIds: [{ required: true, message: '角色权限必选', trigger: 'change' }]
  }

  // drawer保存数据
  const drawerSubmit = () => {
    formRef.value.validate(valid => {
      if (valid) {
        drawerLoading.value = true
        const formData = _.clone(form)
        formData.permissionIds = permissionTree.value.getCheckedKeys()
        permissionTree.value.getHalfCheckedKeys().forEach(element => {
          formData.permissionIds.push(element)
        })
        // console.log(permissionTree.value.getCheckedKeys())
        // formData.staffState = statusTypeConversion(formData.staffState)
        if (props.drawerType === 'ADD') {
          addRole(formData).then(res => {
            if (res.success) {
              drawerClose()
              emit('refreshTable')
            }
            drawerLoading.value = false
          })
        }
        if (props.drawerType === 'EDIT') {
          editRole(formData).then(res => {
            if (res.success) {
              drawerClose()
              emit('refreshTable')
            }
            drawerLoading.value = false
          })
        }
      }
    })
  }

  // 详情填充表单项
  const setFormValue = () => {
    if (!props.drawerDetail) return
    const { roleId, roleName, roleDescription /* permissions */ } = toRefs(props.drawerDetail)
    form.roleId = roleId.value
    form.roleName = roleName.value
    form.roleDescription = roleDescription.value
    form.permissionIds = selectedPermissionData || []
    // form.permissionIds = permissions || []
    // console.log(form.permissionIds, 'selectedPermissionData')
  }

  // 清空表单项
  const resetFormValue = () => {
    form.roleId = null
    form.roleName = null
    form.roleDescription = null
    form.permissionIds = []
  }

  // drawer打开事件
  const drawerOpen = () => {
    // drawerLoading.value = true
    if (props.drawerType === 'ADD') {
      resetFormValue()
    }
    if (props.drawerType === 'EDIT' || props.drawerType === 'DETAIL') {
      setFormValue()
    }
    // // 打开drawer时请求表单枚举数据
    Promise.all([fetchPermissionsDatas(), selectedPermissions()]).then(() => {
      drawerLoading.value = false
    })
  }

  // 关闭drawer事件
  const drawerClose = () => {
    emit('close')
    formRef.value.resetFields()
  }

  return { formRef, drawerLoading, form, rules, drawerOpen, drawerClose, drawerSubmit }
}

export default drawerEffect
