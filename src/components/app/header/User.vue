<template>
    <div class="bk">
        <div class="content-center username">
            <img class="logo" :src="userInfo.wechatAvatar"/>
            <span>{{userInfo.wechatNickname}}</span>
            <!--<img class="dropdown" :src="$CDN('/icon_drop_down.png')"/>-->
        </div>
        <!--<div class="dropdown-content">-->
            <!--<div style="text-align: right">-->
                <!--<Button type="text" icon="md-exit">退出登录</Button>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "",
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            getUserInfo() {
                this.userInfo = this.$store.state.User.wxUserInfo || ""
            }
        },
        mounted() {
            this.getUserInfo()
        }
    }
</script>

<style scoped lang="less">
    .bk {
        position: relative;
    }

    .bk:hover .dropdown-content {
        display: block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #fff;
        width: inherit;
        max-height: 200px;
        overflow: auto;
        /*margin: 5px 0;*/
        padding: 5px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        z-index: 900;
    }

    .content-center {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 14px;
        height: 64px;


    }

    .logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .dropdown {
        width: 15px;
        height: 15px;
        margin-left: 15px;


    }
</style>