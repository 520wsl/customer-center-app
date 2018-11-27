<template>
  <div class="serviceBill">
    <!--标题及编号-->
    <div class="identifier">
      <div>
        <span class="problemType">{{detail.title}}</span>
        <!--此处为小时单位，工单响应时长-->
        <span class="time">{{detail.responseTime}}</span>
      </div>
      <div>
        <span class="identifierNum">
          工单编号：{{detail.identifier}}
        </span>
        <mt-button class="btn btn-small btn-purple">修改工单</mt-button>
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
      </ul>
      <!--未绑定手机 v-if="detail.cellphone"  -->
      <p class="notice" v-if="detail.cellphone">注意：为了更好的为您提供服务,客服人员能够与您电话沟通, 请绑定 您的手机号。
        <router-link :to="{name:'getPhone'}" tag="span">绑定手机号&ensp;&gt;</router-link>
      </p>
      <p class="notice" v-else-if="detail.customerDetailVo && detail.customerDetailVo.companyName">注意：为了更好的为您提供服务,请联系我们的业务员,将您的合作公司跟您的微信做绑定操作;</p>
      <div class="serviceRemark">
        <h3>服务记录</h3>
        <msgTpl v-for="(el,index) in talknews" :key="index" :info="el">
          <msgText v-if="el.record !=''" :info="el"></msgText>
          <msgImg v-else-if="el.type === 2" :enclosure="el.enclosure"></msgImg>
          <msgAudio v-else-if="el.type === 8 || el.type === 3" :userType="el.sign" :src="el.enclosure"></msgAudio>
          <msgVedio v-else-if="el.type === 5" :userType="el.sign" :src="el.enclosure"></msgVedio>
        </msgTpl>
      </div>
    </mt-loadmore>
    <!--客户可见-->
    <div v-if="identity == 2 && (detail.handleType == 3 || detail.handleType == 4)" class="assess">
      <img :src="$CDN('/work_list_logo.png')" alt="">
      <span class="assessTime">
        <strong>工单评价</strong>
        <span v-if="detail.handleType == 3 ">({{getTime(detail.finishTime,'YYYY-MM-DD')}})</span>
        <span v-if="detail.handleType == 4 ">({{getTime(detail.evaluateTime,'YYYY-MM-DD')}})</span>
      </span>
      <router-link v-if="detail.handleType == 3 " :to="{ name: 'serviceEvaluationInfo', query: {
          type: detail.workType,
          customerId: detail.workerOrderDetailVo && detail.workerOrderDetailVo.sixiId,
          workSheetId: id,
          servicePersonnel: detail.leadingUser && detail.leadingUser.userName
          }
        }" tag="span" class="btn">待评价&emsp; &gt;
      </router-link>
      <span v-if="detail.handleType == 4 ">已评价</span>
    </div>
    <!--客服可见-->
    <tab v-if="detail.executorId && detail.executorId == sixiId && detail.handleType != 1" class="tab" :type="detail.handleType" :companySixiId="detail.userId"></tab>
  </div>
</template>
<script>
import tab from "@/components/app/serviceBill/tab";
import msgTpl from "@/components/app/serviceBill/msgTpl";
import msgText from "@/components/app/serviceBill/msgText";
import msgImg from "@/components/app/serviceBill/msgImg";
import msgAudio from "@/components/app/serviceBill/msgAudio";
import msgVedio from "@/components/app/serviceBill/msgVedio";
import { formatTime } from "@/libs/util/time";
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
      sixiId: this.$route.query.sixiId,
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
    })
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
    }
  }
};
</script>
<style lang="less" scoped>
.serviceBill {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: -90px;
  font-size: 28px;
}
/** 工单编号信息 */
.identifier {
  margin: 100px 0 10px 0;
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

