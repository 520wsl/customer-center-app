<template>
  <div :class="userType === 1 ?['message']:['message msg-r']">
    <div class="portrait">
      <img :src="$CDN(portraitUrl)" alt="404">
    </div>
    <div class="content">
      <div class="time">
        <span>2018-01-02 11:20</span>&ensp;
        <span>提交工单</span>&ensp;
        <span class="customer">{{userType === 1?'客服':'您'}}</span>
      </div>
      <!--语音类型-->
      <div class="audio">
        <img class="gif" :src="$CDN('/audio.png')" alt="404">
        <span>11&ensp;"</span>
        <audio ref="audio" preload="auto" hidden="true">
          <source :src="src" type="audio/mpeg">
          <source :src="src" type="audio/MP3">
        </audio>
        <img v-if="userType === 1" class="horn_l" :src="$CDN('/purple_horn_left.png')" alt="">
        <img v-if="userType === 2" class="horn_r" :src="$CDN('/purple_horn.png')" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // userType：用户类型
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：音频地址
  // audioPlayFlag：当前音频播放控制（点击播放，停止状态）
  props: ["userType", "textType", "src", "audioPlayFlag"],
  data() {
    return {
      portraitUrl: "/customer_service.png",
      showVedio: false
    };
  },
  methods: {
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    }
  },
  watch: {
    audioPlayFlag(val) {
      val ? this.pause() : this.play();
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>
