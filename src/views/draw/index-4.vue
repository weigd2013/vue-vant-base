<template>
  <div class="sketch-wrapper">
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
  </div>
</template>

<script>
import { Card } from 'vant'
import { fabric } from 'fabric'
console.log(fabric)
export default {
  name: 'Sketch',
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      canvas: null
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
        backgroundColor: '#ffffff',
        containerClass: 'sketch-container',
        freeDrawingCursor: 'crosshair',
        isDrawingMode: this.isFreeMode,
        selection: false,
        skipTargetFind: true,
        stopContextMenu: true
      })
      this.canvas.setWidth(600)
      this.canvas.setHeight(500)
      let rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 45
      })
      this.canvas.add(rect)
      this.canvas.senToBack(rect)
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
    changecanvassize: function(xwidth, yheight) {
      this.canvas.setWidth(xwidth)
      this.canvas.setHeight(yheight)
    }
  }
}
</script>
<style scoped>
.sketch-wrapper {
  position: relative;
  margin: 0 auto;
  top: 20px;
  left: 50px;
  height: 600pm;
  width: 100%;
  background-color: #90a839;
}
.sketch-canvas {
  width: 1000px;
  height: 1000px;
}
</style>
