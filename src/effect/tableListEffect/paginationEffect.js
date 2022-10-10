import { ref } from 'vue'
import { deepCopy } from '@/utils/tools'
import { globalPageConfig } from '@/utils/globalConfig'

/**
 * 分页相关逻辑
 */
const paginationEffect = () => {
  const pageConfig = ref(deepCopy(globalPageConfig))

  // 分页切换
  const paginationCurrentChange = pagination => {
    pageConfig.value.page = pagination
  }

  // 每页数量切换
  const paginationSizeChange = size => {
    pageConfig.value.size = size
  }

  // 重置当前分页为第一页
  const resetPagination = () => {
    pageConfig.value.page = 1
  }
  return { pageConfig, paginationCurrentChange, paginationSizeChange, resetPagination }
}

export default paginationEffect
