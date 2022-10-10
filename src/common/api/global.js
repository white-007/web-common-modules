import request from '@/utils/request'
import { SHOP_MODULE } from '@/common/config'

/**
 * 目录树
 */
export function directoryTree() {
  return request({
    url: '/common/directory/tree',
    method: 'GET'
  })
}

/**
 * 所有人员
 */
export function staffAll() {
  return request({
    url: '/common/staff/all',
    method: 'GET'
  })
}

/**
 * 根据code获取枚举(ENUM)
 * 参考：http://paas-dev.huijifood.com:8080/swagger/swagger-ui.html?urls.primaryName=dxe-shop%3Adxe-shop#/
 */
export function fetchEnum(enumName) {
  const organizationId = 10
  return request({
    url: `${process.env.VUE_APP_BASE_HOST}${SHOP_MODULE}/v1/${organizationId}/enums/${enumName}`,
    method: 'GET'
  })
}
