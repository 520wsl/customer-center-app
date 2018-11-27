<template>
  <div class="moive">
    <div v-if="!status" @click="videoPlay()">
      <img :src="$CDN('/play.png')" class="play">
      <!-- <img class="bg" src="http://editerupload.eepw.com.cn/201809/61001537857032.jpg" /> -->
    </div>
    <!--poster="http://editerupload.eepw.com.cn/201809/61001537857032.jpg"-->
    <video v-show="status" ref="video" class="video" controls preload="auto" x5-video-player-fullscreen="true" playsinline webkit-playsinline>
      <!-- <source src="http://video.pearvideo.com/mp4/adshort/20181115/cont-1476862-13242020_adpkg-ad_hd.mp4" type="video/mp4" /> -->
      <source :src="$FILE(src)" type="video/mp4" />
      <source :src="$FILE(src)" type="video/webm" />
      <source :src="$FILE(src)" type="video/ogg" />
      <object :data="$FILE(src)" style="width: 100%">
        <embed :src="$FILE(src)" style="width: 100%" />
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
.moive {
  .bg {
    height: 250px;
    width: 450px; // filter: blur(1px);
  }
  max-width: 450px;
  min-width: 450px;
  height: 250px;
  position: relative;
  background: #313030;
}

.video {
  height: 250px;
  width: 450px;
  background: #313030;
}

// moive下
.play {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
