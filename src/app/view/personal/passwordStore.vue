<template>
  <div class="password-store">
    <div class="msg-store">
      <i class="mintui mintui-field-warning"></i>
      请勿将账号密码直接告知我们的工作人员，请在此输入店铺的 账号密码，我们将以加密的形式进行保存，绝不泄露!
    </div>
    <div class="msg-store-item">
      <div class="store-info">
        <p class="store-info-item">
          <span class="item-key">店铺账号：</span>
          <span style="width:60%;" class="item-value">{{findCompanyAccount}}</span>
        </p>
        <p class="store-info-item">
          <span class="item-key">登陆密码：</span>
          <span style="width:60%;" class="item-value">
            <input
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
      </div>
      <div style="text-align:center;">
        <mt-button plain type="default" size="small" class="cancel">取消</mt-button>
        <mt-button size="small" @click="addUser" type="default" class="ok">确定</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addUser,
  updateUser,
  getUserDetail
} from "@/api/customer/customer";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      companyAndMobile: state => state.Servicebill.companyAndMobile,
    }),
    findCompanyAccount() {
      const sixiId = this.companySixiId;
      if (!this.companyAndMobile.companys) {
        return ''
      }
      const res = [...this.companyAndMobile.companys].filter(item => {
        return item.sixiId == sixiId
      })[0] || {};
      return res.account
    }
  },
  data() {
    return {
      showpassword: false,
      companySixiId: '',
      params: {
        account: '',
        password: ''
      }
    }
  },
  created() {
    this.$store.dispatch("Servicebill/selectCompanyAndMobile");
    this.$parent.$parent.setTitle("店铺账号密码");
    this.companySixiId = this.$route.query.companySixiId || '';
  },
  mounted() {
    this.getUserDetail();
  },
  methods: {
    async addUser() {
      let res = await addUser({
        ...this.params,
        account: this.findCompanyAccount
      });
      if (res.status === 200) {
        console.log(res)
      }
    },
    async updateUser() {
      let res = await updateUser({
        ...this.params,
        account: this.findCompanyAccount
      });
      if (res.status === 200) {
        console.log(res)
      }
    },
    async getUserDetail() {
      let res = await getUserDetail({ account: this.findCompanyAccount });
      if (res.status === 200) {
        console.log(res)
      }
    }
  }
}
</script>
<style scoped>
.password-store {
  border-top: 1px solid transparent;
  height: 100%;
  background: #fff;
}
.msg-store-item {
  background: #fff;
  padding: 30px;
  margin-top: 20px;
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
</style>
