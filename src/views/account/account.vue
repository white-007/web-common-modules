<template>
  <div class="account">
    <ListHeader :hasBtn="false">
      <!-- <el-button type="primary" :icon="isEdit ? 'UploadFilled' : 'Edit'" @click="editAccount" :loading="loading">
        {{ isEdit ? '保存' : '修改' }}
      </el-button> -->
    </ListHeader>
    <el-form v-if="userInfo" ref="formRef" :model="form" label-width="120px" v-loading="loading" :rules="rules">
      <el-form-item label="账号：" prop="account">
        <el-input v-if="isEdit" v-model="form.account" placeholder="请输入账号" />
        <p v-else>{{ userInfo.username }}</p>
      </el-form-item>
      <el-form-item label="公司名：">
        <p>{{ userInfo.supplierName }}</p>
      </el-form-item>
      <!-- <el-form-item v-if="isEdit" class="btn-group">
        <el-button size="default" type="primary" @click="saveUserInfo">保存</el-button>
        <el-button size="default" @click="isEdit = false">取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import ListHeader from '@/components/ListHeader/ListHeader'
import { storeToRefs } from 'pinia'
import { authStore } from '@/stores/auth'
import { editUserInfo } from '@/common/api/user'

export default {
  name: 'Account',
  components: { ListHeader },
  setup() {
    const _authStore = authStore()
    const { userInfo } = storeToRefs(_authStore)
    const isEdit = ref(false)
    const loading = ref(false)
    const form = reactive({
      account: '',
      mobile: ''
    })
    const formRef = ref(null)
    const rules = {
      account: [{ required: true, message: '账号必填', trigger: 'blur' }],
      mobile: [{ required: true, message: '手机号必填', trigger: 'blur' }]
    }

    const editAccount = () => {
      isEdit.value = !isEdit.value
      form.account = userInfo.value.account
      form.mobile = userInfo.value.mobile
    }

    const saveUserInfo = () => {
      formRef.value.validate(valid => {
        if (valid) {
          loading.value = true
          editUserInfo(form).then(res => {
            if (res.success) {
              _authStore.getUserInfo().then(() => {
                isEdit.value = false
              })
            }
            loading.value = false
          })
        }
      })
    }

    return { userInfo, isEdit, loading, form, formRef, rules, editAccount, saveUserInfo }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.account {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
  .el-form {
    width: 50%;
    margin-top: 2.4rem;
    &-item {
      margin-bottom: 1rem;
      p {
        margin: 0;
      }
      .el-tag {
        margin-right: 0.4rem;
      }
    }
    .btn-group {
      margin-top: 2.4rem;
    }
  }
}
</style>
