<template>
  <div class="person-manage">
    <ListHeader>
      <el-button type="primary" icon="CirclePlus">新增人员</el-button>
    </ListHeader>
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader/ListHeader'

export default {
  name: 'PersonManage',
  components: { ListHeader }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.person-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
}
</style>
