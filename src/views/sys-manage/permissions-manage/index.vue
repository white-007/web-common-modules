<template>
  <div class="permissions-manage">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus" @click="addHandle">新增权限</el-button>
    </ListHeader>
    <div class="tree-wrapper">
      <el-tree
        v-loading="loading"
        :data="treeDatas"
        node-key="permissionId"
        default-expand-all
        :props="{ label: 'permissionName' }"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span class="label">{{ node.label }}</span>
            <span class="actions">
              <a class="link" @click.stop="viewTreeNode(data)">详情</a>
              <a class="link" @click.stop="addTreeNode(data)">新增</a>
              <a class="link" @click.stop="eidtTreeNode(data)">修改</a>
              <a class="link" @click.stop="removeTreeNode(data)">删除</a>
            </span>
          </div>
        </template>
      </el-tree>
    </div>
    <PermissionsManageDrawer
      v-model="drawerState"
      :drawerType="drawerType"
      :drawerTypeText="drawerTypeText"
      :drawerDetail="drawerDetail"
      :treeDatas="treeDatas"
      @close="close"
      @refreshTable="fetchTree"
    />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import ListHeader from '@/components/ListHeader/ListHeader'
import PermissionsManageDrawer from './PermissionsManageDrawer.vue'
import { fetchPermissionsTree, deletePermissions } from './api'
import { drawerInitEffect } from '@/effect/tableListEffect'

export default {
  name: 'PermissionsManage',
  components: { ListHeader, PermissionsManageDrawer },
  setup() {
    const { proxy } = getCurrentInstance()
    const treeDatas = ref([])
    const loading = ref(false)
    const drawerDetail = ref({})
    const { drawerState, drawerType, drawerTypeText, addHandle, editHandle, detailHandle, drawerClose } =
      drawerInitEffect(null, '', loading, '权限') // Drawer相关逻辑

    // 获取tree数据
    const fetchTree = () => {
      loading.value = true
      fetchPermissionsTree().then(res => {
        if (res.success) {
          treeDatas.value = res.data
          loading.value = false
        }
      })
    }

    // 节点详情
    const viewTreeNode = data => {
      drawerDetail.value = data
      detailHandle()
    }

    // 从节点新增子节点
    const addTreeNode = data => {
      drawerDetail.value.permissionId = data.permissionId
      addHandle()
    }

    // 编辑节点
    const eidtTreeNode = data => {
      drawerDetail.value = data
      editHandle()
    }

    // 删除节点
    const removeTreeNode = data => {
      proxy
        .$msgbox({
          title: '删除',
          message: `是否删除权限：${data.permissionName}`,
          showCancelButton: true,
          confirmButtonClass: 'el-button--danger',
          confirmButtonText: '删除'
        })
        .then(() => {
          loading.value = true
          deletePermissions(data.permissionId).then(res => {
            if (res.success) {
              fetchTree()
            }
            loading.value = false
          })
        })
    }

    // 关闭drawer处理
    const close = () => {
      drawerDetail.value = {}
      drawerClose()
    }

    // 请求tree数据
    fetchTree()

    return {
      loading,
      treeDatas,
      drawerState,
      drawerDetail,
      drawerType,
      drawerTypeText,
      fetchTree,
      viewTreeNode,
      addTreeNode,
      eidtTreeNode,
      removeTreeNode,
      addHandle,
      close
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.permissions-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;

  .tree-wrapper {
    flex: 1;
    min-height: 1px;
    padding: 2.4rem 2.4rem 2.4rem 1rem;
    overflow: auto;
    .el-tree {
      ::v-deep() .el-tree-node {
        &__content {
          // margin-bottom: 0.4rem;
          height: 3rem;
        }
      }
      .custom-tree-node {
        display: flex;
        flex: 1;
        justify-content: space-between;
        height: 100%;
        line-height: 3rem;

        .actions {
          display: none;
          a {
            margin-right: 0.6rem;
            font-size: $textSize-small-x;
            color: $color-text-link;
            &:hover {
              font-weight: bold;
            }
          }
        }
        &:hover .actions {
          display: block;
        }
      }
    }
  }
}
</style>
