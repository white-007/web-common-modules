<template>
  <div class="send-sms">
    <el-button class="btn" :size="size" :disabled="disabled" @click="getCode">{{ massage }}</el-button>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'SendSms',
  emits: ['send'],
  props: {
    phone: {
      required: true,
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    btnText: {
      type: String,
      default: '发送验证码'
    },
    time: {
      type: [Number, String],
      default: 60
    },
    msgText: {
      type: String,
      default: '手机号不能为空'
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance()
    // 倒计时
    const massage = ref(props.btnText)
    const disabled = ref(false)
    const count = ref(props.time)
    const getCode = () => {
      if (!props.phone) {
        proxy.$message.warning(props.msgText)
        console.error('SendSms组件必须传入props: phone属性')
        return
      }
      if (!disabled.value) {
        emit('send')
      }
      massage.value = '重新获取(' + count.value + ')'
      if (count.value <= 0) {
        count.value = props.time
        massage.value = props.btnText
        disabled.value = false
      } else {
        disabled.value = true
        setTimeout(() => {
          count.value--
          getCode()
        }, 1000)
      }
    }

    return {
      massage,
      disabled,
      count,
      getCode
    }
  }
}
</script>
<style lang="scss" scoped></style>
