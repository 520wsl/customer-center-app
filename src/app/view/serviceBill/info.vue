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
          <li>客服人员：{{detail.executorName}}</li>
        </ul>
      </transition>
      <h3>服务记录</h3>
    </div>
    <!--弹性盒兼容问题 x5内核-->
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="serviceRemark">
      <!--
        userType：用户类型,将用户id与当前记录id比对，若匹配则为客户
        textType：文本类型
        src：视频地址,音频地址,图片地址
        audioPlayFlag：当前音频播放控制（点击播放，停止状态）
      -->
      <template v-for="(el,index) in talknews">
        <msgTextImg v-if="el.type === 1 || el.type === 2 " :key="index" :userType="el.userSixiId === detail.userId ? 1:2" :src="el.enclosure">
          {{el.record}}
        </msgTextImg>
        <!--这里存在一个点击问题，点击整个消息块都触发了-->
        <msgAudio v-else-if="el.type === 3" v-model="el.audioPlayFlag" :key="index" @click.native="playAudio(index,el.audioPlayFlag,el.type)" :userType="el.userSixiId === detail.userId ? 1:2" :src="el.enclosure" >
          {{el.record}}
        </msgAudio>
        <!--视频播放的罩着层在iphone下无效-->
        <msgVedio v-else-if="el.type === 4" :key="index" :userType="el.userSixiId === detail.userId ? 1:2" :src="el.enclosure">
          {{el.record}}
        </msgVedio>
      </template>
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
import msgTextImg from "@/components/app/serviceBill/msgTextImg";
import msgAudio from "@/components/app/serviceBill/msgAudio";
import msgVedio from "@/components/app/serviceBill/msgVedio";
import servicebillApi from "@/api/serviceBill";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
export default {
  components: { msgTextImg, msgAudio, msgVedio },
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
        this.talknews = e.data.map(e => {
          e.audioPlayFlag = true;
          return e;
        });
      });
    },
    getTime(time, norms) {
      return formatTime(time, norms);
    },
    // 下拉加载更多
    loadTop() {
      // 成功后进行的操作
      this.$refs.loadmore.onTopLoaded();
    },
    playAudio(index, audioPlayFlag, type) {
      // 仅语音执行
      if (type !== 3) return;
      // 关闭所有语音，仅当前点击的语音打开
      this.talknews.forEach(e => {
        e.audioPlayFlag = true;
      });
      this.talknews[index].audioPlayFlag = !audioPlayFlag;
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
  overflow-y: auto;
  color: #6e7790;
  background: #fff;
  font-size: 28px;
  padding: 10px 28px;
  // display: flex;
  // flex-direction: column-reverse;
  /** flex-direction: column-reverse; // 该样式在某Q国产X5内核浏览器下不支持 */
  /* 去掉部分机型点击产生的罩着层，*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
