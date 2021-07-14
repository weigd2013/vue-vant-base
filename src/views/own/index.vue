<template>
  <div>
    <van-image
      class="user-poster"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      alt="用户"
    />
    <van-row class="user-link">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="orders-o" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="cash-on-deliver" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        待收货
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell title="全部订单" icon="records" is-link to="/OrderList" />
      <van-cell title="地址管理" icon="records" is-link to="/Address" />
    </van-cell-group>
  </div>
</template>
<script>
import { Image, Row, Col, Icon, CellGroup, Cell } from 'vant'

export default {
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    return {
      data: 0
    }
  }
}
</script>
<style lang="less" scoped>
.user-poster {
  width: 100%;
  height: auto;
  display: block;
}
.user-link {
  text-align: center;
  font-size: 12px;
  padding: 15px 0;
  background-color: #fff;
}
.user-link .van-icon {
  display: block;
  margin-bottom: 4px;
  font-size: 24px;
}
</style>
