<template>
  <div id="home">
    <!-- 导航栏 -->
    <navbar>
      <template v-slot:right>
        <i class="iconfont icon-gengduo"></i>
      </template>
    </navbar>

    <main-scroll>
      <!-- 轮播图 -->
      <swipe-view class="banner"></swipe-view>

      <!-- 推荐视图 -->
      <recommend-view :recommends="recommends"></recommend-view>

      <!-- 首页选项卡 -->
      <tab-control :titles="['热门畅销', '近日上新', '历史精选']" @tab-click="tabCurrentIndex" ></tab-control>

      <goods-list :goods="showGoods" ></goods-list>

    </main-scroll>

  </div>
</template>

<script>
// @ is an alias to /src
import {onMounted, ref, reactive, computed, watchEffect, nextTick } from 'vue'

import {getHomeAllData} from "@/network/home";

import {Toast} from "vant";

import MainTabbar from "@/components/content/mainTabbar/MainTabbar";
import Navbar from "@/components/content/navbar/Navbar";
import RecommendView from "@/views/home/childComps/RecommendView";
import SwipeView from "@/views/home/childComps/SwipeView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import MainScroll from "@/components/common/scroll/MainScroll";


export default {
  name: 'Home',
  data() {
    return {
      img_src: require('@/assets/images/1.jpg')
    }
  },
  setup() {

    const recommends = ref([])

    // 商品数据模型
    const goods = reactive({
      hot: {
        page: 1,
        list: []
      },
      new: {
        page: 1,
        list: []
      },
      history: {
        page: 1,
        list: []
      }
    })

    let currentType = ref('hot')

    // 接收子组件传回来的当前tabId
    const tabCurrentIndex = (index) => {

      let type = ['hot', 'new', 'history']
      currentType.value = type[index]

    }

    const showGoods = computed(() => {
      return goods[currentType.value].list
    })

    onMounted(() => {

      // 在挂载的时候执行方法
      getHomeAllData().then(res => {
        recommends.value = res.data.recommend
        goods.hot.list = res.data.home.data
        // console.log(home_goods.value)
      }).catch(err => {
        console.log(err)
      })

      getHomeAllData('new').then(res => {
        // console.log(res.data)
        goods.new.list = res.data.home.data
      }).catch(err => {
        console.log(err)
      })

      getHomeAllData('history').then(res => {
        // console.log(res.data)
        goods.history.list = res.data.home.data
      }).catch(err => {
        console.log(err)
      })



      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop + windowHeight == scrollHeight){

          console.log("到了底部");
          console.log(currentType.value)
          let nextPage = goods[currentType.value].page + 1
          getHomeAllData(currentType.value, nextPage).then(res => {

            if (res.data.home == null){
              Toast('暂时么有更多数据啦')
            } else {
              goods[currentType.value].page = nextPage
              goods[currentType.value].list.push(...res.data.home.data)
            }

          }).catch(err => {
            console.log(err)
          })
        }
      }

    })

    return {
      recommends,
      showGoods,
      tabCurrentIndex,
      currentType,
    }
  },
  components: {
    MainScroll,
    Scroll,
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
#home {
}

.banner {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
    height: auto;
  }
}

</style>
