<template>
  <div id="login" class="login">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default >用户登录</template>
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

        <div style="margin: 16px;">
          <van-button round block type="info" style="background-color: #39a9ed; color: white; border: 1px solid #39a9ed; font-size: 16px" native-type="submit">确认登录</van-button>
          <div class="link-login" @click="$router.push({path: '/register'})">
            <span>没有账号，立即注册</span>
          </div>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

import { Toast,Notify } from 'vant';

import {encoded} from '@/util/passowrdUtils'

import {login} from "@/network/user";

import {SETISLOGIN} from "@/store/mutations-types";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Login",
  components: {Navbar},
  setup() {

    const router = useRouter();
    const store = useStore();

    const user_info = reactive({
      username: '',
      password: ''
    })

    const onSubmit = () => {

      let rawPassword = user_info.password
      user_info.password = encoded(rawPassword)

      login(user_info).then(res => {
        // console.log(res)

        if (res.code == 200) {
          // 登录成功

          // 1. 将token保存到 window.localStorage setItem(key, value) getItem(key)
          // 2. vuex设置变量 isLogin
          window.localStorage.setItem('ugo_token', res.data)
          store.commit(SETISLOGIN, true)

          Toast.success("登录成功！")

          // 将密码置空
          user_info.password = ''

          setTimeout(() => {
            router.push({
              path: '/'
            })
          }, 500)

        } else {
          Notify(res.msg)
        }

      }).catch(err => {
        console.log(err)
      })
    }

    return {
      ...toRefs(user_info),
      onSubmit
    }
  }
}
</script>

<style scoped lang="scss">
#login {
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