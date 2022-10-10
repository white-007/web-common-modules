<template>
  <el-drawer
    v-bind="$attrs"
    custom-class="user-manage-drawer"
    direction="rtl"
    :size="1200"
    @open="drawerOpen"
    @close="drawerClose"
  >
    <template #header>
      <h4 class="title">{{ drawerTypeText }}</h4>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        :model="form"
        label-width="120px"
        v-loading="drawerLoading"
        :disabled="drawerType === 'DETAIL'"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="{ required: drawerType === 'ADD', message: '密码必填', trigger: 'blur' }"
        >
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
            autocomplete="new-password"
          />
        </el-form-item>
        <el-form-item label="部门">
          <el-tree-select
            v-model="form.departmentId"
            :data="departmentDatas"
            placeholder="请选择部门"
            :props="departmentsProps"
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option v-for="item in enums.genderEnum" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号">
          <el-input v-model="form.staffNo" placeholder="请输入员工编号" />
        </el-form-item>
        <el-form-item label="账号状态" prop="staffState">
          <el-switch
            v-model="form.staffState"
            :width="60"
            inline-prompt
            :active-text="enums.staffState[0].label"
            :inactive-text="enums.staffState[1].label"
          />
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.roleIds">
            <el-checkbox v-for="role in roleDatas" :key="role.roleId" :label="role.roleId">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer v-if="drawerType !== 'DETAIL'">
      <div style="flex: auto">
        <el-button @click="drawerClose">取消</el-button>
        <el-button type="primary" @click="drawerSubmit">{{ drawerType === 'ADD' ? '创建' : '保存' }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import { enums } from '@/utils/globalConfig'
import drawerInitDataEffect from './drawerInitDataEffect'
import drawerEffect from './drawerEffect'

const departmentsProps = {
  label: 'departmentName',
  value: 'departmentId'
}

export default {
  name: 'UserManageDrawer',
  props: {
    // drawer类型
    drawerType: {
      type: String,
      default: 'ADD'
    },
    // drawer名称
    drawerTypeText: {
      type: String,
      default: '新建员工'
    },
    // drawer详情
    drawerDetail: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'refreshTable'],
  setup(props, { emit }) {
    // 初始化Drawer表单枚举、下拉框等数据相关逻辑
    const { departmentDatas, roleDatas, selectedRoles, fetchDepartmentDatas, fetchRoleDatas } =
      drawerInitDataEffect(props)

    // Drawer表单业务逻辑处理相关逻辑
    const { formRef, drawerLoading, form, rules, drawerOpen, drawerClose, drawerSubmit } = drawerEffect(
      props,
      emit,
      selectedRoles,
      fetchDepartmentDatas,
      fetchRoleDatas
    )

    return {
      drawerLoading,
      enums,
      form,
      rules,
      departmentDatas,
      departmentsProps,
      roleDatas,
      formRef,
      drawerOpen,
      drawerClose,
      drawerSubmit
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/_variable';

.user-manage-drawer {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 46%;
      margin-right: 2%;
      margin-bottom: 2rem;
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
