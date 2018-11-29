<template>
  <div class="add-bill">
    <div class="marg-top">
      <div>
        <mt-cell :title="'工单编号：'+identifier">
          <span style="color: #697eff">{{handleName}}</span>
        </mt-cell>
      </div>
    </div>
    <div class="info">
      <div class="info-msg-company" v-if="!params.companySixiId">我的公司：暂无绑定公司</div>
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
      <div style="text-align:center;">
        <mt-button plain type="default" size="small" class="cancel">取消</mt-button>
        <mt-button size="small" @click="save" type="default" class="ok">确定</mt-button>
      </div>
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
import { updataWorkOrder } from "@/api/workOrder/workOrder";
import myPicker from "@/components/app/public/myPicker"
export default {
  computed: {
    ...mapState({
      workSheetTypeList: state => state.Servicebill.workSheetType,
      companyAndMobile: state => state.Servicebill.companyAndMobile,
    })
  },
  components: {
    myPicker
  },
  data() {
    return {
      modal: true,
      popupVisible: false,
      companyPopupVisible: false,
      identifier: '',
      handleName: '',
      params: {
        id: null,
        workOrderType: null,
        companySixiId: null,
        context: '',
        companyName: null
      }
    }
  },
  created() {
    this.getCompanyAndMobileInfo();
    const { identifier, workOrderType, companySixiId, companyName, handleType, id } = this.$route.query;
    this.identifier = identifier;
    this.handleName = this.$store.state.Servicebill.handleType[handleType] || '';
    this.params.workOrderType = workOrderType;
    this.params.companySixiId = companySixiId;
    this.params.companyName = companyName;
    this.params.id = id;
    this.$parent.$parent.setTitle("修改客服工单");
  },
  methods: {
    getWorkSheet(data) {
      this.params.workOrderType = data.key;
    },
    getCompany(data) {
      this.params.companySixiId = data.sixiId;
      this.params.companyName = data.name;
    },
    getCompanyAndMobileInfo() {
      this.$store.dispatch("Servicebill/selectCompanyAndMobile");
    },
    findWorkOrderTypeName(id) {
      const res = [...this.workSheetTypeList].filter(item => {
        return item.key == id
      })[0] || {};
      return res.value
    },
    findCompanyName(sixiId) {
      if (!this.companyAndMobile.companys) {
        return '请选择您绑定的公司'
      }
      const res = [...this.companyAndMobile.companys].filter(item => {
        return item.sixiId == sixiId
      })[0] || {};
      return res.name
    },
    async save() {
      let res = await updataWorkOrder({
        ...this.params,
        id: 42323
      });
      if (res.status === 200) {

        this.$messagebox("提示", res.msg);
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
  font-size: 32px;
}
.info-msg-company {
  width: 560px;
  margin: 0 auto;
}
.marg-top {
  border: 1px solid transparent;
  background: #f4f4f4;
}
.marg-top > div {
  margin: 10px auto;
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
