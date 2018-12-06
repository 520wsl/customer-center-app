<template>
  <div :class="info.sign == 1 ?['message']:['message msg-r']">
    <div class="portrait">
      <img :src="$CDN(portraitUrl)">
      <!-- <img v-else :src="companyUrl"> -->
      <!-- 客户微信头像，该功能暂无 -->
    </div>
    <div class="content">
      <div class="time">
        <span>{{getTime(info.creatAt,'YYYY-MM-DD HH:mm')}}</span>&ensp;
        <span>{{billStatus[info.status] || ''}}</span>&ensp;
        <span class="customer">{{info.sign === 1?'客服':'客户'}}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      showVedio: false,
      portraitUrl: "/customer_service.png"
    };
  },
  computed: {
    // portraitUrl() {
    //   // 根据当前用户类型返回不同的头像
    //   // return this.info.userType === 1 ? "/customer_service.png" : this.info.src;
    //   // 这里的图片样式除了问题后会很难看，需要调整
    //   return "/customer_service.png"
    // }
    ...mapState({
      billStatus: state => state.Servicebill.billStatus
    }),
    companyUrl: function() {
      return this.$store.state.User.avatorImgPath;
    }
  },
  methods: {
    getTime(time, norms) {
      return formatTime(time, norms);
    }
  }
};
</script>
<style lang="less" scoped>
.message {
  display: flex;
  padding: 20px 0;
  // 头像
  .portrait {
    margin-right: 20px;
    img {
      margin-top: 52px;
      border-radius: 100%;
      border: 1px solid #dcdcdc;
      box-shadow: 1px 1px 1px 1px #e2e2e2;
      height: 64px;
      width: 64px;
    }
  }
  // 内容
  .time {
    font-size: 18px;
    color: #697eff;
    margin-bottom: 16px;
    height: 40px;
    // 身份标记 客服客户
    .customer {
      float: left;
      margin-right: 18px;
      padding: 2px 18px;
      border-radius: 5px;
      color: #fff;
      background: #697eff;
      text-align: center;
    }
  }
}
.msg-r {
  flex-direction: row-reverse;
  .portrait {
    margin-left: 20px;
    margin-right: 0;
  }
  .content {
    text-align: right;
    .customer {
      float: right !important;
      background: #fc7946 !important;
      margin-right: 0 !important;
    }
  }
  .text,
  .moive,
  .audio {
    display: inline-block;
    text-align: left;
    border-radius: 10px 0 10px 10px !important;
  }
}
</style>