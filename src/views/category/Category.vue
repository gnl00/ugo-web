<template>
  <div class="category">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>商品分类</template>
    </navbar>

    <div id="main">
      <div class="order">
        <van-tabs @click="tabClick">
          <van-tab title="综合排序"></van-tab>
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
        </van-tabs>
      </div>
      <div>
        <van-sidebar v-model="activeKey" class="left-menu">

          <van-collapse v-model="activeName">
            <van-collapse-item class="van-collapse-item" v-for="(item, index) in categories"
                               :title="item.category" :name="item.category"  >

              <van-sidebar-item v-for="(item, index) in item.children"
                                :title="item.category" @click="getGoodsByCategory(item.id)" />

            </van-collapse-item>

          </van-collapse>
        </van-sidebar>
        <div class="goods-list">
          <div class="content">

            <van-card v-for="(item, index) in showGoods"
                :num="item.goods.amount"
                :price="item.goods.price.toFixed(2)"
                tag="Hot"
                :desc="item.goods.name"
                :title="item.goods.name"
                :thumb="item.picture[0]"
                origin-price="9999.00" @click="toGoodsDetail(item.goods.id)"/>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref, reactive, onMounted, computed} from 'vue'
import {useRouter} from 'vue-router'

import {getAllCategories, getGoodsBySort} from 'network/category'

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Category",
  data() {
    return {
      active: 0,
      categories: [],
      activeName: ['1']
    }
  },
  mounted() {

    getAllCategories().then(res => {
      // console.log(res.data)
      this.categories = res.data
    }).catch(err => {
      console.log(err)
    })

  },
  components: {Navbar},
  setup() {
    const activeKey = ref(0)

    // 默认排序为综合排序
    const currentSort = ref('comp')
    // 当前分类Id
    const currentCategoryId = ref(3)

    const goods = reactive({
      comp: {
        page: 1,
        list: []
      },
      sales: {
        page: 1,
        list: []
      },
      price: {
        page: 1,
        list: []
      }
    })

    const tabClick = (index) => {
      // console.log('排序编号: ',index)
      // 综合排序 销量排序 价格排序
      let sort_arr = ['comp', 'sales', 'price']
      currentSort.value = sort_arr[index]
      // console.log('排序: ', sort_arr[index])
      // console.log('分类id: ', currentCategoryId.value)
      getGoodsBySort(currentCategoryId.value, currentSort.value).then(res => {
        // console.log(res)

        if (res.data != null && res.data != '' && res.data != goods[currentSort.value].list){
          goods[currentSort.value].list = res.data
        }

      }).catch(err => {
        console.log(err)
      })

    }

    const getGoodsByCategory = (categoryId) => {
      currentCategoryId.value = categoryId
      // console.log('要获取的商品分类id: ', categoryId)
      // console.log('要获取的商品排序: ', currentSort.value)

      getGoodsBySort(categoryId, currentSort.value).then(res => {
        // console.log(res)

        if (res.data != null && res.data != ''){
          goods[currentSort.value].list = res.data
        }

      }).catch(err => {
        console.log(err)
      })

    }

    onMounted(() => {
      getGoodsBySort(3, currentSort.value).then(res => {
        // console.log(res)

        if (res.data != null && res.data != ''){
          goods[currentSort.value].list = res.data
        }

      }).catch(err => {
        console.log(err)
      })
    })

    const showGoods = computed(() => {
      return goods[currentSort.value].list
    })

    const router = useRouter();

    const toGoodsDetail = (id) => {
      router.push({
        path: '/detail',
        query: {
          id
        }
      })
    }

    return {
      activeKey,
      getGoodsByCategory,
      tabClick,
      currentSort,
      showGoods,
      toGoodsDetail
    }
  }
}
</script>

<style scoped lang="scss">

.category {
  margin-top: var(--navbar-height);
  height: 100vh;

  img {
    width: 100%;
  }
}

#main {
  display: flex;

  .order {
    text-align: center;
    flex: 1;
    float: right;
    z-index: 9;
    position: fixed;
    right: 0;
    left: 130px;
  }

  .left-menu {
    left: 0;
    width: 130px;

    .van-sidebar {
      width: 100%;
    }
  }

  .goods-list {
    flex: 1;
    position: absolute;
    top: 95px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
  }
}

.van-card {
  border-radius: 10px;

}

</style>

<style lang="scss">
.van-collapse-item__content {
  padding: 0;
}
</style>