<template>
  <div class="list-header">
    <h1>{{ title || $route?.meta?.title || $route.name }}</h1>
    <div class="btn-group">
      <slot>
        <el-button v-if="hasBtn" type="primary" icon="CirclePlus" @click="btnClick">{{ btnText }}</el-button>
      </slot>
    </div>
  </div>
  <el-divider v-if="hasDivider" />
</template>

<script>
export default {
  name: 'ListHeader',
  emits: ['btnClick'],
  props: {
    title: {
      type: String,
      default: ''
    },
    hasDivider: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: '新建'
    },
    hasBtn: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const btnClick = () => {
      emit('btnClick')
    }

    return {
      btnClick
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.list-header {
  display: flex;
  align-items: center;
  height: 5.8rem;
  padding: 1.6rem 1.6rem 1rem;
  h1 {
    margin: 0;
    font-size: $textSize-large-xx;
  }
  .btn-group {
    margin-left: auto;
  }
}
.el-divider {
  margin: 0;
}
</style>
