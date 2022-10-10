import { ref, reactive, toRefs } from 'vue'
import { addPermissions, editPermissions } from './api'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

/**
 * Drawer表单业务逻辑处理
 * @param {*} props 父组件props
 * @param {*} emit vue emit
 * @returns
 */
const drawerEffect = (props, emit) => {
  const formRef = ref(null)
  const drawerLoading = ref(false)
  // 表单项
  const form = reactive({
    apiUri: '',
    httpMethod: '',
    parentId: '',
    permissionId: '',
    permissionCode: '',
    permissionName: '',
    permissionType: '',
    remark: '',
    routeUri: '',
    sort: null
  })

  // 表单验证规则
  const rules = {
    permissionCode: [{ required: true, message: '权限代码必填', trigger: 'blur' }],
    permissionName: [{ required: true, message: '权限名称必填', trigger: 'change' }],
    permissionType: [{ required: true, message: '权限类型必选', trigger: 'blur' }]
  }

  // 保存当前选中的父节点，并判断是否为按钮权限，按钮全选不允许增加子节点
  const currentParentNode = ref({})
  const parentNodeChange = val => {
    currentParentNode.value = val
    form.parentId = val.permissionId
    if (currentParentNode.value.permissionType === 'BUTTON') {
      ElMessage.error('按钮权限不允许增加子权限')
    }
  }

  // drawer保存数据
  const drawerSubmit = () => {
    formRef.value.validate(valid => {
      if (valid) {
        drawerLoading.value = true
        const formData = _.clone(form)
        if (props.drawerType === 'ADD') {
          addPermissions(formData).then(res => {
            if (res.success) {
              drawerClose()
              emit('refreshTable')
            }
            drawerLoading.value = false
          })
        }
        if (props.drawerType === 'EDIT') {
          editPermissions(formData).then(res => {
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

    const {
      apiUri,
      httpMethod,
      parentId,
      permissionId,
      permissionCode,
      permissionName,
      permissionType,
      remark,
      routeUri,
      sort
    } = toRefs(props.drawerDetail)
    form.apiUri = apiUri.value
    form.httpMethod = httpMethod.value
    form.parentId = parentId.value
    form.permissionId = permissionId.value
    form.permissionCode = permissionCode.value
    form.permissionName = permissionName.value
    form.permissionType = permissionType.value
    form.remark = remark.value
    form.routeUri = routeUri.value
    form.sort = sort.value
  }

  // 清空表单项
  const resetFormValue = () => {
    form.apiUri = ''
    form.httpMethod = ''
    form.parentId = ''
    form.permissionId = ''
    form.permissionCode = ''
    form.permissionName = ''
    form.permissionType = ''
    form.remark = ''
    form.routeUri = ''
    form.sort = null
  }

  // drawer打开事件
  const drawerOpen = () => {
    if (props.drawerType === 'ADD') {
      resetFormValue()
      form.parentId = props.drawerDetail.permissionId
    }
    if (props.drawerType === 'EDIT' || props.drawerType === 'DETAIL') {
      setFormValue()
    }
  }

  // 关闭drawer事件
  const drawerClose = () => {
    emit('close')
    formRef.value.resetFields()
    currentParentNode.value = {}
  }

  return {
    formRef,
    drawerLoading,
    form,
    rules,
    currentParentNode,
    parentNodeChange,
    drawerOpen,
    drawerClose,
    drawerSubmit
  }
}

export default drawerEffect
