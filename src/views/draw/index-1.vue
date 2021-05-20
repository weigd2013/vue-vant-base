<template>
  <div class="sketch-wrapper">
    <canvas id="sketchCanvas" class="sketch-canvas"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
console.log(fabric)
export default {
  name: 'Sketch',
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
        containerClass: 'sketch-canvas',
        backgroundColor: '#ffffff'
      })
      let rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 45
      })
      this.canvas.add(rect)
      this.canvas.renderAll()
    }
  }
}
</script>
<style scoped>
.sketch-wrapper {
  position: relative;
  top: 20px;
  left: 50px;
  background-color: #e06161;
}
.sketch-canvas {
  width: 1000px;
  height: 1000px;
}
</style>
