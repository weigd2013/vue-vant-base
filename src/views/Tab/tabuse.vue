<template>
  <div>
    <van-tabbar v-model="active" class="tab" style="z-index:999">
      <van-tabbar-item icon="home-o" to="/">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="cart" to="/First">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="contact" to="/Own">
        用户
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0
    }
  },
  watch: {
    $route(to) {
      switch (to.fullPath) {
        case '/':
          this.active = 0
          break
        case '/First':
          this.active = 1
          break
        case '/Own':
          this.active = 2
          break
        default:
          this.active = 0
      }
    }
  }
}
</script>
