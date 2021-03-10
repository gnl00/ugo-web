<template>
  <div class="wrapper" ref="scrollWrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  name: "Scroll",
  data() {
    return {
      scroll: {},
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scrollWrapper, {
      probeType: 3,
      click: true,
      pullUpLoad: true
    })

    this.scroll.on('scroll', (position) => {
      console.log(position.y)
    })

    this.scroll && this.scroll.refresh()

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多。。。')
    })

  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100vh;
  border: 1px solid red;
  box-sizing: border-box;
}

.content {
}
</style>