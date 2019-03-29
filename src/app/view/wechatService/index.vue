<template>
    <div class="main wechat-service">
        <img class="img-logo" :src="$CDN('/wx_service_logo.png')" alt="">
        <p class="info">杭州四喜信息技术服务有限公司官方服务号，为您提供优质专业的电商服务！</p>
        <div class="QRcode">
            <img :src="$CDN('/wx_service_QRcode.jpg')" alt="">
        </div>
        <p class="info">长按二维码关注喜小帮</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
    },
    created() {
        this.$parent.$parent.setTitle("喜小帮微信服务号");
    }
}
</script>
<style scoped>
.wechat-service {
  border-top: 10px solid #f4f4f4;
  padding: 60px 30px 0;
  background: #fff;
}
.wechat-service .img-logo {
  display: block;
  width: 120px;
  margin: 0 auto;
}
.wechat-service .info {
  font-size: 28px;
  color: #6e7790;
  letter-spacing: 0;
  line-height: 44px;
  text-align: center;
  padding: 58px 24px 0;
}
.wechat-service .QRcode {
  width: 240px;
  margin: 74px auto 0;
}
.wechat-service .QRcode img {
  width: 100%;
}
</style>
<style>
body,
html,
#app {
  background: #fff;
}
</style>

