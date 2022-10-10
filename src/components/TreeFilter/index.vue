<!-- 左侧树 -->
<template>
  <div class="tree_filter">
    <el-scrollbar class="tree_box">
      <el-tree
        :data="tree"
        :props="treeProps"
        @node-click="selectNode"
        :expand-on-click-node="false"
        default-expand-all
        highlight-current
      />
    </el-scrollbar>
  </div>
</template>

<script>
// import { ref } from 'vue'
export default {
  name: 'TreeFilter',
  props: {
    tree: {
      type: Array,
      default() {
        return []
      }
    },
    select: {
      type: Number,
      default() {
        return null
      }
    },
    option: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'directoryName'
        }
      }
    }
  },
  // emits: ['selectNode'],
  setup(props, { emit }) {
    // const tree = ref([])
    const customNodeClass = data => {
      // console.log(data, 'datadata')
      if (data.directoryId === props.select) {
        return 'tree_item'
      }
    }
    const treeProps = {
      ...props.option,
      class: customNodeClass
    }
    const selectNode = data => {
      emit('selectNode', data)
    }

    return {
      // tree,
      // customNodeClass,
      treeProps,
      selectNode
    }
  }
}
</script>

<style lang="scss">
@import '@/common/scss/_variable';
.tree_filter {
  .tree_box {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1.6rem;
    padding-left: 1rem;

    // 树横滚
    .tree_item {
      font-weight: bold;
      // margin-right: 0.1rem;
      color: #409eff;
    }
    .el-tree {
      display: inline-block;
      min-width: 100%;
      .el-tree-node__content {
        padding-right: 1rem;
        border-radius: 4px;
        overflow: hidden;
        // border-bottom: 1px solid red;
      }
    }
    .tree {
      width: 100%;
      overflow-x: auto;
    }
  }
}
</style>
