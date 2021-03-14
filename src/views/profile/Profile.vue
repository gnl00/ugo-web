<template>
  <div id="profile" class="profile">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>个人中心</template>
      <template v-slot:right>
        <i class="iconfont icon-shezhi"></i>
      </template>
    </navbar>

    <div id="header" class="header">

      <van-row>
        <van-col span="12">
          <van-image
              round
              fit="cover"
              width="10rem"
              height="10rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-col>
        <van-col span="12">
          <van-col span="12">
            <van-tag round  size="big" style="margin-right: 5px" type="danger">VIP5</van-tag>
            <van-tag plain type="warning">购物达人</van-tag>
          </van-col>

        </van-col>
      </van-row>



      <van-progress :percentage="78" stroke-width="8" />

    </div>

    <van-grid class="order" :gutter="1">

      <van-grid-item icon="balance-list-o" text="待付款" />
      <van-grid-item icon="clock-o" text="待发货" />
      <van-grid-item icon="todo-list-o" text="待收货" />
      <van-grid-item icon="comment-circle-o" text="评价" />

    </van-grid>


    <van-grid :gutter="1">

      <van-grid-item icon="chat-o" text="消息" />
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="coupon-o" text="优惠券" />
      <van-grid-item icon="browsing-history-o" text="最近访问" />

      <van-grid-item icon="gem-o" text="钱包" />
      <van-grid-item icon="shop-o" text="关注店铺" />
      <van-grid-item icon="phone-o" text="售后" />
      <van-grid-item icon="user-o" text="客服" />
    </van-grid>

    <van-button round block type="danger" @click="logoutClick" :disabled="!allowLogoutClick">退出登录</van-button>

    <h1>profile page</h1>
    <button @click="helloClick">helloClick</button>
    <div>
      <img src="~assets/images/9.jpg">
      <img src="~assets/images/10.jpg">
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUpdated, watchEffect} from 'vue'
import {useRouter} from 'vue-router'

import {useStore} from 'vuex'

import {Toast} from 'vant'

import {logout,hello} from "@/network/user";

import {SETISLOGIN} from "@/store/mutations-types";

import Navbar from "@/components/content/navbar/Navbar";

export default {
name: "Profile",
  data() {
    return {
    }
  },
  components: {Navbar},
  setup: function () {

    const router = useRouter();
    const store = useStore();

    const allowLogoutClick = ref(false)

    const checkLoginStatus = () => {
      let token = window.localStorage.getItem('ugo_token')

      if (token) {
        // token存在 用户已登录
        allowLogoutClick.value = true;
      } else {
        // 用户未登录
        allowLogoutClick.value = false;
      }
    }

    const helloClick = () => {
      hello().then(res => {

      }).catch(err => {

      })
    }

    const logoutClick = () => {
      logout().then(res => {
        // console.log(res)

        if (res.code == 200) {

          // 删除本地localStorage中的token
          window.localStorage.setItem('ugo_token', '')
          // vuex中isLogin设置false
          store.commit(SETISLOGIN, false)

          Toast.success("退出成功~")

          checkLoginStatus()

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

    onMounted(() => {
      checkLoginStatus()
    })

    onUpdated(() => {
      checkLoginStatus()
    })

    return {
      allowLogoutClick,
      logoutClick,
      helloClick
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

#header {
  background-color: white;
  margin-top: 60px;
  margin-bottom: 10px;
  padding-top: 5px;
}

.order {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
<style lang="scss">
.van-image {
  margin-bottom: 15px;
}
.van-progress {
  margin-bottom: 15px;
}
.van-button {
  margin-top: 20px;
}
</style>