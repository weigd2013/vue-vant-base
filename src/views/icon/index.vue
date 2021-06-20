<template>
  <van-tree-select
    height="100%"
    :items="items"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
    @click-nav="onNavClick"
    @click-item="onItemClick"
  >
    <template slot="content">
      <van-card
        v-for="(item, index) in currentDatas[this.activeIndex]"
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
            确定
          </van-button>
        </template>
      </van-card>
    </template>
  </van-tree-select>
</template>
<script>
import { Popup, TreeSelect, Image, Card, Tag, Button } from 'vant'
import { getphonelist } from '@/api/phonelist'
import { getshelllist } from '@/api/getphoneshell'

export default {
  components: {
    [Popup.name]: Popup,
    [TreeSelect.name]: TreeSelect,
    [Image.name]: Image,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  data() {
    return {
      data: 0,
      active: 0,
      items: [
        {
          text: '狗蛋套组',
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
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        },
        {
          text: '狗蛋套组'
        }
      ],
      activeId: [1, 2],
      activeIndex: 0,
      currentDatas: [
        [
          {
            url: 'http://www.mathgame.cc:8087/icon/0.png',
            title: '商品标题',
            desc: '描述信息',
            price: 20,
            num: 2
          },
          {
            url: 'http://www.mathgame.cc:8087/icon/1.png',
            title: '方框',
            desc: '正方形',
            price: 30,
            num: 1
          },
          {
            url: 'http://www.mathgame.cc:8087/icon/1.png',
            title: '方框',
            desc: '正方形',
            price: 30,
            num: 1
          },
          {
            url: 'http://www.mathgame.cc:8087/icon/1.png',
            title: '方框',
            desc: '正方形',
            price: 30,
            num: 1
          }
        ],
        [
          {
            url: 'http://www.mathgame.cc:8087/icon/2.png',
            title: '商品标题',
            desc: '描述信息',
            price: 40,
            num: 2
          },
          {
            url: 'http://www.mathgame.cc:8087/icon/3.png',
            title: '方框',
            desc: '正方形',
            price: 50,
            num: 1
          }
        ],
        [
          {
            url: 'http://www.mathgame.cc:8087/icon/4.png',
            title: '商品标题',
            desc: '描述信息',
            price: 60,
            num: 2
          },
          {
            url: 'http://www.mathgame.cc:8087/icon/5.png',
            title: '方框',
            desc: '正方形',
            price: 70,
            num: 1
          }
        ]
      ],
      caseslist: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init: function() {
      this.getphone()
    },
    async getphone() {
      try {
        /* console.log(await getphonelist()) */
        let phonedata = await getphonelist()
        console.log(phonedata)
        if (phonedata.code === 200) {
          this.items = phonedata.data
          let params = {}
          params['typecode'] = this.items[this.activeIndex].typecode
          this.getcases(params)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getcases(params) {
      try {
        console.log('getcases')
        console.log(params)
        let listdata = await getshelllist(params)
        this.caseslist = listdata.data
        console.log(this.caseslist)
      } catch (error) {
        console.log(error)
      }
    },
    onNavClick: function(index) {
      console.log('onNavClick')
      /* console.log(this.activeId) */
      this.active = index
      /*
      let substationCode = this.items[index].activeId
      this.requestPoliceList(substationCode)*/
      let params = {}
      params['typecode'] = this.items[index].typecode
      this.getcases(params)
    },
    onItemClick: function(data) {
      console.log(data)
    }
  }
}
</script>
