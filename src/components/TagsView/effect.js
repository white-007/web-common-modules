/**
 * @author liuxue
 * @date 2022-05-18
 * tagsView组件的相关逻辑
 */
import path from 'path'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import { tagsViewStore } from '@/stores/tagsView'
import { authStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'

const tagsViewEffect = () => {
  const affixTags = ref([])
  const $route = useRoute()
  const $router = useRouter()
  const tagStore = tagsViewStore()
  const { visitedViews, cachedViews } = storeToRefs(tagStore)
  const auth_store = authStore()
  const { routes } = storeToRefs(auth_store)

  // 是否激活
  const isActive = route => {
    return route.path === $route.path
  }

  // 是否不可删除
  const isAffix = tag => {
    return tag.meta && tag.meta.affix
  }

  // 递归并扁平化路由
  const filterAffixTags = (routes, basePath = '/') => {
    if (!routes.length) return []
    let tags = []
    routes.value.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, path.resolve(basePath, route.path))
        if (tempTags.length) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }

  // 初始化标签
  const initTags = () => {
    if (!routes.length) return
    affixTags.value = filterAffixTags(routes.value)
    for (const tag of affixTags.value) {
      // Must have tag name
      if (tag.name) {
        tagStore.addVisitedView(tag)
      }
    }
  }

  // 添加标签
  const addTags = () => {
    const { name, meta } = $route
    const hidden = meta?.hidden && !meta?.showTagView // 隐藏的菜单不添加tagsView
    if (name && !hidden) {
      tagStore.addVisitedView($route)
      tagStore.addCachedView($route)
    }
    return false
  }

  // 删除标签
  const closeSelectedTag = view => {
    tagStore.delVisitedView(view).then(() => {
      if (isActive(view)) {
        toLastView(view)
      }
    })
    tagStore.delCachedView(view)
  }

  // 路由跳转到最后一个标签
  const toLastView = view => {
    const latestView = visitedViews.value.slice(-1)[0]
    if (latestView) {
      $router.push(latestView.fullPath)
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      if (view.name === 'Dashboard') {
        // to reload home page
        $router.replace({ path: '/redirect' + view.fullPath })
      } else {
        $router.push('/')
      }
    }
  }

  onMounted(() => {
    initTags()
    addTags()
  })

  watch($route, () => {
    addTags()
  })

  return { affixTags, visitedViews, cachedViews, isActive, isAffix, closeSelectedTag }
}

export default tagsViewEffect
