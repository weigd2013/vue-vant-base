<template>
  <van-popup v-model="policeShow" position="top" :overlay="true">
    <van-tree-select
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav="onNavClick"
    >
      <template slot="content">
        <van-image
          v-if="active === 0"
          src="https://img.yzcdn.cn/vant/apple-1.jpg"
          rel="external nofollow"
        />
        <van-image
          v-if="active === 1"
          src="https://img.yzcdn.cn/vant/apple-2.jpg"
          rel="external nofollow"
        />
        <van-image
          v-if="active === 2"
          src="https://img.yzcdn.cn/vant/apple-2.jpg"
          rel="external nofollow"
        />
      </template>
    </van-tree-select>
  </van-popup>
</template>
<script>
import { Popup, TreeSelect, Image } from 'vant'
export default {
  components: {
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect,
    [Image.name]: Image
  },
  data() {
    return {
      data: 0,
      policeShow: true,
      active: 0,
      items: [
        {
          text: 'iphone6'
        },
        {
          text: 'iphone8'
        },
        {
          text: 'iphone11'
        }
      ],
      activeId: 1,
      activeIndex: 0
    }
  },
  methods: {
    onNavClick: function(index) {
      console.log(index)
      this.active = index
      /*
      let substationCode = this.items[index].activeId
      this.requestPoliceList(substationCode)*/
    }
  }
}
</script>
