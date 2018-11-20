<template>
  <div class="bindphone">
    <!--已绑定手机号-->
    <div class="phoneNum" v-if="data.phone">
      <p class="s-title">
        <span>已绑定手机号</span>
      </p>
      <div class="rel">
        <img class="icon" src="https://axhub.im/pro/53a36a5532975b51/images/%E6%94%B6%E6%8D%AE%E9%87%87%E9%9B%86/u1118.png" alt="">
        <span class="num">{{data.phone}}</span>
        <span class="modify" @click="modify()">修改</span>
      </div>
    </div>
    <div v-else class="verifyCode">
      <mt-field label="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="短信验证码" type="tel" v-model="verifyCode">
        <span v-if="getVerifyCode" @click="getCode" class="code">获取短信验证码</span>
        <span v-else class="code">{{outTime}}s</span>
      </mt-field>
      <p class="sub">
        <mt-button type="primary" size="small" @click="save()">保存</mt-button>
      </p>
    </div>
  </div>
</template>
<script>
import servicebillApi from "@/api/serviceBill";
export default {
  data() {
    return {
      customerSixiId: this.$route.query.customerSixiId || "",
      data: {
        phone: ""
      },
      phone: "",
      verifyCode: "",
      outTime: 60,
      getVerifyCode: true,
      getVerifyCodeSrc: ""
    };
  },
  created() {
    this.$parent.$parent.setTitle("采集手机号");
    this.getcustomerbysixiid();
  },
  methods: {
    getcustomerbysixiid() {
      servicebillApi.getcustomerbysixiid(this.customerSixiId).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        this.data = e.data;
      });
    },
    modify() {
      this.$messagebox
        .prompt("请输入手机号")
        .then(({ value, action }) => {
          let isPass = /^1[34578]\d{9}$/.test(value);
          if (!isPass) {
            this.$messagebox("提示", "请输入正确的手机号");
            return;
          }
          servicebillApi
            .setmobilebysixiid(this.customerSixiId, value)
            .then(e => {
              if (e.status !== 200) {
                this.$messagebox("提示", "服务器繁忙，请稍后再试！");
                return;
              }
              this.$messagebox("提示", e.msg);
            });
        })
        .catch(e => {});
    },
    getCode() {
      let isPass = /^1[34578]\d{9}$/.test(this.phone);
      if (!isPass) {
        this.$messagebox("提示", "请输入正确的手机号");
        return;
      }
      this.getVerifyCode = false;
      // 设置超时时间
      setTimeout(e => {
        this.getVerifyCode = true;
      }, 3000);
      // 接口调用
      servicebillApi.getcode(this.phone).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
      });
    },
    save() {
      // 接口调用
      servicebillApi.validatecode(this.phone, this.verifyCode).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        // 若验证正确
        servicebillApi
          .setmobilebysixiid(this.customerSixiId, this.phone)
          .then(e => {
            if (e.status !== 200) {
              this.$messagebox("提示", "服务器繁忙，请稍后再试！");
              return;
            }
            this.$messagebox("提示", e.msg);
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bindphone {
  font-size: 30px;
  color: #6e7790;
}
.phoneNum {
  margin-top: 10px;
  background: #fff;
  padding: 20px 30px;

  .s-title {
    height: 90px;
    color: #444444;
    span {
      padding-left: 16px;
      font-weight: bold;
      border-left: 6px solid #697eff;
    }
  }
  .rel {
    display: flex;
    align-items: center;
    .icon {
      width: 30px;
    }
    .num {
      margin-left: 30px;
      flex: 1;
    }
  }
  .modify {
    color: #697eff;
  }
}
.verifyCode {
  margin-top: 10px;
  .sub {
    margin-top: 50px;
    text-align: center;
  }
  .code {
    display: block;
    height: 45px;
  }
}
</style>

