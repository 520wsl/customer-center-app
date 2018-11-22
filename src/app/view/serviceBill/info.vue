<template>
  <div class="billInfo">
    <div class="baseInfo">
      <p class="BillId">工单编号：
        <b>{{detail.identifier}}</b>
      </p>
      <div class="s-title" @click="isShow=!isShow">
        <span>工单信息</span>
        <img :class="[isShow?'fa fa-arrow-down go':'fa fa-arrow-down aa']" :src="$CDN('/iconDirection.png')" class="iconDirection">
      </div>
      <transition name="fade">
        <ul class="item" v-show="isShow">
          <li>工单状态：{{handleType[detail.handleType] || ''}}</li>
          <li>工单类型：{{workType[detail.workType] || ''}}</li>
          <li>工单创建时间：{{getTime(detail.startTime,'YYYY-MM-DD')}}</li>
          <li>客服人员：{{detail.leadingUser && detail.leadingUser.userName}}</li>
        </ul>
      </transition>
      <h3>服务记录</h3>
    </div>
    <!--弹性盒兼容问题 x5内核-->
    <div class="serviceRemark" ref="serviceRemark">
      <mt-loadmore :top-method="loadTop" ref="loadmore" class="msg">
        <!--
          userType：用户类型,将用户id与当前记录id比对，若匹配则为客户 // 是否是客户 sign 0:客户,1:不是客户
          textType：文本类型
          src：视频地址,音频地址,图片地址
        -->
        <msgTpl v-for="(el,index) in talknews" :key="index" :info="el">
          <msgTextImg v-if="el.record !=''" :textType="1" :userType="el.sign" :src="el.enclosure">
            {{el.record}}
          </msgTextImg>
          <msgTextImg v-else-if="el.type === 2" :textType="el.type" :userType="el.sign" :src="el.enclosure"></msgTextImg>
          <msgAudio v-else-if="el.type === 3" :key="index" :userType="el.sign" :src="el.enclosure"></msgAudio>
          <msgVedio v-else-if="el.type === 5" :key="index" :userType="el.sign" :src="el.enclosure"></msgVedio>
        </msgTpl>
      </mt-loadmore>
      <div v-if="identity === 2" class="hr"></div>
    </div>
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
    <!-- 执行人id == 客服sixi id 才可以更改这个-->
    <tab v-if="detail.executorId == sixiId && detail.handleType != 1" class="tab" :type="detail.handleType" :companySixiId="detail.userId"></tab>
    <!-- <tab v-if="identity == 1 && detail.handleType != 1" class="tab" :type="2"></tab> -->
  </div>
</template>
<script>
import tab from "@/components/app/serviceBill/tab";
import msgTpl from "@/components/app/serviceBill/msgTpl";
import msgTextImg from "@/components/app/serviceBill/msgTextImg";
import msgAudio from "@/components/app/serviceBill/msgAudio";
import msgVedio from "@/components/app/serviceBill/msgVedio";
import servicebillApi from "@/api/serviceBill";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";

export default {
  components: { msgTpl, msgTextImg, msgAudio, msgVedio, tab },
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
      count: Number,
      // 滑动到底部
      bottom: true
    };
  },
  mounted() {
    // this.$messagebox({
    //   title: "Notice",
    //   message: "Are you sure?",
    //   showCancelButton: true
    // });
    this.$parent.$parent.setTitle("服务工单");
    this.getDetail();
    this.getTalknews();
  },
  updated() {
    this.$nextTick(function() {
      if (this.bottom === true) {
        this.setScrool();
      }
    });
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType,
      workType: state => state.Servicebill.workType
    })
  },
  methods: {
    setScrool() {
      var serviceRemark = document.querySelector(".serviceRemark");
      var msg = document.querySelector(".msg");
      var msgheight = msg.offsetHeight; //高度
      serviceRemark.scrollTop = msgheight;
      this.bottom = false;
    },
    // 获取基本详情
    getDetail() {
      servicebillApi.getDetail(this.id).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        this.detail = e.data;
      });
    },
    // 获取工单记录详情
    getTalknews(size = this.size) {
      if (this.count / this.size < this.num) return;
      servicebillApi.getTalknews(this.id, this.num, size).then(e => {
        if (e.status !== 200) {
          this.$messagebox("提示", "服务器繁忙，请稍后再试！");
          return;
        }
        e.data.list.forEach(el => {
          // el.userType = el.sign == 0 ? 1 : 2;
          // 记录用户语音的播放状态
          this.talknews.unshift(el);
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
      this.getTalknews(5);
      this.$refs.loadmore.onTopLoaded();
    }
  }
};
</script>
<style lang="less" scoped>
.billInfo {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 顶部标题固定问题解决 */
  margin-top: -90px;
}
.baseInfo {
  /* 顶部标题固定问题解决 */
  padding-top: 90px;
  color: #6e7790;
  overflow: hidden;
  .BillId {
    color: #6e7790;
    display: flex;
    align-items: center;
    margin: 10px 0 20px 0;
    padding-left: 28px;
    background: #fff;
    height: 110px;
    font-size: 28px;
    b {
      color: #444444;
    }
  }
  .s-title {
    // padding: 40px 0 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    background: #fff;
    font-size: 28px;
    color: #444444;
    span {
      padding-left: 16px;
      font-weight: bold;
      margin-left: 28px;
      border-left: 6px solid #697eff;
    }
    .iconDirection {
      float: right;
      margin-right: 50px;
      width: 30px;
    }
  }
  .item {
    padding-left: 28px;
    background: #fff;
    font-size: 28px;
    li {
      padding-bottom: 30px;
    }
  }
  h3 {
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #444444;
    background: #fff;
    margin: 0;
    padding: 0 0 0 28px;
    border-top: 2px solid #f4f4f4;
  }
}
.serviceRemark {
  flex: 1;
  // height: 100%;
  overflow-y: auto;
  color: #6e7790;
  background: #fff;
  font-size: 28px;
  // display: flex;
  // flex-direction: column-reverse;
  /** flex-direction: column-reverse; // 该样式在某Q国产X5内核浏览器下不支持 */
  /* 去掉部分机型点击产生的罩着层，*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  .msg {
    padding: 10px 28px;
    // height: 100%;
    flex: 1;
  }
}
.hr {
  border-bottom: 20px solid #f4f4f4;
}
.tab {
  display: flex;
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
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }

.aa {
  transition: all 0.25s;
  transform: rotate(-90deg);
}
.go {
  transform: rotate(0deg);
  transition: all 0.25s;
}
</style>
