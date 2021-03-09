<template>
  <div>
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>Category</template>
      <template v-slot:right>
        <i class="iconfont icon-gengduo"></i>
      </template>
    </navbar>
  </div>
  <div class="category">
    <h1>category page</h1>
    <div>
      <img src="~assets/images/3.jpg">
      <img src="~assets/images/4.jpg">
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/content/navbar/Navbar";
export default {
  name: "Category",
  components: {Navbar}
}
</script>

<style scoped lang="scss">

.category {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }

}

</style>