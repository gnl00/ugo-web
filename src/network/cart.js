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
export function modifyCart(cartId, num) {
  return request({
    url: '/cart/' + cartId,
    method: 'put',
    data: {
      num
    }
  })
}

// 选择商品的状态
export function checkCart(data) {
  return request({
    url: '/cart/check',
    method: 'patch',
    data
  })
}

export function delCartItem(cartId) {
  return request({
    url: '/cart',
    method: 'delete',
    data: {
      cartId
    }
  })
}