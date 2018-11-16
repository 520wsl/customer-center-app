<template>
  <div>
    <div class="moive">
      <img src="http://editerupload.eepw.com.cn/201809/61001537857032.jpg" @click="videoPlay()" />
    </div>
    <!--视频的默认缩略图 poster="http://editerupload.eepw.com.cn/201809/61001537857032.jpg" controls,出现播放控制  x5-video-player-type="h5" x5-video-player-fullscreen="true" -->
    <div @click="videoPlay()" v-show="showVedio" class="vedioBox">
      <video ref="vedio" class="vedio" type="video/mp4" controls preload="auto" webkit-playsinline="true" playsinline>
        <source src="http://video.pearvideo.com/mp4/adshort/20181115/cont-1476862-13242020_adpkg-ad_hd.mp4" type="video/mp4" />
        <!-- <source :src="audioSrc" type="video/mp4" />
        <source :src="audioSrc" type="video/webm" />
        <source :src="audioSrc" type="video/ogg" />
        <object :data="audioSrc" style="width: 100%">
          <embed :src="audioSrc" style="width: 100%" />
        </object> -->
        浏览器版本低，或不支持的版本格式。
      </video>
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  // userType：用户类型
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：视频地址
  props: ["userType", "textType", "src", "audioPlayFlag"],
  data() {
    return {
      showVedio: false
    };
  },
  mounted() {
    let _this = this;
    this.$refs.vedio.addEventListener("x5videoexitfullscreen", e => {
      // 暂停
      _this.showVedio = !_this.showVedio;
      e.target.vedio.pause();
      e.target.vedio.currentTime = 0;
    });
  },
  computed: {
    audioSrc() {
      return config.AUDIOCDN + this.src;
    }
  },
  methods: {
    // 视频播放
    videoPlay() {
      if (this.showVedio) {
        // 暂停
        this.$refs.vedio.pause();
        this.$refs.vedio.currentTime = 0;
        this.showVedio = !this.showVedio;
      } else {
        // 播放
        this.$refs.vedio.play();
        this.showVedio = !this.showVedio;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>
