import { ref } from 'vue'

/**
 * 表格相关逻辑
 * @param {Function} fetchTableData 请求表格数据接口函数
 * @param {Boolean} isPages 是否为分页显示（因为分页和不分页后端接口返回数据结构不一致，需要区分以便获得tableData数据等）
 */
export const tableEffect = (fetchTableData, isPages = true) => {
  const total = ref(0)
  const tableData = ref([])
  const loading = ref(false)

  // 获取表格数据
  const __fetchTableData = (filterParams, pageConfig) => {
    loading.value = true
    fetchTableData({ data: { ...filterParams }, ...pageConfig }).then(res => {
      if (!res.data.failed) {
        if (isPages) {
          // 分页数据取res.data.records
          total.value = res.data.totalElements
          tableData.value = res.data.content
        } else {
          // 不分页数据取res.data
          total.value = res.data.length
          tableData.value = res.data
        }
      }
      loading.value = false
    })
  }
  return { loading, total, tableData, __fetchTableData }
}

export default tableEffect
