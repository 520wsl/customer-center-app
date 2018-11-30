<template>
    <div class="personal">
        <!-- <div class="company" :style="'background-image: url('+$CDN('/my_company_bg.png')+')'"> -->
        <div class="company">
            <div class="company-image">
                <img v-if="companyUrl" :src="companyUrl" class="img">
                <div v-else class="default-img"></div>
            </div>
            <div class="company-info">
                <div>{{companyName}}</div>
                <div v-if="phone">{{phone}}</div>
                <div v-else>
                    <mt-button class="btn" type='default'>点击绑定手机号</mt-button>
                </div>
            </div>
        </div>
        <div class="personal-other">
            <a class="item border" href="#">
                <div>
                    <img :src="$CDN('/contract_logo.png')">
                    <span>我的公司</span>
                </div>
                <span>&gt;</span>
            </a>
            <a class="item border" href="#">
                <div>
                    <img :src="$CDN('/service_valuation_logo.png')">
                    <span>查询店铺账号密码</span>
                </div>
                <span>&gt;</span>
            </a>
            <a class="item border" href="#">
                <div>
                    <img :src="$CDN('/work_list_logo.png')">
                    <span>服务工单</span>
                </div>
                <span>&gt;</span>
            </a>
            <a class="item border" href="#">
                <div>
                    <img :src="$CDN('/qustion_logo.png')">
                    <span>常见问题</span>
                </div>
                <span>&gt;</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            companyUrl: "",
            companyName: "公司公司公司公司公司公司公司公司公司公司公司公司公司公司",
            phone: "",
            sales: {
                onlineSales: "0.00",
                onlineNum: "0",
                offlineSales: "1.00",
                offlineNum: "1"
            }
        };
    },
    created() {
        // 方便调试 勿删
        console.log('微信',"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://workapp.sixi.com/personal/index&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1#wechat_redirect")
        this.$parent.$parent.setTitle("我的服务");
    },
    components: {},
    methods: {}
};
</script>
<style scoped>
.personal {
  background: #f4f4f4;
}
.company {
  background: #7d89d7;
  background-size: 100% 240px;
  height: 240px;
  padding: 0 30px;
  position: relative;
  overflow: hidden;
  display: flex;
}
.company-image {
  margin: 44px 22px 0 0;
  width: 132px;
  height: 132px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex: none;
}
.company-image .img {
  display: block;
  width: 12px;
  height: 120px;
  margin: 6px;
  border-radius: 50%;
}
.default-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 6px;
  background: #fff;
}
.company-info {
  margin-top: 44px;
  font-size: 30px;
  color: #fff;
}
.company-info div {
  margin-bottom: 14px;
}
.company-info .btn {
  font-size: 30px;
  background: 0 none;
  border: 2px solid #fff;
  color: #fff;
  height: 46px;
  line-height: 46px;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  height: 96px;
}
.item div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item div img {
  height: 28px;
}
.item div span {
  padding-left: 20px;
}
.border {
  border-bottom: 2px solid #f7f7f7;
}
.personal-other {
  padding: 0 30px;
  background: #fff;
  margin-top: 20px;
}
</style>
<style>
body,
html,
.main,
.personal {
  height: 100%;
  background: #fff;
}
</style>
