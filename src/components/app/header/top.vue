<template>
    <div class="flex top">
        <div class="flex-left content-center">
            <img class="logo" :src="$CDN('/icon_sixi_logo_min.png')"/>
            <span>喜小帮</span>
        </div>
        <div class="flex-right">
            <User></User>
        </div>
    </div>
</template>

<script>

    import User from "./User.vue";

    export default {
        components: {User},
        name: "",
        data() {
            return {}
        },


    }
</script>

<style lang="less" scoped>
    .top {
        display: flex;
        background-color: #fff;
        padding: 0px 30px;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        border-bottom: 1px solid #ececec;
        overflow: inherit;


    }

    .content-center {
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .logo {
        width: 25px;
        height: 25px;
        margin-right: 15px;
    }
</style>