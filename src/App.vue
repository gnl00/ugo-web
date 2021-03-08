<template>
  <main-tabbar-from-vant></main-tabbar-from-vant>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
import MainTabbarFromVant from "@/components/content/mainTabbar/MainTabbarFromVant";
export default {
  components: {MainTabbarFromVant, MainTabbar}
}
</script>

<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>