<template>
  <el-drawer
    v-bind="$attrs"
    custom-class="role-manage-drawer"
    direction="rtl"
    :size="1200"
    @open="drawerOpen"
    @close="drawerClose"
    :close-on-click-modal="drawerType === 'DETAIL'"
    :close-on-press-escape="drawerType === 'DETAIL'"
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" :placeholder="drawerType === 'DETAIL' ? '暂无名称' : '请输入名称'" />
        </el-form-item>
        <el-form-item label="角色权限" prop="permissionIds">
          <el-tree-select
            ref="permissionTree"
            node-key="permissionId"
            :placeholder="drawerType === 'DETAIL' ? '暂无权限' : '请选择权限'"
            v-model="form.permissionIds"
            :data="permissionDatas"
            :props="permissionProps"
            show-checkbox
            multiple
          />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="form.roleDescription"
            type="textarea"
            :autosize="{ minRows: 2 }"
            :placeholder="drawerType === 'DETAIL' ? '暂无描述' : '请输入描述'"
          />
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
import { ref } from 'vue'
import { enums } from '@/utils/globalConfig'
import drawerInitDataEffect from './drawerInitDataEffect'
import drawerEffect from './drawerEffect'

const permissionProps = {
  label: 'permissionName',
  value: 'permissionId'
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
      default: '新建角色'
    },
    // drawer详情
    drawerDetail: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'refreshTable'],
  setup(props, { emit }) {
    const permissionTree = ref(null)
    // 初始化Drawer表单枚举、下拉框等数据相关逻辑
    const { permissionDatas, fetchPermissionsDatas, selectedPermissions, selectedPermissionData } =
      drawerInitDataEffect(props)

    // Drawer表单业务逻辑处理相关逻辑
    const { formRef, drawerLoading, form, rules, drawerOpen, drawerClose, drawerSubmit } = drawerEffect(
      props,
      emit,
      selectedPermissionData,
      selectedPermissions,
      fetchPermissionsDatas,
      permissionTree
    )

    return {
      drawerLoading,
      permissionTree,
      enums,
      form,
      rules,
      permissionDatas,
      permissionProps,
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

.role-manage-drawer {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
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
