import { ref, reactive, toRefs } from 'vue'
import { addSysUser, editSysUser } from './api'
import { statusTypeConversion } from '@/utils/tools'
import _ from 'lodash'

/**
 * Drawer表单业务逻辑处理
 * @param {*} props 父组件props
 * @param {*} emit vue emit
 * @param {Array} selectedRoles 当前用户所属的角色
 * @param {function} fetchDepartmentDatas 获取部门数据方法
 * @param {function} fetchRoleDatas 获取角色数据方法
 * @returns
 */
const drawerEffect = (props, emit, selectedRoles, fetchDepartmentDatas, fetchRoleDatas) => {
  const formRef = ref(null)
  const drawerLoading = ref(false)
  // 表单项
  const form = reactive({
    staffId: null,
    account: '',
    password: '',
    departmentId: null,
    realName: '',
    mobile: '',
    gender: 'MALE',
    staffNo: null,
    staffState: true,
    roleIds: []
  })

  // 表单验证规则
  const rules = {
    account: [{ required: true, message: '账号必填', trigger: 'blur' }],
    gender: [{ required: true, message: '性别账号必选', trigger: 'change' }],
    mobile: [{ required: true, message: '手机号必填', trigger: 'blur' }],
    realName: [{ required: true, message: '真实姓名必填', trigger: 'blur' }],
    staffState: [{ required: true, message: '账号状态必填', trigger: 'blur' }]
  }

  // drawer保存数据
  const drawerSubmit = () => {
    formRef.value.validate(valid => {
      if (valid) {
        drawerLoading.value = true
        const formData = _.clone(form)
        formData.staffState = statusTypeConversion(formData.staffState)
        if (props.drawerType === 'ADD') {
          addSysUser(formData).then(res => {
            if (res.success) {
              drawerClose()
              emit('refreshTable')
            }
            drawerLoading.value = false
          })
        }
        if (props.drawerType === 'EDIT') {
          editSysUser(formData).then(res => {
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

    const { staffId, account, departmentId, realName, mobile, gender, staffState, staffNo } = toRefs(props.drawerDetail)
    form.staffId = staffId.value
    form.account = account.value
    form.departmentId = departmentId.value
    form.realName = realName.value
    form.mobile = mobile.value
    form.gender = gender.value
    form.staffNo = staffNo.value
    form.staffState = statusTypeConversion(staffState.value)
    form.roleIds = selectedRoles
  }

  // 清空表单项
  const resetFormValue = () => {
    form.staffId = null
    form.account = ''
    form.password = ''
    form.departmentId = null
    form.realName = ''
    form.mobile = ''
    form.gender = 'MALE'
    form.staffNo = null
    form.staffState = true
    form.roleIds = []
  }

  // drawer打开事件
  const drawerOpen = () => {
    drawerLoading.value = true
    if (props.drawerType === 'ADD') {
      resetFormValue()
    }
    if (props.drawerType === 'EDIT' || props.drawerType === 'DETAIL') {
      setFormValue()
    }
    // 打开drawer时请求表单枚举数据
    Promise.all([fetchDepartmentDatas(), fetchRoleDatas()]).then(() => {
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
