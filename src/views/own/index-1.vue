<template>
  <div class="user_information">
    <van-cell-group>
      <van-cell title="头像" class="cell_middle">
        <van-uploader :after-read="avatarAfterRead">
          <div class="user_avatar_upload">
            <van-image
              v-if="avatar"
              alt="你的头像"
              round
              width="10rem"
              height="10rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <van-icon v-else name="camera_full" />
          </div>
        </van-uploader>
      </van-cell>
      <van-cell title="背景图" to="/user/information/setbg" is-link />
      <van-cell title="昵称" :value="nick_name" />
      <van-cell title="性别" :value="genderText" />
      <van-cell title="密码设置" />
      <van-cell title="手机号" :value="mobile" />
    </van-cell-group>

    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="sexColumns"
        title="选择性别"
        @cancel="showSex = false"
        @confirm="onSexConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Uploader, Picker, Popup } from 'vant'

export default {
  components: {
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup
  },
  data() {
    return {
      sexColumns: [
        {
          values: ['保密', '男', '女'],
          defaultIndex: 0
        }
      ],
      showSex: false,
      avatar: '',
      nick_name: '',
      gender: -1,
      mobile: ''
    }
  },

  computed: {
    genderText() {
      const text = ['保密', '男', '女']
      return text[this.gender] || ''
    }
  },

  created() {
    this.getUserInfo()
  },

  methods: {
    avatarAfterRead(file) {
      console.log(file)
    },
    onSexConfirm(value, index) {
      console.log(value)
      console.log(index)
    },
    getUserInfo() {
      console.log('gituserinfo')
    }
  }
}
</script>
