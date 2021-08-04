<template>
  <div id="myAddress">
    <!--导航栏-->
    <van-nav-bar
      title="添加地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />
    <!-- 没有数据的占位图 -->
    <div v-show="shippingAddress.length < 1" class="noDataPlaceHold">
      <img
        src="http://oss.mathgame.cc:8088/mall/assert/order/noAddress.png"
        alt=""
      />
      <span class="desc">还没有添加过地址呢,添加一个吧😄</span>
    </div>
    <!-- 联系人 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="shippingAddress"
      style="margin-top: 3rem"
      add-button-text="添加地址"
      @add="onAdd"
      @edit="onEdit"
      @select="onBackAddress"
    />
    <!-- 路由出口 -->
    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapMutations } from 'vuex'
import { AddressList, NavBar } from 'vant'
import { getaddresslist } from '@/api/productCateList53'
// 引入发布订阅
import { CHOOSE_USER_ADDRESS } from '../../../config/pubsub_type'
import PubSub from 'pubsub-js'

export default {
  components: {
    [AddressList.name]: AddressList,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      chosenAddressId: 0
    }
  },
  computed: {
    ...mapState(['shippingAddress'])
  },
  mounted() {
    // this.INIT_USER_SHOPPING_ADDRESS()
    this.initdata()
  },

  methods: {
    ...mapMutations(['INIT_USER_SHOPPING_ADDRESS']),
    async initdata() {
      let list = await getaddresslist()
      console.log(list)
      for (let i = 0; i < list.data.length; i++) {
        list.data[i]['tel'] = list.data[i].phoneNumber
        list.data[i]['address'] = list.data[i].detailAddress
        list.data[i]['isDefault'] = list.data[i].defaultStatus
      }
      this.INIT_USER_SHOPPING_ADDRESS(list.data)
    },
    onClickLeft() {
      this.$router.back()
    },
    onAdd() {
      this.$router.push({ path: '/AddAddress' })
    },
    onEdit(item) {
      this.$router.push({ name: 'EditAddress', params: { content: item } })
    },
    onBackAddress(item) {
      PubSub.publish(CHOOSE_USER_ADDRESS, item)
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
      height: 20%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
    }
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .van-address-list__add {
    bottom: 3rem;
  }
  .van-button--large {
    left: 15%;
    width: 70%;
    border-radius: 2rem;
    background-color: #45c763;
    border: none;
  }
}
</style>
