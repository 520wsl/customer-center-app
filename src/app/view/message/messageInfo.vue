<template>
  <div style="height:100%;background:#fff;">
    <div class="form-submited">
      <img :src="$CDN('/success_icon.png')">
      <p class="form-submited-text">{{text}}</p>
      <p class="form-submited-text-msg">{{textMsg}}</p>
    </div>
    <div class="timer">
      <span>{{timer}}</span>
      <span style="color: #929eaa;">秒后关闭页面</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      textMsg: '',
      timer: 3,
    }
  },
  mounted() {
    this.text = this.$route.query.text || "提交成功！";
    this.textMsg = this.$route.query.textMsg || "";
    let timer = setInterval(() => {
      this.timer--
      if (this.timer === 0) {
        clearInterval(timer)
        wx.closeWindow();
      }
    }, 1000);
  }
}
</script>
<style scoped>
.form-submited {
  margin-top: 10px;
  border: 1px solid transparent;
  background: #fff;
}
.form-submited > img {
  display: block;
  margin: 42px auto;
  width: 110px;
  height: 110px;
}
.form-submited-text {
  font-size: 32px;
  color: #444444;
  text-align: center;
  font-weight: bold;
  margin-bottom: 40px;
}
.form-submited-text-msg {
  width: 616px;
  margin: 0 auto;
  font-size: 28px;
  color: #929eaa;
}
.timer {
  position: fixed;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
  font-size: 32px;
  color: #697eff;
}
</style>
