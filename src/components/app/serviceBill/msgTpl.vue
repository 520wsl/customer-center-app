<template>
  <div :class="info.sign === 1 ?['message']:['message msg-r']">
    <div class="portrait">
      <img :src="$CDN(portraitUrl)" alt="404">
    </div>
    <div class="content">
      <div class="time">
        <span>{{getTime(info.creatAt,'YYYY-MM-DD HH:mm')}}</span>&ensp;
        <span>{{billStatus[info.status] || ''}}</span>&ensp;
        <span class="customer">{{info.sign === 1?'客服':'您'}}</span>
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
    })
  },
  methods: {
    getTime(time, norms) {
      return formatTime(time, norms);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>