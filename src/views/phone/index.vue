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
        v-for="(item, index) in caseslist"
        :key="index"
        :num="item.stock"
        :price="item.price"
        :desc="item.brandName"
        :title="item.name"
        :thumb="item.pic"
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
          <van-button size="mini" @click="onSubmit(item, index)">
            确定
          </van-button>
        </template>
      </van-card>
    </template>
  </van-tree-select>
</template>
<script>
import { Popup, TreeSelect, Image, Card, Tag, Button } from 'vant'
import { getproductCateList56 } from '@/api/productCateList53'
import { getproduct } from '@/api/searchproduct'

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
          text: 'rr',
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
      this.items = []
      this.getList56()
    },
    async getproductlist(params) {
      try {
        console.log('getcases')
        console.log(params)
        let listdata = await getproduct(params)
        this.caseslist = []
        this.caseslist = listdata.data.list
        console.log(this.caseslist)
      } catch (error) {
        console.log(error)
      }
    },
    async getList56() {
      try {
        let list53 = await getproductCateList56()
        console.log(list53.data)
        if (list53.code === 200) {
          let list53data = list53.data
          for (let i = 0; i < list53data.length; i++) {
            let item = {}
            item.text = list53data[i].name
            item.id = list53data[i].id
            item.parentId = list53data[i].parentId
            this.items.push(item)
          }
          console.log(this.items)
          let params = {}
          params['pageNum'] = 1
          params['pageSize'] = 10
          params['sort'] = 0
          params['productCategoryId'] = this.items[this.activeIndex].id
          this.getproductlist(params)
        }
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
      params['pageNum'] = 1
      params['pageSize'] = 10
      params['sort'] = 0
      params['productCategoryId'] = this.items[index].id
      this.getproductlist(params)
    },
    onItemClick: function(data) {
      console.log(data)
    },
    onSubmit: function(item, index) {
      console.log('onsubmit')
      console.log(item)
      console.log(index)
      this.$store.commit('changeSelectCase', true)
      this.$store.commit('changeProductid', item)
      this.$router.push({
        path: '/Draw'
      })
    }
  }
}
</script>
