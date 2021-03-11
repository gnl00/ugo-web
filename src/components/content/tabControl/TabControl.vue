<template>
  <div id="tab-control" class="tab-control">
    <div class="tab-control-item" :class="{active: index == currentIndex}"
         v-for="(title, index) in titles" :key="index" @click="titleClick(index)" >
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "TabControl",
  data() {
    return {
      // 默认激活第一个选项卡
      active: false
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props, {emit}) {

    let currentIndex = ref(0)

    const titleClick = (index) => {
      // console.log(index)

      currentIndex.value = index
      emit('tabClick', index)
    }

    return {
      currentIndex,
      titleClick
    }
  }
}
</script>

<style scoped lang="scss">

.tab-control {
  display: flex;
  width: 100%;
  line-height: 40px;
  text-align: center;
  background-color: white;

  // 将选项卡固定
  position: sticky;
  top: 38px;

  z-index: 9;
}

.tab-control-item {
  flex: 1;

  span {
    padding: 6px;
  }
}

.active {
  color: var(--color-highlight-text);

  span {
    border-bottom: 3px solid var(--color-highlight-text);
  }
}
</style>