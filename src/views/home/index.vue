<template>
  <van-tabbar v-model="active" :fixed="true" @change="onChange">
    <van-tabbar-item replace to="/first" icon="home-o">
      家
    </van-tabbar-item>
    <van-tabbar-item replace to="/own" icon="user-circle-o">
      我
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem, Notify } from 'vant'

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
  methods: {
    onChange(index) {
      Notify({ type: 'primary', message: index })
    }
  }
}
</script>
