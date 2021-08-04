<template>
  <div class="cart">
    <header
      class="
       titleWrapper"
    >
      <h4>
        <strong>购物车</strong>
      </h4>
      <div
        v-show="isShowEmptyCart"
        class="clearCart"
        :style="selectedGoodsCount === 0 ? 'color:grey' : 'color:#45c763'"
        @click="clearCart"
      >
        删除
      </div>
    </header>
    <div class="cartWrapper">
      <div v-show="!isShowEmptyCart" class="emptyCart">
        <img
          src="http://oss.mathgame.cc:8088/mall/assert/cart/empty.png"
          alt=""
        />
        <div class="title">
          购物车空空滴~
        </div>
        <!--router-link to="/dashboard/home" class="goHome">
          去逛逛
        </router-link-->
      </div>
      <div v-show="isShowEmptyCart" class="contentWrapper">
        <div
          v-for="goods in shopCart"
          :key="goods.id"
          class="contentWrapperList"
        >
          <section>
            <div class="shopCartListCon">
              <div class="left">
                <a
                  href="javaScript:;"
                  class="cartCheckBox"
                  :checked="goods.checked"
                  @click.stop="single(goods.id)"
                >
                </a>
              </div>
              <div class="center">
                <img :src="goods.smallImage" />
              </div>
              <div class="right">
                <a>
                  {{ goods.name }}
                </a>
                <div class="bottomContent">
                  <p class="shopPrice">
                    {{ goods.price }}
                  </p>
                  <div class="shopDeal">
                    <span @click="reduceGoods(goods.id, goods.num)">-</span>
                    <input v-model="goods.num" type="number" disabled />
                    <span @click="addGoods(goods)">
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- 提交订单 -->
        <van-submit-bar
          v-show="isShowEmptyCart"
          :price="totalPrice"
          :button-text="submitBarText"
          :disabled="!(selectedGoodNum > 0)"
          @submit="onSubmit"
        >
          <van-checkbox v-model="isCheckedAll" checked-color="#45c763">
            全选
          </van-checkbox>
        </van-submit-bar>
      </div>
      <div v-show="isDraw">
        <van-divider
          :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
        >
          你的设计
        </van-divider>
        <img :src="designimage.url" alt="" />
      </div>
      <!-- 猜你喜欢 -->
      <van-divider
        :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
      >
        选你喜欢的手机壳
      </van-divider>
      <produceitem
        :product_lists="youLike_product_lists"
        :style="
          isShowEmptyCart ? 'padding-bottom:5.5rem' : 'padding-bottom:3rem'
        "
      />
    </div>
  </div>
</template>
<script>
import { Dialog, Toast, SubmitBar, Divider, Checkbox } from 'vant'
import { mapMutations, mapState, mapGetters } from 'vuex'
import { getproduct } from '@/api/searchproduct'
import produceitem from '../Tab/ProduceItem.vue'
import { getdesignlist, addcart, deletecartids } from '@/api/getdesignlist'
export default {
  components: {
    [SubmitBar.name]: SubmitBar,
    [Divider.name]: Divider,
    [Checkbox.name]: Checkbox,
    produceitem
  },
  data() {
    return {
      youLike_product_lists: [],
      isShowLoading: false,
      isEmptyCart: false,
      designinfo: this.$route.query
    }
  },
  computed: {
    // 0.结算数量
    submitBarText() {
      const count = this.selectedGoodNum
      return '结算' + (count ? `(${count})` : '')
    },
    // 1.是否显示空购物车样式
    isShowEmptyCart() {
      let isshow = false
      if (this.totalCount > 0) {
        isshow = true
      }
      return isshow
    },
    // 2.延展出store里的shopCart的数据
    ...mapState(['shopCart', 'userInfo', 'designimage']),
    ...mapGetters({
      selectedGoodNum: 'SELECTED_GOODS_COUNT',
      totalPrice: 'SELECTED_GOODS_PRICE',
      isDraw: 'getcurrentISdraw'
    }),
    // 3.计算shopCart的数量
    totalCount() {
      return Object.keys(this.shopCart).length
    },
    // 4.计算shopCart中选中商品的数量
    selectedGoodsCount() {
      let selectedGoodsCount = 0
      Object.values(this.shopCart).forEach(goods => {
        if (goods.checked) {
          selectedGoodsCount++
        }
      })
      return selectedGoodsCount
    },
    // 5.是否全部选中
    isCheckedAll: {
      get() {
        let tag = this.totalCount > 0
        let shopCart = this.shopCart
        Object.values(shopCart).forEach(goods => {
          if (!goods.checked) {
            tag = false
          }
        })
        return tag
      },
      set(value) {
        // 改变store中的值
        // 解决 assigned to but it has no setter.
        // https://vuex.vuejs.org/zh/guide/forms.html
        //  https://stackoverflow.com/questions/55097118/computed-property-was-assigned-to-but-it-has-no-setter-a-toggle-component
        let isCheckedAll = !value
        this.ALL_SELECT_GOODS({ isCheckedAll })
      }
    }
  },
  mounted() {
    // 初始化数据
    this._initData()
  },
  methods: {
    // 0.延展mutations中的方法
    ...mapMutations([
      'ADD_GOODS',
      'REDUCE_GOODS',
      'SINGLE_SELECT_GOODS',
      'ALL_SELECT_GOODS',
      'DELETE_SELECT_GOODS',
      'ADD_TO_CART'
    ]),
    // 1.右上角删除
    clearCart() {
      if (this.selectedGoodsCount > 0) {
        let data = new FormData()
        Object.values(this.shopCart).forEach(goods => {
          if (goods.checked) {
            // 6.2删除选中商品
            data.append('ids', goods.id)
          }
        })

        deletecartids(data).then(res => {
          if (res.code === 200) {
            Dialog.confirm({
              title: '温馨提示：',
              message: '确定要删除选中商品吗?'
            })
              .then(() => {
                // on confirm 确认删除
                this.DELETE_SELECT_GOODS()
              })
              .catch(() => {
                // on cancel
              })
          }
        })
      }
    },
    // 2.数据加载
    async _initData() {
      let params = {}
      params['pageNum'] = 1
      params['pageSize'] = 10
      params['sort'] = 0
      params['productCategoryId'] = 59
      let ref = await getproduct(params)
      console.log(ref)
      if (ref.code === 200) {
        this.youLike_product_lists = ref.data.list
        this.isShowLoading = false
      }
      getdesignlist().then(res => {
        if (res.code === 200) {
          console.log('getdesignlist')
          console.log(res)
          this.$store.commit('initShopCartA', res.data)
        }
      })
    },
    // 3.减少商品数量
    reduceGoods(goodsID, goodsNum) {
      if (goodsNum > 1) {
        // 3.1 通过goodsID减少商品
        this.REDUCE_GOODS({
          goodsID
        })
      } else if (goodsNum === 1) {
        Dialog.confirm({
          title: '温馨提示',
          message: '确定删除该商品吗?'
        })
          .then(() => {
            // on confirm 确认删除
            this.REDUCE_GOODS({ goodsID })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    // 4.增加商品数量 保证传递数据和 mutations 一致
    addGoods(goods) {
      let data = {
        createDate: '2021-07-10T03:49:04.619Z',
        deleteStatus: 0,
        id: 0,
        memberId: 0,
        memberNickname: 'string',
        modifyDate: '2021-07-10T03:49:04.619Z',
        price: 0,
        productAttr: 'string',
        productBrand: 'string',
        productCategoryId: 59,
        productId: 0,
        productName: 'string',
        productPic: 'string',
        productSkuCode: 'string',
        productSkuId: 0,
        productSn: 'string',
        productSubTitle: 'string',
        quantity: 0
      }
      data['productId'] = goods.id
      data['productCategoryId'] = goods.productCategoryId
      data['productName'] = goods.name
      data['productPic'] = goods.pic
      data['quantity'] = 1
      data['price'] = goods.price

      addcart(data).then(res => {
        if (res.code === 200) {
          this.ADD_GOODS({
            goodsID: goods.id,
            goodsName: goods.name,
            goodsSmallImage: goods.pic,
            goodsPrice: goods.price
          })
        }
      })
    },
    // 5.单个商品的选中和非选中
    single(goodsID) {
      this.SINGLE_SELECT_GOODS({ goodsID })
    },
    // 6.去结算
    onSubmit() {
      if (!this.isDraw) {
        this.$router.push('/Draw')
        Toast({
          message: '先完成你的设计',
          duration: 1000
        })
        return
      }
      // 6.1 当选中商品数量大于0跳转
      if (this.selectedGoodNum > 0) {
        // 跳转到订单界面
        this.$router.push('/EditOrder')
      } else {
        Toast({
          message: this.$t('order.chooseGoods'),
          duration: 1000
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .titleWrapper {
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleWrapper .clearCart {
    position: absolute;
    right: 0.3rem;
    font-size: 0.8rem;
  }
  .disableClearCart {
    color: grey;
  }
  .cartWrapper {
    width: 100%;
    height: 100rem;
    margin-top: 2.6rem;
    @media screen and (min-width: 300px) and(max-width: 374px) {
      .van-submit-bar {
        bottom: 3.3rem;
      }
    }
    @media screen and (min-width: 375px) and(max-width: 420px) {
      .van-submit-bar {
        bottom: 2.7rem;
      }
    }
    @media screen and (min-width: 420px) and(max-width: 1024px) {
      .van-submit-bar {
        bottom: 1.4rem;
      }
    }
    .emptyCart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        padding-top: 2rem;
        width: 50%;
        height: 8rem;
        margin: 0 auto;
      }
      .title {
        text-align: center;
        padding: 0.5rem;
      }
      .goHome {
        margin-top: 2rem;
        color: white;
        background-color: #45c763;
        text-align: center;
        margin: 0 auto;
        padding: 0.5rem;
        width: 5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 1rem;
      }
    }
    .contentWrapper {
      padding-top: 0.5rem;
      section {
        background-color: #ffffff;
        .shopCartListCon {
          display: flex;
          height: 6rem;
          border-bottom: 0.01rem solid #e0e0e0;
          margin-bottom: 0.7rem;
          padding: 0.5rem 0;
          justify-content: center;
          align-items: center;
          .left {
            flex: 1;
            display: flex;
            a {
              display: inline-block;
              margin-top: 0.8rem;
              margin-left: 0.5rem;
            }
            .cartCheckBox {
              background: url('http://oss.mathgame.cc:8088/mall/assert/cart/shop-icon.png')
                no-repeat;
              background-size: 2.5rem 5rem;
              width: 1rem;
              height: 1rem;
            }
            .cartCheckBox[checked] {
              background-position: -1.2rem 0;
            }
          }
          .center {
            flex: 3;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            flex: 6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            position: relative;
            a {
              height: 2.2rem;
              line-height: 1.2rem;
              overflow: hidden;
              margin-bottom: 0.3rem;
              font-size: 0.8rem;
              color: #000;
            }
          }
        }
        .bottomContent {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .shopPrice {
            font-size: 0.8rem;
          }
          .shopDeal span {
            display: inline-block;
            width: 1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            float: left;
          }
          .shopDeal input {
            float: left;
            width: 2rem;
            height: 1.2rem;
            text-align: center;
            margin: 0 0.2rem;
            font-size: 0.8rem;
            background-color: #f5f5f5;
            border: 0;
          }
        }
      }
    }
  }
  .van-checkbox {
    margin-left: 0.5rem;
  }
}
</style>
