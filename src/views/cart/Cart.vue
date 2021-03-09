<template>
  <div>
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>Cart</template>
      <template v-slot:right>
        <i class="iconfont icon-bianji"></i>
      </template>
    </navbar>
  </div>
  <div class="cart">
    <h1>cart page</h1>
    <div>
      <img src="~assets/images/7.jpg">
      <img src="~assets/images/8.jpg">
    </div>
  </div>
</template>

<script>
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