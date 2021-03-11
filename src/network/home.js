import {request} from "@/network/request";

export function getHomeAllData(type = 'hot', page = 1) {
  return request({
    url: '/goo/index?type=' + type + "&page=" + page,
    method: 'get'
  })
}

export function searchGoods(keyword) {
  return request({
    url: '/goo/search',
    method: 'get',
    params: {
      keyword
    }
  })
}