<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="item">
      <a @click.prevent="goRecommendDetail(item.id)" >
        <img :src="item.photo" :alt="item.name">
        <div>{{item.name.slice(0, 8)}}</div>
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

.recommend {
  display: flex;
  text-align: center;
  font-size: 14px;
  // 上 右 下 左
  padding: 20px 0 20px 0;
  border-bottom: 5px solid #eeee;
}

.recommend-item {
  flex: 1;

  img {
    width: 85%;
    height: auto;
    margin-bottom: 5px;
  }
}

</style>