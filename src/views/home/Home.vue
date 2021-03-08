<template>
  <div class="home">
    <h1>home page</h1>
    <div id="div-img">
      <div>
        <img :src="img_src" alt="1">
      </div>
      <div>
        <img src="~assets/images/2.jpg" alt="2">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      img_src: require('@/assets/images/1.jpg')
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
$img_width: 100%;

  #div-img {
    img {
      width: $img_width;
    }
  }

</style>
