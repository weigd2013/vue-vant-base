<template>
  <div class="main-panel">
    <div class="sketch-wrapper">
      <canvas id="sketchCanvas" class="sketch-canvas"></canvas>
    </div>
    <div class="control-panel">
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
      <van-button
        round
        icon="add-o"
        type="info"
        size="mimi"
        color="#7232dd"
        @click="saveimage"
      >
        下单
      </van-button>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Button, Card, Tag } from 'vant'
import { mapState } from 'vuex'
console.log(fabric)
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
      phonecase: {}
    }
  },
  computed: mapState({
    count: state => state.count,
    currentDatas: 'currentDatas',
    countPlusLocalState(state) {
      return state.count + this.localCount
    }
  }),
  mounted() {
    this.init()
    this.render()
  },
  methods: {
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
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = bgiurl
      let imageinstance = new fabric.Image(image, {
        crossOrigin: 'anonymous'
      })
      this.canvas.setBackgroundImage(imageinstance, function() {
        self.canvas.renderAll()
      })
      let image1 = new Image()
      image1.setAttribute('crossOrigin', 'anonymous')
      image1.src = oliuarl
      let imageinstance1 = new fabric.Image(image1, {
        crossOrigin: 'anonymous'
      })
      this.canvas.setOverlayImage(
        imageinstance1,
        this.canvas.renderAll.bind(this.canvas)
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
        let image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = data[i].pic
        this.addicon(image)
      }
    },
    addicon1: function() {
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
    },
    addicon2: function() {
      let self = this
      fabric.Image.fromURL(
        'http://oss.mathgame.cc:8088/mall/20210623/20.png',
        function(oImg) {
          oImg.left = 0
          oImg.top = 0
          self.canvas.add(oImg)
        }
      )
    },
    addicon: function(image) {
      let self = this
      let imageinstance = new fabric.Image(image, {
        crossOrigin: 'anonymous'
      })
      fabric.Image.fromURL(imageinstance, function(oImg) {
        oImg.left = 0
        oImg.top = 0
        console.log(oImg)
        self.canvas.add(oImg)
      })
    },
    saveimage: function() {
      /*
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = this.canvas.toDataURL()
      console.log(image) */
      const currState = this.canvas.toJSON()
      console.log(currState)
    },
    savetoJSON: function() {
      const currState = this.canvas.toJSON()
      console.log(currState)
    }
  }
}
</script>
<style scoped>
.main-panel {
  position: relative;
}
.sketch-wrapper {
  position: relative;
  margin: 0 auto;
  top: 0px;
  left: 0px;
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
</style>
