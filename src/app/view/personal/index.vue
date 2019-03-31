<template>
    <div class="main">
        <div class="personal" v-if="info.mobile || info.companyName">
            <!-- <div class="company" :style="'background-image: url('+$CDN('/my_company_bg.png')+')'"> -->
            <div class="company">
                <div class="company-image">
                    <img v-if="companyUrl" :src="companyUrl" class="img">
                    <div v-else class="default-img"></div>
                </div>
                <div class="company-info">
                    <div>{{info.companyName}}</div>
                    <div v-if="info.mobile">{{encryptionPhone(info.mobile)}}</div>
                    <div v-else>
                        <mt-button class="btn" type='default' @click="bindPhone">点击绑定手机号</mt-button>
                    </div>
                </div>
            </div>
            <div class="personal-other">
                <router-link class="item border" :to="{name: 'personalCompany'}">
                    <div>
                        <img :src="$CDN('/personal-company.png')">
                        <span>我的公司</span>
                    </div>
                    <span>&gt;</span>
                </router-link>
                <router-link v-if="info.role == 1" class="item border" :to='{name:"passwordSearch"}'>
                    <div>
                        <img :src="$CDN('/store-account-password.png')">
                        <span>查询店铺账号密码</span>
                    </div>
                    <span>&gt;</span>
                </router-link>
                <router-link class="item border" :to='{name:"serviceBill"}'>
                    <div>
                        <img :src="$CDN('/service-sheet.png')">
                        <span>历史工单</span>
                    </div>
                    <span>&gt;</span>
                </router-link>
                <!-- <a class="item border" href="#">
                    <div>
                        <img :src="$CDN('/qustion_logo.png')">
                        <span>常见问题</span>
                    </div>
                    <span>&gt;</span>
                </a> -->
                <nowBillList :companyiId="info.companySixiId"></nowBillList>
            </div>
        </div>
        <!--<div v-if="!info.mobile && !info.companyName && !bool" class="no-data"><h3>您还未登录，请重新关闭页面后重新打开！</h3></div>-->
        <div v-if="!info.mobile && !info.companyName && bool" class="no-data">
            <div class="img">
                <img :src="$CDN('/null-icon.png')" alt="">
            </div>
            <h3>非常抱歉，您的微信号还未关联公司！</h3>
            <p>注：请联系我们的业务员，将您的合作公司跟您的微信做关联操作；</p>
        </div>

    </div>
</template>
<script>
    import config from "@/config";
    import {getStore} from "@/libs/util/storeage";
    import {encryptionPhone} from '@/libs/tools'
    // import { getUserInfoData } from "@/api/customer/customer";
    import nowBillList from "@/components/app/serviceBill/nowBillList";

    export default {
        data() {
            return {
                list: [],
                bool: false
            };
        },
        computed: {
            info: function () {
                return this.$store.state.User.wxUserInfo;
            },
            companyUrl: function () {
                return this.$store.state.User.wxUserInfo.wechatAvatar || this.$store.state.User.avatorImgPath;
            }
        },
        mounted() {
            // 方便调试 勿删
            console.log('微信-pro', "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=https://workapp.sixi.com/personal/index&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1#wechat_redirect")
            console.log('微信-dev', "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6224f0de43449867&redirect_uri=https://test.workapp.sixi.com/personal/index&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1#wechat_redirect")
            this.$parent.$parent.setTitle("我的服务", false);
            let res = getStore(config.storeagewxUserInfoKey)
            console.log(res, this.info);
            // this.getInfo();
            // console.log(this.$store.state.User[config.storeagewxUserInfoKey], res)
            // console.log(this.$store.state.User.avatorImgPath)
        },
        components: {nowBillList},
        methods: {
            bindPhone() {
                this.$router.push({
                    name: "getPhone",
                    query: {
                        userSixiId: this.info.customerSixiId || "",
                        companySixiId: this.info.companySixiId || ""
                    }
                })
            },
            encryptionPhone(phone) {
                return encryptionPhone(phone)
            },
            // async getInfo() {
            //     let res = await getUserInfoData();
            //     if (res.status != 200) {
            //         return MessageBox("提示", res.msg);
            //     }
            //     this.$store.commit("setUserInfo", res.data);
            //     console.log(this.$store)
            //     this.$store.commit("setAvator", res.data.wechatAvatar);
            // }
        },
        watch: {
            info(val) {
                if (val.mobile == "" && val.companyName == "") {
                    this.bool = true;
                } else {
                    this.bool = false;
                }
                console.log(this.bool)
            }
        }
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
        width: 120px;
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
        padding: 0 30px;
    }

    .item div {
        flex: 1;
        display: flex;
        align-items: center;
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
        background: #fff;
        margin-top: 20px;
    }

    /* 空数据 */
    .no-data .img {
        width: 210px;
        margin: 54px auto 0;
    }

    .no-data .img img {
        width: 100%;
        display: block;
    }

    .no-data h3 {
        font-size: 28px;
        color: #6e7790;
        text-align: center;
        font-weight: normal;
        margin: 66px 0 40px;
    }

    .no-data p {
        padding: 0 30px;
        font-size: 26px;
        color: #929eaa;
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
