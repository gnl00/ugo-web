<template>
  <!-- 导航栏 -->
  <navbar>
    <template v-slot:right>
      <i class="iconfont icon-gengduo"></i>
    </template>
  </navbar>

  <!-- 轮播图 -->
  <swipe-view class="banner"></swipe-view>

  <!-- 推荐视图 -->
  <recommend-view :recommends="recommends"></recommend-view>

  <!-- 首页选项卡 -->
  <tab-control :titles="['热门畅销', '今日新品', '历史精选']" @tab-click="tabCurrentIndex" ></tab-control>

  <goods-list></goods-list>

  <div class="home">
    <h1>home page</h1>
    <div id="div-img">
      <div>
        <img :src="img_src" alt="1">
      </div>
      <div>
        <img src="~assets/images/2.jpg" alt="2">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {onMounted, ref, reactive} from 'vue'
import {getHomeAllData} from "@/network/home";

import MainTabbar from "@/components/content/mainTabbar/MainTabbar";
import Navbar from "@/components/content/navbar/Navbar";
import RecommendView from "@/views/home/childComps/RecommendView";
import SwipeView from "@/views/home/childComps/SwipeView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";


export default {
  name: 'Home',
  data() {
    return {
      img_src: require('@/assets/images/1.jpg')
    }
  },
  setup() {

    const recommends = ref([])

    onMounted(() => {

      // 在挂载的时候执行方法
      getHomeAllData().then(res => {

        recommends.value = res.data

      }).catch(err => {
        console.log(err)
      })
    })

    // 声明一个临时tabId变量
    let temTabId = ref(0)

    const tabCurrentIndex = (index) => {
      temTabId.value = index
    }

    return {
      recommends,
      tabCurrentIndex,
      temTabId
    }
  },
  components: {
    GoodsList,
    TabControl,
    SwipeView,
    RecommendView,
    Navbar,
    MainTabbar
  }
}
</script>

<style scoped lang="scss">
$img_width: 100%;

.banner {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
    height: auto;
  }
}

.home {
  margin-top: var(--navbar-height);
}

#div-img {
  img {
    width: $img_width;
  }
}

</style>
