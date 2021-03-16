<template>
<div id="search" class="search">
  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default>
      <van-search
          v-model="keyWord"
          shape="round"
          background="#4fc08d"
          placeholder="请输入搜索关键词"
          @keydown.enter="clickSearch"
      />
    </template>
    <template v-slot:right>
      <div @click="clickSearch">搜索</div>
    </template>
  </navbar>

  <div class="menu">
    <van-dropdown-menu>
      <van-dropdown-item v-model="goodsMenuValue" :options="goodsMenu" />
      <van-dropdown-item v-model="orderValue" :options="order" @click="orderClick" />
    </van-dropdown-menu>
  </div>
  <div class="content">
    <van-card style="margin-top: 1px; border-radius: 10px" v-for="(item, index) in list" :key="item.goods.id"
        :num="item.goods.amount"
        tag="热门"
        :price="Number(item.goods.price).toFixed(2)"
        :title="item.goods.name"
        :thumb="item.picture[0]"
        origin-price="999.00" @click="toGoodsDetail(item.goods.id)"
    />

  </div>

</div>
</template>

<script>
import {ref, reactive, onMounted, toRefs} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {Toast} from 'vant'

import {searchGoods} from "@/network/search";
import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Search",
  data() {
    return {
    }
  },
  components: {Navbar},
  setup() {
    const route = useRoute();
    const router = useRouter();

    const goods = reactive({
      list: []
    })

    const keyWord = ref('')

    const goodsMenu = ref([
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ])

    const goodsMenuValue  = ref(0)

    const order = ref([
      { text: '默认排序', value: 'default' },
      { text: '价格排序', value: 'price' },
      { text: '销量排序', value: 'collect' },
    ])

    const orderValue = ref('default')

    const doSearch = (key) => {
      searchGoods(key).then(res => {
        // console.log(res)

        if (res.code != 200) {
          Toast.fail(res.msg)
        } else if (res.code == 200) {

          goods.list = res.data

          console.log(goods)

        }

      }).catch(err => {
        console.log(err)
      })
    }

    const clickSearch = () => {
      if (keyWord.value != null && keyWord.value.trim() != '') {
        doSearch(keyWord.value)
      }
    }

    onMounted(() => {
      // console.log(route.query.keyword)
      if (route.query.keyword != null || route.query.keyword != '') {
        keyWord.value = route.query.keyword
        doSearch(route.query.keyword)
      }

    })

    const orderClick = () => {
      // console.log(orderValue.value)

      searchGoods(keyWord.value, orderValue.value).then(res => {

        if (res.code != 200) {
          Toast.fail(res.msg)

        } else if (res.code == 200) {
          // console.log(res.data)


          goods.list = res.data
        }

      }).catch(err => {
        console.log(err)
      })
    }

    const toGoodsDetail = (id) => {
      router.push({
        path: '/detail',
        query: {
          id
        }
      })
    }

    return {
      goodsMenu,
      goodsMenuValue,
      order,
      orderValue,
      keyWord,
      clickSearch,
      ...toRefs(goods),
      orderClick,
      toGoodsDetail
    }
  }
}
</script>

<style scoped lang="scss">
.van-search {
  height: 40px;
}

#search {
  margin-top: var(--navbar-height);
}
.menu {
  width: 100%;
  position: fixed;
  top: var(--navbar-height);
  z-index: 9;
}
.content {
  margin-top: 85px;
  margin-bottom: 50px;
}
</style>