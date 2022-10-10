<template>
  <el-menu
    class="menu"
    :class="global.layout"
    router
    :default-active="$route.path"
    :collapse="global.isSideMenuCollapse"
    :collapse-transition="false"
  >
    <SideMenuItem v-for="item in auth.routes" :key="item.name" :item="item" :basePath="item.path" />
  </el-menu>
</template>

<script>
import { authStore } from '@/stores/auth'
import { globalStore } from '@/stores/global'
import SideMenuItem from './SideMenuItem.vue'
// import { routes } from '@/router'

export default {
  name: 'SideMenu',
  components: { SideMenuItem },
  setup() {
    const auth = authStore()
    const global = globalStore()
    return { global, auth }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.el-menu {
  border: none;
  &.Layout_LR {
    --el-menu-bg-color: #2c6dd2;
    --el-menu-text-color: rgba(255, 255, 255, 0.8);
    --el-menu-active-color: #fff;
    --el-menu-hover-bg-color: transparent;
    ::v-deep(.el-menu-item) {
      &:hover {
        font-weight: $textWeight-bold;
        color: #fff;
      }
      &.is-active {
        font-weight: $textWeight-bold;
        background-color: #1a5bc2;
      }
    }
    ::v-deep(.el-sub-menu) {
      .el-menu {
        background-color: #2466cd;
      }
    }
  }
}
</style>
