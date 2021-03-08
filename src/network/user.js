import { request } from "@/network/request";

export function login(name, password) {
  return request({
    url: '/cus/login',
    method: 'post',
    data: {
      name: name,
      password: password
    }
  })
}