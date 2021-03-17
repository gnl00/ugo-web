<template>
  <div id="detail" class="detail">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>商品详情 | {{ goods.info.name }}</template>
    </navbar>

    <van-image
        width="100%"
        lazy-load
        :src="goods.picture[0]"
    />

    <van-card
        :price="Number(goods.info.price).toFixed(2)"
        :num="goods.info.amount"
        desc=""
        :title="goods.info.name"
    >
      <template #tags>
        <van-tag plain type="danger">热门</van-tag>
        <van-tag plain type="danger">新品</van-tag>
      </template>
    </van-card>

    <van-tabs class="detail-menu" v-model="active">
      <van-tab title="商品概述">
        <div class="goods-detail" v-html="goods.info.description"/>
      </van-tab>
      <van-tab title="相似商品">
        <div class="goods-similar">
          <goods-list :goods="goods.similar"></goods-list>
        </div>
      </van-tab>
    </van-tabs>

    <van-submit-bar label="单价：" :price="goods.info.price * 100" button-text="加入购物车" @submit="addCartClick(goods.info.id)" >
      <div style="display: flex">
        <div class="shop" @click="shopClick" style="flex: 1; margin-right: 15px" >
          <div>
            <i class="iconfont icon-dianpu" style="font-size: 20px"></i>
          </div>
          <div>
            <span style="font-size: 13px">店铺</span>
          </div>
        </div>
        <div class="service" @click="serviceClick" style="flex: 1; margin-right: 15px" >
          <div>
            <i class="iconfont icon-buoumaotubiao10" style="font-size: 20px"></i>
          </div>
          <div><span style="font-size: 13px">客服</span></div>
        </div>
        <div class="collect" @click="collectClick(goods.info.id)" style="flex: 1" >
          <div>
            <i class="iconfont icon-love-b" :class="{collected: collectStatus}" style="font-size: 20px"></i>
          </div>
          <div>
            <span style="font-size: 13px">收藏</span>
          </div>
        </div>
      </div>
    </van-submit-bar>


  </div>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

import {Toast} from 'vant'

import {getGoodsById} from "@/network/detail";
import {addCart} from "@/network/cart";

import Navbar from "@/components/content/navbar/Navbar";
import GoodsList from "@/components/content/goods/GoodsList";

export default {
  name: "Detail",
  components: {GoodsList, Navbar},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    let goods_id = ref(0)

    const goods = reactive({
      info: {},
      picture: [],
      // 相似商品 即同一类别的商品
      similar: []
    })

    const active = ref(1)

    onMounted(() => {

      document.documentElement.scrollTop = 0

      // 获取到跳转到当前页面的goods_id
      goods_id.value = route.query.id

      getGoodsById(goods_id.value).then(res => {
        // console.log(res)
        goods.info = res.data.goods
        goods.picture = res.data.picture
        goods.similar = res.data.similar

      }).catch(err => {
        console.log(err)
      })

    })

    const collectStatus = ref(false);

    const collectClick = (goodsId) => {

      if (store.state.user.isLogin) {
        collectStatus.value = !collectStatus.value
        if (collectStatus.value) {
          Toast('收藏成功！')
        } else {
          Toast('取消收藏成功！')
        }
      } else {
        Toast.fail("请先登录")
      }


    }

    const shopClick = () => {
      Toast('店铺功能努力开发中...')
    }

    const serviceClick = () => {
      Toast('客服功能努力开发中...')
    }

    const addCartClick = (goodsId) => {

      if (store.state.user.isLogin) {
        addCart(goodsId, 1).then(res => {
          // console.log(res)

          if (res.code == 200) {

            store.dispatch('updateCartCount')

            Toast('商品加入购物车成功！')
          }

        }).catch(err => {
          console.log(err)
        })
      } else {
        Toast.fail("请先登录")
      }

    }

    const buyNowClick = (goodsId) => {
      if (store.state.user.isLogin) {
        Toast.loading('正在处理中...')
      } else {
        Toast.fail("请先登录")
      }
    }

    return {
      active,
      goods_id,
      goods,
      collectClick,
      collectStatus,
      shopClick,
      serviceClick,
      addCartClick,
      buyNowClick
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

.detail-menu {
  position: absolute;
  width: 100%;
}

.goods-similar, .goods-detail {
  margin-bottom: 80px;
}

.van-submit-bar {
  margin-bottom: 50px;
  z-index: 8;
}

.collected {
  color: #eec705;
  background-color: #eec705;
}

</style>
<style lang="scss">

.center {
  overflow: hidden;
  text-overflow: ellipsis;
}

.van-card {
  text-align: left;
}

.van-tabs {
  background-color: white;
  margin-bottom: 95px
}

.van-card__bottom {
  .van-card__price {
    color: red;

    .van-card__price-integer {
      font-size: 20px;
    }

  }
}
</style>