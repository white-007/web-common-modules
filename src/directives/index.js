/**
 * @file 全局注册Vue公用自定义指令，directives的key值为自定义指令的名字，如下：{ has: has }, 对应的自定义指令为v-has
 * @author Liu Xue <286714772@qq.com>
 */
// import has from './has'
import debounce from './debounce'

const directives = {
  // has,
  debounce
}

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
