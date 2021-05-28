<template>
  <van-popup v-model="policeShow" position="top" :overlay="true">
    <van-tree-select
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav="onNavClick"
      @click-item="onItemClick"
    >
      <template slot="content">
        <van-card
          v-for="(item, index) in currentDatas[this.active]"
          :key="index"
          :num="item.num"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.url"
        >
          <template #tags>
            <van-tag plain type="success">
              标签
            </van-tag>
            <van-tag plain type="success">
              标签
            </van-tag>
          </template>
          <template #footer>
            <van-button size="mini">
              删除
            </van-button>
          </template>
        </van-card>
      </template>
    </van-tree-select>
  </van-popup>
</template>
<script>
import { Popup, TreeSelect, Image, Card } from 'vant'
export default {
  components: {
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect,
    [Image.name]: Image,
    [Card.name]: Card
  },
  data() {
    return {
      data: 0,
      policeShow: true,
      active: 0,
      items: [
        {
          text: 'iphone6',
          badge: 3,
          dot: true,
          children: [
            {
              text: 'mini',
              id: 1
            },
            {
              text: '6s',
              id: 2
            }
          ]
        },
        {
          text: 'iphone8'
        },
        {
          text: 'iphone11'
        }
      ],
      activeId: [1, 2],
      activeIndex: 0,
      currentDatas: [
        [
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '商品标题',
            desc: '描述信息',
            price: 20,
            num: 2
          },
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '方框',
            desc: '正方形',
            price: 30,
            num: 1
          }
        ],
        [
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '商品标题',
            desc: '描述信息',
            price: 40,
            num: 2
          },
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '方框',
            desc: '正方形',
            price: 50,
            num: 1
          }
        ],
        [
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '商品标题',
            desc: '描述信息',
            price: 60,
            num: 2
          },
          {
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
            title: '方框',
            desc: '正方形',
            price: 70,
            num: 1
          }
        ]
      ]
    }
  },
  methods: {
    onNavClick: function(index) {
      console.log(this.activeId)
      this.active = index
      /*
      let substationCode = this.items[index].activeId
      this.requestPoliceList(substationCode)*/
    },
    onItemClick: function(data) {
      console.log(data)
    }
  }
}
</script>
