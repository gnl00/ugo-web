<template>
  <div id="profile" class="profile">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>Profile</template>
      <template v-slot:right>
        <i class="iconfont icon-shezhi"></i>
      </template>
    </navbar>

    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <van-button round block type="danger" @click="logoutClick">退出登录</van-button>

    <h1>profile page</h1>
    <div>
      <img src="~assets/images/9.jpg">
      <img src="~assets/images/10.jpg">
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

import {Toast} from 'vant'

import {logout} from "@/network/user";

import Navbar from "@/components/content/navbar/Navbar";
export default {
name: "Profile",
  components: {Navbar},
  setup() {

    const router = useRouter;

    const logoutClick = () => {
      logout().then(res => {
        console.log(res)

        if (res.code == 200) {

          // 删除本地localStorage中的token
          window.localStorage.setItem('ugo_token', '')

          // vuex中isLogin设置false

          Toast.success("退出成功~")

          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 2000)

        }

      }).catch(err => {
        console.log(err)
      })
    }

    return {
      logoutClick
    }
  }
}
</script>

<style scoped lang="scss">

.profile {

  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }

}

</style>