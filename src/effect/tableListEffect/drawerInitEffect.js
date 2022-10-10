import { ref } from 'vue'
/**
 * 初始化Drawer
 * @param {function} fetchDrawerDetail 获取详情数据接口方法，不请求详数据情则传null
 * @param {Number, String} detailId 详情项id的key值，用于从table row中筛选出此行数据的id值，fetchDrawerDetail方法需要此id
 * @param {Boolean} loading 表格页加载状态
 * @param {String} drawerName drawer名称
 * @returns
 */
const drawerInitEffect = (fetchDrawerDetail, detailId, loading, drawerName) => {
  const drawerState = ref(false)
  const drawerType = ref('')
  const drawerTypeText = ref('')
  const drawerDetail = ref(null)
  // 新增处理
  const addHandle = () => {
    drawerState.value = true
    drawerType.value = 'ADD'
    drawerTypeText.value = `新建${drawerName}`
  }
  // 编辑处理
  const editHandle = row => {
    if (fetchDrawerDetail) {
      loading.value = true
      fetchDrawerDetail(row[detailId]).then(res => {
        drawerState.value = true
        drawerType.value = 'EDIT'
        drawerDetail.value = res.data
        drawerTypeText.value = `编辑${drawerName}`
        loading.value = false
      })
    } else {
      drawerState.value = true
      drawerType.value = 'EDIT'
      drawerTypeText.value = `编辑${drawerName}`
    }
  }
  // 详情处理
  const detailHandle = row => {
    if (fetchDrawerDetail) {
      loading.value = true
      fetchDrawerDetail(row[detailId])
        .then(res => {
          drawerState.value = true
          drawerType.value = 'DETAIL'
          drawerDetail.value = res.data
          drawerTypeText.value = `${drawerName}详情`
          loading.value = false
        })
        .catch(err => {
          loading.value = false
          console.log(err)
        })
    } else {
      drawerState.value = true
      drawerType.value = 'DETAIL'
      drawerTypeText.value = `${drawerName}详情`
    }
  }
  // 关闭drawer处理
  const drawerClose = () => {
    drawerState.value = false
    drawerDetail.value = null
  }

  return {
    drawerState,
    drawerType,
    drawerTypeText,
    drawerDetail,
    addHandle,
    editHandle,
    detailHandle,
    drawerClose
  }
}

export default drawerInitEffect
