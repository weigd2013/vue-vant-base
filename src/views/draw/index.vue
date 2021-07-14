<template>
  <div class="main-panel">
    <van-popup v-model="show" position="top" :style="{ height: '50%' }">
      <div v-show="!isShowIcon" class="emptyIcon">
        <img
          src="http://oss.mathgame.cc:8088/mall/assert/cart/empty.png"
          alt=""
        />
        <div class="title">
          可以增加表情~
        </div>
        <router-link to="/Icon" class="goHome">
          去逛逛
        </router-link>
      </div>
      <div v-show="isShowIcon">
        <van-card
          v-for="(item, index) in currentDatas"
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
            <van-button size="mini" @click="onSubmit(index)">
              删除
            </van-button>
          </template>
        </van-card>
      </div>
    </van-popup>
    <van-popup
      v-model="designshow"
      position="right"
      :style="{ height: '100%' }"
    >
      <div v-show="!isShowdesign" class="emptyIcon">
        <img
          src="http://oss.mathgame.cc:8088/mall/assert/cart/empty.png"
          alt=""
        />
        <div class="title">
          去增加设计吧~
        </div>
      </div>
      <div v-show="isShowdesign">
        <van-nav-bar
          title="设计日志"
          :fixed="true"
          left-arrow
          @click-left="onClickLeft"
        />
        <div id="produceItem">
          <div
            v-for="(product, index) in mydesignDatas"
            :key="index"
            class="item"
            @click.stop="goToGoodsDetail(product)"
          >
            <img :src="product.productPic" alt="" />
            <div class="productInfo">
              <div class="title">
                {{ product.id }}
              </div>
              <div class="subTitle">
                {{
                  product.createDate.substring(
                    0,
                    product.createDate.lastIndexOf('.') - 1
                  )
                }}
              </div>
              <div class="buyCar" @click.stop="deletedesign(product.id)">
                <!--svg-icon icon-class="car" style="width:1.5rem;height:1.5rem" /-->
                <van-icon
                  name="close"
                  color="#1989fa"
                  style="width:1.5rem;height:1.5rem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-cell-group>
      <van-cell is-link @click="showPopup">
        贴图
      </van-cell>
      <van-cell is-link @click="saveimage">
        保存设计
      </van-cell>
      <van-cell is-link @click="showdesign">
        我的设计
      </van-cell>
      <van-divider
        :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
      >
        绘制界面
      </van-divider>
      <div class="sketch-wrapper">
        <canvas id="sketchCanvas" class="sketch-canvas"></canvas>
      </div>
      <van-divider
        :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
      >
        绘制界面
      </van-divider>
    </van-cell-group>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Button, Card, Tag } from 'vant'
import { mapState } from 'vuex'
import { uploadimage } from '@/api/uploadimage'
import { getdesignlist, addcart, deletecartids } from '@/api/getdesignlist'
import { randomString, GetRandomNum } from '@/utils/randomstring'
import { now } from '@/utils/date'
export default {
  name: 'Sketch',
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Tag.name]: Tag
  },
  data() {
    return {
      canvas: null,
      cwidth: 0,
      cheight: 0,
      iconset: [],
      iconnum: 10,
      localCount: 11,
      phonecase: {},
      show: false,
      designshow: false
    }
  },
  computed: mapState({
    count: state => state.count,
    mydesignDatas: 'mydesignDatas',
    currentDatas: 'currentDatas',
    countPlusLocalState(state) {
      return state.count + this.localCount
    },
    totalCount1() {
      return Object.keys(this.mydesignDatas).length
    },
    totalCount() {
      return Object.keys(this.currentDatas).length
    },
    isShowIcon() {
      let isshow = false
      if (this.totalCount > 0) {
        isshow = true
      }
      return isshow
    },
    isShowdesign() {
      let isshow = false
      if (this.totalCount1 > 0) {
        isshow = true
      }
      return isshow
    }
  }),
  mounted() {
    this.init()
    this.render()
    this.getdesignlistA()
  },
  methods: {
    showPopup() {
      this.show = true
    },
    showdesign() {
      this.designshow = true
    },
    onClickLeft() {
      this.designshow = false
    },
    async getdesignlistA() {
      let datalist = await getdesignlist()
      if (datalist.code === 200) {
        this.$store.commit('changedesignDatas', datalist.data)
      }
    },
    async addcartA(data) {
      let ret = await addcart(data)
      console.log(ret)
    },
    init: async function() {
      let flag = this.$store.getters.getselectCase
      if (!flag) {
        this.initSketch()
      } else {
        this.phonecase = this.$store.getters.getproductid
        console.log(this.phonecase.albumPics)
        let str = this.phonecase.albumPics.split(',')
        console.log(str)
        let bgiurl = str[1]
        let oliuarl = str[0]
        this.initselectSketch(bgiurl, oliuarl)
      }
    },
    initSketch: function() {
      this.canvas = new fabric.Canvas('sketchCanvas', {
        containerClass: 'sketch-container',
        preserveObjectStacking: true
      })
      let self = this
      this.canvas.setBackgroundImage('iphone2p.png', function() {
        self.canvas.renderAll()
      })
      this.canvas.setOverlayImage(
        'iphone2g.png',
        this.canvas.renderAll.bind(this.canvas)
      )
      fabric.Image.fromURL('iphone2g.png', function(oImg) {
        console.log(oImg)
        console.log(oImg.width)
        self.cwidth = oImg.width
        self.cheight = oImg.height
        self.canvas.setWidth(oImg.width)
        self.canvas.setHeight(oImg.height)
        /* self.canvas.add(oImg) */
      })
      /*
      fabric.Image.fromURL('head.png', function(oImg) {
        self.canvas.add(oImg)
        oImg.moveto(5)
        oImg.bringForward(true)
      })
      this.canvas.on('mouse:over', function(e) {
        e.target.set('fill', 'green')
        this.canvas.renderAll()
      })
      this.canvas.on('mouse:out', function(e) {
        e.target.set('fill', 'red')
        this.canvas.renderAll()
      })*/
      this.canvas.renderAll()
    },
    initselectSketch: function(bgiurl, oliuarl) {
      console.log('initselectSketch')
      this.canvas = new fabric.Canvas('sketchCanvas', {
        containerClass: 'sketch-container',
        preserveObjectStacking: true
      })
      let self = this
      this.canvas.setBackgroundImage(
        bgiurl,
        function() {
          self.canvas.renderAll()
        },
        {
          crossOrigin: 'anonymous'
        }
      )
      this.canvas.setOverlayImage(
        oliuarl,
        this.canvas.renderAll.bind(this.canvas),
        {
          crossOrigin: 'anonymous'
        }
      )
      fabric.Image.fromURL(oliuarl, function(oImg) {
        console.log(oImg)
        console.log(oImg.width)
        self.cwidth = oImg.width
        self.cheight = oImg.height
        self.canvas.setWidth(oImg.width)
        self.canvas.setHeight(oImg.height)
        /* self.canvas.add(oImg) */
      })
      this.canvas.renderAll()
    },
    imageIsloaded: function(e) {
      fabric.Image.fromURL(e.targe.result, function(img) {
        /* let aspectRatio = 600/500 */
        let factor = 500 / img.width
        img.set({
          scaleX: factor,
          scaleY: factor
        })
        this.canvas.add(img)
        this.canvas.senToBack(img)
      })
    },
    addicon3: function() {
      /*
      console.log('addicon')
      console.log(this.cwidth)
      console.log(this.cheight)
      let rect = new fabric.Rect({
        left: this.cwidth / 2,
        top: this.cheight / 2,
        fill: 'red',
        width: 50,
        height: 50,
        angle: 45
      })
      this.canvas.add(rect)
      this.iconset.push(rect)
      this.canvas.renderAll()
      */
      this.$router.push({
        path: '/Icon'
      })
    },
    addphonecase: function() {
      console.log('addphonecase')
      this.$router.push({
        path: '/'
      })
    },
    onSubmit: function(index) {
      console.log(index)
      this.$store.commit('deletecurrentData', index)
      this.canvas.clear()
      this.initSketch()
      this.render()
    },
    render: function() {
      console.log('render')
      console.log(this.$store.getters.getcurrentDatas)
      let data = this.$store.getters.getcurrentDatas
      for (let i = 0; i < data.length; i++) {
        this.addicon(data[i].pic)
      }
    },
    addicon: function(url) {
      console.log(url)
      let self = this
      fabric.Image.fromURL(
        url,
        function(oImg) {
          oImg.left = 0
          oImg.top = 0
          console.log(oImg)
          self.canvas.add(oImg)
        },
        {
          crossOrigin: 'anonymous'
        }
      )
    },
    saveimage: function() {
      /*
      const canvasAsImageB64 = this.canvas
        .toDataURL()
        .replace('image/png', 'image/octet-stream')
      console.log(canvasAsImageB64)
      window.location.href = canvasAsImageB64*/
      let self = this
      let data = {
        createDate: '2021-07-10T03:49:04.619Z',
        deleteStatus: 0,
        id: 0,
        memberId: 0,
        memberNickname: 'string',
        modifyDate: '2021-07-10T03:49:04.619Z',
        price: 0,
        productAttr: 'string',
        productBrand: 'string',
        productCategoryId: 61,
        productId: 0,
        productName: 'string',
        productPic: 'string',
        productSkuCode: 'string',
        productSkuId: 0,
        productSn: 'string',
        productSubTitle: 'string',
        quantity: 0
      }
      console.log(now())
      data['createDate'] = now()
      data['modifyDate'] = now()
      data['productId'] = GetRandomNum(1000, 9999)
      this.designshow = true
      const canvasAsImageB64 = this.canvas.toDataURL()
      fetch(canvasAsImageB64)
        .then(res => res.blob())
        .then(blob => {
          console.log(blob)
          const formData = new FormData()
          let filename = randomString(18) + '.png'
          formData.append('file', blob, filename)
          uploadimage(formData).then(res => {
            console.log(res)
            if (res.code === 200) {
              data['productPic'] = res.data.url
              data['productName'] = 'design'
              let ruta = self.addcartA(data)
              console.log(ruta)
              self.getdesignlistA()
            }
          })
        })
      /*
      const blob = this.dataURItoBlob(canvasAsImageB64)
      const formData = new FormData()
      formData.append('file', blob)

      uploadimage(formData).then(res => {
        console.log(res)
      })*/
      // this.$store.commit('changeDesignImage', canvasAsImageB64)
      // this.$router.push({
      //  path: '/Cart'
      // })
    },
    savetoJSON: function() {
      const currState = this.canvas.toJSON()
      console.log(currState)
    },
    loadtoJSON: function(json) {
      this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas))
    },
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1])
      } else byteString = unescape(dataURI.split(',')[1])

      // separate out the mime component
      const mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

      // write the bytes of the string to a typed array
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    },
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      this.$store.commit('changeDesignImage', goods)
      this.$router.push({
        name: 'Cart',
        query: {
          id: goods.id,
          name: goods.name,
          small_image: goods.productPic,
          price: goods.price,
          spec: goods.keywords,
          total_sales: goods.sale,
          origin_price: goods.originalPrice
        }
      })
    },
    deletedesign(id) {
      let data = {
        ids: id
      }
      deletecartids(data).then(res => {
        if (res.code === 404) {
          this.$notify({ type: 'danger', message: res.message })
          return
        }
        if (res.code === 200) {
          console.log(res)
          this.$store.commit('deletedesignDatas', id)
          this.$notify({ type: 'danger', message: res.message })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main-panel {
  position: relative;
}
.sketch-wrapper {
  position: relative;
  margin: 0 auto;
  top: 0px;
  left: 10px;
  bottom: 10px;
  /* background-color: #e06161; */
}
.sketch-canvas {
  width: 1000px;
  height: 1000px;
}
.control-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  user-select: none;
}
.image-panel {
  position: absolute;
}
.emptyIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    padding-top: 2rem;
    width: 50%;
    height: 8rem;
    margin: 0 auto;
  }
  .title {
    text-align: center;
    padding: 0.5rem;
  }
  .goHome {
    margin-top: 2rem;
    color: white;
    background-color: #45c763;
    text-align: center;
    margin: 0 auto;
    padding: 0.5rem;
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    border-radius: 1rem;
  }
}
#produceItem {
  background-color: transparent;
  height: auto;
  padding-left: 2%;
  padding-top: 0.5rem;
}
.item {
  position: relative;
  top: 5rem;
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding-bottom: 0.6rem;
}

.item img {
  width: 100%;
  height: 100%;
  // 等比缩小图片来适应元素的尺寸
  background-size: contain;
  background-image: url('http://oss.mathgame.cc:8088/mall/assert/placeholderImg/product-img-load.png');
}
.item .itemTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1rem;
  font-size: 0.625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item .itemSubTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: gray;
  padding-top: 0.2rem;
  font-size: 0.45rem;
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1.5rem;
}

.item .price {
  padding-left: 0.5rem;
  color: #f37078;
  font-size: 0.928rem;
}
.tagEat {
  margin-left: 0.5rem;
  padding: 0.09rem;
  color: orangered;
  width: 2.5rem;
  height: 0.1rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  border: 0.05rem solid red;
}
.originPrice {
  font-size: 0.6875rem;
  color: #999999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 1rem;
  bottom: 0.5rem;
}
</style>
