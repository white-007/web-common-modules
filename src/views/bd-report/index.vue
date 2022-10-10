!
<template>
  <div class="bd-report">
    <ListHeader :hasBtn="false" />
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader/ListHeader'

export default {
  name: 'BdReport',
  components: { ListHeader }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.bd-report {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.4rem;
  font-size: $textSize-normal;
  background-color: $color-white-10;
  box-shadow: $shadow-normal;
}
</style>
