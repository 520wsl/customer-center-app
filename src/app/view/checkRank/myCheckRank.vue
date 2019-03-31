<template>
    <div>
        <div style="padding:0 30px;">
            <section class="search">
                <div class="search-options">店铺：
                    <Select class="search-options-input" v-model="params.companyName">
                        <Option v-for="item in companyList" :key="item.sixiId" :value="item.name">{{item.name}}
                        </Option>
                    </Select>
                </div>
                <div class="search-options">查询方式：
                    <Select class="search-options-input" v-model="params.billtype">
                        <Option :value="0">销量</Option>
                        <Option :value="1">综合</Option>

                    </Select>
                </div>
                <div class="search-options">关键词：
                    <Input v-model="params.keyWord" placeholder="请输入搜索关键词" class="search-options-input"/>
                </div>
                <div class="search-sub">
                    <Button @click="getResultListData()" type="primary" :loading="loading" ghost
                            icon="ios-search">查排名
                    </Button>
                </div>
            </section>
            <div class="content">
                <Table :loading="loading" :columns="columns1" :data="data1"></Table>
            </div>
        </div>
    </div>

</template>

<script>
    import {bgReq} from "@/libs/AgentEmbed";
    import {formatInitTime} from "@/libs/util/time";
    import {getCompanyList} from "@/api/customer/customer";

    export default {
        created() {
            this.$parent.$parent.setTitle("在线查排名");
        },
        mounted() {
            this.getUserInfo()
            this.getCompanyList();

        },
        methods: {
            getResultListData() {
                console.log('1')
                let keyword = this.params.keyWord
                let companyName = this.params.companyName
                let billtype = this.params.billtype || 0
                if (companyName.length <= 0) {
                    this.$messagebox("提示", '请选择查询的店铺');
                    return;
                }
                if (keyword.length <= 0) {
                    this.$messagebox("提示", '请输入查询关键词');
                    return;
                }
                this.loading = true
                switch (billtype) {
                    case 0:
                        this.select1688RankingSales(keyword, [
                            {
                                "shopName": companyName
                            }
                        ])
                        break
                    case 1:
                        this.select1688Ranking(keyword, [
                            {
                                "shopName": companyName
                            }
                        ])
                        break
                }

            },
            // 销量
            select1688RankingSales(keyword = '', params = [], isShowProInfo = true) {
                bgReq._1688RankingSales(
                    keyword,
                    params,
                    {},
                    isShowProInfo
                ).then(data => {
                    this.setData1(data)
                    this.loading = false
                }).catch(e => {
                    this.loading = false
                })
            },
            // 综合
            select1688Ranking(keyword = '', params = [], isShowProInfo = true) {
                bgReq._1688Ranking(
                    keyword,
                    params,
                    {},
                    isShowProInfo
                ).then(data => {
                    this.setData1(data)
                    this.loading = false
                }).catch(e => {
                    this.loading = false
                })
            },
            setData1(data) {
                let arr = []
                if (Object.prototype.toString.call(data) == "[object Array]") {
                    let _this = this
                    data.map((item) => {
                        arr.push({
                            "keyWord": _this.params.keyWord,
                            "pageIndex": item.pageIndex,
                            "pageNum": item.pageNum,
                            "title": item.item.data.title,
                            "titleUrl": item.item.data.url,
                            "shopName": item.item.data.shopName,
                            "shopUrl": item.item.data.shopUrl,
                        })
                    })
                }
                if (arr.length <= 0) {
                    this.$messagebox("提示", '未查到关键词相关的产品排名');
                    return
                }
                console.log('arr', arr)
                console.log('data', data)
                this.data1 = arr
            },
            getUserInfo() {
                this.userInfo = this.$store.state.User.wxUserInfo || ""
                this.params.companyName = this.$store.state.User.wxUserInfo.companyName || ""
            },
            async getCompanyList() {
                let res = await getCompanyList();
                if (res.status != 200) {

                    this.$messagebox("提示", res.msg);
                    return;
                }
                this.companyList = res.data || [];
                if (res.data[0]) {
                    this.params.companyName = res.data[0]['name'] || ''
                }
            },
        },
        data() {
            return {
                historyModal: false,
                loading: false,
                params: {
                    companyName: '',
                    keyWord: '',
                    billtype: 0
                },
                companyList: [],
                userInfo: {},
                columns1: [
                    {
                        align: 'center',
                        title: '关键词',
                        key: 'keyWord'
                    },
                    {
                        align: 'center',
                        title: '排名',
                        render: (h, params) => {
                            let btnGroup = [];
                            let str = ''
                            let style = ''
                            if (params.row.pageNum > 0 && params.row.pageIndex > 0) {
                                str = "第" + params.row.pageNum + "页 第" + params.row.pageIndex + "名"
                            } else {
                                str = "未查到排名"
                                style = 'color:#999;'
                            }

                            btnGroup.push(
                                h(
                                    "span",
                                    {
                                        style: style
                                    },
                                    str
                                )
                            );
                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: '宝贝标题',
                        render: (h, params) => {
                            let btnGroup = [];
                            if (params.row.title) {
                                if (params.row.titleUrl) {
                                    btnGroup.push(
                                        h(
                                            'a',
                                            {
                                                style: 'margin:5px;color:#218FFF',
                                                props: {size: 'small'},
                                                on: {
                                                    click: () => {
                                                        window.open(params.row.titleUrl)
                                                    }
                                                }
                                            },
                                            params.row.title
                                        )
                                    );
                                } else {
                                    btnGroup.push(
                                        h(
                                            'span',
                                            {},
                                            params.row.title
                                        )
                                    );
                                }

                            }

                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: '公司',
                        render: (h, params) => {
                            let btnGroup = [];
                            if (params.row.shopName) {
                                if (params.row.shopUrl) {
                                    btnGroup.push(
                                        h(
                                            'a',
                                            {
                                                style: 'margin:5px;color:#218FFF',
                                                props: {size: 'small'},
                                                on: {
                                                    click: () => {
                                                        window.open(params.row.shopUrl)
                                                    }
                                                }
                                            },
                                            params.row.shopName
                                        )
                                    );
                                } else {
                                    btnGroup.push(
                                        h(
                                            'span',
                                            {},
                                            params.row.shopName
                                        )
                                    );
                                }

                            }

                            return h("div", btnGroup);
                        }
                    }
                ],
                data1: [],
            }
        }
    }
</script>
<style scoped>
    .main {
        width: 100%;
    }

    .search {
        padding: 30px 20px 20px 20px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 20px
        /* box-shadow: 0 2px 4px 0 rgba(222, 223, 224, 0.5); */
    }

    .search-options {
        margin-right: 30px;
        margin-bottom: 10px;
        max-width: 500px;
        display: inline-block;
    }

    .search-options-input {
        width: 200px;
        display: inline-block;
    }

    .search-sub {
        margin-bottom: 10px;
        display: inline-block;
    }

    .content {
        padding: 10px 10px;
        background: #fff;
        border-radius: 4px;
    }

    .setting {
        font-family: PingFangSC-Medium;
        margin: 5px 0 15px 5px;
    }

    .blue {
        font-size: 14px;
        color: #218fff;
        text-align: center;
        line-height: 20px;
    }

    .btn {
        margin-left: 25px;
        width: 88px;
    }

    .page {
        margin-top: 30px;
        text-align: right;
    }
</style>
