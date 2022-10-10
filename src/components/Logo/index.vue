<template>
  <div class="logo" :class="global.layout" :style="{ 'padding-left': global.layout === 'Layout_LR' ? '2rem' : 0 }">
    <div v-if="!global.isSideMenuCollapse" :class="{ 'un-collapse': !global.isSideMenuCollapse }" title="便利小二">
      <img src="@/assets/images/logo@2x.png" />
      <div class="slogan">企业合伙人服务系统</div>
    </div>
    <div v-else :class="{ collapse: global.isSideMenuCollapse }" title="便利小二">
      <img src="@/assets/images/logo-icon@2x.png" />
    </div>
  </div>
</template>

<script>
import { globalStore } from '@/stores/global'
export default {
  name: 'Logo',
  setup() {
    const global = globalStore()
    return { global }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin';

.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 6rem;
  @include ellipsis();
  .un-collapse {
    img {
      width: 140px;
      height: auto;
    }
  }
  .collapse {
    img {
      width: 24px;
    }
  }
  &.Layout_LR {
    color: $color-white-10;
  }
  div {
    .text {
      font-weight: $textWeight-normal;
      font-size: $textSize-large-xx;
      letter-spacing: 1.2px;
    }

    .slogan {
      margin-top: -6px;
      font-size: $textSize-small-x;
    }
  }
}
</style>
