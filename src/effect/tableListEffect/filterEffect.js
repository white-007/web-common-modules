import { ref } from 'vue'

/**
 * 筛选相关逻辑
 * @param {resetPagination} 重置当前分页函数
 */
const filterEffect = resetPagination => {
  const filterParams = ref({})

  // 查询
  const getFilterParams = params => {
    filterParams.value = params
    resetPagination()
  }

  // 重置
  const filterResetSuccess = cb => {
    filterParams.value = {}
    resetPagination()
    cb ? cb() : false
  }
  return { filterParams, getFilterParams, filterResetSuccess }
}

export default filterEffect
