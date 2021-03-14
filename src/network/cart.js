import {request} from "@/network/request";

// 获取购物车列表
export function getCart() {
  return request({
    url: '/cart'
  })
}

// 新增购物车条目
export function addCart(goodsId, num) {
  return request({
    url: '/cart/',
    method: 'post',
    data: {
      goodsId,
      num
    }
  })
}

// 修改购物车信息
export function modify(cusId,goodsId, num) {
  return request({
    url: '',
    methods: 'put',
    data: {
      cusId,
      goodsId,
      num
    }
  })
}

// 选择商品的状态
export function checkCart(data) {
  return request({
    url: '',
    data
  })
}

export function delCartItem(cusId, goodsId) {
  return request({
    url: '',
    methods: 'delete',
    data: {
      cusId,
      goodsId
    }
  })
}