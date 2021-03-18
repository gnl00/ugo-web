<template>
<div id="order" class="order">

  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default>订单管理</template>
  </navbar>

  <van-tabs v-model="active" @click="tabClick">
    <van-tab title="全部"></van-tab>
    <van-tab title="待付款"></van-tab>
    <van-tab title="已支付"></van-tab>
    <van-tab title="已完成"></van-tab>
    <van-tab title="过期"></van-tab>
  </van-tabs>

  <div id="content" class="content">

  </div>

</div>
</template>

<script>
import {ref, reactive, toRefs, onMounted} from 'vue'

import Navbar from "@/components/content/navbar/Navbar";
export default {
  name: "Order",
  components: {Navbar},
  setup() {

    const active = ref(2)

    const tabClick = (index) => {
      console.log('tabClick...', index)
    }

    return {
      active,
      tabClick
    }
  }
}
</script>

<style scoped lang="scss">

#order {
  margin-top: var(--navbar-height);
}

</style>