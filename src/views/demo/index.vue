<template>
  <div class="demo-list">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus" @click="addHandle">新增</el-button>
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
        <el-table-column fixed prop="account" label="账号" />
        <el-table-column prop="genderTxt" label="性别" width="60" />
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'">
              {{ row.status ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="{ row }">
            <el-button type="default" size="small" @click="editHandle(row)">编辑</el-button>
            <el-button type="default" size="small" @click="detailHandle(row)">详情</el-button>
            <el-button type="danger" size="small" @click="removeRow(row)">删除</el-button>
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
    <DemoManageDrawer
      v-model="drawerState"
      :drawerType="drawerType"
      :drawerTypeText="drawerTypeText"
      :drawerDetail="drawerDetail"
      @close="drawerClose"
    />
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader/ListHeader'
import ListFilter from '@/components/ListFilter/ListFilter'
import { watchEffect, getCurrentInstance } from 'vue'
import { FILTER_OPTIONS } from './cfg'
import { fetchDemoList, fetchDemoDetail } from './api'
import { globalPageConfig, globalPaginationConfig } from '@/utils/globalConfig'
import { filterEffect, tableEffect, paginationEffect, drawerInitEffect } from '@/effect/tableListEffect'
import DemoManageDrawer from './DemoManageDrawer'

export default {
  name: 'DemoList',
  components: { ListHeader, ListFilter, DemoManageDrawer },
  setup() {
    // 表格列表相关逻辑 Begin
    const isPages = true // 是否为分页显示（因为分页和不分页后端接口返回数据结构不一致，需要区分以便获得tableData数据等）
    const { pageConfig, paginationCurrentChange, paginationSizeChange, resetPagination } = paginationEffect() // 分页相关逻辑
    const { filterParams, getFilterParams, filterResetSuccess } = filterEffect(resetPagination) // 筛选过滤相关逻辑
    const { loading, total, tableData, __fetchTableData } = tableEffect(fetchDemoList, isPages) // 表格相关逻辑
    const { drawerState, drawerType, drawerTypeText, drawerDetail, addHandle, editHandle, detailHandle, drawerClose } =
      drawerInitEffect(fetchDemoDetail, 'id', loading, 'Demo') // Drawer相关逻辑

    const refreshTable = () => {
      // 请求第一页数据
      __fetchTableData(filterParams.value, globalPageConfig)
    }

    watchEffect(() => {
      __fetchTableData(filterParams.value, pageConfig.value)
    })
    // 表格列表相关逻辑 End

    // 删除行
    const { proxy } = getCurrentInstance()
    const removeRow = row => {
      proxy.$message.success(`删除${row.account}`)
    }
    return {
      // list
      globalPaginationConfig,
      FILTER_OPTIONS,
      filterParams,
      pageConfig,
      loading,
      total,
      tableData,
      getFilterParams,
      filterResetSuccess,
      paginationCurrentChange,
      paginationSizeChange,
      refreshTable,

      // drawer
      drawerState,
      drawerType,
      drawerTypeText,
      drawerDetail,
      addHandle,
      editHandle,
      detailHandle,
      drawerClose,

      removeRow
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.demo-list {
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
