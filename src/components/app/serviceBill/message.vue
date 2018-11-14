<template>
  <div>
    <div :class="userType === 1 ?['message']:['message msg-r']">
      <div class="portrait">
        <img :src="$CDN(portraitUrl)" alt="404">
      </div>
      <div class="content">
        <div class="time">
          <span>2018-01-02 11:20</span>&ensp;
          <span>提交工单</span>&ensp;
          <span class="customer">{{userType === 1?'客服':'您'}}</span>
          {{audioPlayFlag}}
        </div>
        <!--文本类型-->
        <div v-if="textType === 1" class="text">
          <span>客户要求美客户要求美客户要求美客户要求美客户要求美客户要求美客户要求美客户要求美客户要求美客户要求美.</span>
          <!--小图标-->
          <img v-if="userType === 1" class="horn_l" :src="$CDN('/white_horn_left.png')" alt="">
          <img v-if="userType === 2" class="horn_r" :src="$CDN('/white_horn.png')" alt="">
        </div>
        <!--语音类型-->
        <div v-else-if="textType === 2" class="audio">
          <img class="gif" :src="$CDN('/audio.png')" alt="404">
          <span>11&ensp;"</span>
          <audio ref="audio" preload="auto" hidden="true">
            <source :src="src" type="audio/mpeg">
          </audio>
          <!--小图标-->
          <img v-if="userType === 1" class="horn_l" :src="$CDN('/purple_horn_left.png')" alt="">
          <img v-if="userType === 2" class="horn_r" :src="$CDN('/purple_horn.png')" alt="">
        </div>
        <!--图片-->
        <div v-else-if="textType === 3" class="image">
          <img :src="src" />
          <!-- http://editerupload.eepw.com.cn/201809/61001537857032.jpg -->
        </div>
        <!--视频-->
        <div v-else-if="textType === 4" class="moive">
          <video type="video/mp4" controls poster="http://editerupload.eepw.com.cn/201809/61001537857032.jpg" preload="autoplay" style="width: 100%;height: 100%;">
            <source :src="src" type="video/mp4" />
            <!-- http://video.pearvideo.com/mp4/third/20181112/cont-1474528-12164372-154021-sd.mp4 -->
            <source src="movie.ogg" type="video/ogg" />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userType", "textType", "src", "audioPlayFlag"],
  // userType: 1, // 1客服，2客户（您）
  // textType: 1, // 1文本，2语音，3图片，4视频
  // 点击预览图片，功能，语音播放功能，视频播放功能细节修复
  data() {
    return {
      portraitUrl: "/customer_service.png"
    };
  },
  methods: {
    // player() {
    //   console.log("音频长度", this.$refs.audio.duration);
    //   if (this.audioPlayFlag) {
    //     this.$refs.audio.pause();
    //     this.audioPlayFlag = false;
    //     this.$refs.audio.currentTime = 0;
    //     console.log("暂停");
    //   } else {
    //     this.$refs.audio.play();
    //     this.audioPlayFlag = true;
    //     console.log("开始");
    //   }
    // },
    // 播放音频
    play() {
      this.$refs.audio.play();
      // this.audioPlayFlag = true;
      console.log("开始");
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
      // this.audioPlayFlag = false;
      this.$refs.audio.currentTime = 0;
      console.log("暂停");
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
.message {
  display: flex;
  padding: 20px 0;
  .portrait {
    margin-right: 20px;
    img {
      margin-top: 48px;
      border-radius: 100%;
      height: 64px;
      width: 64px;
      background: #697eff;
    }
  }
  .content {
    .time {
      font-size: 18px;
      color: #697eff;
      margin-bottom: 16px;
      .customer {
        float: left;
        margin-right: 20px;
        padding: 2px 18px;
        border-radius: 5px;
        color: #fff;
        background: #697eff;
        text-align: center;
      }
    }
    .text {
      display: inline-block;
      position: relative;
      max-width: 450px;
      padding: 15px 20px;
      border-radius: 0 10px 10px 10px;
      box-shadow: 5px 5px 20px 2px #d6d6d6;
      // box-shadow: 5px 5px 20px 2px #000000;
    }
    .image > img {
      max-width: 450px;
    }
    .moive {
      max-width: 450px;
    }
    .audio {
      height: 68px;
      line-height: 68px;
      padding: 0 40px;
      width: 160px;
      color: #fff;
      background: #697eff;
      border-radius: 0 10px 10px 10px;
      box-shadow: 5px 5px 20px 2px #d6d6d6;
      position: relative;
      .gif {
        position: absolute;
        top: 50%;
        margin-top: -15px;
        width: 30px;
        height: 30px;
      }
      span {
        margin-left: 110px;
      }
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
    .text,
    .moive,
    .audio {
      display: inline-block;
      text-align: left;
      border-radius: 10px 0 10px 10px !important;
    }
  }
}

.horn_r {
  content: " ";
  position: absolute;
  display: block;
  width: 20px;
  right: -20px;
  top: 0px;
}
.horn_l {
  content: " ";
  position: absolute;
  display: block;
  width: 20px;
  left: -20px;
  top: 0px;
}
</style>

