<template>
  <div class="goods-item">
    <img :src="product.picture" :alt="product.goods.name">
    <div class="goods-info">
      <p>{{product.goods.name}}</p>
      <span class="price"><small>￥</small>{{product.goods.price}}</span>
      <span class="collect"><i class="iconfont icon-shoucang"></i>&nbsp;{{product.goods.collect}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
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
</style>