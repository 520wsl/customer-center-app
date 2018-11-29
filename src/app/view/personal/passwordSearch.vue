<template>
  <div style="height:100%;background:#fff;">
    <div v-if="passwordlist.length<0">
      <ul>
        <li class="info-item" v-for="(item,index) in passwordlist" :key="index">
          <div class="company-title">
            <img :src="$CDN('/company.png')">
            <b>{{item.gongshititle}}</b>
          </div>
          <div class="company-info">
            <p class="company-info-item">
              <span class="item-key">网店地址 ：</span>
              <span class="item-value">{{item.address}}</span>
            </p>
            <p class="company-info-item">
              <!--eslint-disable no-irregular-whitespace -->
              <span class="item-key justify">账 号 ：</span>
              <span class="item-value">{{item.username}}</span>
            </p>
            <p class="company-info-item">
              <span class="item-key">密 码 ：</span>
              <span style="width:60%;" class="item-value">
                <input
                  style="border:0;outline:none;"
                  readonly
                  :type="item.showpassword?'text':'password'"
                  :value="item.password"
                >
              </span>
              <a style="width:10%;" @click="item.showpassword=!item.showpassword">
                <img
                  class="show-pass-word"
                  onselectstart="return false"
                  :src="item.showpassword?$CDN('/icon_hidden_pwd.png'):$CDN('/icon_show_pwd.png')"
                >
              </a>
            </p>
          </div>
          <div style="text-align:center;">
            <button @click="sendInfo(item)" class="search-button">将密码发送到手机</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="null-info" v-else>
      <img class="null-info-img" :src="$CDN('/null-icon.png')">
      <p>抱歉，您还没有登记店铺账号密码</p>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      passwordlist: [
        {
          gongshititle: "杭州嘉华聚氨酯制品有限公司",
          address: "https://shop8033338484m60.1688.com",
          username: 'xindingbaozhuangcailiao',
          password: '123456',
          phone: 13757134680,
          showpassword: false
        },
        {
          gongshititle: "杭州嘉华聚氨酯制品有限公司",
          address: "https://shop8033338484m60.1688.com",
          username: 'xindingbaozhuangcailiao',
          password: '123456',
          showpassword: true
        }
      ]
    }
  },
  methods: {
    sendInfo(company) {
      if (!company.phone) {
        MessageBox({
          message: '抱歉您还未绑定手机号!',
          showCancelButton: true,
          confirmButtonText: '前往绑定手机号'
        }).then(action => {
          if (action == 'confirm') {
            this.$router.push({ name: 'home' })
          }
        }).catch(err => {
        });
      } else {
        const msg = `密码将以短信的形式发送到以下手机上
      <br>手机号：${company.phone}<br>注意：手机号有误，点击
      <route-link href="//baidu.com" style="color:#3385ff;">变更手机号</route-link>`
        MessageBox.confirm(msg).then(action => {
          console.log(value, action)
        }).catch(err => {
        });
      }
    }
  },
  created() {
    this.$parent.$parent.setTitle("店铺账号密码查询");
  }
}
</script>
<style scoped>
.search-button {
  background: #697eff;
  border-radius: 2px;
  color: #ffffff;
  border: 1px solid transparent;
  font-size: 26px;
  padding: 14px 44px;
  outline: none;
}
.info-item {
  background: #fff;
  padding: 30px;
  margin-top: 20px;
}
.company-title {
  height: 50px;
  margin-bottom: 30px;
  line-height: 50px;
  font-size: 32px;
  color: #444444;
}
.company-title img {
  height: 40px;
  vertical-align: middle;
  margin: 0 6px;
}
.company-info {
  margin-bottom: 33px;
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
}
.company-info-item {
  border-bottom: 1px solid #d9d9d9;
  padding: 11px 22px;
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.company-info-item span {
  display: inline-block;
}
.company-info-item span.item-key {
  width: 28%;
}
.show-pass-word {
  height: 34px;
  vertical-align: middle;
}
.company-info-item span.item-value {
  width: 72%;
}
.null-info {
  margin-top: 20px;
  text-align: center;
}
.null-info-img {
  width: 210px;
  margin: 54px auto;
}
.null-info p {
  text-align: center;
  font-size: 28px;
  color: #929eaa;
}
</style>
