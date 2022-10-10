import { ref, reactive, toRefs } from 'vue'
import { addDepartment, editDepartment, fetchParentDepartmentsTree } from './api'
import _ from 'lodash'

/**
 * Drawer表单业务逻辑处理
 * @param {*} props 父组件props
 * @param {*} emit vue emit
 * @returns
 */
const drawerEffect = (props, emit) => {
  const formRef = ref(null)
  const drawerLoading = ref(false)
  const parentTreeDatas = ref([])
  // 表单项
  const form = reactive({
    departmentId: null,
    departmentName: null,
    departmentNo: null,
    parentId: null
  })

  // 表单验证规则
  const rules = {
    departmentName: [{ required: true, message: '部门名称必填', trigger: 'blur' }]
  }

  const fetchParentTree = departmentId => {
    drawerLoading.value = true
    fetchParentDepartmentsTree(departmentId).then(res => {
      if (res.success) {
        parentTreeDatas.value = res.data
        drawerLoading.value = false
      }
    })
  }

  // drawer保存数据
  const drawerSubmit = () => {
    formRef.value.validate(valid => {
      if (valid) {
        drawerLoading.value = true
        const formData = _.clone(form)
        if (props.drawerType === 'ADD') {
          addDepartment(formData).then(res => {
            if (res.success) {
              drawerClose()
              emit('refreshTable')
            }
            drawerLoading.value = false
          })
        }
        if (props.drawerType === 'EDIT') {
          editDepartment(formData).then(res => {
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

    const { departmentId, departmentName, departmentNo, parentId } = toRefs(props.drawerDetail)
    form.departmentId = departmentId.value
    form.departmentName = departmentName.value
    form.departmentNo = departmentNo.value
    form.parentId = parentId.value
  }

  // 清空表单项
  const resetFormValue = () => {
    form.departmentId = null
    form.departmentName = null
    form.departmentNo = null
    form.parentId = null
  }

  // drawer打开事件
  const drawerOpen = () => {
    if (props.drawerType === 'ADD') {
      fetchParentTree(0)
      resetFormValue()
      form.parentId = props.drawerDetail.departmentId
    }
    if (props.drawerType === 'EDIT' || props.drawerType === 'DETAIL') {
      // 获取下拉框数据
      const id = props.drawerDetail.departmentId ? props.drawerDetail.departmentId : 0
      fetchParentTree(id)
      setFormValue()
    }
  }

  // 关闭drawer事件
  const drawerClose = () => {
    emit('close')
    formRef.value.resetFields()
  }

  return { formRef, drawerLoading, parentTreeDatas, form, rules, drawerOpen, drawerClose, drawerSubmit }
}

export default drawerEffect
