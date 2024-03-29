import { request } from "@/network/request";

// 查看地址
export function getAddress() {
  return request({
    url: '/add',
  })
}

export function getAddressByAddressId(id) {
  return request({
    url: '/add/' + id
  })
}

// 添加或修改地址
export function addAddress(data) {
  return request({
    url: '/add',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 获取到默认地址
export function getDefaultAddress() {
  return request({
    url: '/add/default'
  })
}

export function delAddress(id) {
  return request({
    url: '/add/del/' + id,
    method: 'delete'
  })
}