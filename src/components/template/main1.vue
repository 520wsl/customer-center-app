/*
* @Author: Mad Dragon 395548460@qq.com
* @Date: 2018-11-07 23:36:01
* @Last Modified by: Mad Dragon
* @Last Modified time: 2018-12-06 12:38:09
* @explanatory:  模板页 不带底部按钮
*/
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {judgeLogin} from "@/libs/tools";
    import {createNamespacedHelpers} from "vuex";
    import {
        getWxJSSDKConfig,
        getWxSnsapiUserInfoData
    } from "@/api/wechatProxy/wxSDK";

    const {mapActions} = createNamespacedHelpers("User");
    export default {
        name: "app",
        components: {},
        methods: {
            ...mapActions(["loginScheduler", "getUserInfoAction"]),
            method1(url) {
                // 使用正则来 两边的参数不可能是 &=? 所以去反集[^&=?]
                console.log("method1", url);
                let regex = /([^&=?]+)=([^&=?]+)/g,
                    obj = {};
                url.replace(regex, (...arg) => {
                    obj[arg[1]] = arg[2];
                });
                console.log(obj);
                return obj;
            },
            async WXLogin() {
                console.log("route", this.$route);
                let urlPath = location.href.split("#")[0] || "";

                let res = await getWxJSSDKConfig({
                    url: urlPath
                });
                console.log(res);
                /* eslint-disable no-undef */
                wx.config(res.data);
                console.log("config**************");
                wx.ready(function () {
                    console.log("ready**************");
                    wx.hideMenuItems({
                        menuList: [
                            "menuItem:share:appMessage",
                            "menuItem:share:timeline",
                            "menuItem:share:qq",
                            "menuItem:share:weiboApp",
                            "menuItem:favorite",
                            "menuItem:share:facebook",
                            "menuItem:share:QZone",
                            "menuItem:editTag",
                            "menuItem:delete",
                            "menuItem:copyUrl",
                            "menuItem:originPage",
                            "menuItem:readMode",
                            "menuItem:openWithQQBrowser",
                            "menuItem:openWithSafari",
                            "menuItem:share:email",
                            "menuItem:share:brand"
                        ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    });
                    // wx.checkJsApi({
                    // 	jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    // 	success: function(res) {
                    // 		console.log("checkJsApi", res);
                    // 		this.checkJsApi = JSON.stringify(res);
                    // 		// 以键值对的形式返回，可用的api值true，不可用为false
                    // 		// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    // 	}
                    // });
                });

                wx.error(function (res) {
                    console.log("error**************", res);
                });
                /* eslint-disable no-undef */
            }
        },
        created() {
        },
        async mounted() {
            this.WXLogin();
            let route = this.$route;
            let queryData = route.query;
            let codeData = queryData.code || "";
            let stateData = queryData.state || "";
            let clientId = this.$config.ssoConfig.login.clientId
            let pathname = this.$config.ssoConfig.login.pathname

            if (!codeData && !stateData) {
                let isLogin = await this.getUserInfoAction();
                if (!isLogin) {
                    judgeLogin();
                }
                return;
            }
            let res = await this.loginScheduler({
                codeData,
                stateData,
                clientId,
                pathname,
                route: this.$route
            });
            if (res) {
                console.log("code登录", res);
                let par = queryData.par || "";
                let query = {};

                if (par) {
                    query = this.method1(decodeURIComponent(window.atob(par)));
                    console.log("par", par);
                    console.log(
                        "decodeURIComponent(window.atob(par))",
                        decodeURIComponent(window.atob(par))
                    );
                    console.log("query", query);
                }

                let pageName = query.pageName || "personalServie";
                if (pageName && pageName !== "personalServie") {
                    this.$router.push({
                        name: pageName,
                        query: query
                    });
                }

                return;
            }

            judgeLogin();
        }
    };
</script>

<style>
</style>
