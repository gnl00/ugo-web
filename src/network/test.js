import { request } from './request'

export function hello() {
  return request({
    url: '/test/hello'
  })
}