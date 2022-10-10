<template>
  <component :is="global.layout" />
</template>
<script>
import Layout_TB from './Layout_TB'
import Layout_LR from './Layout_LR'
import { globalStore } from '@/stores/global'

export default {
  components: {
    Layout_TB,
    Layout_LR
  },
  setup() {
    const global = globalStore()
    return { global }
  }
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler() {
  //       this.$store.commit('menus/SET_EL_PERMISSION', { data: this.$route.meta.permissions })
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped></style>
