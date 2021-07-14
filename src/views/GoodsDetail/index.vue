<template>
  <div id="goodsDetail">
    <van-nav-bar
      title="商品详情"
      :fixed="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="goodsDetailWrapper">
      <!-- 商品图 -->
      <div class="goodsImage">
        <img :src="goodsInfo.small_image" alt="" />
      </div>
      <!-- 限时抢购  -->
      <div v-show="goodsInfo.isFlash" class="flash">
        <div class="flashLeft">
          <span>限时抢购</span>
          <i>抢购中</i>
        </div>
        <div class="flashRight">
          <span>距结束</span>
          <!-- 倒计时 -->
          <van-count-down :time="time" class="countStyle" format="HH mm ss">
            <template v-slot="timeData">
              <span class="item">{{ timeData.hours }}</span>
              <i>:</i>
              <span class="item">{{ timeData.minutes }}</span>
              <i>:</i>
              <span class="item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <!-- 商品名称 -->
      <div class="productInfo">
        <div class="title">
          {{ goodsInfo.name }}
        </div>
        <div class="subTitle">
          {{ goodsInfo.spec }}
        </div>
        <span class="originPrice">{{ goodsInfo.origin_price }}</span>
        <span class="price">{{ goodsInfo.price }}</span>
        <span class="totalSales"> 已售:{{ goodsInfo.total_sales }} </span>
        <van-divider />
        <div class="shippingInfo">
          <van-icon
            name="cluster-o"
          />此商品按500g/份计价,如实收少于500g将退还差价
        </div>
        <van-divider />
        <div class="shippingInfo">
          <van-icon name="clock-o" />最快29分钟内送达
        </div>
      </div>
      <!-- 规格 -->
      <div class="specifications">
        <div class="specificationsTitle">
          规格
        </div>
        <van-divider dashed />
        <div class="conditions">
          <span>保存条件</span>
          <span class="conditionsOne">小心多清理</span>
        </div>
        <van-divider dashed />
        <div class="conditions">
          <span>产地</span>
          <span class="conditionsTwo">福州工厂</span>
        </div>
        <van-divider dashed />
      </div>
      <div class="showGoods">
        <img :src="goodsInfo.small_image" alt="" />
        <img :src="goodsImage" alt="" />
      </div>

      <!-- 底部商品导航    -->
      <van-goods-action :safe-area-inset-bottom="false" style="z-index:100">
        <van-goods-action-icon
          icon="cart-o"
          :info="goodsNum"
          @click="onClickCar"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickAddToCar"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from 'vuex'
import {
  Divider,
  Icon,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  CountDown,
  NavBar
} from 'vant'

export default {
  components: {
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [CountDown.name]: CountDown,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100,
      // 是否是限时抢购
      isFlash: true,
      goodsInfo: this.$route.query,
      goodsImage:
        'http://oss.mathgame.cc:8088/mall/assert/introduction/publicity1.png'
    }
  },
  computed: {
    ...mapState(['shopCart']),
    // 购物车商品数量
    goodsNum() {
      let num = 0
      Object.values(this.shopCart).forEach(goods => {
        num += goods.num
      })
      if (num > 0) {
        return num
      }
      return num
    }
  },
  mounted() {
    console.log()
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    // 返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 加入购物车
    onClickAddToCar() {
      this.ADD_TO_CART(this.goodsInfo)
    },
    // 点击了购物车
    onClickCar() {
      this.$router.push({ name: 'cart' })
    }
  }
}
</script>
<style lang="less" scoped>
#goodsDetail {
  background-color: #f5f5f5;
  .goodsDetailWrapper {
    overflow: hidden;
    margin-top: 2.7rem;
    .goodsImage {
      width: 100%;
      img {
        width: 100%;
        height: 80%;
      }
    }
    .flash {
      display: flex;
      flex: 1;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      .flashLeft {
        width: 55%;
        background-color: #e25450;
        span {
          font-size: 0.8rem;
          color: #ffffff;
          padding-left: 1rem;
        }
        i {
          padding-left: 0.6rem;
          font-size: 0.5rem;
          color: #ffffff;
        }
      }
      .flashRight {
        width: 45%;
        background-color: #fcefe9;
        height: 2rem;
        line-height: 2rem;
        padding-left: 0.5rem;
        font-size: 0.5rem;
        color: #e25450;
        .countStyle {
          display: inline;
          margin-left: 0.3rem;
          .item {
            display: inline-block;
            width: 22px;
            margin-right: 5px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #e25450;
          }
          i {
            color: #e25450;
            padding-right: 0.2rem;
          }
        }
      }
    }
    .productInfo {
      background-color: white;
      padding: 0.5rem;
      .title {
        color: black;
        font-size: 0.8rem;
      }
      .subTitle {
        padding: 0.5rem 0;
        color: grey;
        font-size: 0.6rem;
      }
      .originPrice {
        color: #e25450;
        padding-right: 0.5rem;
        font-size: 0.8rem;
      }
      .price {
        color: grey;
        font-size: 0.5rem;
        text-decoration: line-through;
      }
      .totalSales {
        float: right;
        color: #e25450;
        font-size: 0.8rem;
      }
      .shippingInfo {
        font-size: 0.6rem;
        height: 0.8rem;
        color: grey;
      }
    }
    .specifications {
      width: 100%;
      background-color: white;
      margin-top: 1rem;
      padding-left: 0.5rem;
      .specificationsTitle {
        padding-top: 1rem;
        font-size: 1rem;
        color: black;
      }
      .conditions {
        font-size: 0.6rem;
        height: 1rem;
        color: grey;
        .conditionsOne {
          padding-left: 2rem;
        }
        .conditionsTwo {
          padding-left: 2.5rem;
        }
      }
    }
    .showGoods {
      width: 100%;
      img {
        width: 100%;
      }
    }
    @media screen and (min-width: 300px) and(max-width: 374px) {
      .van-goods-action {
        bottom: 3.3rem;
      }
    }
    @media screen and (min-width: 375px) and(max-width: 420px) {
      .van-goods-action {
        bottom: 2.7rem;
      }
    }
    @media screen and (min-width: 420px) and(max-width: 1024px) {
      .van-goods-action {
        bottom: 1.4rem;
      }
    }
  }
}
</style>
