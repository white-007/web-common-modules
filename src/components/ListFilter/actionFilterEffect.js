const actionFilterEffect = (listFilterItemRefs, props, emit, fold) => {
  const getFilterData = () => {
    let params = {}
    listFilterItemRefs.value.forEach(el => {
      const key = el.item.code
      const v = el.itemCode
      if (!props.noEmpty) {
        params[key] = v
      } else {
        if (!v && v !== 0) {
          // 空值不返回
          return false
        } else {
          if (Array.isArray(v) && !v.length) {
            // 空数组不返回
            return false
          } else if (el.item.type === 'datePicker' && el.item.elCompAttrs.type === 'daterange') {
            params[key[0]] = v[0]
            params[key[1]] = v[1]
          } else {
            params[key] = v
          }
        }
      }
    })
    fold.value = false
    return params
  }

  const getFilterParams = () => {
    const params = getFilterData()
    emit('getFilterParams', params)
  }

  const reset = () => {
    listFilterItemRefs.value.forEach(el => {
      el.resetValue() // 调用item子组件的resetValue方法清空输入值
    })
    fold.value = false
    emit('resetSuccess')
  }
  return { getFilterParams, getFilterData, reset }
}

export default actionFilterEffect
