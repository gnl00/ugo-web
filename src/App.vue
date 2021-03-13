<template>

  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive exclude="Detail" >
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <main-tabbar></main-tabbar>
</template>

<script>

import MainTabbar from "@/components/content/mainTabbar/MainTabbar";

export default {
  name: 'App',
  components: {
    MainTabbar,
  }
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