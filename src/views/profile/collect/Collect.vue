<template>
<div id="collect" class="collect">
  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default>商品收藏</template>
  </navbar>

  <div id="content" class="content">

    <van-swipe-cell v-for="(item, index) in collectList">
      <template #left>
        <van-button square text="加购" type="primary" class="swipe-button" @click="collectAddCart" />
      </template>
      <van-card
          :price="Number(item.price).toFixed(2)"
          :title="item.goodsName"
          :thumb="item.picture[0]"
          class="goods-card"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="swipe-button" @click="collectDelete" />
      </template>
    </van-swipe-cell>

  </div>

</div>
</template>

<script>
import {reactive, toRefs, onMounted} from 'vue'

import {getAllCollections} from "@/network/collect";

import {Toast} from 'vant'

import Navbar from "@/components/content/navbar/Navbar";
import {logout} from "@/network/user";
export default {
  name: "Collect",
  components: {Navbar},
  setup() {

    const state = reactive({
      collectList: []
    })

    const getCollections = () => {
      getAllCollections().then(res => {
        console.log(res)

        if (res.code === 200) {
          if (res.data == '' || res.data == null) {
            Toast.fail('暂无收藏~')
          } else {
            state.collectList = res.data
          }
        }

      }).catch(err => {
        console.log(err)
      })
    }

    onMounted(() => {
      getCollections()
    })

    const collectAddCart = () => {
      Toast.success('加入购物车成功')
    }

    const collectDelete = () => {
      Toast.success('删除成功')
    }

    return {
      ...toRefs(state),
      collectAddCart,
      collectDelete
    }

  }
}
</script>

<style scoped lang="scss">

#content {
  margin-top: var(--navbar-height);
  margin-bottom: calc(var(--navbar-height) + 10px);
}

.swipe-button {
  height: 100%;
}

</style>