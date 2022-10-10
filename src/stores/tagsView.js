import { defineStore } from 'pinia'

export const tagsViewStore = defineStore('tagsViewStore', {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  actions: {
    /**
     * 添加用于显示的tag
     * @param {*} view 视图路由信息
     */
    addVisitedView(view) {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },

    /**
     * 添加缓存的的tag name
     * @param {*} view 视图路由信息
     */
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    /**
     * 删除指定的tag
     * @param {*} view 视图路由信息
     */
    delVisitedView(view) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve()
      })
    },

    /**
     * 删除指定的缓存的的tag name
     * @param {*} view 视图路由信息
     */
    delCachedView(view) {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve()
      })
    },

    delAllViews() {
      // keep affix tags
      const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
      this.visitedViews = affixTags

      this.cachedViews = []
    }
  }
})
