<template>
  <!-- input -->
  <div class="list-filter-item" v-if="item.type === 'input'">
    <label class="label" :title="item.label">{{ item.label }}</label>
    <el-input class="comp" v-bind="item.elCompAttrs" v-on="item.elCompEvents || {}" v-model="itemCode" :size="size" />
  </div>

  <!-- select -->
  <div class="list-filter-item" v-if="item.type === 'select'">
    <label class="label" :title="item.label">{{ item.label }}</label>
    <el-select class="comp" v-bind="item.elCompAttrs" v-on="item.elCompEvents || {}" v-model="itemCode">
      <el-option v-for="op in item.elCompAttrs.options" :key="op.value" :label="op.label" :value="op.value" />
    </el-select>
  </div>

  <!-- treeSelect -->
  <div class="list-filter-item" v-if="item.type === 'treeSelect'">
    <label class="label" :title="item.label">{{ item.label }}</label>
    <el-tree-select class="comp" v-bind="item.elCompAttrs" v-on="item.elCompEvents || {}" v-model="itemCode" />
  </div>

  <!-- datePicker -->
  <div class="list-filter-item" v-if="item.type === 'datePicker'">
    <label class="label" :title="item.label">{{ item.label }}</label>
    <el-date-picker
      class="comp"
      v-bind="item.elCompAttrs"
      v-on="item.elCompEvents || {}"
      v-model="itemCode"
      :type="item.elCompAttrs.type || 'date'"
    />
  </div>

  <!-- cascader -->
  <div class="list-filter-item" v-if="item.type === 'cascader'">
    <label class="label" :title="item.label">{{ item.label }}</label>
    <el-cascader class="comp" v-bind="item.elCompAttrs" v-on="item.elCompEvents || {}" v-model="itemCode" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ListFilterItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const hasFold = ref(false) // 是否折叠
    const foldText = ref('查看更多条件')
    const itemCode = ref(props.item.defaultValue) || '' // 初始设置默认值，没有设为''

    // 重置默认值
    const resetValue = () => {
      itemCode.value = props.item.defaultValue
    }

    return { hasFold, foldText, itemCode, resetValue }
  }
}
</script>
<style lang="scss" scoped>
@import '@/common/scss/_variable';
@import '@/common/scss/_mixin';
.list-filter-item {
  display: flex;
  align-items: center;
  width: 22%;
  margin-right: 3%;
  margin-bottom: 0.8rem;
  .label {
    display: inline;
    width: 12rem;
    margin-right: 1rem;
    line-height: 32px;
    text-align: right;
    @include ellipsis();
  }
  ::v-deep(.comp) {
    flex: 1;
    min-width: 1px;
  }

  @media screen and (min-width: 1921px) {
    & {
      width: 19%;
      margin-right: 1%;
      .label {
        width: 12rem;
      }
    }
  }
  @media screen and (max-width: 1600px) {
    & {
      width: 32%;
      margin-right: 1.33%;
      .label {
        width: 10rem;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    & {
      width: 48%;
      margin-right: 2%;
      .label {
        width: 10rem;
      }
    }
  }
  @media screen and (max-width: 800px) {
    & {
      width: 100%;
      margin-right: 0;
      .label {
        width: 10rem;
      }
    }
  }
}
</style>
