<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="aboutLogin">login1</button><br><br>
    <button @click="aboutLogin2">login2</button><br>
  </div>
</template>

<script>
import { hello } from "@/network/test";
import { login } from "@/network/user";

export default {

  name: 'About',
  methods: {
    aboutHello() {
      hello().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    aboutLogin() {
      login('ww', '123456').then(res => {

        // 将返回的token用vuex进行状态管理

      }).catch(err => {
        console.log(err)
      })
    },
    aboutLogin2() {
      login('zss', '123456').then(res => {

        // 将返回的token用vuex进行状态管理

      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.aboutHello()
  }

}

</script>
