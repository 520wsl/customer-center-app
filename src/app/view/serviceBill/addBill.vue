<template>
  <div class="add-bill">
    <div v-if="companyList.length>0 && state ===0">
      <div class="avator-img">
        <img class="avator-img-path" :src="avatorImgPath">
      </div>
      <div>
        <p class="question-title">
          <span class="user-name">{{name}}</span>
          <span>您好，请确认客服工单！</span>
        </p>
      </div>
      <div>
        <mt-radio
          class="my-company"
          title="我的公司："
          v-model="params.companySixiId"
          :options="companyList"
        ></mt-radio>
      </div>
      <div>
        <div class="mint-radiolist-title">我要呼叫：</div>
        <div class="mint-radiolist-title">
          <ul>
            <li class="work-order-item" v-for="(item,index) in workOrderTypeList" :key="index">
              <div
                :class="params.workOrderType==item.value?'work-order-item-checked':null"
                @click="params.workOrderType=item.value"
              >
                {{item.label}}
                <img
                  class="item-img"
                  v-if="params.workOrderType==item.value"
                  :src="$CDN('/success_icon.png')"
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="mint-radiolist-title">我的手机号：</div>
        <div class="mobile-border">
          <input
            class="my-moblie"
            @blur="toTOP"
            v-model="params.mobile"
            type="number"
            placeholder="请输入您的手机号"
          >
        </div>
      </div>
      <div class="btn-ok-cancel" style="text-align:center;">
        <button size="small" @click="cancel" type="default" class="cancel">取消</button>
        <button size="small" @click="save" :disabled="isDisabled" type="default" class="ok">确定</button>
      </div>
    </div>
    <div class="null-info" v-if="companyList.length<=0 && !hasCompany">
      <img class="null-info-img" :src="$CDN('/null-icon.png')">
      <p>非常抱歉，您的微信号还未关联公司！</p>
      <div class="msg-store">注：请联系我们的业务员，将您的合作公司跟您的微信做关联操作。</div>
    </div>
    <div class="form-submited" v-if="companyList.length>0 && state ===1">
      <img :src="$CDN('/success_icon.png')">
      <p class="form-submited-text">您的问题，已经提交成功！</p>
      <p class="form-submited-text-msg">
        客服人员{{staffName}}，稍后将与您取得联系，请确保您
        的手机号{{params.mobile}}，保持畅通
      </p>
      <!-- <p v-if="!hasTelephone" class="msg-go">
        <span>为了更好的为您提供服务，</span>
        <router-link
          style="color:#fc7c1f;"
          :to="{name:'getPhone',query:{userSixiId:params.companySixiId}}"
        >请绑定您的手机号</router-link>
      </p>-->
    </div>
  </div>
</template>

<script>
import { Radio } from 'mint-ui';
import { saveWorkOrder } from "@/api/workOrder/workOrder";
import { mapState, mapActions } from "vuex";
import { selectCompanyAndMobile } from "@/api/customer/customer";
export default {
  computed: {
    ...mapState({
      avatorImgPath: state => {
        return state.User.wxUserInfo.wechatAvatar || state.User.avatorImgPath
      },
      name: state => {
        return state.User.wxUserInfo.callName || state.User.wxUserInfo.wechatNickname || ''
      }
    }),
    companySixiId() {
      return this.params.companySixiId
    }
  },
  data() {
    return {
      state: 0,
      staffName: '',
      hasTelephone: false,
      isDisabled: false,
      userMobile: '',
      hasCompany: true,
      // 公司列表
      companyList: [],
      // 工单列表
      workOrderTypeList: [
        {
          label: '客户主管',
          value: 2
        },
        {
          label: '运营专员',
          value: 5
        }
      ],
      // 提交信息
      params: {
        workOrderType: 2,
        companySixiId: null,
        mobile: '',
        companyName: null
      }
    }
  },
  mounted() {
    this.getCompanyList();
    this.params.workOrderType = this.$route.query.workOrderType || 2;
    this.$parent.$parent.setTitle("创建客服工单");
  },
  methods: {
    cancel() {
      // this.$router.push({ name: 'personalServie' })
      // 微信端关闭页面
      WeixinJSBridge.call('closeWindow');

    },
    toTOP() {
      window.scrollTo(0, 0);
    },
    async save() {
      if (!this.params.workOrderType) {
        this.$messagebox("提示", '请选择呼叫人');
        return false;
      }
      if (!this.params.workOrderType) {
        this.$messagebox("提示", '请选择公司');
        return false;
      }
      if (!(/^\d{11}$/.test(this.params.mobile))) {
        this.$messagebox("提示", '请输入11位手机号');
        return false;
      }

      this.isDisabled = true;
      saveWorkOrder({
        ...this.params,
        companyName: this.findCompanyName(this.params.companySixiId)
      }).then(res => {
        if (res.status === 200) {

          this.isDisabled = false;
          this.$router.push({
            name: 'messageInfo',
            query: {
              text: '您的问题，已经提交成功！',
              textMsg: `客服人员${res.data.staffName}，稍后将与您取得联系，请确保您的手机号${this.params.mobile}，保持畅通`
            }
          })
        } else {
          this.$messagebox("提示", res.msg);
        }
      }).catch(e => {
        if (e.status == 403) {
          this.$messagebox("提示", e.msg);
          this.isDisabled = false;
        }
      });

    },
    findCompanyName(sixiId) {
      if (this.companyList.length <= 0) {
        return ''
      }
      const res = [...this.companyList].filter(item => {
        return item.value == sixiId
      })[0] || {};
      return res.label
    },
    findCompanyMobile(sixiId) {
      if (this.companyList.length <= 0) {
        return ''
      }
      const res = [...this.companyList].filter(item => {
        return item.value == sixiId
      })[0] || {};
      return res.mobile
    },
    // 获取公司列表
    async getCompanyList() {
      let res = await selectCompanyAndMobile();
      if (res.status === 200) {
        this.hasCompany = false;
        this.hasTelephone = res.data.mobile ? true : false;
        this.userMobile = res.data.mobile || '';
        const list = res.data.companys || [];
        this.companyList = [...list].map(item => {
          return {
            label: item.name,
            value: item.sixiId,
            mobile: item.mobile
          }
        })
        if (list[0]) {
          this.params.companySixiId = list[0].sixiId;
        }
      } else {
        this.$messagebox("提示", res.msg);
      }
    },
  },
  watch: {
    companySixiId(newValue, oldValue) {
      this.params.mobile = this.findCompanyMobile(newValue) || this.userMobile || '';
    }
  }
}
</script>
<style scoped>
.add-bill {
  height: 100%;
  border: 1px solid transparent;
  background: #fff;
  font-size: 32px;
}
.add-bill > div > div {
  width: 650px;
  margin: 40px auto;
}
.add-bill > div > div.avator-img {
  margin: 42px auto;
  text-align: center;
}
.avator-img-path {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
.question-title {
  height: 40px;
  line-height: 40px;
  color: #000000;
  text-align: center;
  margin-bottom: 54px;
}
.user-name {
  color: #697eff;
}
.work-order-item {
  box-sizing: border-box;
  display: inline-block;
  width: 50%;
}
.work-order-item > div {
  margin: 20px;
  padding: 20px;
  font-size: 32px;
  border: 2px solid #ccc;
  color: #ccc;
  text-align: center;
}
.work-order-item > div.work-order-item-checked {
  position: relative;
  border: 2px solid #697eff;
  color: #697eff;
}
.item-img {
  position: absolute;
  right: -8px;
  bottom: -8px;
  height: 30px;
}
.my-moblie {
  width: 100%;
  font-size: 34px;
  margin: 0;
  padding: 20px 0;
  border: none;
  border-bottom: 1px #d9d9d9 solid;
  border-radius: 0;
}
.my-moblie:focus {
  outline: none;
  outline-offset: 0;
}
.mobile-border {
  padding: 0 32px;
}
.cancel {
  width: 240px;
  border: 2px solid #ccc;
  font-size: 32px;
  background: #fff;
  border-radius: 2px;
  margin-top: 40px;
  margin-right: 60px;
  padding: 16px;
  color: #ccc;
  outline: none;
}
.ok {
  width: 240px;
  border: 2px solid transparent;
  font-size: 32px;
  background: #697eff;
  border-radius: 2px;
  margin-top: 40px;
  padding: 16px;
  color: #fff;
  outline: none;
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
.msg-store {
  margin: 10px auto;
  padding: 40px;
  background: #fff;
  font-size: 24px;
  color: #fc7c1f;
  letter-spacing: 5px;
  text-align: left;
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
.msg-go {
  position: fixed;
  width: 100%;
  line-height: 1.2;
  bottom: 0;
  padding: 16px;
  border: 1px solid #fc7c1f;
  color: #929eaa;
  border-left: 0;
  border-right: 0;
  text-align: center;
}
.add-bill > div > div.btn-ok-cancel {
  margin-bottom: 0;
}
</style>
<style>
.my-company .mint-radio-input:checked + .mint-radio-core {
  background-color: #697eff;
  border-color: #697eff;
}
.my-company .mint-cell,
.my-company .mint-cell-wrapper {
  background: #fff;
}
</style>
