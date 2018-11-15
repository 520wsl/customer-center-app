<template>
  <div>
    <div :class="userType === 1 ?['message']:['message msg-r']">
      <!--头像-->
      <div class="portrait">
        <img :src="$CDN(portraitUrl)" alt="404">
      </div>
      <div class="content">
        <div class="time">
          <span>2018-01-02 11:20</span>&ensp;
          <span>提交工单</span>&ensp;
          <span class="customer">{{userType === 1?'客服':'您'}}</span>
        </div>
        <!--文本类型-->
        <div v-if="textType === 1" class="text">
          <span>
            <slot></slot>
          </span>
          <img v-if="userType === 1" class="horn_l" :src="$CDN('/white_horn_left.png')" alt="">
          <img v-if="userType === 2" class="horn_r" :src="$CDN('/white_horn.png')" alt="">
        </div>
        <div v-else-if="textType === 2" class="image">
          <img :src="src" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // userType：用户类型
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：图片地址
  props: ["userType", "textType", "src"],
  data() {
    return {
      portraitUrl: "/customer_service.png",
      showVedio: false
    };
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>