<template>
  <div class="header">
    <el-icon v-if="!global.isSideMenuCollapse" class="collapse fold" :size="20" color="#333" @click="toggle">
      <Fold />
    </el-icon>
    <el-icon v-else class="collapse expand" :size="20" color="#333" @click="toggle"><Expand /></el-icon>
    <UserAction />
  </div>
</template>

<script>
import { globalStore } from '@/stores/global'
import UserAction from './UserAction'

export default {
  name: 'Header',
  components: { UserAction },
  setup() {
    const global = globalStore()
    const initWidth = global.sideMenuWidth
    const toggle = () => {
      global.isSideMenuCollapse = !global.isSideMenuCollapse
      global.isSideMenuCollapse ? (global.sideMenuWidth = 64) : (global.sideMenuWidth = initWidth)
    }
    return { toggle, global }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .collapse {
    cursor: pointer;
  }
}
</style>
