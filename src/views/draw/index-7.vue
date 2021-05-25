<template>
  <div class="main-panel">
    <div class="sketch-wrapper">
      <canvas id="sketchCanvas" class="sketch-canvas"></canvas>
    </div>
    <van-button round icon="add-o" type="info" size="mimi" color="#7232dd">
      phone
    </van-button>
    <van-button
      round
      icon="add-o"
      type="info"
      size="mimi"
      color="#7232dd"
      @click="addicon"
    >
      icon
    </van-button>
    <van-button round icon="add-o" type="info" size="mimi" color="#7232dd">
      下一步
    </van-button>
    <van-grid :border="true" :column-num="1">
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Button, Grid, GridItem, Image } from 'vant'
console.log(fabric)
export default {
  name: 'Sketch',
  components: {
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  data() {
    return {
      canvas: null,
      cwidth: 0,
      cheight: 0,
      iconset: [],
      iconnum: 10
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init: async function() {
      this.initSketch()
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

      let rect1 = new fabric.Rect({
        left: 40,
        top: 50,
        fill: 'green',
        width: 50,
        height: 50,
        angle: 45,
        lockMovementX: 'true',
        visible: 'false'
      })
      this.canvas.add(rect1)
      rect1.left += 10
      rect1.lockMovementX = false
      rect1.visible = true
      rect1.selectable = true
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
    addicon: function() {
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
  left: 100px;
  /* background-color: #e06161; */
}
.sketch-canvas {
  width: 1000px;
  height: 1000px;
}
.control-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50vh;
  user-select: none;
}
.image-panel {
  position: absolute;
}
</style>
