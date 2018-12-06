<template>
  <div class="serviceBill">
    <!--标题及编号-->
    <div class="identifier">
      <div>
        <span class="problemType">{{detail.title}}</span>
        <!--此处为小时单位，工单响应时长-->
        <span class="time">{{detail.durationStr}}</span>
      </div>
      <div>
        <span class="identifierNum">
          工单编号：{{detail.identifier}}
        </span>
        <!--客服可见-->
        <!--修改工单注释-->
        <!-- <mt-button v-if="identity == 1" class="btn btn-small btn-purple" @click="editBill()">修改工单</mt-button> -->
      </div>
    </div>
    <!--可滑动，详情以记录-->
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="serviceInfo">
      <ul class="info">
        <li>我的公司：{{detail.customerDetailVo && detail.customerDetailVo.companyName}}</li>
        <li>工单状态：{{handleType[detail.handleType] || ''}}</li>
        <!--提交时间是否是创建时间-->
        <li>提交时间：{{getTime(detail.startTime,'YYYY-MM-DD')}}</li>
        <li>客服人员：{{detail.leadingUser && detail.leadingUser.userName}}</li>
        <li>联系手机号：{{detail.customerDetailVo && detail.customerDetailVo.mobile}}&emsp;
          <router-link tag="span" :to="{name:'billGetPhone',query:{workSheetId:id}}" class="textfl">{{detail.customerDetailVo && detail.customerDetailVo.mobile?'修改':'添加联系手机号'}}</router-link>
        </li>
      </ul>
      <!--未绑定手机 v-if="detail.cellphone"  -->
      <!-- <p class="notice" v-if="detail.cellphone">注意：为了更好的为您提供服务,客服人员能够与您电话沟通, 请绑定 您的手机号。
        <router-link :to="{name:'getPhone'}" tag="span">绑定手机号&ensp;&gt;</router-link>
      </p>
      <p class="notice" v-else-if="detail.customerDetailVo && !detail.customerDetailVo.companyName">注意：为了更好的为您提供服务,请联系我们的业务员,将您的合作公司跟您的微信做绑定操作;</p> -->
      <div class="serviceRemark">
        <h3>服务记录</h3>
        <msgTpl v-for="(el,index) in talknews" :key="index" :info="el">
          <msgImg v-if="el.type === 2" :enclosure="el.enclosure"></msgImg>
          <msgAudio v-else-if="el.type === 8 || el.type === 3" :userType="el.sign" :src="el.enclosure"></msgAudio>
          <msgVedio v-else-if="el.type === 5" :userType="el.sign" :src="el.enclosure"></msgVedio>
          <msgText v-else :info="el"></msgText>
        </msgTpl>
      </div>
    </mt-loadmore>
    <!--客户可见-->

    <router-link v-if="detail.handleType == 3 " :to="{ name: 'serviceEvaluationInfo', query: {
          type: detail.workType,
          customerId: detail.workerOrderDetailVo && detail.workerOrderDetailVo.sixiId,
          workSheetId: id,
          servicePersonnel: detail.leadingUser && detail.leadingUser.userName
          }
        }" tag="div" class="assess">
      <img :src="$CDN('/work_list_logo.png')" alt="">
      <span class="assessTime">
        <strong>工单评价</strong>
        <!-- <span>({{getTime(detail.finishTime,'YYYY-MM-DD')}})</span> -->
      </span>
      <span class="btn">待评价&emsp; &gt;</span>
    </router-link>

    <router-link v-if="detail.handleType == 4 " :to="{ name: 'serviceEvaluationBreview', query: {
          workSheetId: id
          }
        }" tag="div" class="assess">
      <img :src="$CDN('/work_list_logo.png')" alt="">
      <span class="assessTime">
        <strong>工单评价</strong>
        <span>({{getTime(detail.evaluateTime,'YYYY-MM-DD')}})</span>
      </span>
      <span class="btn">已评价&emsp; &gt;</span>
    </router-link>
    <!-- 客服(执行人)可见 detail.executorId 执行人id  detail.executorId && detail.executorId-->
    <tab v-if="identity == 1 && detail.handleType != 1" class="tab" :type="detail.handleType" :companySixiId="companySixiId"></tab>
  </div>
</template>
<script>
import moment from "moment";
import tab from "@/components/app/serviceBill/tab";
import msgTpl from "@/components/app/serviceBill/msgTpl";
import msgText from "@/components/app/serviceBill/msgText";
import msgImg from "@/components/app/serviceBill/msgImg";
import msgAudio from "@/components/app/serviceBill/msgAudio";
import msgVedio from "@/components/app/serviceBill/msgVedio";
import { formatTime, timeToDate } from "@/libs/util/time";
import { mapState } from "vuex";

import { getDetail } from "@/api/workOrder/worksheet";
import { getTalknews } from "@/api/workOrder/talknews";

export default {
  components: { msgTpl, msgAudio, msgVedio, msgText, msgImg, tab },
  data() {
    return {
      isShow: true,
      // 身份 1客服，2客户
      identity: this.$route.query.identity,
      id: this.$route.query.id,
      companySixiId: this.$route.query.companySixiId || "",
      detail: {},
      talknews: [],
      num: 1,
      size: 10,
      count: Number
      // 滑动到底部
    };
  },
  mounted() {
    this.$parent.$parent.setTitle("服务工单");
    this.getBaseDetail();
    this.getServiceTalknews();
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType,
      workType: state => state.Servicebill.workType
    }),
    responseTime() {
      if (!this.detail.responseTime) return "";
      // this.detail.responseTime 为小时，转为秒单位
      let time = this.detail.responseTime * 60 * 60;
      return timeToDate(time);
    }
  },
  methods: {
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
    // 获取工单记录详情
    getServiceTalknews() {
      // 是否可以请求
      if (this.count / this.size < this.num - 1) return;
      let param = {
        workSheetId: this.id,
        pageNum: this.num,
        pageSize: this.size
      };
      getTalknews(param).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        e.data.list.forEach(el => {
          // el.userType = el.sign == 0 ? 1 : 2;
          // el.sign = 1;
          // 记录用户语音的播放状态
          // this.talknews.unshift(el);
          this.talknews.push(el);
        });
        this.num = ++e.data.num;
        this.count = e.data.count;
      });
    },
    getTime(time, norms) {
      return formatTime(time, norms);
    },
    // 下拉加载更多
    loadTop() {
      // 成功后进行的操作
      this.getServiceTalknews();
      this.$refs.loadmore.onTopLoaded();
    },
    // 修改工单
    editBill() {
      let id = this.id; // 工单id
      let companySixiId = this.companySixiId; // 公司id
      let workOrderType = this.detail.workType; // 工单类型
      let identifier = this.detail.identifier; // 工单编号
      let handleType = this.detail.handleType; // 工单状态类型
      let companyName =
        (this.detail.customerDetailVo &&
          this.detail.customerDetailVo.companyName) ||
        "";
      this.$router.push({
        name: "editBill",
        query: {
          id,
          companySixiId,
          workOrderType,
          identifier,
          companyName,
          handleType
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.serviceBill {
  display: flex;
  flex-direction: column;
  height: 100%;
  // margin-top: -90px;
  font-size: 28px;
}
/** 工单编号信息 */
.identifier {
  margin: 0px 0 10px 0;
  padding: 20px 30px 0 30px;
  font-size: 28px;
  background: #fff;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .problemType {
      color: #444444;
      font-family: "PingFangSC-Semibold";
      font-weight: bold;
    }
    .time {
      color: #929eaa;
    }
    .identifierNum {
      color: #6e7790;
    }
  }
}
/** 工单编号详细信息 */
.serviceInfo {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  padding-left: 30px;
  & .info {
    padding-right: 30px;
    font-size: 26px;
    color: #6e7790;
    li {
      margin-top: 20px;
      .textfl {
        float: right;
        color: #697eff;
      }
    }
  }
  .notice {
    padding-right: 30px;
    margin-top: 18px;
    line-height: 40px;
    font-size: 22px;
    color: #929eaa;
    span {
      color: #697eff;
    }
  }
}
/** 工单服务记录 */
.serviceRemark {
  border-top: 2px solid #f4f4f4;
  margin-top: 20px;
  margin-right: 30px;
  h3 {
    font-size: 30px;
    color: #444444;
  }
}

.assess {
  display: flex;
  position: relative;
  align-items: center;
  font-size: 28px;
  height: 100px;
  margin: 15px 0 15px 0;
  padding: 0 38px 0 38px;
  background: #fff;
  color: #6e7790;
  img {
    height: 40px;
    width: 40px;
    margin-right: 26px;
  }
  .assessTime {
    flex: 1;
  }
  .waitAssess {
    color: #697eff;
    font-size: 24px;
    width: 120px;
  }
}
</style>
