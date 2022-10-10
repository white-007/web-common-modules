<template>
  <template v-if="!item?.meta?.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
    >
      <!-- 外链 -->
      <el-menu-item v-if="onlyOneChild?.meta?.link">
        <a class="link" :href="onlyOneChild?.meta?.link" target="_blank">
          <el-icon :size="16"><component :is="onlyOneChild?.meta?.icon" /></el-icon>
          {{ onlyOneChild?.meta?.title || onlyOneChild.name }}
        </a>
      </el-menu-item>
      <!-- 路由 -->
      <el-menu-item v-else :index="resolvePath(onlyOneChild.path)">
        <el-icon :size="16"><component :is="onlyOneChild?.meta?.icon" /></el-icon>
        <template #title>{{ onlyOneChild?.meta?.title || onlyOneChild.name }}</template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="item.name">
      <template #title>
        <el-icon :size="16"><component :is="item?.meta?.icon" /></el-icon>
        <span>{{ item?.meta?.title || item.name }}</span>
      </template>
      <SideMenuItem
        v-for="child in item.children"
        :key="child.name"
        :item="child"
        :basePath="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script>
import path from 'path'
import { ref } from 'vue'

export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref(null)
    const resolvePath = routePath => {
      return path.resolve(props.basePath, routePath)
    }

    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter(item => {
        if (item?.meta?.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
    return { onlyOneChild, resolvePath, hasOneShowingChild }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: $color-text-base;
}
</style>
