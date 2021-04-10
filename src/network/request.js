import { Notify, Toast } from 'vant';

import axios from "axios";

import router from '../router'
import store from '@/store/index'

export function request(config) {
  // 1. 创建实例
  const instance = axios.create({
    baseURL: 'http://localhost:8888/ugo/',
    timeout: 5000
  })

  // 2. 添加拦截器
  //    1. 修改请求头中不符合服务器要求的项
  //    2. 发送网络请求时，显示加载动画，开始请求时开启，响应后关闭

  // 请求拦截 1. 请求成功 2. 请求失败
  instance.interceptors.request.use(
    config => {
      // console.log('请求成功',config)

      const token = window.localStorage.getItem('ugo_token')
      // console.log('token', token)
      if (token) {
        // console.log('setting header now...')
        config.headers['Authorization'] = 'Bearer ' + token
      }

      // 拦截处理做完之后需要 return 放行请求
      return config
  },err => {
      // console.log('请求失败',err)
  })
  // 响应拦截 1. 响应成功 2. 响应失败
  instance.interceptors.response.use(
    res => {
      // console.log('响应成功',res)

      if(res.data.msg == '登录身份过期，请重新登录') {

        window.localStorage.setItem('ugo_token', '')

        Toast.fail(res.data.msg)

        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }

      // if (res.data.code != 200) {
      //   console.log('12333')
      //   Toast.fail(res.data.msg)
      // }

      // 只需要返回data数据即可
      return res.data
    }, err => {
      // console.log('响应失败',err)

      if (err.response.statusCode != 200) {
        Toast.fail(err.response.statusText)
      }

      // 处理服务器校验返回结果
      // console.log(err.response.data.errors)
      // Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    }
  )

  // 3. 发送请求
  return instance(config)
}