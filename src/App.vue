<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
  setup() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_2537667_6ch3xba05zf.css');
#app {
  height: 100%;
  .el-dialog {
    min-width: 300px;
  }
  .el-drawer {
    min-width: 400px;
  }
}
</style>
