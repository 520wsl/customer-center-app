/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 23:36:01 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-03 18:28:55
 * @explanatory:  模板页 不带底部按钮
 */
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { judgeLogin } from "@/libs/tools";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("User");
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
        }
    },
    created() {},
    async mounted() {
        let route = this.$route;
        let queryData = route.query;
        let codeData = queryData.code || "";
        let stateData = queryData.state || "enterpriseWeChat";

        if (!codeData && !stateData) {
            this.getUserInfoAction();
            return;
        }
        let res = await this.loginScheduler({
            codeData,
            stateData,
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
        } else {
            judgeLogin();
        }
    }
};
</script>

<style>
</style>
