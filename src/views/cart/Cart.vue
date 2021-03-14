<template>
  <div id="cart" class="cart">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>购物车管理</template>
      <template v-slot:right>
        <i class="iconfont icon-bianji"></i>
      </template>
    </navbar>

    <div id="content" class="content">
      <van-swipe-cell>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>

    <h1>cart page</h1>
    <div>
      <img src="~assets/images/7.jpg">
      <img src="~assets/images/8.jpg">
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Cart",
  components: {Navbar}
}
</script>

<style scoped lang="scss">

.cart {

  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }
}

</style>
<style lang="scss">
.goods-card {
  margin-top: 10px;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>