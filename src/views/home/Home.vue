<template>
  <div id="home" class="home" ref="home">
    <!-- 导航栏 -->
    <navbar>
      <template v-slot:left>
        <span>Ugo</span>
      </template>
      <template v-slot:default>
        <van-search
            v-model="keyWord"
            shape="round"
            background="#4fc08d"
            placeholder="请输入搜索关键词"
        />
      </template>
      <template v-slot:right>
        <i class="iconfont icon-gengduo"></i>
      </template>
    </navbar>

    <!-- 轮播图 -->
    <swipe-view class="banner" />

    <!-- 推荐视图 -->
    <recommend-view :recommends="recommends" />

    <!-- 首页选项卡 -->
    <tab-control id="tab-control" :titles="['热门畅销', '近日上新', '历史精选']" @tab-click="tabCurrentIndex" />

    <goods-list :goods="showGoods" />

    <back-to-top v-show="showTapToTop" @backTop="backTop" />

  </div>
</template>

<script>
// @ is an alias to /src
import {onMounted, ref, reactive, computed, watch , watchEffect, nextTick } from 'vue'

import {Toast} from "vant";

import {getHomeAllData, searchGoods} from "@/network/home";

import MainTabbar from "@/components/content/mainTabbar/MainTabbar";
import Navbar from "@/components/content/navbar/Navbar";
import RecommendView from "@/views/home/childComps/RecommendView";
import SwipeView from "@/views/home/childComps/SwipeView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackToTop from "@/components/common/backToTop/BackToTop";

export default {
  name: 'Home',
  data() {
    return {
      img_src: require('@/assets/images/1.jpg')
    }
  },
  setup() {

    const keyWord = ref(null)

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

      // 滚动条跳转到指定高度
      document.documentElement.scrollTop = 490

    }

    const showGoods = computed(() => {
      return goods[currentType.value].list
    })

    const showTapToTop = ref(false)

    const handleScroll = () => {

      window.onscroll = () => {

        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // 变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

        // 是否显示tapToTop
        if (scrollTop > 475){
          showTapToTop.value = true
        } else {
          showTapToTop.value = false
        }

        if (((scrollTop+windowHeight) + 0.2).toString().slice(0,4) == scrollHeight.toString()){

          let page = goods[currentType.value].page + 1;
          getHomeAllData(currentType.value, page).then(res => {

            if (res.data != null){
              goods[currentType.value].list.push(...res.data.home.data)
              goods[currentType.value].page = res.data.home.page
            } else {
              // console.log('data == null')
              Toast('暂时没有更多数据啦~')
            }

          }).catch(err => {
            console.log(err)
          })

        }
      }
    }

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

      handleScroll();

    })

    watchEffect(() => {

      // 搜索商品
      if (keyWord.value != null && keyWord.value.trim() != '' ){
        let searchWord = keyWord.value.trim()
        console.log(searchWord)

        searchGoods(searchWord).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }

    })

    // watch(value, (newValue, oldValue) => {
    //   console.log('newValue: ', newValue)
    //   console.log('oldValue: ', oldValue)
    // })


    const backTop = () => {
      console.log('back to top now')
      document.getElementById('home').scrollIntoView({
        behavior: "smooth"
      })
    }

    return {
      keyWord,
      recommends,
      showGoods,
      tabCurrentIndex,
      currentType,
      showTapToTop,
      backTop,
    }
  },
  components: {
    BackToTop,
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

.van-search {
  height: 40px;
}

.banner {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
    height: auto;
  }
}

</style>
