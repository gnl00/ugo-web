<template>
<div id="order" class="order">

  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default>订单管理</template>
  </navbar>

  <h1>this is order page</h1>
</div>
</template>

<script>
import Navbar from "@/components/content/navbar/Navbar";
export default {
  name: "Order",
  components: {Navbar}
}
</script>

<style scoped lang="scss">

#order {
  margin-top: var(--navbar-height);
}

</style>