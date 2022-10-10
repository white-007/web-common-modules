/**
 * Vue directive v-has
 * Element permission validation
 * @author Liu Xue <286714772@qq.com>
 */
import store from '@/store'

const has = {
  mounted(el, binding) {
    if (!hasElPermission(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
}

function hasElPermission(value) {
  const elPermission = store.getters.elPermission
  if (elPermission.includes(value)) {
    return true
  } else {
    return false
  }
}

export default has
