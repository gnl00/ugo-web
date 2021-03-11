<template>
  <div id="profile" class="profile">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>Category</template>
      <template v-slot:right>
        <i class="iconfont icon-shezhi"></i>
      </template>
    </navbar>

    <div>
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>

    <h1>profile page</h1>
    <div>
      <img src="~assets/images/9.jpg">
      <img src="~assets/images/10.jpg">
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/content/navbar/Navbar";
export default {
name: "Profile",
  components: {Navbar}
}
</script>

<style scoped lang="scss">

.profile {

  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }

}

</style>