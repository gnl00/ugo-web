import {request} from "@/network/request";

export function searchGoods(keyword, order = 'default') {
  return request({
    url: '/goo/search',
    method: 'get',
    params: {
      keyword,
      order
    }
  })
}