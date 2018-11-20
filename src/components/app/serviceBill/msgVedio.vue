<template>
  <div class="moive">
    <div v-if="!status" @click="videoPlay()">
      <img src="./play.png" class="play">
      <!-- <img class="bg" src="http://editerupload.eepw.com.cn/201809/61001537857032.jpg" /> -->
    </div>
    <!--poster="http://editerupload.eepw.com.cn/201809/61001537857032.jpg"-->
    <video v-show="status" ref="video" class="video" controls preload="auto" x5-video-player-fullscreen="true" playsinline webkit-playsinline>
      <!-- <source src="http://video.pearvideo.com/mp4/adshort/20181115/cont-1476862-13242020_adpkg-ad_hd.mp4" type="video/mp4" /> -->
      <source :src="audioSrc" type="video/mp4" />
      <source :src="audioSrc" type="video/webm" />
      <source :src="audioSrc" type="video/ogg" />
      <object :data="audioSrc" style="width: 100%">
        <embed :src="audioSrc" style="width: 100%" />
      </object>
    </video>
  </div>
</template>
<script>
import config from "@/config";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("Servicebill");
export default {
  // userType：用户类型
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:电影
  // src：视频地址
  props: ["userType", "textType", "src", "audioPlayFlag"],
  data() {
    return {
      status: false,
      isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent)
    };
  },
  mounted() {
    this.$refs.video.addEventListener("x5videoexitfullscreen", e => {
      // 结束
      this.status = false;
      if (this.isIos) {
        this.$refs.video.load();
      } else {
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
      }
    });
    // 结束事件
    this.$refs.video.addEventListener("ended", e => {
      this.status = false;
      if (this.isIos) {
        this.$refs.video.load();
      } else {
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
      }
    });
    this.$refs.video.addEventListener("pause", e => {
      this.status = false;
    });
  },
  computed: {
    audioSrc() {
      return config.AUDIOCDN + this.src;
    },
    ...mapState({
      videoPlayStatus: state => state.videoPlayStatus
    })
  },
  methods: {
    ...mapMutations(["changevideoPlayStatus"]),
    // 视频播放
    videoPlay() {
      if (this.status) {
        // 暂停
        this.$refs.video.pause();
        this.$refs.video.currentTime = 0;
        this.status = !this.status;
        // 设置全局播放状态
        // this.changevideoPlayStatus(false);
      } else {
        // 设置全局播放状态
        // this.changevideoPlayStatus(true);
        // 播放
        this.$refs.video.play();
        this.status = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>
