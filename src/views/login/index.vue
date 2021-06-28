<template>
  <div>
    <!-- vant导航栏 -->
    <van-nav-bar style="background-color: #3090EC;">
      <template #left>
        <van-icon color="white" name="arrow-left" @click="back" />
      </template>
      <template #title>
        <span style="color: white;">登录</span>
      </template>
    </van-nav-bar>
    <!-- vant表单 -->
    <van-form>
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请填写账号' },
          {
            pattern: /^[1][3,5,6,7,8,9][0-9]{9}$/,
            message: '请输入正确的11位手机号'
          }
        ]"
      />
      <van-field
        v-model="password"
        :type="isPassword"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^\w{6,}$/,
            message: '密码不少于6位'
          }
        ]"
      >
        <template #right-icon>
          <span
            style="font-size: 20px;"
            class="iconfont icon-view"
            @click="onPassword"
          >
          </span>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="onSubmit1"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <div style="float: right;">
      <router-link to="/reg">
        没有账号？点击注册
      </router-link>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Icon } from 'vant'
import { userlogin } from '@/api/login'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {
      username: '',
      password: '',
      isPassword: 'password',
      isText: true
    }
  },
  methods: {
    onSubmit1() {
      if (this.username.trim() == '') {
        return
      }
      if (!this.username.match(/^[1][3,5,6,7,8,9][0-9]{9}$/)) {
        return
      }
      if (!this.password.match(/^\w{6,}$/)) {
        return
      }
      let data = {}
      data['username'] = this.username
      data['password'] = this.password
      userlogin(data).then(res => {
        if (res.code === 404) {
          this.$notify({ type: 'danger', message: res.message })
          return
        }
        if (res.code === 200) {
          this
          this.$store.commit('changeLogin', res.data)
          this.$store.commit('Logintrue')
          this.$router.push({
            path: '/'
          })
        }
      })
    },
    onSubmit() {
      if (this.username.trim() == '') {
        return
      }
      if (!this.username.match(/^[1][3,5,6,7,8,9][0-9]{9}$/)) {
        return
      }
      if (!this.password.match(/^\w{6,}$/)) {
        return
      }
      let users = localStorage.users
      if (users) {
        users = JSON.parse(users)
        let isLogin = false
        users.map(item => {
          if (
            item.username == this.username &&
            item.password == this.password
          ) {
            isLogin = true
            return
          }
        })
        if (isLogin) {
          sessionStorage.user = this.username
          this.$router.push({
            path: '/user'
          })
        } else {
          this.$notify({ type: 'danger', message: '输入的账号或密码有误' })
        }
      } else {
        this.$notify({ type: 'danger', message: '该用户不存在' })
      }
    },
    onPassword() {
      this.isText = !this.isText
      if (this.isText) {
        this.isPassword = 'password'
      } else {
        this.isPassword = 'text'
      }
    },
    back() {
      this.$router.push({
        path: '/user'
      })
    }
  }
}
</script>
