<template>
  <div class="department-manage">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus" @click="addHandle">新增部门</el-button>
    </ListHeader>
    <div class="tree-wrapper">
      <el-tree
        v-loading="loading"
        :data="treeDatas"
        node-key="departmentId"
        default-expand-all
        :props="{ label: 'departmentName' }"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span class="label">{{ node.label }}</span>
            <span class="actions">
              <a class="link" @click.stop="viewTreeNode(data)">详情</a>
              <a class="link" @click.stop="addTreeNode(data)">新增</a>
              <a class="link" @click.stop="eidtTreeNode(data)">修改</a>
              <a class="link" @click.stop="removeTreeNode(data)">删除</a>
              <a class="link" @click.stop="moveUp(data)">
                <el-icon size="12"><Top /></el-icon>
                <span>上移</span>
              </a>
              <a class="link" @click.stop="moveDown(data)">
                <el-icon size="12"><Bottom /></el-icon>
                <span>下移</span>
              </a>
            </span>
          </div>
        </template>
      </el-tree>
    </div>
    <DepartmentManageDrawer
      v-model="drawerState"
      :drawerType="drawerType"
      :drawerTypeText="drawerTypeText"
      :drawerDetail="drawerDetail"
      @close="close"
      @refreshTable="fetchTree"
    />
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import ListHeader from '@/components/ListHeader/ListHeader'
import DepartmentManageDrawer from './DepartmentManageDrawer'
import { drawerInitEffect } from '@/effect/tableListEffect'
import { fetchDepartmentsTree, deleteDepartment, moveUpDepartment, moveDownDepartment } from './api'

export default {
  name: 'DepartmentManage',
  components: { ListHeader, DepartmentManageDrawer },
  setup() {
    const { proxy } = getCurrentInstance()
    const loading = ref(false)
    const treeDatas = ref([])
    const drawerDetail = ref({})
    const { drawerState, drawerType, drawerTypeText, addHandle, editHandle, detailHandle, drawerClose } =
      drawerInitEffect(null, '', loading, '部门') // Drawer相关逻辑

    const fetchTree = () => {
      loading.value = true
      fetchDepartmentsTree().then(res => {
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
      drawerDetail.value.departmentId = data.departmentId
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
          message: `是否删除部门：${data.departmentName}`,
          showCancelButton: true,
          confirmButtonClass: 'el-button--danger',
          confirmButtonText: '删除'
        })
        .then(() => {
          loading.value = true
          deleteDepartment(data.departmentId).then(res => {
            if (res.success) {
              fetchTree()
              loading.value = false
            }
          })
        })
    }

    // 同级部门上移
    const moveUp = data => {
      loading.value = true
      moveUpDepartment(data.departmentId).then(res => {
        if (res.success) {
          fetchTree()
        }
      })
    }

    // 同级部门下移
    const moveDown = data => {
      loading.value = true
      moveDownDepartment(data.departmentId).then(res => {
        if (res.success) {
          fetchTree()
        }
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
      moveUp,
      moveDown,
      addHandle,
      close
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.department-manage {
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
      --el-tree-node-hover-bg-color: none;
      ::v-deep() .el-tree-node {
        &__content {
          height: 3.4rem;
          margin-bottom: 0.4rem;
        }
      }
      .custom-tree-node {
        display: flex;
        flex: 1;
        justify-content: space-between;
        height: 100%;
        padding-left: 1rem;
        border: solid 1px #ddd;
        border-radius: 0.4rem;
        line-height: 3.4rem;
        &:hover {
          background-color: var(--el-fill-color-light);
        }
        .label {
          font-size: $textSize-small-x;
          color: $color-text-base;
        }

        .actions {
          display: flex;
          a {
            display: flex;
            align-items: center;
            margin-right: 0.6rem;
            font-size: $textSize-small-x;
            color: $color-text-link;
            &:hover {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
