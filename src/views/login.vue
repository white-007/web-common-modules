<template>
  <div class="login-wrapper">
    <img class="logo-2" src="@/assets/images/logo-2@2x.png" />
    <div class="login-box">
      <img class="logo" src="@/assets/images/logo@2x.png" />
      <div class="slogan">便利小二企业合伙人服务系统</div>
      <div class="slogan">欢迎您</div>
      <form style="margin-top: 2rem">
        <el-input
          class="username"
          type="text"
          placeholder="请输入用账号"
          size="large"
          v-model="form.account"
          maxlength="40"
        />
        <el-input
          class="password"
          type="password"
          autocomplete
          placeholder="请输入密码"
          size="large"
          :maxlength="40"
          v-model="form.password"
        />
        <div class="v-code" v-if="isValidation">
          <el-input type="text" placeholder="请输入验证码" size="large" v-model="form.imageCaptcha" />
          <img :src="vCodeImg" @click="changeVcodeImg()" />
        </div>
        <!--  <div class="action">
        <a-checkbox v-model:checked="isRemember">记住账号</a-checkbox>
        <a-button type="link">忘记密码</a-button>
      </div>-->
        <el-button class="btnLogin" @click="login" color="#1A1A1A" size="large" :loading="loginLoading">登录</el-button>
      </form>
      <div class="text">如果忘记密码，请联系便利小二系统管理员修改密码</div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { setImageCaptcha, getImageCaptcha, removeImageCaptcha } from '@/utils/storage/auth'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  setup() {
    const _authStore = authStore()
    const $router = useRouter()

    const form = reactive({
      account: '',
      password: '',
      imageCaptcha: ''
    })
    const isRemember = ref(false)
    const isValidation = ref(getImageCaptcha())
    const vCodeImg = ref('')
    const loginLoading = ref(false)

    const login = () => {
      if (form.account.length > 39) {
        ElMessage.warning('最多输入40个字符')
      } else if (!form.account) {
        ElMessage.warning('请输入账号')
      } else if (!form.password) {
        ElMessage.warning('请输入6-20位密码')
      } else {
        loginLoading.value = true
        _authStore
          .__login(form)
          .then(res => {
            if (!res.data.failed) {
              removeImageCaptcha() // 取消图片验证码本状态地缓存
              isValidation.value = false
              ElMessage.success(res.data.message || '登录成功')
              $router.push({ path: '/' })
            }
            loginLoading.value = false
          })
          .catch(res => {
            ElMessage.error(res.data.message)
            if (res?.data?.enableImageCaptcha || res.data.code === 'AUTHENTICATION_PARAMETER_ERROR') {
              setImageCaptcha(res?.data?.enableImageCaptcha || true) // 设置图片验证码本地状态缓存
              isValidation.value = true // 开启登录图片码验证
              changeVcodeImg()
            }
            // 验证码错误刷新验证码
            if (res.data.code === 'BAD_IMAGE_CAPTCHA') {
              changeVcodeImg()
            }
            loginLoading.value = false
          })
      }
    }

    const changeVcodeImg = () => {
      // vCodeImg.value = process.env.VUE_APP_BASE_API + '/image-captcha?data=' + Date.now()
      _authStore.__fetchImgCaptcha().then(url => {
        vCodeImg.value = url
      })
    }

    if (isValidation.value) {
      changeVcodeImg()
    }

    return { form, isRemember, isValidation, vCodeImg, loginLoading, login, changeVcodeImg }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin.scss';

.login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-color: #f4f5f7;
  @include bg-image('~@/assets/images/login/bg-login', 'jpg');
  .logo-2 {
    position: absolute;
    top: 25px;
    left: 50px;
    width: 78px;
  }
  .login-box {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 500px;
    min-height: 40rem;
    padding: 3rem 5rem;
    border-radius: 0.5rem;
    background: $color-white-10;
    // box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.06);
    .logo {
      width: 195px;
      margin-bottom: 20vh;
    }
    .slogan {
      margin-bottom: 0.4rem;
      font-size: $textSize-large-xxxx;
    }
    .username,
    .password,
    .image-aptcha {
      font-size: $textSize-normal;
      ::v-deep(.el-input__wrapper) {
        padding: 0;
        .el-input__inner {
          text-indent: 1.5rem;
        }
      }
    }
    .username,
    .password {
      margin: 0 0 1.6rem;
    }
    .v-code {
      display: flex;
      input {
        flex: 1;
        margin-right: 2rem;
      }
      img {
        width: 15rem;
      }
    }
    .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0 4rem;
    }
    .btnLogin {
      width: 100%;
      margin-top: 24px;
      border-radius: 0.5rem;
      font-size: $textSize-large;
    }
  }
  .text {
    margin-top: 30px;
    text-align: center;
    color: gray;
  }
}
</style>
