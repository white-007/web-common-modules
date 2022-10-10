<template>
  <el-dropdown placement="bottom-end" @command="dropdowItemClick">
    <span class="el-dropdown-link">
      <el-avatar icon="UserFilled" :size="24" />
      <span v-if="userInfo" class="user-name">{{ userInfo.shortName || userInfo.supplierName }}</span>
      <el-icon class="el-icon--right" :size="12"><ArrowDown /> </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="User" command="account">{{ userInfo.username }}</el-dropdown-item>
        <el-dropdown-item icon="Edit" command="changePsw">修改密码</el-dropdown-item>
        <!-- <el-dropdown-item icon="Remove" command="clearStorage">清除缓存</el-dropdown-item> -->
        <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <ChangePswDialog v-model="pswDialogState" @close="closePswDialog" />
</template>

<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getCurrentInstance } from 'vue'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import ChangePswDialog from './ChangePswDialog'

export default {
  name: 'UserAction',
  components: { ChangePswDialog },
  setup() {
    const { proxy } = getCurrentInstance()
    const _authStore = authStore()
    const { userInfo } = storeToRefs(_authStore)
    const $router = useRouter()
    const pswDialogState = ref(false)

    const dropdowItemClick = command => {
      console.log(command)
      switch (command) {
        case 'account':
          $router.push('/account/index')
          break
        case 'changePsw':
          pswDialogState.value = true
          break
        case 'clearStorage':
          alert('缓存清除成功')
          break
        case 'logout':
          proxy
            .$msgbox({
              title: '退出登录',
              message: '是否立即退出登录，退出后需要重新登录',
              showCancelButton: true,
              confirmButtonClass: 'el-button--danger',
              confirmButtonText: '登出'
            })
            .then(() => {
              _authStore.logout()
            })
          break
      }
    }

    const closePswDialog = () => {
      pswDialogState.value = false
    }

    return { userInfo, pswDialogState, dropdowItemClick, closePswDialog }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
.el-dropdown-link {
  display: flex;
  align-items: center;
  .user-name {
    margin-left: 0.4rem;
    font-size: $textSize-normal;
  }
}
</style>
