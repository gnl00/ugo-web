<template>
  <div class="recommend-title">
    <span>精品推荐</span>
  </div>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="item">
      <a @click.prevent="goRecommendDetail(item.goods.id)" >
        <img :src="item.picture" :alt="item.goods.name">
        <div>
          <span>{{item.goods.name.slice(0, 11)}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    const router = useRouter();

    const goRecommendDetail = (goods_id) => {
      router.push({
        path: '/detail',
        query: {
          goods_id
        }
      })
    }

    return {
      goRecommendDetail
    }
  }
}
</script>

<style scoped lang="scss">

.recommend-title {
  margin-top: 8px;
  background-color: white;
  text-align: center;
  border-radius: 5px;

  span {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }

}

.recommend {
  display: flex;
  text-align: center;
  font-size: 14px;
  // 上 右 下 左
  padding: 0 0 8px 0;
  border-bottom: 5px solid white;
}

.recommend-item {
  background-color: white;
  flex: 1;
  border: 2px solid #f6f6f6;
  border-radius: 5px;

  img {
    width: 85%;
    height: auto;
    margin-bottom: 5px;
  }

  div {
    border-top: 1px solid #eeee;

    span {
      font-size: 13px;
    }
  }
}

</style>