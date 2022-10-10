<template>
  <el-drawer
    v-bind="$attrs"
    custom-class="permissions-manage-drawer"
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
        <el-form-item label="后端接口URI" prop="apiUri">
          <el-input v-model="form.apiUri" placeholder="请输入后端URI" />
        </el-form-item>
        <el-form-item label="HTTP请求" prop="httpMethod">
          <el-select v-model="form.httpMethod" clearable placeholder="请选择HTTP请求">
            <el-option v-for="item in enums.httpMethod" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="父级节点" v-if="drawerType !== 'EDIT'">
          <el-tree-select
            v-model="form.parentId"
            :data="treeDatas"
            clearable
            placeholder="请选择父级"
            default-expand-all
            node-key="permissionId"
            :props="{ label: 'permissionName' }"
            @current-change="parentNodeChange"
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node">
                <span class="label" style="display: inline-block; margin-right: 10px">{{ node.label }}</span>
                <el-tag size="small" v-if="data.permissionType === 'MENU'" style="float: right; padding: 0 2px">
                  菜单
                </el-tag>
                <el-tag type="danger" size="small" v-else style="float: right; padding: 0 2px">按钮</el-tag>
              </div>
            </template>
          </el-tree-select>
          <div
            v-if="currentParentNode.permissionType === 'BUTTON' && form.parentId"
            style="margin-top: 6px; font-size: 12px; line-height: 1; color: #f56c6c"
          >
            按钮权限不允许增加子权限
          </div>
        </el-form-item>
        <el-form-item label="权限代码" prop="permissionCode">
          <el-input
            v-model="form.permissionCode"
            placeholder="请输入权限代码"
            :disabled="currentParentNode.permissionType === 'BUTTON'"
          />
        </el-form-item>
        <el-form-item label="权限名称" prop="permissionName">
          <el-input
            v-model="form.permissionName"
            placeholder="请输入权限名称"
            :disabled="currentParentNode.permissionType === 'BUTTON'"
          />
        </el-form-item>
        <el-form-item label="权限类型" prop="permissionType">
          <el-select
            v-model="form.permissionType"
            clearable
            placeholder="请选择HTTP请求"
            :disabled="currentParentNode.permissionType === 'BUTTON'"
          >
            <el-option v-for="item in enums.permissionType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="前端路由URI">
          <el-input v-model="form.routeUri" placeholder="请输入前端URI" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" placeholder="请输入排序" />
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
import { enums } from '@/utils/globalConfig'

export default {
  name: 'PermissionsManageDrawer',
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
    },
    // 权限树
    treeDatas: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['close', 'refreshTable'],
  setup(props, { emit }) {
    // Drawer表单业务逻辑处理相关逻辑
    const {
      formRef,
      drawerLoading,
      form,
      rules,
      currentParentNode,
      parentNodeChange,
      drawerOpen,
      drawerClose,
      drawerSubmit
    } = drawerEffect(props, emit)

    return {
      enums,
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
}
</script>
<style lang="scss">
@import '@/common/scss/_variable';

.permissions-manage-drawer {
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
