<template>
  <div class="backgroud">
    <van-image :src="imgsrc" width="100%" height="100%" alt="" />
  </div>
</template>

<script>
import { Image } from 'vant'

export default {
  components: {
    [Image.name]: Image
  },
  data() {
    return {
      imgsrc: require('../assets/backgroup1.jpg')
    }
  }
}
</script>
<style scoped>
.backgroud {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
</style>
