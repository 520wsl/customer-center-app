<template>
  <div class="main" style="height:100%;background:#fff;">
    <div v-if="passwordlist.length>0">
      <ul>
        <li class="info-item" v-for="(item,index) in passwordlist" :key="index">
          <div class="company-title">
            <img :src="$CDN('/company.png')">
            <b>{{item.name}}</b>
          </div>
          <div class="company-info">
            <p class="company-info-item">
              <span class="item-key">网店地址 ：</span>
              <span class="item-value">{{item.url}}</span>
            </p>
            <p class="company-info-item">
              <!--eslint-disable no-irregular-whitespace -->
              <span class="item-key justify">账 号 ：</span>
              <span class="item-value">{{item.account}}</span>
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
              <span style="display:inline-block;width:10%;">
                <img
                  class="show-pass-word"
                  @click="item.showpassword=!item.showpassword"
                  onselectstart="return false"
                  :src="item.showpassword?$CDN('/icon_hidden_pwd.png'):$CDN('/icon_show_pwd.png')"
                >
              </span>
            </p>
          </div>
          <div v-if="item.password" style="text-align:center;">
            <button @click="sendMobileInfo(item)" class="search-button">将密码发送到手机</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="null-info" v-if="passwordlist.length<=0 && !hasCompany">
      <img class="null-info-img" :src="$CDN('/null-icon.png')">
      <p>抱歉，您还没有登记店铺账号密码</p>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import {
  sendInfo,
  selectCompanyAndMobile,
  getCompanyListBoss
} from "@/api/customer/customer";
export default {
  data() {
    return {
      mobile: '',
      hasCompany: true,
      passwordlist: []
    }
  },
  created() {

  },
  async mounted() {
    this.$parent.$parent.setTitle("店铺账号密码查询");
    let res = await selectCompanyAndMobile();
    if (res.status == 200) {
      this.mobile = res.data.mobile;
    } else {
      this.$messagebox("提示", res.msg);
    }
    this.getList();
  },
  methods: {
    async sendMobileInfo(item) {
      if (!item.mobile) {
        this.$messagebox("提示", '抱歉您还未预留该公司手机号!');
      } else {
        const msg = `密码将以短信的形式发送到以下手机上<br>手机号：${item.mobile}`
        MessageBox.confirm(msg).then(async action => {
          if (action == 'confirm') {
            const result = await sendInfo({
              account: item.account,
              password: item.password,
              mobile: item.mobile
            });
            if (result.status == 200) {
              this.$messagebox("提示", result.msg);
            } else {
              this.$messagebox("提示", result.msg);
            }
          }
        }).catch(err => { });
      }
    },
    async getList() {
      let res = await getCompanyListBoss();
      if (res.status == 200) {
        this.hasCompany = false;
        const list = [...res.data].map(item => {
          item.showpassword = false
          return item
        });
        this.passwordlist = list;
      }
    }
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
