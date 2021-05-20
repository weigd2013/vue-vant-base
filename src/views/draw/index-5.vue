<template>
  <div class="main-panel">
    <div class="sketch-wrapper">
      <canvas id="sketchCanvas" class="sketch-canvas"></canvas>
    </div>
    <div class="control-panel">
      <van-button round icon="add-o" type="info" size="mimi" color="#7232dd">
        phone
      </van-button>
      <van-button round icon="add-o" type="info" size="mimi" color="#7232dd">
        icon
      </van-button>
      <van-button round icon="add-o" type="info" size="mimi" color="#7232dd">
        按钮
      </van-button>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Button } from 'vant'
console.log(fabric)
export default {
  name: 'Sketch',
  components: {
    [Button.name]: Button
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
        containerClass: 'sketch-container',
        preserveObjectStacking: true
      })
      let self = this
      this.canvas.setBackgroundImage('phone1.png', function() {
        self.canvas.renderAll()
      })
      fabric.Image.fromURL('phone1.png', function(oImg) {
        console.log(oImg)
        console.log(oImg.width)
        self.canvas.setWidth(oImg.width)
        self.canvas.setHeight(oImg.height)
        /* self.canvas.add(oImg) */

        let rect = new fabric.Rect({
          left: 0,
          top: 0,
          fill: 'red',
          width: 20,
          height: 20,
          angle: 45
        })
        self.canvas.add(rect)
        self.canvas.renderAll()
      })

      let rect1 = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'green',
        width: 25,
        height: 25,
        angle: 45,
        lockMovementX: 'true',
        visible: 'false'
      })
      this.canvas.add(rect1)
      rect1.left += 10
      rect1.lockMovementX = false
      rect1.visible = true
      rect1.selectable = false
      /*
      fabric.Image.fromURL('head.png', function(oImg) {
        self.canvas.add(oImg)
        oImg.moveto(5)
        oImg.bringForward(true)
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
  top: 10px;
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
</style>
