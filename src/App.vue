<template>

  <router-view v-slot="{ Component }" :key="key" >
    <transition>
      <keep-alive exclude="Detail,Search,Cart,Address,AddressEdit,Collect" >
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <main-tabbar></main-tabbar>
</template>

<script>
import {ref, computed} from 'vue'
import {useRoute} from 'vue-router'

import MainTabbar from "@/components/content/mainTabbar/MainTabbar";

export default {
  name: 'App',
  components: {
    MainTabbar,
  },
  setup() {

    const route = useRoute();

    const key = computed(() => {
      return route.name !== undefined ? route.name + new Date():route + new Date()
    })

    return {key}
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