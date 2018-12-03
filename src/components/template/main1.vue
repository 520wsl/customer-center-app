/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 23:36:01 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-02 23:09:42
 * @explanatory:  模板页 不带底部按钮
 */
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("User");
export default {
    name: "app",
    components: {},
    methods: {
        ...mapActions(["loginScheduler", "getUserInfoAction"])
    },
    created() {},
    async mounted() {
        let route = this.$route;
        let queryData = route.query;
        let codeData = queryData.code || "";
        let stateData = queryData.state || "enterpriseWeChat";
        let pageName = queryData.pageName || "personalServie";
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
            let query = queryData;
            query.code = "";
            query.state = "";
            if (pageName && pageName !== "personalServie") {
                this.$router.push({
                    name: pageName,
                    query: query
                });
            }

            return;
        }
    }
};
</script>

<style>
</style>
