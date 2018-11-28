<template>
  <div class="add-bill">
    <div
      v-if="!isSubmited"
      class="info"
    >
      <img :src="$CDN('/company.png')">
      <p class="question-title">
        <span class="user-name">王麻子</span>
        <span>您好，请确认您要咨询的问题！</span>
      </p>
      <div style="text-align:center;">
        <button
          class="select-btn"
          @click="popupVisible = true"
        >
          {{params.workOrderType?findWorkOrderTypeName(params.workOrderType): '请确认您要咨询的问题'}}
          <span class="want-to-btm mint-button-icon">
            <i class="mintui mintui-back"></i>
          </span>
        </button>
      </div>
      <div class="textarea-div">
        <span>
          <textarea
            v-model="params.context"
            placeholder="问题的描述可以写在这里哦"
            cols="30"
            rows="10"
            maxlength="120"
          ></textarea>
        </span>
      </div>
      <div class="message-info">
        <p
          v-if="companyAndMobile.status===3"
          class="text"
        >注意：为了更好的为您提供服务，请联系我们的业务员，将您的合作公司跟您的微信做绑定操作</p>
        <p
          v-if="companyAndMobile.status===2"
          class="text"
        >注意：为了更好的为您提供服务，请绑定您的手机号。<a style="color:#697eff;">绑定手机号</a></p>
      </div>
      <div style="text-align:center;">
        <mt-button
          plain
          type="default"
          size="small"
          class="cancel"
        >取消</mt-button>
        <mt-button
          size="small"
          type="default"
          class="ok"
        >确定</mt-button>
      </div>
    </div>
    <div
      v-else
      class="form-submited"
    >
      <img :src="$CDN('/success_icon.png')">
      <p class="form-submited-text">您的问题，已经提交成功！</p>
      <p
        v-if="companyAndMobile.status===1 || companyAndMobile.status===3"
        class="form-submited-text-msg"
      >
        客服人员张二狗，稍后将与您取得联系，请确保您
        的手机号138****3333，保持畅通
      </p>
      <p
        v-if="companyAndMobile.status===1 || companyAndMobile.status===3"
        class="form-submited-text-msg"
      >
        如果手机号有误，请及时变更手机号<a style="color:#697eff;">变更手机号</a>
      </p>
      <p
        v-if="companyAndMobile.status===2"
        class="form-submited-text-msg"
      >
        客服人员XXX，稍后将与您取得联系为了更好的为您提供服务，请绑定您的手机号<a style="color:#697eff;">绑定手机号</a>
      </p>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="add-bill-mint-popup"
    >
      <mt-picker
        :slots="slots"
        @change="onDateChange"
        :show-toolbar="false"
        ref="picker"
        value-key="value"
      ></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Button, Popup, Picker } from 'mint-ui';
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      workSheetTypeList: state => state.Servicebill.workSheetType,
      companyAndMobile: state => state.Servicebill.companyAndMobile,
    }),
    slots() {
      let dateSlots = [
        {
          flex: 1,
          values: this.workSheetTypeList,
          className: 'question-slot',
          textAlign: 'center'
        }
      ];
      return dateSlots
    }
  },
  data() {
    return {
      isSubmited: true,
      popupVisible: false,
      params: {
        workOrderType: null,
        unionId: null,
        openId: null,
        context: '',
        appId: '',
        wechatNickname: '',
        name: '',
        mobile: ''
      }
    }
  },
  created() {
    this.$parent.$parent.setTitle("创建客服工单");
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch("Servicebill/selectCompanyAndMobile");
    },
    findWorkOrderTypeName(id) {
      const res = [...this.workSheetTypeList].filter(item => {
        return item.key == id
      })[0] || {};
      return res.value
    },
    onDateChange(picker, values) {
      this.params.workOrderType = values[0]['key'];
      this.popupVisible = false;
    }
  }
}
</script>
<style scoped>
.add-bill {
  height: 100%;
  background: #fff;
}
.info,
.form-submited {
  margin-top: 10px;
  border: 1px solid transparent;
  background: #fff;
}
.info > img,
.form-submited > img {
  display: block;
  margin: 42px auto;
  width: 110px;
  height: 110px;
}
.question-title {
  height: 40px;
  line-height: 40px;
  font-size: 28px;
  color: #000000;
  text-align: center;
  margin-bottom: 54px;
}
.user-name {
  color: #697eff;
}
.add-bill-mint-popup {
  width: 100%;
}
.select-btn {
  position: relative;
  width: 560px;
  background: #697eff;
  border-radius: 2px;
  color: #ffffff;
  border: 1px solid transparent;
  font-size: 26px;
  padding: 14px 44px;
  outline: none;
}
.select-btn .want-to-btm {
  position: absolute;
  right: 28px;
  transform: rotate(-90deg);
}
.textarea-div {
  margin: 40px auto 0 auto;
  text-align: center;
}
.textarea-div > span {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 558px;
  height: 280px;
  border: 1px solid #697eff;
  padding: 2px 2px 60px 2px;
  overflow: hidden;
}
.textarea-div textarea {
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  height: 100%;
  color: #444444;
  border: 0;
  outline: none;
  font-size: 26px;
  resize: none;
}
.textarea-div > span::after {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 26px;
  text-align: right;
  color: #bbb;
  content: "非必填，120字以内";
}
.message-info .text {
  width: 560px;
  margin: 12px auto 24px auto;
  font-size: 24px;
  color: #000;
}
.cancel {
  width: 240px;
  height: 60px;
  line-height: 60px;
  border: 2px solid #d9d9d9;
  border-radius: 2px;
  font-size: 24px;
  color: #444444;
  margin-right: 60px;
}
.ok {
  width: 240px;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  background: #697eff;
  border-radius: 2px;
  color: #fff;
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
</style>
