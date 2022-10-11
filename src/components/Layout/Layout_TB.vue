<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header_TB /></el-header>
      <el-container>
        <el-aside :width="`${global.sideMenuWidth}px`">
          <view class="collapse" @click="toggle">
            <el-icon v-if="!global.isSideMenuCollapse" class="fold" :size="20" color="#333">
              <Fold />
            </el-icon>
            <el-icon v-else class="expand" :size="20" color="#333"><Expand /></el-icon>
          </view>
          <SideMenu class="side-menu" />
        </el-aside>
        <el-main>
          <TagsView />
          <div style="padding: 1rem">
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
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from '../SideMenu/SideMenu.vue'
import Header_TB from '../Header/Header_TB'
import TagsView from '../TagsView/TagsView.vue'
import { globalStore } from '@/stores/global'

export default {
  name: 'Layout',
  components: { SideMenu, Header_TB, TagsView },
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
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin';

.common-layout,
.el-container {
  height: 100%;
  .el-aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: solid 1px $color-border-normal;
    transition: ease-in-out width 0.2s;

    .collapse {
      display: block;
      box-sizing: content-box;
      height: 2rem;
      padding: 1rem 2.2rem;
      cursor: pointer;
    }
    .side-menu {
      flex: 1;
      min-height: 1px;
      overflow: auto;
    }
  }
  .el-header {
    border-bottom: solid 1px $color-border-normal;
  }
  .el-main {
    padding: 0;
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
