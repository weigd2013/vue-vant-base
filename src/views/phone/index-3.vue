<template>
  <van-popup v-model="policeShow" position="top" :overlay="true">
    <van-tree-select
      :items="items"
      :active-id.sync="items.activeId"
      :main-active-index.sync="items.activeIndex"
      @click-nav="onNavClick"
    >
      <template slot="content">
        <ul class="right-content">
          <li
            v-for="(item, index) in policeList"
            :key="index"
            :class="{ active: policeCode === item.policeCode }"
            @click="onItemClick(item.policeName, item.policeCode)"
          >
            {{ item.policeName }}
          </li>
        </ul>
      </template>
    </van-tree-select>
  </van-popup>
</template>
<script>
import { Popup, TreeSelect } from 'vant'
export default {
  components: {
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect
  },
  data() {
    return {
      data: 0,
      policeShow: true,
      items: [
        {
          text: 'iphone6',
          activeId: '111'
        },
        {
          text: 'iphone8',
          activeId: '112'
        },
        {
          text: 'iphone11',
          activeId: '113'
        }
      ],
      policeList: [
          1,
          2,
          3,
          4,
          5
      ]
    }
  },
  methods: {
    onNavClick: function(index){
      console.log(index)
      this.active = index
      /*
      let substationCode = this.items[index].activeId
      this.requestPoliceList(substationCode)*/
    }
  }
}
</script>
