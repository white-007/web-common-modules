<!-- 角色管理 -->
<template>
  <div class="user-manage">
    <ListHeader>
      <el-button type="primary" :icon="CirclePlus" @click="addHandle">创建角色</el-button>
    </ListHeader>
    <!-- <ListFilter :options="FILTER_OPTIONS" @getFilterParams="getFilterParams" @resetSuccess="filterResetSuccess" /> -->
    <div class="table-wrapper">
      <el-table :data="tableData" row-key="roleId" size="default" v-loading="loading" stripe border>
        <el-table-column fixed prop="roleName" label="角色名称" min-width="100" align="center" />
        <el-table-column prop="roleDescription" label="角色描述" min-width="300" align="center" />
        <el-table-column prop="gmtCreate" label="创建时间" width="160" align="center" />
        <el-table-column prop="gmtModified" label="修改时间" width="160" align="center" />
        <!-- <el-table-column prop="adminRole" label="管理员" width="80" align="center" /> -->
        <el-table-column prop="adminRole" label="管理员" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.adminRole ? 'success' : 'info'">
              {{ row.adminRole ? '管理员' : '非管理员' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="default" size="small" @click="detailHandle(row)">详情</el-button>
            <el-button type="primary" size="small" @click="editHandle(row)" plain>编辑</el-button>
            <el-popconfirm
              confirm-button-text="删除"
              cancel-button-text="取消"
              confirmButtonType="danger"
              :icon="InfoFilled"
              title="是否删除当前选定的角色，删除后该角色不可恢复，确定吗？"
              @confirm="confirmEvent(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <RoleManageDrawer
      v-model="drawerState"
      :drawerType="drawerType"
      :drawerTypeText="drawerTypeText"
      :drawerDetail="drawerDetail"
      @close="drawerClose"
      @refreshTable="refreshTable"
    />
  </div>
</template>

<script>
import { watchEffect } from 'vue'
import { CirclePlus, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ListHeader from '@/components/ListHeader/ListHeader'
// import ListFilter from '@/components/ListFilter/ListFilter'
// import { FILTER_OPTIONS } from './cfg'
import { fetchSysRoleList, fetchSysRoleDetail, delRole } from './api'
// import { globalPaginationConfig } from '@/utils/globalConfig'
import { tableEffect, drawerInitEffect /*,filterEffect,paginationEffect*/ } from '@/effect/tableListEffect'
import RoleManageDrawer from './RoleManageDrawer'

export default {
  name: 'RoleManage',
  components: { ListHeader, RoleManageDrawer },
  setup() {
    const isPages = false // 是否为分页显示（因为分页和不分页后端接口返回数据结构不一致，需要区分以便获得tableData数据等）
    // 表格列表相关逻辑 Begin
    // const { pageConfig, paginationCurrentChange, paginationSizeChange, resetPagination } = paginationEffect() // 分页相关逻辑
    // const { filterParams, getFilterParams, filterResetSuccess } = filterEffect(resetPagination) // 筛选过滤相关逻辑
    const { loading, total, tableData, __fetchTableData } = tableEffect(fetchSysRoleList, isPages) // 表格相关逻辑
    const { drawerState, drawerType, drawerTypeText, drawerDetail, addHandle, editHandle, detailHandle, drawerClose } =
      drawerInitEffect(fetchSysRoleDetail, 'roleId', loading, '角色') // Drawer相关逻辑

    // 列表查询
    watchEffect(() => {
      __fetchTableData()
    })

    const refreshTable = () => {
      // 请求第一页数据
      __fetchTableData()
    }

    // 删除
    const confirmEvent = data => {
      delRole(data.roleId).then(res => {
        // console.log(res)
        if (res.success) {
          __fetchTableData()
          ElMessage.success({
            message: '角色删除成功！',
            grouping: true,
            center: true
          })
        }
      })
    }

    return {
      // list
      CirclePlus,
      InfoFilled,
      // globalPaginationConfig,
      // FILTER_OPTIONS,
      loading,
      total,
      tableData,
      // drawer,
      drawerState,
      drawerType,
      drawerDetail,
      drawerTypeText,
      addHandle,
      editHandle,
      confirmEvent,
      drawerClose,
      detailHandle,
      refreshTable
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.user-manage {
  height: 100%;
  // padding: 2rem;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
  .page-header {
    display: flex;
    align-items: center;
    padding: 1.6rem 1.6rem 1rem;
    h1 {
      margin: 0;
      font-size: $textSize-large-xx;
    }
    .btn-group {
      margin-left: auto;
    }
  }
  .el-divider {
    margin: 0;
  }
  .table-wrapper {
    padding: 1.6rem;
    .pagination {
      float: right;
      margin-top: 2.4rem;
    }
  }
}
</style>
