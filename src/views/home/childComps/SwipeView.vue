<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="~assets/images/swipe/swipe-1.jpg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="~assets/images/swipe/swipe-2.jpg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="~assets/images/swipe/swipe-3.jpg">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "SwipeView"
}
</script>

<style scoped lang="scss">
.my-swipe, van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 15px;
  text-align: center;
  background-color: #39a9ed;
}

.van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>