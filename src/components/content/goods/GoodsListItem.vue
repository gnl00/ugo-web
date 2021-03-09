<template>
  <div class="goods-item">
    <img src="~assets/images/3.jpg" alt="">
    <div class="goods-info">
      <p>name</p>
      <span class="price"><small>￥</small>100.00</span>
      <span class="collect"><i class="iconfont icon-shoucang"></i> 3</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem"
}
</script>

<style scoped lang="scss">

.goods-item {
  width: 48%;
  padding-bottom: 20px;
  background-color: white;

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 14px;
    overflow: hidden;
    text-align: center;

    p {
      margin: 0 0 5px 0;
      padding: 0;
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
      font-size: 16px;
    }
  }
}
</style>