!
<template>
  <div class="customer-manage">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus">批量分配</el-button>
      <el-button type="default" icon="Download">导出</el-button>
    </ListHeader>
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader/ListHeader'

export default {
  name: 'CustomerManage',
  components: { ListHeader }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.customer-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
}
</style>
