<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="`${global.sideMenuWidth}px`">
        <Logo />
        <SideMenu class="side-menu" />
      </el-aside>
      <el-container>
        <el-header><Header_LR /></el-header>
        <TagsView />
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" v-if="$route?.meta?.keepAlive"></component>
              </keep-alive>
            </transition>
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" v-if="!$route?.meta?.keepAlive"></component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import SideMenu from '@/components/SideMenu/SideMenu.vue'
import Header_LR from '@/components/Header/Header_LR'
import TagsView from '@/components/TagsView/TagsView.vue'
import { globalStore } from '@/stores/global'

export default {
  name: 'Layout',
  components: { Logo, SideMenu, Header_LR, TagsView },
  setup() {
    const global = globalStore()
    return { global }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin';

.common-layout,
.el-container {
  height: 100%;
  .el-aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: $color-primary;
    transition: ease-in-out width 0.2s;
    border-right: solid 1px $color-border-normal;
    .side-menu {
      flex: 1;
      min-height: 1px;
      overflow: auto;
    }
  }
  .el-header {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .el-main {
    padding: 1rem;
    background-color: $bg-grey-light;
  }
}

/* fade-transform */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
