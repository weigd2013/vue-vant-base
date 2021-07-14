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
        保存设计
      </van-button>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { Button, Card, Tag } from 'vant'
import { mapState } from 'vuex'
import { uploadimage } from '@/api/uploadimage'
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
      const canvasAsImageB64 = this.canvas.toDataURL()
      fetch(canvasAsImageB64)
        .then(res => res.blob())
        .then(blob => {
          console.log(blob)
          const formData = new FormData()
          formData.append('file', blob, 'my.png')
          uploadimage(formData).then(res => {
            console.log(res)
          })
        })
      /*
      const blob = this.dataURItoBlob(canvasAsImageB64)
      const formData = new FormData()
      formData.append('file', blob)

      uploadimage(formData).then(res => {
        console.log(res)
      })*/
      this.$store.commit('changeDesignImage', canvasAsImageB64)
      this.$router.push({
        path: '/Cart'
      })
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
