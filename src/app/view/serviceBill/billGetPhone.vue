<template>
  <div>
    <div class="bindPhone">
      <!-- <p v-if="!detail.mobile" class="notice">{{detail.customerDetailVo && detail.customerDetailVo.callName}}&ensp;您好，为了我们的客服人员，能够通过电话沟通，处理事情，请提供该工单的联系人电话</p> -->
      <!-- <div v-else class="notice"> -->
      <div class="notice">
        <p>{{detail.customerDetailVo && detail.customerDetailVo.callName}}&ensp;您好，请修改该工单的联系电话！</p>
        <p>原工单联系电话：{{detail.mobile}}</p>
      </div>
      <div class="phone">
        <label class="title"><img class="icon" :src="$CDN('/phone.png')" alt="404">请输入工单联系人手机号</label>
        <input v-model="phone" class="input input-block " type="number" placeholder="请输入11位手机号码">
        <div class="GroupButton">
          <mt-button class="btn btn-purple" @click="bingPhone()">保存</mt-button>
        </div>
      </div>
    </div>
    <div class="servicebill">
      <h3></h3>
      <p class="BillId">
        工单编号：{{detail.identifier}}
        <span></span>
      </p>
      <ul class="item">
        <li>我的公司：{{detail.customerDetailVo && detail.customerDetailVo.companyName}}</li>
        <li>提交时间：{{getTime(detail.startTime,'YYYY-MM-DD')}}</li>
        <li>持续时间：{{detail.durationStr}}</li>
        <li>客服人员：{{detail.leadingUser && detail.leadingUser.userName}}</li>
      </ul>
      <p class="status">
        <span class="state">状态：{{handleType[detail.handleType] || ''}}</span>
        <router-link v-if="true" :to="{ name: 'serviceBillInfo', query: { id: id, identity:2} }" class="btn" tag="span">查看工单>></router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/api/workOrder/worksheet";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
import { setmobileByworkSheetId } from "@/api/workOrder/workOrder";
export default {
  created() {
    // this.$parent.$parent.setTitle("完善工单联系人");
    this.getBaseDetail();
  },
  data() {
    return {
      companySixiId: this.$route.query.companySixiId || "",
      id: this.$route.query.workSheetId || "",
      phone: "",
      detail: {}
      // sixiId: ""
    };
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType,
      workType: state => state.Servicebill.workType
    })
  },
  methods: {
    getTime(time, norms) {
      return formatTime(time, norms);
    },
    // 获取基本详情
    getBaseDetail() {
      getDetail(this.id).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        this.detail = e.data;
      });
    },
    bingPhone() {
      // 手机号格式验证
      let isPass = /^1[34578]\d{9}$/.test(this.phone);
      if (!isPass) {
        this.$messagebox("提示", "手机号格式错误，请重新输入");
        return;
      }
      let param = {
        workSheetId: this.id,
        mobile: this.phone
      };
      setmobileByworkSheetId(param).then(res => {
        if (res.status !== 200) {
          this.$messagebox("提示", res.msg);
          return;
        }
        // this.$router.push({
        //   name: "bindSuccess",
        //   query: { mobile: this.phone, type: 2 }
        // });
        this.$router.push({
          name: "messageInfo",
          query: {
            textMsg: `工单联系电话修改成功,手机号为：${this.phone}`
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bindPhone {
  margin-bottom: 20px;
  padding: 40px 20px;
  font-size: 28px;
  background: #fff;
  .notice {
    padding: 50px 0 50px 0;
    font-size: 28px;
    color: #6e7790;
  }
  .phone {
    .title {
      color: #697eff;
    }
    img {
      margin-right: 20px;
      width: 28px;
      height: 32px;
    }
    .input {
      margin: 30px 0;
      font-size: 32px;
      padding: 30px 0;
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
  }
  .GroupButton {
    margin-top: 30px;
    text-align: center;
    .btn {
      margin-left: 20px;
      font-size: 28px;
      width: 185px;
      height: 60px;
    }
    .btn-purple {
      font-size: 28px;
      color: #fff;
      background: #697eff;
      border-color: #697eff;
    }
  }
}
.servicebill {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
  color: #6e7790;
  margin-bottom: 20px;
  h3 {
    font-size: 30px;
    margin: 10px 0;
    color: #6e7790;
  }
  .BillId {
    font-size: 28px;
    padding-bottom: 20px;
    span {
      color: #6e7790;
    }
  }
  .item {
    border-top: 2px solid #f4f4f4;
    font-size: 28px;
    padding-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    li {
      padding-bottom: 20px;
    }
  }
  .status {
    display: flex;
    overflow: hidden;
    height: 100px;
    font-size: 28px;
    border-top: 1px solid #f4f4f4;
    align-items: center;
    .state {
      flex: 1;
    }
    .btn {
      color: #697eff;
      margin-right: 42px;
      width: 156px;
    }
  }
}
</style>