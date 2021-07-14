<template>
  <div id="produceItem">
    <div
      v-for="(product, index) in product_lists"
      :key="index"
      class="item"
      @click.stop="goToGoodsDetail(product)"
    >
      <img :src="product.pic" alt="" />
      <p class="itemTitle">
        {{ product.name }}
      </p>
      <p class="itemSubTitle">
        {{ product.keywords }}
      </p>
      <span v-if="isShowEatTag" class="tagEat">吃货节</span>
      <span class="price">
        {{ product.price }}
      </span>
      <span class="originPrice">{{ product.origin_price }}</span>
      <div class="buyCar" @click.stop="addCartA(product)">
        <!--svg-icon icon-class="car" style="width:1.5rem;height:1.5rem" /-->
        <van-icon
          name="cart-o"
          color="#1989fa"
          style="width:1.5rem;height:1.5rem"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from 'vuex'
import { Icon } from 'vant'
import { addcart } from '@/api/getdesignlist'

export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    product_lists: Array
  },
  data() {
    return {
      isShowEatTag: false
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      addCartB: 'ADD_TO_CART'
    }),
    // 商品详情页面
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      this.$router.push({
        name: 'goodsDetail',
        query: {
          id: goods.id,
          name: goods.name,
          small_image: goods.pic,
          price: goods.price,
          spec: goods.keywords,
          total_sales: goods.sale,
          origin_price: goods.originalPrice
        }
      })
    },
    addCartA(product) {
      let self = this
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
        quantity: 1
      }
      data['productId'] = product.id
      data['productName'] = product.name
      data['productPic'] = product.pic
      data['productCategoryId'] = product.productCategoryId
      data['productBrand'] = product.brandId
      data['price'] = product.price
      addcart(data).then(res => {
        if (res.code === 200) {
          self.addCartB(product)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#produceItem {
  background-color: #f5f5f5;
  height: auto;
  padding-left: 2%;
  padding-top: 0.5rem;
}
.item {
  position: relative;
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding-bottom: 0.6rem;
}

.item img {
  width: 100%;
  height: 100%;
  // 等比缩小图片来适应元素的尺寸
  background-size: contain;
  background-image: url('http://oss.mathgame.cc:8088/mall/assert/placeholderImg/product-img-load.png');
}
.item .itemTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1rem;
  font-size: 0.625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item .itemSubTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: gray;
  padding-top: 0.2rem;
  font-size: 0.45rem;
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1.5rem;
}

.item .price {
  padding-left: 0.5rem;
  color: #f37078;
  font-size: 0.928rem;
}
.tagEat {
  margin-left: 0.5rem;
  padding: 0.09rem;
  color: orangered;
  width: 2.5rem;
  height: 0.1rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  border: 0.05rem solid red;
}

.originPrice {
  font-size: 0.6875rem;
  color: #999999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 1rem;
  bottom: 0.5rem;
}
</style>
