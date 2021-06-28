<template>
  <div>
    <van-tabbar v-model="active" class="tab" style="z-index:999">
      <van-tabbar-item icon="home-o" to="/">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="cart" to="/Draw">
        绘制
      </van-tabbar-item>
      <van-tabbar-item icon="cart" to="/Icon">
        贴图
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
        case '/Draw':
          this.active = 1
          break
        case '/Icon':
          this.active = 2
          break
        case '/Own':
          this.active = 3
          break
        default:
          this.active = 0
      }
    }
  }
}
</script>
