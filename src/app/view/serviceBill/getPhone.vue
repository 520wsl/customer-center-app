<template>
  <div class="bingPhone">
    <div v-if="!isBind">
      <dl>
        <dt class="title">手机号
          <img class="icon" :src="$CDN('/phone.png')" alt="404">
        </dt>
        <dd>
          <input v-model="phone" class="input input-block " type="number" placeholder="请输入要绑定的手机号">
        </dd>
        <dt class="title">验证码
          <img class="icon" :src="$CDN('/verifyCode.png')" alt="404">
        </dt>
        <dd>
          <input v-model="verifyCode" class="input code" type="text" placeholder="请输入验证码">
          <mt-button @click="sendCode()" class="getVerifyCode btn-color" size="small" :disabled="!getVerifyCode" plain>
            <span v-if="getVerifyCode" @click="sendCode" class="code">获取验证码</span>
            <span v-else class="code">{{outTime}}s</span>
          </mt-button>
        </dd>
      </dl>
      <p class="errorMsg">{{errorMsg}}</p>
      <mt-button @click="save()" :disabled="!phone || !verifyCode" class="bind wid">立即绑定</mt-button>
    </div>
    <div v-if="isBind">
      <p class="mobile title">原手机号：{{data.mobile}}
        <img class="icon" :src="$CDN('/phone.png')" alt="404">
      </p>
      <dl>
        <dd>
          <input v-model="phone" class="input input-block " type="number" placeholder="现手机号">
        </dd>
        <dd>
          <input v-model="verifyCode" class="input code" type="text" placeholder="验证码">
          <mt-button @click="sendCode()" class="getVerifyCode btn-color" size="small" :disabled="!getVerifyCode" plain>
            <span v-if="getVerifyCode" @click="sendCode" class="code">获取验证码</span>
            <span v-else class="code">{{outTime}}s</span>
          </mt-button>
        </dd>
      </dl>
      <p class="errorMsg">{{errorMsg}}</p>
      <div class="grounpBtn">
        <mt-button class="btn" @click="back()">取消</mt-button>
        <mt-button class="btn btn-purple" @click="save()" :disabled="!phone || !verifyCode">立即绑定</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getcustomerbysixiid,
  setmobilebysixiid
} from "@/api/customer/customer";
import { getcode, validatecode } from "@/api/messageService/messageService";
export default {
  data() {
    return {
      // 客户id 不同于companySiXiId
      userSixiId: this.$route.query.userSixiId || "",
      // 获取的信息集合，含手机号
      data: {},
      // 是否绑定 false 未绑定 true 已绑定
      isBind: false,
      phone: "",
      // 验证码
      verifyCode: "",
      // 获取验证码等待时间
      outTime: 60,
      getVerifyCode: true,
      // 是否修改状态
      isModify: false,
      errorMsg: ""
    };
  },
  created() {
    this.$parent.$parent.setTitle("绑定手机号");
    this.getCustomerPhone();
  },
  methods: {
    getCustomerPhone() {
      getcustomerbysixiid(this.userSixiId).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", e.msg);
          return;
        }
        this.data = e.data;
        if (e.data.mobile) {
          let molile = this.data.mobile;
          this.data.mobile = molile
            ? molile.slice(0, 3) + "****" + molile.slice(-4)
            : "";
          this.isBind = true;
        }
      });
    },
    /**
     * 验证手机号，短信验证码格式
     * @param ischeckVerifyCode 验证短信验证码开关
     */
    verify(isCheckVerifyCode) {
      // 手机号格式验证
      let isPass = /^1[34578]\d{9}$/.test(this.phone);
      this.errorMsg = isPass ? "" : "手机号格式错误，请重新输入";
      if (this.errorMsg) return false;
      if (isCheckVerifyCode) {
        this.errorMsg = this.verifyCode ? "" : "请输入验证码";
        if (this.errorMsg) return false;
      }
      return true;
      // 错误提示为空时，则验证正确
      // if (!isPass) {
      //   this.errorMsg = "手机号格式错误，请重新输入";
      //   return false;
      // } else {
      //   this.errorMsg = "";
      //   return true;
      // }
    },
    sendCode() {
      if (!this.verify()) return true;
      // 读秒验证码,读秒时不可点击
      this.getVerifyCode = false;
      let interval = setInterval(e => {
        this.outTime--;
        if (this.outTime <= 0) {
          clearInterval(interval);
          this.outTime = 60;
          this.getVerifyCode = true;
        }
      }, 1000);
      // 接口调用
      getcode(this.phone).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", e.msg);
          return;
        }
      });
    },
    save() {
      if (!this.verify(true)) return true;
      // 接口调用
      validatecode(this.phone, this.verifyCode).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", e.msg);
          return;
        }
        // 若验证正确
        setmobilebysixiid(this.userSixiId, this.phone).then(e => {
          if (e.status !== 200) {
            this.$messagebox("提示", e.msg);
            return;
          }
          // this.$messagebox("提示", e.msg);
          this.getCustomerPhone();
          this.phone = "";
          this.verifyCode = "";
          this.$router.push({
            name: "bindSuccess",
            query: { mobile: this.phone, userSixiId: this.userSixiId }
          });
        });
      });
    },
    // 返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.mobile {
  font-size: 30px;
  color: #444444;
}
.bingPhone {
  height: 100%;
  background: #fff;
  margin-top: 10px;
  padding: 60px 84px 120px 84px;
  dt {
    font-size: 30px;
    margin: 0 0 30px 0;
  }
  dd {
    color: #444444;
    font-size: 34px;
    margin: 0 0 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .code {
      width: 360px;
    }
    .btn-color {
      display: inline-block;
      font-size: 26px;
      margin-left: 18px;
      width: 200px;
      white-space: nowrap;
      color: #697eff;
      border-color: #697eff;
    }
  }
}
.grounpBtn {
  margin: 70px 0;
  text-align: center;
  .btn {
    margin-left: 20px;
    font-size: 28px;
    width: 200px;
    height: 68px;
  }
  .btn-purple {
    font-size: 28px;
    color: #fff;
    background: #697eff;
    border-color: #697eff;
  }
}
.bind {
  display: block;
  margin: 70px auto;
  color: #fff;
  font-weight: 300;
  background: #697eff;
  border-color: #697eff;
}
.errorMsg {
  height: 40px;
  font-size: 28px;
  color: #fc7946;
}
.input {
  font-size: 34px;
  margin: 0;
  padding: 20px 0;
  border: none;
  border-bottom: 1px #d9d9d9 solid;
}
.input:focus {
  outline: none;
  outline-offset: 0;
}
.input-block {
  width: 100%;
}

.title {
  position: relative;
  img {
    position: absolute;
    top: 50%;
    margin-top: -14px;
    left: -40px;
    width: 28px;
    height: 32px;
  }
}
.wid {
  width: 480px;
}
</style>

