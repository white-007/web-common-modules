/**
 * Vue directive v-debounce
 * Prevent multiple duplicate submissions
 * @author Liu Xue <286714772@qq.com>
 */

const debounce = {
  mounted(el, binding) {
    const delay = binding.arg || 1000
    let timer = null

    el.addEventListener('click', () => {
      el.setAttribute('disabled', 'disabled')
      el.className += ' is-disabled'
      if (timer) {
        clearTimeout(timer)
      }
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
        el.removeAttribute('disabled')
        el.className = el.className.split(' is-disabled')[0]
      }, delay)
      if (callNow) {
        binding.value()
      }
    })
  }
}

export default debounce
