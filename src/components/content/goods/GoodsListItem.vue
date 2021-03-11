<template>
  <div class="goods-item" @click="toGoodsDetail(product.goods.id)">
    <img v-lazy="product.picture[0]" :alt="product.goods.name">
    <div class="goods-info">
      <p>{{product.goods.name}}</p>
      <span class="price"><small>￥</small>{{product.goods.price.toFixed(2)}}</span>
      <span class="collect" @click.stop="collectClick">
        <i class="iconfont icon-shoucang" :class="{collected}"></i>&nbsp;{{product.goods.collect}}
      </span>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

import { Toast } from 'vant'

import { getPicture } from '@/network/home'


export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  setup(props) {

    const router = useRouter()

    const collected = ref(false)

    const collectClick = () => {
      // console.log('collected !')
      collected.value = !collected.value
      if (collected.value) {
        Toast('收藏成功！')
        props.product.goods.collect += 1

        // 发送网络请求
        // ...
      } else {
        Toast('取消收藏成功！')
        props.product.goods.collect -= 1
        // 发送网络请求
        // ...
      }

    }

    const toGoodsDetail = (goods_id) => {

      console.log(goods_id)
      router.push({
        path: '/detail',
        query: {
          goods_id
        }
      })
    }

    return {
      collected,
      collectClick,
      toGoodsDetail
    }
  },
  methods: {
  },
  mounted() {
    console.log('123333')
  }
}
</script>

<style scoped lang="scss">

.goods-item {
  width: 48%;
  padding-bottom: 20px;
  background-color: white;
  border-bottom: 5px solid #eeeeee;
  border-radius: 8px;

  img {
    width: 100%;
  }

  .goods-info {
    font-size: 14px;
    overflow: hidden;
    text-align: center;

    p {
      margin: 0 0 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      color: red;
      font-size: 16px;
      margin-right: 20px;
    }
    .collect {
      font-size: 15px;
    }
  }
}

.collected {
  color: #eec705;
}
</style>