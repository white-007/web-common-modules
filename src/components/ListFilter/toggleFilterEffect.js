import { ref, onMounted, onActivated, watch } from 'vue'

const hasFold = ref(false) // 是否折叠
const foldText = ref('查看更多条件')
const foldMinHeight = ref('40px')
const foldCurrentHeight = ref('40px')

const toggleFilterEffect = (listFilterRefs, fold) => {
  // 设置初始加载时是否显示折叠按钮
  const setHasFold = () => {
    const fullHeight = listFilterRefs.value.scrollHeight
    if (fullHeight > foldMinHeight.value.split('px')[0] * 1) {
      hasFold.value = true
    } else {
      hasFold.value = false
    }
  }

  const toggleFilters = () => {
    fold.value = !fold.value
  }
  onMounted(() => {
    listFilterRefs.value ? setHasFold() : false
    setHeight(fold.value)
  })

  // 若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用
  onActivated(() => {
    listFilterRefs.value ? setHasFold() : false
    setHeight(fold.value)
  })

  // 若组件实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用
  // onDeactivated(() => {
  //   console.log('deactivated')
  // })

  watch(fold, n => {
    setHeight(n)
  })

  const setHeight = n => {
    if (n) {
      foldCurrentHeight.value = 'auto'
      foldText.value = '收起条件 '
    } else {
      foldCurrentHeight.value = foldMinHeight.value
      foldText.value = '查看更多条件 '
    }
  }

  return { hasFold, foldText, foldCurrentHeight, toggleFilters }
}

export default toggleFilterEffect
