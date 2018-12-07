<template>
  <div class="password-store">
    <div v-if="!subOk" class="msg-store">
      <i class="mintui mintui-field-warning"></i>
      请勿将账号密码直接告知我们的工作人员，请在此输入店铺的 账号密码，我们将以加密的形式进行保存，绝不泄露!
    </div>
    <div v-if="!subOk" class="msg-store-item">
      <div class="store-info">
        <p class="store-info-item">
          <span class="item-key">店铺账号：</span>
          <span style="width:60%;" class="item-value">{{params.account}}</span>
        </p>
        <p class="store-info-item">
          <span class="item-key">登陆密码：</span>
          <span style="width:60%;" class="item-value">
            <input
              @blur="toTOP"
              style="border:0;outline:none;"
              :type="showpassword?'text':'password'"
              v-model="params.password"
            >
          </span>
          <a
            style="display:inline-block;;width:10%;text-align:center;"
            @click="showpassword=!showpassword"
          >
            <img
              class="show-pass-word"
              onselectstart="return false"
              :src="showpassword?$CDN('/icon_hidden_pwd.png'):$CDN('/icon_show_pwd.png')"
            >
          </a>
        </p>
        <p class="store-info-item">
          <span style="vertical-align: top;" class="item-key">验证码：</span>
          <span style="width:40%;vertical-align: top;" class="item-value">
            <input
              style="border:0;outline:none;"
              @blur="toTOP"
              type="text"
              v-model="params.captcha"
            >
          </span>
          <a
            class="code-a"
            style="display:inline-block;;width:30%;text-align:center;"
            @click="getCode"
          >
            <img class="code" width="100%" :src="captcha">
          </a>
        </p>
      </div>
      <div style="text-align:center;">
        <mt-button plain type="default" @click="reset" size="small" class="cancel">重置</mt-button>
        <mt-button size="small" @click="save" type="default" class="ok">确定</mt-button>
      </div>
      <!-- <div v-if="!isAdd" style="text-align:center;">
        <mt-button size="small" @click="updateUser" type="default" class="ok">修改</mt-button>
      </div>-->
    </div>
    <!-- <div class="form-submited" v-if="subOk">
      <img :src="$CDN('/success_icon.png')">
      <p class="form-submited-text">您的店铺账号密码提交成功！</p>
      <router-link :to="{name:'personalServie'}" class="bind" tag="mt-button">查看我的服务</router-link>
    </div>-->
  </div>
</template>
<script>
import {
  addUser,
  updateUser,
  getUserDetail,
  selectCompanyAndMobile
} from "@/api/customer/customer";
export default {
  computed: {},
  data() {
    return {
      isAdd: true,
      showpassword: false,
      captcha: '/api/wechat-proxy-service/verifyCode/get',
      companySixiId: '',
      companyAndMobile: {},
      subOk: false,
      params: {
        account: '',
        password: '',
        captcha: ''
      }
    }
  },
  beforeCreate() {

  },
  created() {

  },
  async mounted() {
    this.$parent.$parent.setTitle("店铺账号密码");
    this.companySixiId = this.$route.query.companySixiId || '';
    const res = await selectCompanyAndMobile();
    if (res.status == 200) {
      this.companyAndMobile = res.data || {}
      this.params.account = this.findCompanyAccount(this.companySixiId)
      const results = await getUserDetail({ account: this.params.account });
      if (results.status == 200) {
        if (!results.data.password) {
          this.isAdd = true;
        } else {
          this.params.password = results.data.password
          this.isAdd = false;
        }
      }
    }
  },
  methods: {
    save() {
      if (this.isAdd) {
        this.addUser();
      } else {
        this.updateUser();
      }
    },
    toTOP() {
      window.scrollTo(0, 0);
    },
    reset() {
      this.params.password = "";
      this.params.captcha = "";
      this.getCode()
    },
    getCode() {
      this.captcha = '/api/wechat-proxy-service/verifyCode/get?' + Math.random()
    },
    findCompanyAccount(sixiId) {
      if (!this.companyAndMobile.companys) {
        return ''
      }
      const res = [...this.companyAndMobile.companys].filter(item => {
        return item.sixiId == sixiId
      })[0] || {};
      return res.account
    },
    async addUser() {
      if (!this.params.account) {
        this.$messagebox("提示", '账号不能为空');
        return false
      }
      if (!this.params.password) {
        this.$messagebox("提示", '密码不能为空');
        return false
      }
      let res = await addUser(this.params);
      if (res.status === 200) {
        this.$router.push({
          name: 'messageInfo',
          query: {
            text: '您的店铺账号密码提交成功！'
          }
        })
      }
    },
    async updateUser() {
      if (!this.params.account) {
        this.$messagebox("提示", '账号不能为空');
        return false
      }
      if (!this.params.password) {
        this.$messagebox("提示", '密码不能为空');
        return false
      }
      let res = await updateUser(this.params);
      if (res.status === 200) {
        this.$router.push({
          name: 'messageInfo',
          query: {
            text: '您的店铺账号密码提交成功！'
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.password-store {
  margin-top: 20px;
  border-top: 1px solid transparent;
  height: 100%;
  background: #fff;
}
.msg-store-item {
  background: #fff;
  padding: 30px;
}
.msg-store {
  margin: 10px auto;
  padding: 40px;
  background: #fff;
  font-size: 24px;
  color: #fc7c1f;
  letter-spacing: 5px;
}
.store-info {
  margin-bottom: 33px;
  border-top: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
}
.store-info-item {
  border-bottom: 1px solid #d9d9d9;
  padding: 11px 22px;
  height: 60px;
  line-height: 60px;
  font-size: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.store-info-item span {
  display: inline-block;
}
.store-info-item span.item-key {
  width: 28%;
}
.show-pass-word {
  height: 34px;
  vertical-align: middle;
}
.store-info-item span.item-value {
  width: 72%;
}
.cancel {
  width: 240px;
  border: 2px solid #d9d9d9;
  color: #444444;
  border-radius: 2px;
  font-size: 26px;
  padding: 14px 44px;
  outline: none;
  margin-right: 40px;
  margin-top: 40px;
}
.ok {
  width: 240px;
  background: #697eff;
  border-radius: 2px;
  color: #ffffff;
  border: 1px solid transparent;
  font-size: 26px;
  margin-top: 40px;
  padding: 14px 44px;
  outline: none;
}
.code-a,
.code {
  height: 60px;
}
.form-submited {
  margin-top: 10px;
  border: 1px solid transparent;
  background: #fff;
}
.form-submited > img {
  display: block;
  margin: 42px auto;
  width: 110px;
  height: 110px;
}
.form-submited-text {
  font-size: 32px;
  color: #444444;
  text-align: center;
  font-weight: bold;
  margin-bottom: 40px;
}
.form-submited-text-msg {
  width: 616px;
  margin: 0 auto;
  font-size: 28px;
  color: #929eaa;
}
.bind {
  display: block;
  width: 400px;
  margin: 0 auto;
  color: #fff;
  background: #697eff;
}
</style>
