<template>
  <el-drawer
    v-bind="$attrs"
    custom-class="department-manage-drawer"
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
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="form.departmentName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="form.departmentNo" placeholder="请输入部门编号" />
        </el-form-item>
        <el-form-item label="父级节点">
          <el-tree-select
            v-model="form.parentId"
            :data="parentTreeDatas"
            clearable
            placeholder="请选择父级"
            default-expand-all
            node-key="departmentId"
            :props="{ label: 'departmentName' }"
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
import drawerEffect from './drawerEffect'

export default {
  name: 'DepartmentManageDrawer',
  props: {
    // drawer类型
    drawerType: {
      type: String,
      default: 'ADD'
    },
    // drawer名称
    drawerTypeText: {
      type: String,
      default: '新建权限'
    },
    // drawer详情
    drawerDetail: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'refreshTable'],
  setup(props, { emit }) {
    const { formRef, drawerLoading, parentTreeDatas, form, rules, drawerOpen, drawerClose, drawerSubmit } =
      drawerEffect(props, emit)

    return { formRef, drawerLoading, parentTreeDatas, form, rules, drawerOpen, drawerClose, drawerSubmit }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.department-manage-drawer {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 46%;
      margin-right: 2%;
      margin-bottom: 2rem;
      .el-select,
      .el-input-number {
        width: 100%;
      }
    }
  }
}
</style>
