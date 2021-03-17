import {request} from "@/network/request";

// 查看所有订单
export function getOrders() {
  return request({
    url: '/ord',
    method: 'get'
  })
}

// 查看订单状态
export function orderStatus(orderId) {
  return request({
    url: '/ord/status/' + orderId,
  })
}

// 获取订单详情
export function getOrderDetail(orderId) {
  return request({
    url: '/ord/detail/' + orderId,
  })
}

// 创建订单
export function createOrder() {
  return request({
    url: '/ord/create',
    method: 'post'
  })
}

// 订单支付，获取支付二维码
export function orderPayment(orderId, params) {
  return request({
    url: '/ord/pay/' + orderId,
    params
  })
}

//删除订单
export function delOrder(orderId) {
  return request({
    url: '/ord/' + orderId,
    method: 'delete'
  })
}