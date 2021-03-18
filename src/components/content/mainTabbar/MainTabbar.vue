<template>
  <div id="nav">
    <router-link to="/" class="tab-bar-item">
      <div><i class="iconfont icon-shouye"></i></div>
      <div class="tab-bar-item-text">首页</div>
    </router-link>
    <router-link to="/category" class="tab-bar-item">
      <div><i class="iconfont icon-fenlei"></i></div>
      <div class="tab-bar-item-text">分类</div>
    </router-link>
    <router-link to="/cart" class="tab-bar-item">
      <div>
        <van-badge :content="$store.state.cart.count" :max="99">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div class="tab-bar-item-text">购物车</div>
    </router-link>
    <router-link to="/profile" class="tab-bar-item">
      <div><i class="iconfont icon-gerenzhongxin"></i></div>
      <div class="tab-bar-item-text">我的</div>
    </router-link>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: "MainTabbar",
  data() {
    return {
      active: 0,
      cartCount: store.state.cart.count
    };
  },
  components: {
  },
  updated() {
    this.cartCount = store.state.cart.count
  }
}
</script>

<style scoped lang="scss">

#nav {
  padding: 5px;
  background-color: #f6f6f6;
  // 水平排布
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100,100,100,.1);
  z-index: 9;

a {
  font-weight: bold;
  color: #2c3e50;

&.router-link-exact-active {
   color: #699cee;
 }
}

.tab-bar-item {
// 水平每个占一份
flex: 1;
  text-align: center;
// height: 50px;
  font-size: var(--font-size);
}
.tab-bar-item-text {
  margin-top: 5px;
}
}

</style>