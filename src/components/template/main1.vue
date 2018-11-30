/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 23:36:01 
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-30 14:26:29
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
        ...mapActions(["loginScheduler"])
    },
    created() {},
    async mounted() {
        let route = this.$route;
        let query = route.query;
        let codeData = query.code || "";
        let stateData = query.state || "enterpriseWeChat";
        if (!codeData && !stateData) {
            return;
        }
        let res = await this.loginScheduler({
            codeData,
            stateData,
            route: this.$route
        });
        if (res) {
            console.log("code登录", res);
            return;
        }
    }
};
</script>

<style>
</style>
