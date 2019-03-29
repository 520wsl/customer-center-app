<template>
    <div id="app">
        <headerBar :title="title" :isBack='isBack' v-if="isShowNav"></headerBar>
        <div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    import headerBar from "@/components/app/header/header.vue";

    import {mapState} from "vuex";

    export default {
        name: "app",
        data() {
            return {
                title: "",
                isBack: true,
                isShowNav: false
            };
        },
        components: {headerBar},
        methods: {
            setTitle(title = "四喜服务", isBack = true) {
                this.title = title;
                this.isBack = isBack;
            },
            setIsShowNav() {
                this.isShowNav = this.$store.state.User.isShowNav
            }
        },
        mounted() {
            setTimeout(() => {
                this.setIsShowNav()
            }, 600)
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
