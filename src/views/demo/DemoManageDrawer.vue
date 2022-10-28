<template>
  <el-drawer
    v-bind="$attrs"
    custom-class="demo-manage-drawer"
    direction="rtl"
    :size="1200"
    @open="drawerOpen"
    @close="drawerClose"
  >
    <template #header>
      <h4 class="title">{{ drawerTypeText }}</h4>
    </template>
    <template #default>
      <div>{{ drawerTypeText }}</div>
      <div>内容........</div>
    </template>
    <template #footer v-if="drawerType !== 'DETAIL'">
      <div style="flex: auto">
        <el-button @click="drawerClose">取消</el-button>
        <el-button type="primary">{{ drawerType === 'ADD' ? '创建' : '保存' }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
export default {
  name: 'DemoManageDrawer',
  emits: ['close'],
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
  setup(props, { emit }) {
    const drawerOpen = () => {
      console.log('drawer open')
    }
    // 关闭drawer事件
    const drawerClose = () => {
      emit('close')
    }

    return {
      drawerOpen,
      drawerClose
    }
  }
}
</script>
<style lang="scss">
@import '@/common/scss/_variable';

.demo-manage-drawer {
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
