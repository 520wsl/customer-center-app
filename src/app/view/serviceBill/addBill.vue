<template>
  <div class="add-bill">
    <div v-if="!isSubmited" class="info">
      <img :src="$CDN('/company.png')">
      <p class="question-title">
        <span class="user-name">王麻子</span>
        <span>您好，请确认您要咨询的问题！</span>
      </p>
      <div style="text-align:center;">
        <button class="select-btn" @click="companyPopupVisible = true">
          {{params.companySixiId?findCompanyName(params.companySixiId): '请选择您绑定的公司'}}
          <span
            class="want-to-btm mint-button-icon"
          >
            <i class="mintui mintui-back"></i>
          </span>
        </button>
      </div>
      <div style="text-align:center;">
        <button class="select-btn" @click="popupVisible = true">
          {{params.workOrderType?findWorkOrderTypeName(params.workOrderType): '请确认您要咨询的问题'}}
          <span
            class="want-to-btm mint-button-icon"
          >
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
        <p v-if="companyAndMobile.status===2" class="text">
          注意：为了更好的为您提供服务，请绑定您的手机号。
          <a style="color:#697eff;">绑定手机号</a>
        </p>
      </div>
      <div style="text-align:center;">
        <mt-button plain type="default" size="small" class="cancel">取消</mt-button>
        <mt-button size="small" @click="save" type="default" class="ok">确定</mt-button>
      </div>
    </div>
    <div v-else class="form-submited">
      <img :src="$CDN('/success_icon.png')">
      <p class="form-submited-text">您的问题，已经提交成功！</p>
      <p
        v-if="companyAndMobile.status===1 || companyAndMobile.status===3"
        class="form-submited-text-msg"
      >
        客服人员{{subParams.staffName}}，稍后将与您取得联系，请确保您
        的手机号{{subParams.mobile}}，保持畅通
      </p>
      <p
        v-if="companyAndMobile.status===1 || companyAndMobile.status===3"
        class="form-submited-text-msg"
      >
        如果手机号有误，请及时变更手机号
        <a style="color:#697eff;">变更手机号</a>
      </p>
      <p v-if="companyAndMobile.status===2" class="form-submited-text-msg">
        客服人员{{subParams.staffName}}，稍后将与您取得联系为了更好的为您提供服务，请绑定您的手机号
        <a style="color:#697eff;">绑定手机号</a>
      </p>
    </div>
    <my-picker
      v-if="popupVisible"
      :list="workSheetTypeList"
      :get-item="getWorkSheet"
      v-model="popupVisible"
    ></my-picker>
    <my-picker
      v-if="companyPopupVisible"
      :list="[...companyAndMobile.companys]"
      valueName="name"
      :get-item="getCompany"
      v-model="companyPopupVisible"
    ></my-picker>
  </div>
</template>

<script>
import { Button, Popup, Picker } from 'mint-ui';
import { mapState, mapActions } from "vuex";
import { saveWorkOrder } from "@/api/workOrder/workOrder";
import myPicker from "@/components/app/public/myPicker"
export default {
  components: {
     /* eslint-disable */
        myPicker
        /* eslint-disable */
  },
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
    },
    companyslots() {
      let dateSlots = [
        {
          flex: 1,
          values: this.companyAndMobile.companys,
          className: 'question-slot',
          textAlign: 'center'
        }
      ];
      return dateSlots
    }
  },
  data() {
    return {
      isSubmited: false,
      subParams: {
        staffName: '',
        mobile: ''
      },
      popupVisible: false,
      companyPopupVisible: false,
      params: {
        workOrderType: null,
        companySixiId: null,
        context: '',
        companyName: null
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
    findCompanyName(sixiId) {
      const res = [...this.companyAndMobile.companys].filter(item => {
        return item.sixiId == sixiId
      })[0] || {};
      return res.name
    },
    getWorkSheet(data) {
      this.params.workOrderType = data.key;
    },
    getCompany(data) {
      this.params.companySixiId = data.sixiId;
      this.params.companyName = data.name;
    },
    async save() {
      let res = await saveWorkOrder(this.params);
      if (res.status === 200) {
        this.isSubmited = true;
        this.subParams.mobile = res.data.mobile;
        this.subParams.staffName = res.data.staffName;
      } else {
        this.$messagebox("提示", res.msg);
      }
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
  margin-top: 40px;
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
  margin-top: 40px;
  margin-right: 60px;
}
.ok {
  width: 240px;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  background: #697eff;
  border-radius: 2px;
  margin-top: 40px;
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
