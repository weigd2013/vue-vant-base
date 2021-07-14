<template>
  <div id="app">
    <keep-alive include="Home,First,Own,Cart">
      <router-view />
    </keep-alive>
    <tabuse v-show="!$route.meta.fullScreen" />
  </div>
</template>
<script>
import tabuse from './views/Tab/tabuse'
export default {
  components: {
    tabuse
  },
  data() {
    return {
      transitionName: 'van-slide-right'
    }
  },
  created() {
    this.$navigation.on('forward', () => {
      this.transitionName = 'van-slide-right'
    })
    this.$navigation.on('back', () => {
      this.transitionName = 'van-slide-left'
    })
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
  font-family: PingFangSC-Regular;
  background-color: #f0f3f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** 解决路由切换动画上下闪动问题 */
.router {
  position: absolute;
  top: safe-area-inset-top;
  top: env(safe-area-inset-top);
  width: 100%;
  transition: all 0.377s ease;
  backface-visibility: hidden;
}
</style>
