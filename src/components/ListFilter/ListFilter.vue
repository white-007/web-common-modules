<template>
  <div class="list-filter" :class="{ open: fold }" v-if="options.length">
    <div class="absolute-wrapper">
      <div class="filter-wrapper" ref="listFilterRefs" :style="{ height: foldCurrentHeight }">
        <ListFilterItem v-for="item in options" :key="item.code" :item="item" :size="size" ref="listFilterItemRefs" />
      </div>
      <a v-if="hasFold" class="show-more" @click="toggleFilters">
        <span class="text">{{ foldText }}</span>
        <el-icon :size="12" v-if="fold"><ArrowUp /></el-icon>
        <el-icon :size="12" v-else><ArrowDown /></el-icon>
      </a>
      <div class="list-filter-submit" :class="{ negative: hasFold }" :style="{ textAlign: btnsAlign }">
        <el-button type="primary" :size="size" v-debounce="getFilterParams">{{ filterBtnText }}</el-button>
        <el-button type="default" :size="size" v-debounce="reset">{{ resetBtnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ListFilterItem from './ListFilterItem'
import toggleFilterEffect from './toggleFilterEffect'
import actionFilterEffect from './actionFilterEffect'

export default {
  name: 'ListFilter',
  components: { ListFilterItem },
  props: {
    // 配置项
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 返回父组件的filterParams如果有空值或null值是否去掉该字段 true|false
    noEmpty: {
      type: Boolean,
      default: true
    },
    // 组件大小 small|default|large
    size: {
      type: String,
      default: 'default'
    },
    // 过滤按钮文本
    filterBtnText: {
      type: String,
      default: '查询'
    },
    // 重置按钮文本
    resetBtnText: {
      type: String,
      default: '重置'
    },
    // 按钮对齐方式 left|center|right
    btnsAlign: {
      type: String,
      default: 'right'
    }
  },
  emits: ['getFilterParams', 'resetSuccess'],
  setup(props, { emit }) {
    const listFilterItemRefs = ref(null)
    const listFilterRefs = ref(null)
    const fold = ref(false)

    // 过滤组件收缩状态切换相关处理
    const { hasFold, foldText, foldCurrentHeight, toggleFilters } = toggleFilterEffect(listFilterRefs, fold)

    // 过滤组件数据相关处理
    const { getFilterParams, getFilterData, reset } = actionFilterEffect(listFilterItemRefs, props, emit, fold)

    return {
      fold,
      hasFold,
      foldText,
      foldCurrentHeight,
      listFilterRefs,
      listFilterItemRefs,
      toggleFilters,
      getFilterParams,
      getFilterData,
      reset
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';

.list-filter {
  position: relative;
  height: 11.4rem;
  .absolute-wrapper {
    padding: 1.6rem;
    .filter-wrapper {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
    }
    .show-more {
      display: flex;
      align-items: center;
      width: 12rem;
      margin: 1.2rem auto;
      font-size: $textSize-small;
      text-align: center;
      color: $color-primary;
      cursor: pointer;
      .text {
        margin-right: 0.4rem;
      }
    }
    .list-filter-submit {
      &.negative {
        margin-top: -4rem;
      }
      .ant-btn-primary {
        margin-right: 1rem;
      }
    }
  }
  &.open {
    .absolute-wrapper {
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      right: 0;
      background: #fff;
      box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
