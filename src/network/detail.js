import {request} from "@/network/request";

export function getGoodsById(goods_id) {
  return request({
    url: '/goo/' + goods_id,
  })
}