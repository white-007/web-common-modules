<template>
  <el-dialog v-bind="$attrs" title="修改密码" width="500px" @close="close">
    <el-form :model="form" size="default" :rules="rules" ref="formRef">
      <el-form-item label="原密码" :label-width="100" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" :maxlength="40" show-password placeholder="请输入原密码" />
      </el-form-item>
      <el-form-item label="新密码" :label-width="100" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" :maxlength="40" show-password placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" :label-width="100" prop="confirmNewPassword">
        <el-input
          v-model="form.confirmNewPassword"
          type="password"
          :maxlength="40"
          show-password
          placeholder="请确认密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="submit">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive } from 'vue'
import { changePsw } from '@/common/api/user'
import _ from 'lodash'

export default {
  name: 'ChangePswDialog',
  emits: ['close'],
  setup(props, { emit }) {
    const dialogState = ref(true)
    const form = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    const formRef = ref(null)

    // 确认密码验证方法
    const validateConfirmPsw = (rule, value, callback) => {
      if (value !== form.newPassword) {
        callback(new Error('新旧密码不一致'))
      } else {
        callback()
      }
    }

    const rules = reactive({
      oldPassword: [{ required: true, message: '旧密码必填', trigger: 'blur' }],
      newPassword: [{ required: true, message: '新密码必填', trigger: 'blur' }],
      confirmNewPassword: [
        { required: true, message: '确认新密码必填', trigger: 'blur' },
        { validator: validateConfirmPsw, trigger: 'blur' }
      ]
    })

    const close = () => {
      formRef.value.resetFields()
      emit('close')
    }

    const submit = () => {
      formRef.value.validate(valid => {
        if (valid) {
          const formData = _.clone(form)
          delete formData.confirmNewPassword
          changePsw(formData).then(res => {
            if (!res.data.failed) {
              close()
            }
          })
        }
      })
    }

    const cancle = () => {
      emit('close')
    }

    return {
      dialogState,
      form,
      formRef,
      rules,
      close,
      submit,
      cancle
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
</style>
