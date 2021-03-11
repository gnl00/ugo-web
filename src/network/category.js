import {request} from "@/network/request";

export function getAllCategories() {
  return request({
    url: '/cat/all',
  })
}

export function getGoodsBySort(category_id, sort) {
  return request({
    url: '/goo/sort',
    params: {
      category: category_id,
      sort
    }
  })
}