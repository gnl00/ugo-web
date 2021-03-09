import axios from "axios";
import store from '@/store/index'

export function request(config) {
  // 1. 创建实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/ugo/',
    timeout: 5000,
  })

  // 2. 添加拦截器
  //    1. 修改请求头中不符合服务器要求的项
  //    2. 发送网络请求时，显示加载动画，开始请求时开启，响应后关闭
  //    3. 某些网络请求需要携带token，需要拦截请求添加
  // 请求拦截 1. 请求成功 2. 请求失败
  instance.interceptors.request.use(
    config => {
      // console.log('请求成功',config)

      // console.log(store.state.num)

      // 拦截处理做完之后需要 return 放行请求
      return config
  },err => {
      // console.log('请求失败',err)
  })
  // 响应拦截 1. 响应成功 2. 响应失败
  instance.interceptors.response.use(
    res => {
      // console.log('响应成功',res)

      if (res.config.url.endsWith('login')){
        let token = res.data.data
        console.log('oldToken', store.state.token)
        console.log('newToken', token)
        store.commit('setToken', token)
        res.data.data = null
      }

      // 只需要返回data数据即可
      return res.data
    }, err => {
      // console.log('响应失败',err)
    }
  )

  // 3. 发送请求
  return instance(config)
}