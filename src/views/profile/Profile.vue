<template>
  <div id="profile" class="profile">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>个人中心</template>
    </navbar>

    <div id="header" class="header" style="padding-bottom: 10px">
      <van-tag round size="big" style="margin-right: 5px" type="danger">VIP5</van-tag>

      <van-image
          round
          fit="cover"
          width="10rem"
          height="10rem"
          :src="require('@/assets/images/1.jpg')"
      />

      <van-tag plain type="warning">购物达人</van-tag>


    </div>

    <van-grid class="order" :gutter="1">
      <van-grid-item icon="balance-list-o" text="待付款"/>
      <van-grid-item icon="clock-o" text="待发货"/>
      <van-grid-item icon="todo-list-o" text="待收货"/>
      <van-grid-item icon="label-o" text="订单管理" @click="goTo('/order')" />

    </van-grid>


    <van-grid class="feature" :gutter="1">

      <van-grid-item icon="star-o" text="收藏" @click="goTo('/collect')" />
      <van-grid-item icon="coupon-o" text="优惠券"/>
      <van-grid-item icon="browsing-history-o" text="最近访问"/>
      <van-grid-item icon="location-o" text="地址管理" @click="goTo('/address')" />

      <van-grid-item icon="shop-o" text="关注店铺"/>
      <van-grid-item icon="phone-o" text="售后"/>
      <van-grid-item icon="user-o" text="客服"/>
      <van-grid-item icon="setting-o" text="账号管理"/>

    </van-grid>

    <van-button round block type="danger" @click="logoutClick" :disabled="!allowLogoutClick">退出登录</van-button>


  </div>
</template>

<script>
import {ref, reactive, toRefs, onMounted, onUpdated, watchEffect} from 'vue'
import {useRouter} from 'vue-router'

import {useStore} from 'vuex'

import {Toast} from 'vant'

import {logout} from "@/network/user";

import {SETISLOGIN, ADDTOCART} from "@/store/mutations-types";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Profile",
  data() {
    return {}
  },
  components: {Navbar},
  setup: function () {

    const router = useRouter();
    const store = useStore();

    const state = reactive({
      user: {}
    })

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
          store.commit(ADDTOCART, 0)

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

    const goTo = (path) => {
      router.push({
        path: path
      })
    }

    return {
      ...toRefs(state),
      allowLogoutClick,
      logoutClick,
      goTo
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
  margin-top: 55px;
  margin-bottom: 10px;
  padding-top: 5px;
  border-radius: 10px;
}


.order {
  margin-top: 10px;
  margin-bottom: 10px;

}

.van-button {
  margin-top: 20px;
}
</style>
<style lang="scss">
.van-image {
  margin-bottom: 15px;
}

.van-progress {
  margin-bottom: 15px;
}
</style>