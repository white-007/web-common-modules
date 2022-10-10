<template>
  <div class="header">
    <Logo />
    <UserAction />
  </div>
</template>

<script>
import { globalStore } from '@/stores/global'
import Logo from '@/components/Logo'
import UserAction from './UserAction'

export default {
  name: 'Header',
  components: { Logo, UserAction },
  setup() {
    const global = globalStore()
    return { global }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
