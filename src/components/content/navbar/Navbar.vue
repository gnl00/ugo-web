<template>
  <div id="nav-bar" class="nav-bar">
    <div class="left" @click="goBack">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot>
        <span>Ugo</span>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: "Navbar",
  setup() {

    // 创建路由对象
    const router = useRouter();

    const goBack = () => {
      router.go(-1)
    }

    return {
      goBack
    }

  }
}
</script>

<style scoped lang="scss">

.nav-bar {
  background-color: var(--color-tint);
  color: white;
  display: flex;
  // 固定位置
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: var(--navbar-height);
  line-height: 40px;
  text-align: center;
  box-shadow: 0 1px rgba(100, 100, 100, .1);

}

.left, .right {
  width: 60px;
}
.center {
  flex: 1;
}

</style>