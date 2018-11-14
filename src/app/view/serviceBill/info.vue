<template>
  <div class="billInfo">
    <div class="baseInfo">
      <!-- <sixiheader title="服务工单" class="top"></sixiheader> -->
      <p class="BillId">工单编号：
        <b>{{detail.identifier}}</b>
      </p>
      <div class="s-title" @click="isShow=!isShow">
        <span>工单信息</span>
        <!--这里需要一个动画-->
      </div>
      <transition name="fade">
        <ul class="item" v-show="isShow">
          <li>工单状态：{{handleType[detail.handleType] || ''}}</li>
          <li>工单类型：{{workType[detail.workType] || ''}}</li>
          <li>工单创建时间：{{getTime(detail.startTime,'YYYY-MM-DD')}}</li>
          <li>客服人员：【后端暂时没有返回】</li>
        </ul>
      </transition>
      <h3>服务记录</h3>
    </div>
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="serviceRemark">
      <!--
        userType：用户类型
        textType：文本类型
        src：视频地址,音频地址,图片地址
        audioPlayFlag：当前音频播放控制（点击播放，停止状态）
      -->
      <!-- <message :userType="2" :textType="3" src="http://editerupload.eepw.com.cn/201809/61001537857032.jpg"></message> -->
      <message
        v-for="(el,index) in talknews"
        :key="index"
        :userType="el.userSixiId === detail.userid ? 1:2"
        :textType="el.type"
        :src="el.enclosure">
        <!-- :audioPlayFlag=""> -->
      </message>
      <!--示例模板-->
      <!--
        <message :userType="1" :textType="1"></message>
        <message :userType="2" :textType="1"></message>

        <message :userType="1" :textType="2" :audioPlayFlag="audioPlayFlag1" @click.native="playAudio(index)" src="https://wdd.js.org/element-audio/static/falling-star.mp3"></message>
        <message :userType="2" :textType="2" :audioPlayFlag="audioPlayFlag2" @click.native="playAudio(index)" src="http://www.w3school.com.cn/i/song.ogg"></message>

        <message :userType="2" :textType="3" src="http://editerupload.eepw.com.cn/201809/61001537857032.jpg"></message>
        <message :userType="1" :textType="3"></message>
        <message :userType="2" :textType="4" src="http://www.w3school.com.cn/i/song.ogg"></message>
        <message :userType="1" :textType="4" src="http://www.w3school.com.cn/i/song.ogg"></message>
      -->
    </mt-loadmore>
    <div class="assess">
      <img :src="$CDN('/work_list_logo.png')" alt="">
      <span class="assessTime">
        <strong>工作评价</strong>（2018-10-10 10:23)
      </span>
      <span class="waitAssess">待评价&emsp;</span>&gt;
    </div>
  </div>
</template>
<script>
// import sixiheader from "@/components/app/header.vue";
import message from "@/components/app/serviceBill/message";
import servicebillApi from "@/api/serviceBill";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
export default {
  components: { message },
  data() {
    return {
      isShow: true,
      detail: {},
      talknews: []
    };
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType,
      workType: state => state.Servicebill.workType
    })
  },
  mounted() {
    this.$parent.$parent.setTitle("服务工单");
    this.getDetail();
    this.getTalknews();
  },
  methods: {
    // 获取基本详情
    getDetail() {
      let workSheetId = 1;
      servicebillApi.getDetail(workSheetId).then(e => {
        if (e.status !== 200) return;
        this.detail = e.data;
      });
    },
    // 获取工单记录详情
    getTalknews() {
      let workSheetId = 1;
      servicebillApi.getTalknews(workSheetId, 1, 20).then(e => {
        if (e.status !== 200) return;
        this.talknews = e.data;
        console.log(this.talknews);
      });
    },
    getTime(time, norms) {
      return formatTime(time, norms);
    },
    loadTop() {
      console.log("触发更新");
      this.$refs.loadmore.onTopLoaded();
    },
    playAudio() {}
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
    padding: 40px 0 30px 0;
    background: #fff;
    font-size: 28px;
    color: #444444;
    span {
      padding-left: 16px;
      font-weight: bold;
      margin-left: 28px;
      border-left: 6px solid #697eff;
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
    border-top: 1px solid #f4f4f4;
  }
}
.serviceRemark {
  flex: 1;
  overflow-y: auto;
  color: #6e7790;
  background: #fff;
  font-size: 28px;
  padding: 10px 28px;
  // border: 1px solid red;
}

.assess {
  display: flex;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
