import {request} from "@/network/request";

export function getHomeAllData() {
  return request({
    url: '/goo/index',
    method: 'get'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '',
    params: {
      type: type,
      page: page
    }
  })
}