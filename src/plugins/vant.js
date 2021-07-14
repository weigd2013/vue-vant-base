import Vue from 'vue'
// 1.Tabbar
import {
  Tabbar,
  TabbarItem,
  Loading,
  Grid,
  GridItem,
  CountDown,
  Lazyload,
  Tab,
  Tabs,
  Divider,
  Toast,
  NavBar,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Cell,
  CellGroup,
  Tag,
  ContactCard,
  ContactList,
  ContactEdit,
  Icon,
  RadioGroup,
  Radio,
  Switch,
  Field,
  AddressList,
  AddressEdit,
  Area,
  Popup,
  SwipeCell,
  Button,
  DatetimePicker,
  CouponCell,
  CouponList,
  Sticky,
  Sidebar,
  SidebarItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Overlay
} from 'vant'
Vue.use(Tabbar).use(TabbarItem)

// 2.loading组件
Vue.use(Loading)

// 3.栅栏格子
Vue.use(Grid).use(GridItem)

// 4.倒计时
Vue.use(CountDown)

// 5.图片懒加载
// options 为可选参数，无则不传
Vue.use(Lazyload)

// 6.Tabbar 标签栏
Vue.use(Tab).use(Tabs)

// 7.分割线
Vue.use(Divider)

// 8.轻弹窗
Vue.use(Toast)

// 9.导航栏
Vue.use(NavBar)

// 10.提交订单
Vue.use(SubmitBar)

// 11.复选框
Vue.use(Checkbox).use(CheckboxGroup)

// 12.提示框
Vue.use(Dialog)

// 13.单元格
Vue.use(Cell).use(CellGroup)

// 14.tag标记
Vue.use(Tag)

// 15.填写订单
Vue.use(ContactCard)
  .use(ContactList)
  .use(ContactEdit)

// 16.icon图标
Vue.use(Icon)

// 17.单选框及单选框组
Vue.use(RadioGroup)
Vue.use(Radio)

// 18.switch 开关
Vue.use(Switch)

// 19.field输入框
Vue.use(Field)

// 20.联系地址
Vue.use(AddressList)

// 21.地址编辑
Vue.use(AddressEdit)

// 22.省市区选择器
Vue.use(Area)

// 23.弹出层
Vue.use(Popup)

// 24.滑动单元格
Vue.use(SwipeCell)

// 25.van Button
Vue.use(Button)

// 26.时间选择
Vue.use(DatetimePicker)

// 27.优惠券
Vue.use(CouponCell).use(CouponList)

// 28.粘性布局
Vue.use(Sticky)

// 29.侧边导航
Vue.use(Sidebar)
Vue.use(SidebarItem)

// 30.商品导航
Vue.use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)

// 遮罩
Vue.use(Overlay)
