<template>
  <div id="editAddress">
    <van-nav-bar
      title="编辑地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="addressInfo"
      :search-result="searchResult"
      style="margin-top:3rem"
      @delete="onDelete"
      @save="onSave"
    />
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from 'vuex'
import areaList from '../../../config/area.js'
import { AddressEdit, NavBar } from 'vant'
import { editaddressA, deleteaddressA } from '@/api/productCateList53'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      areaList: areaList,
      addressInfo: {},
      searchResult: []
    }
  },
  mounted() {
    // 处理路由传过来的数据
    this.addressInfo = this.$route.params.content
  },
  methods: {
    ...mapMutations([
      'ADD_USER_SHOPPING_ADDRESS',
      'DELETE_USER_SHOPPING_ADDRESS',
      'CHANGE_USER_SHOPPING_ADDRESS'
    ]),
    // 1.返回上级界面
    onClickLeft() {
      this.$router.go(-1)
    },
    // 2. 保存
    onSave(content) {
      let address = {
        city: content.city,
        defaultStatus: 0,
        detailAddress: content.addressDetail,
        id: content.id,
        memberId: content.memberId,
        name: content.name,
        phoneNumber: content.tel,
        postCode: content.postalCode,
        province: content.province,
        region: content.county
      }
      editaddressA(content.id, address).then(res => {
        if (res.code === 200) {
          let id = content.id
          content['address'] =
            content.province +
            content.city +
            content.county +
            content.addressDetail
          this.CHANGE_USER_SHOPPING_ADDRESS({
            id,
            content
          })
          this.$router.back()
        }
      })
    },
    // 删除
    onDelete(content) {
      console.log('onDelete')
      deleteaddressA(content.id).then(res => {
        if (res.code === 200) {
          let id = content.id
          this.DELETE_USER_SHOPPING_ADDRESS({ id })
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#editAddress1 {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
}
</style>
