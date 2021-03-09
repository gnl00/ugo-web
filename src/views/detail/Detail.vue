<template>
  <div>
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>商品详情</template>
      <template v-slot:right>
        <i class="iconfont icon-dianpu"></i>
      </template>
    </navbar>
  </div>
  <div class="detail">
    <h1>detail page</h1>
    <div>
      当前商品id: {{goods_id}}
    </div>
    <div>
      <img src="~assets/images/5.jpg">
      <img src="~assets/images/6.jpg">
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRoute} from 'vue-router'

import Navbar from "@/components/content/navbar/Navbar";


export default {
  name: "Detail",
  components: {Navbar},
  setup() {
    const route = useRoute();

    let goods_id = ref(0)

    goods_id.value = route.query.goods_id

    return {
      goods_id
    }
  }
}
</script>

<style scoped lang="scss">

.detail {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }
}

</style>