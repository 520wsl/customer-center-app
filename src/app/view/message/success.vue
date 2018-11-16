<template>
  <div>
    <div class="success-body">
      <img :src="$CDN('/success_icon.png')">
      <span>留言提交</span>
      <p>感谢您的信任与支持，我们的工作人员将<br>在第一时间联系您，请稍等!!!</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {
    this.$parent.$parent.setTitle("留言提交成功");
  }
};
</script>
<style scoped>
.success-body {
  border-top: 10px solid #f4f4f4;
  padding: 0 100px;
  background: #fff;
}
.success-body img {
  display: block;
  width: 120px;
  margin: 52px auto;
}
.success-body span {
  display: block;
  font-size: 32px;
  color: #444444;
  text-align: center;
}
.success-body p {
  line-height: 54px;
  margin-top: 20px;
  color: #929eaa;
  font-size: 28px;
  text-align: center;
  padding-bottom: 62px;
}
</style>
