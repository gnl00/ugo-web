<template>
<div id="register" class="register">
  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default >用户注册</template>
  </navbar>

  <div class="content">
    <van-image
        width="100"
        height="100"
        :src="require('assets/images/logo.png')"
    />

    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="password_confirm"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="email"
          type="email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" style="background-color: #39a9ed; color: white; border: 1px solid #39a9ed; font-size: 16px" native-type="submit">提交</van-button>
        <div class="link-login" @click="$router.push({path: '/login'})">
          <span>已有账号，立即登录</span>
        </div>
      </div>
    </van-form>
  </div>
</div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'

import { Notify,Toast } from 'vant';

import {encoded} from '@/util/passowrdUtils'

import {register} from "@/network/user";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Register",
  components: {Navbar},
  setup() {

    const router = useRouter();

    const user_info = reactive({
      username: '',
      password: '',
      password_confirm: '',
      email: ''
    })

    const onSubmit = (values) => {
      // console.log(values)

      if (user_info.password != user_info.password_confirm) {
        Notify('两次密码不一致!');
        return false;
      } else {
        let rawPassword = user_info.password
        user_info.password = encoded(rawPassword)
        register(user_info).then(res => {

          if (res.code == 200){
            Toast.success("注册成功！")

            user_info.password = ''
            user_info.password_confirm = ''

            setTimeout(() => {
              router.push({
                path: '/login'
              })
            }, 500)

          }

        }).catch(err => {
          console.log(err)
        })
      }

      // console.log(user_info)
    }

    return {
      ...toRefs(user_info),
      onSubmit,
    }

  }
}
</script>

<style scoped lang="scss">
#register {
  margin-top: var(--navbar-height);
}

.content {
  text-align: center;
}

.link-login {
  font-size: 14px;
  margin-top: 10px;
  color: var(--color-text);
  text-decoration: underline;

}
</style>