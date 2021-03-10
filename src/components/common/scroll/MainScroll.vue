<template>
  <div class="wrapper" ref="scrollWrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <slot></slot>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "MainScroll",
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
}

.van-pull-refresh  {
  overflow: hidden;
}
</style>