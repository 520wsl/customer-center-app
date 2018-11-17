<template>
  <!--语音类型-->
  <div class="audio">
    <img v-show="currentValue" class="gif" :src="$CDN('/audio.png')" alt="404">
    <img v-show="!currentValue" class="gif" :src="$CDN('/audioGif.gif')" alt="404">
    <span>{{audioTime}}&ensp;"</span>
    <audio ref="audio" preload="auto" hidden="true">
      <source :src="audioSrc" type="audio/mpeg">
      <source :src="audioSrc" type="audio/MP3">
    </audio>
    <img v-if="userType === 1" class="horn_l" :src="$CDN('/purple_horn_left.png')" alt="">
    <img v-if="userType === 2" class="horn_r" :src="$CDN('/purple_horn.png')" alt="">
  </div>
</template>
<script>
import config from "@/config";
export default {
  // userType：用户类型
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：音频地址
  // audioPlayFlag(value)：双向绑定，当前音频播放控制（点击播放，停止状态）
  props: ["userType", "textType", "src", "value"],
  data() {
    return {
      audioTime: 0
    };
  },
  created() {},
  mounted() {
    // alert('浏览器版本：'+navigator.appCodeName)
    // 给声音赋值时长（可持续播放音频时事件，canplaythrough）
    this.$refs.audio.addEventListener("loadedmetadata", e => {
      // console.log("测试");
      this.audioTime = e.target.duration.toFixed(0);
      // console.log(this.audioTime, "音频时长");
    });
  },
  computed: {
    audioSrc() {
      return config.AUDIOCDN + this.src;
    },
    // 子组件同父组件双向绑定
    currentValue: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    // 播放音频
    play() {
      this.$refs.audio.play();
      // console.log(this.$refs.audio.play);
      // 设置定时器更新播放状态（根据语音的时长）
      setTimeout(() => {
        this.pause();
      }, this.$refs.audio.duration * 1000);
    },
    // 暂停音频
    pause() {
      this.currentValue = true; // 停止时设置播放状态为FALSE
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    }
  },
  watch: {
    currentValue(val) {
      val ? this.pause() : this.play();
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>
