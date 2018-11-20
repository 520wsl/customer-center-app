<template>
  <!--语音类型-->
  <div class="audio">
    <img v-show="!status" class="gif" :src="$CDN('/audio.png')" alt="404">
    <img v-show="status" class="gif" :src="$CDN('/audioGif.gif')" alt="404">
    <span>{{audioTime}}&ensp;"</span>
    <audio class="jsMsgAudio" ref="audio" preload="auto" controls="controls" style="visibility: hidden">
      <source :src="audioSrc" type="audio/MP3">
      <source :src="audioSrc" type="audio/mpeg">
    </audio>
    <img v-if="userType === 1" class="horn_l" :src="$CDN('/purple_horn_left.png')" alt="">
    <img v-if="userType === 0" class="horn_r" :src="$CDN('/purple_horn.png')" alt="">
    <div style="background: transparent; position: absolute; left: 0; top: 0; bottom: 0; right: 0" @click="play"></div>
  </div>
</template>
<script>
import config from "@/config";
import { getUUID } from "@/libs/tools";

export default {
  // userType：用户类型 0:客户,1:不是客户
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：音频地址
  // audioPlayFlag(value)：双向绑定，当前音频播放控制（点击播放，停止状态）
  props: ["userType", "textType", "src", "value"],
  data() {
    return {
      uid: getUUID(8, 16),
      isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent),
      status: false,
      audioTime: 0,
      // audioSrc: this.src
      audioSrc: config.AUDIOCDN + this.src
    };
  },
  created() {},
  mounted() {
    window.addEventListener("message", ev => {
      if (ev.data && ev.data.cmd === "resetOtherAudioTime") {
        if (ev.data.author === this.uid || this.$refs.audio.currentTime === 0)
          return;
        this.status = false;
        this.$refs.audio.pause();
        if (this.isIos) {
          this.$refs.audio.load();
        } else {
          this.$refs.audio.currentTime = 0;
        }
      }
    });
    // alert('浏览器版本：'+navigator.appCodeName)
    // 给声音赋值时长（可持续播放音频时事件，canplaythrough）
    this.$refs.audio.addEventListener("loadedmetadata", e => {
      let time = e.target.duration.toFixed(0);
      this.audioTime = time + "" === "Infinity" ? "-" : time;
      // console.log(this.audioTime, "音频时长");
    });
    this.$refs.audio.addEventListener("ended", e => {
      this.status = false;
      if (this.isIos) {
        this.$refs.audio.load();
      }
    });
  },
  methods: {
    // 播放音频
    play() {
      if (this.status) {
        this.status = false;
        this.$refs.audio.pause();
        // this.$refs.audio.currentTime = 1;
      } else {
        this.resetOther();
        this.status = true;
        this.$refs.audio.play();
      }
    },
    resetOther() {
      window.postMessage(
        {
          cmd: "resetOtherAudioTime",
          author: this.uid
        },
        "*"
      );
      // let as = document.getElementsByClassName('jsMsgAudio');
      // if (!as || as.length < 2) return;
      // for (let i = 0, len = as.length; i < len; i++) {
      //   let aud = as[i];
      //   if (aud === this.$refs.audio || aud.currentTime === 0) continue;
      //   aud.pause();
      //   if (this.isIos) {
      //     aud.load();
      //   } else {
      //     aud.currentTime = 0;
      //   }
      // }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>
