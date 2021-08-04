<template>
  <div id="addAddress">
    <van-nav-bar
      title="添加地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      save-button-text="保存并使用"
      style="margin-top:3rem"
      @save="onSave"
    />
    <!-- 路由出口 -->
    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from 'vuex'
import { AddressEdit, NavBar } from 'vant'
import areaList from '../../../config/area.js'
import { addaddressA } from '@/api/productCateList53'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  methods: {
    ...mapMutations(['ADD_USER_SHOPPING_ADDRESS']),
    // 1.返回上级界面
    onClickLeft() {
      this.$router.go(-1)
    },
    // 2. 保存
    onSave(content) {
      console.log('add address')
      let address = {
        city: content.city,
        defaultStatus: 0,
        detailAddress: content.addressDetail,
        id: 0,
        memberId: 0,
        name: content.name,
        phoneNumber: content.tel,
        postCode: content.postalCode,
        province: content.province,
        region: content.county
      }
      addaddressA(address).then(res => {
        if (res.code === 200) {
          let addressID = this.addressID().toString()
          content['id'] = addressID
          content['address'] =
            content.province +
            content.city +
            content.county +
            content.addressDetail
          this.ADD_USER_SHOPPING_ADDRESS({
            addressID,
            content
          })
          this.$router.back()
        }
      })
    },
    // 生成不重复的id
    addressID() {
      let lastUuid = 0
      return new Date().getTime() * 1000 + (lastUuid++ % 1000)
    }
  }
}
</script>
<style lang="less" scoped>
#addAddress1 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 100;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>
