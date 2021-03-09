<template>
  <div class="goods">
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>
    <goods-list-item></goods-list-item>

  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {GoodsListItem}
}
</script>

<style scoped lang="scss">

.goods {
  padding: 5px;

  // flex 水平布局
  display: flex;
  // 水平放不下的话换行
  flex-wrap: wrap;
  // 内容占满
  justify-content: space-around;
}
</style>