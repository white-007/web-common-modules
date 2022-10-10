import { ElMessage } from 'element-plus'
/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
export function deepCopy(obj, cache = []) {
  // typeof [] => 'object'
  // typeof {} => 'object'
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
  //
  // 类似下面这种
  // var a = {b:1}
  // a.c = a
  // 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
  //
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}

/**
 * ENABLED | DISABLED 状态类型互相转换
 * @param {*} status 状态 <Boolean | String>
 * @returns true | false or ENABLED | DISABLED
 */
export function statusTypeConversion(status) {
  if (typeof status === 'string') {
    let BOOL = false
    switch (status) {
      case 'ENABLED':
        BOOL = true
        break
      case 'DISABLED':
        BOOL = false
        break
      default:
        BOOL = false
    }
    return BOOL
  } else if (typeof status === 'boolean') {
    let desc = ''
    switch (status) {
      case true:
        desc = 'ENABLED'
        break
      case false:
        desc = 'DISABLED'
        break
      default:
        desc = 'DISABLED'
    }
    return desc
  } else {
    throw 'statusTypeConversion parameter type must be a string or a Boolean.'
  }
}

/**
 * 验证手机号
 *
 */
export function checkPhone(value) {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/
  return reg.test(value)
}

/***
 * 导出Excel
 * @param {*} total 总条数
 * @param {*} func 请求接口
 * @param {*} params 请求参数
 * @param {*} fileName 文件名
 */
export async function downLoadExcel(total, func, params, fileName) {
  if (total) {
    total < 100000
      ? func(params).then(data => downloadFile(data, fileName, 'xlsx'))
      : ElMessage.warning({
          message: '不能导出超过10万条数据',
          grouping: true,
          center: true
        })
  } else
    ElMessage.warning({
      message: '当前没有可导出数据',
      grouping: true,
      center: true
    })
}

/***
 * 下载文件
 * @param {*} data 文件流
 * @param {*} fileName 文件名
 * @param {*} type 文件类型
 */
export async function downloadFile(data, fileName, type) {
  const link = document.createElement('a')
  //    type就是blob的type,是MIME类型的，可以自己查看MIME类型都有哪些
  const blogw = new Blob([data.data], { type: `${type === 'xlsx' ? 'application/vnd.ms-excel;' : ''}charset=utf-8` })
  const objectUrl = window.URL.createObjectURL(blogw) //创建一个新的url对象
  link.href = objectUrl
  console.log(data)
  // link.download = fileName || decodeURI(data.contentDisposition.split('filename=').pop()) //  下载的时候自定义的文件名
  link.download = fileName || (type === 'xlsx' ? '导出列表' : '新文件') + (type ? `.${type}` : '') //  下载的时候自定义的文件名
  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(objectUrl)
}

/**
 * @description 格式化金额为千分位格式
 * @param {number} num 需要格式化的金额
 * @param {obj}  option配置对象,decimals最多保留几位小数,padEnd小数不够时是否填充0,delimiter千分位的填充符
 * @return {string}
 */
export function formatMoney(num, option = {}) {
  option = {
    decimals: 2,
    padEnd: false,
    delimiter: ',',
    ...option
  }
  if (isNaN(num)) return
  let numArr = (num + '').split('.')
  if (option.decimals) {
    if (numArr.length > 0) {
      num = Math.round(num * Math.pow(10, option.decimals)) / Math.pow(10, option.decimals)
      numArr = (num + '').split('.')
    }
    numArr[1] = numArr[1] || ''
    if (option.padEnd) numArr[1] = numArr[1].toString().padEnd(option.decimals, '0')
  }
  let intVal = numArr[0].replace(/\d(?=(?:\d{3})+\b)/g, `$&${option.delimiter}`)
  let floatVal = numArr[1] ? `.${numArr[1]}` : ''
  return intVal + floatVal
}
