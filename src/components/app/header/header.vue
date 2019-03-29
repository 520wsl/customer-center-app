<template>
    <div class="title">
        <!--<mt-header fixed title="" :style="background?'background:'+background:'background:#fff;'" class="header">-->
        <!--<div slot="left">-->
        <!--<slot name="headleft">-->
        <!--<div v-if="!isBack">-->
        <!--<span :class="background?'white':'black'">{{title}}</span>-->
        <!--</div>-->
        <!--<a v-else @click="routerBack()" href="javascript:void(0);"-->
        <!--:class="background?'white left':'black left'">-->
        <!--<mt-button icon="back" class="back"></mt-button>-->
        <!--<span :class="background?'white':'black'">&nbsp;{{title}}</span>-->
        <!--</a>-->
        <!--</slot>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div slot="right">&ndash;&gt;-->
        <!--&lt;!&ndash;<slot name="headright" class="right">&ndash;&gt;-->
        <!--&lt;!&ndash;<img v-if="background" :src="$CDN('/header_white_logo.png')" class="img">&ndash;&gt;-->
        <!--&lt;!&ndash;<img v-else :src="$CDN('/header_black_logo.png')" class="img">&ndash;&gt;-->
        <!--&lt;!&ndash;</slot>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</mt-header>-->
        <div class="header">
            <Top></Top>
            <Crumbs @refresh="refresh()"  @returnLeft="routerBack()" :isShowRefresh="true" :isShowReturnLeft="isBack" :title="title"></Crumbs>
        </div>
    </div>
</template>

<script>
    import Crumbs from "./Crumbs.vue";
    import Top from "./top.vue";

    export default {
        props: ["title", "isBack"],
        data() {
            return {};
        },
        components: {Crumbs, Top},
        methods: {
            routerBack() {
                history.back();
            },
             refresh() {
              window.location.reload()
            }
        }
    };
</script>

<style scoped lang="less">
    .title {
        width: 100%;
        padding-bottom: 15px;
    }
</style>

<style>
</style>

