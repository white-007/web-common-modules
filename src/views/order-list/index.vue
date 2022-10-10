!
<template>
  <div class="order-list">
    <ListHeader>
      <el-dropdown placement="bottom-end" @command="dropdowItemClick">
        <el-button type="primary" icon="Download">
          <span>批量导出</span>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="all">导出全部查询结果</el-dropdown-item>
            <el-dropdown-item command="selected">导出选中的行</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ListHeader>
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader/ListHeader'

export default {
  name: 'OrderList',
  components: { ListHeader },
  setup() {
    const dropdowItemClick = command => {
      console.log(command)
    }

    return {
      dropdowItemClick
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.order-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
}
</style>
