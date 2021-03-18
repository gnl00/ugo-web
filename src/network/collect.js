import {request} from "@/network/request";

export function getAllCollections() {
  return request({
    url: '/col/all'
  })
}

export function addCollection(goodsId) {
  return request({
    url: '/col/add/' + goodsId,
    method: 'post'
  })
}

export function removeCollection(goodsId) {
  return request({
    url: '/col/rm/' + goodsId,
    method: 'delete'
  })
}