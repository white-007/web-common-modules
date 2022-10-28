<template>
  <el-icon v-if="iconType === 'el'" :size="size">
    <component :is="name || null" />
  </el-icon>
  <span v-if="iconType === 'iconfont'" :class="name" :style="{ fontSize: `${size}px` }"></span>
</template>

<script>
export default {
  name: 'MIcon',
  props: {
    // 图标名称
    name: {
      type: String,
      default: ''
    },
    // 图标大小
    size: {
      type: Number,
      default: 16
    }
  },
  setup() {},
  computed: {
    iconType() {
      const type = this.name.substring(0, 8)
      if (type === 'iconfont') {
        return 'iconfont'
      } else {
        return 'el'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.iconfont {
  width: var(--el-menu-icon-width);
  margin-right: 5px;
  text-align: center;
  vertical-align: middle;
}
</style>
