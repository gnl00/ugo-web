import { request } from "@/network/request";

export function hello() {
  return request({
    url: '/test/hello'
  })
}

export function register(user) {
  return request({
    url: '/cus/register',
    method: 'post',
    data: {
      ...user
    }
  })
}

export function login(user) {
  return request({
    url: '/cus/login',
    method: 'post',
    data: {
      username: user.username,
      password: user.password
    }
  })
}

export function logout() {
  return request({
    url: '/cus/logout',
    method: 'post'
  })
}