import { defineStore } from 'pinia'

export const globalStore = defineStore('globalStore', {
  state: () => {
    return {
      layout: 'Layout_LR',
      isSideMenuCollapse: false, // sideMenu收缩状态
      sideMenuWidth: 220 // sideMenu宽度
    }
  }
})
