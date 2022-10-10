<template>
  <div class="user-manage">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus" @click="addHandle">创建员工</el-button>
    </ListHeader>
    <ListFilter :options="FILTER_OPTIONS" @getFilterParams="getFilterParams" @resetSuccess="filterResetSuccess" />
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        row-key="staffId"
        size="default"
        border
        stripe
        v-loading="loading"
        scrollbar-always-on
      >
        <el-table-column fixed prop="account" label="账号" width="120" />
        <el-table-column prop="genderTxt" label="性别" width="60" />
        <el-table-column prop="departmentName" label="部门名称" width="auto" />
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="120" />
        <el-table-column prop="roles" label="角色" width="100" />
        <el-table-column prop="staffNo" label="员工编号" width="100" />
        <el-table-column prop="staffStateTxt" label="员工状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.staffState === enums.staffState[0].value ? 'success' : 'danger'">
              {{ row.staffStateTxt }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button type="default" size="small" @click="editHandle(row)">编辑</el-button>
            <el-button type="default" size="small" @click="detailHandle(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:currentPage="pageConfig.page"
        v-model:page-size="pageConfig.size"
        :page-sizes="globalPaginationConfig.pageSizes"
        small
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="paginationCurrentChange"
        @size-change="paginationSizeChange"
      />
    </div>
    <UserManageDrawer
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
import ListHeader from '@/components/ListHeader/ListHeader'
import ListFilter from '@/components/ListFilter/ListFilter'
import { FILTER_OPTIONS } from './cfg'
import { fetchSysUserList, fetchSysUserDetail } from './api'
import { globalPageConfig, globalPaginationConfig, enums } from '@/utils/globalConfig'
import { filterEffect, tableEffect, paginationEffect, drawerInitEffect } from '@/effect/tableListEffect'
import UserManageDrawer from './UserManageDrawer.vue'

export default {
  name: 'UserManage',
  components: { ListHeader, ListFilter, UserManageDrawer },
  setup() {
    const isPages = true // 是否为分页显示（因为分页和不分页后端接口返回数据结构不一致，需要区分以便获得tableData数据等）
    // 表格列表相关逻辑 Begin
    const { pageConfig, paginationCurrentChange, paginationSizeChange, resetPagination } = paginationEffect() // 分页相关逻辑
    const { filterParams, getFilterParams, filterResetSuccess } = filterEffect(resetPagination) // 筛选过滤相关逻辑
    const { loading, total, tableData, __fetchTableData } = tableEffect(fetchSysUserList, isPages) // 表格相关逻辑
    const { drawerState, drawerType, drawerTypeText, drawerDetail, addHandle, editHandle, detailHandle, drawerClose } =
      drawerInitEffect(fetchSysUserDetail, 'staffId', loading, '员工') // Drawer相关逻辑

    const refreshTable = () => {
      // 请求第一页数据
      __fetchTableData(filterParams.value, globalPageConfig)
    }

    watchEffect(() => {
      __fetchTableData(filterParams.value, pageConfig.value)
    })
    // 表格列表相关逻辑 End

    return {
      // list
      globalPaginationConfig,
      FILTER_OPTIONS,
      filterParams,
      pageConfig,
      enums,
      loading,
      total,
      tableData,
      getFilterParams,
      filterResetSuccess,
      paginationCurrentChange,
      paginationSizeChange,

      // drawer
      drawerState,
      drawerType,
      drawerTypeText,
      drawerDetail,
      addHandle,
      editHandle,
      detailHandle,
      drawerClose,
      refreshTable
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.user-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
  .table-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 1px;
    padding: 0 1.6rem 1.6rem;
    .el-table {
      flex: 1;
      min-height: 1px;
    }
    .pagination {
      align-self: flex-end;
      margin-top: 2rem;
    }
  }
}
</style>
