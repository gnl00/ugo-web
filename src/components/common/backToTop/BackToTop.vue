<template>
  <div class="backTop" @click="backTop">
    <i class="iconfont icon-up" ></i>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  setup(props, {emit}) {
    return {
      backTop: () => {
        emit('backTop')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.backTop {
  position: fixed;
  bottom: 60px;
  right: 20px;

  i {
    font-size: 40px;
    text-align: center;
    color: red;
    background-color: #0000;
    border-radius: 50%;
  }

}
</style>