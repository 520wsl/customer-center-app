<template>
    <div>
        <div style="padding:0 30px;">
            <section class="search">
                <div class="search-options">店铺：
                    <Select class="search-options-input" v-model="params.companysixiid">
                        <Option v-for="item in companyList" :key="item.sixiId" :value="item.sixiId">{{item.name}}
                        </Option>
                    </Select>
                </div>
                <div class="search-options">查询方式：
                    <Select class="search-options-input" v-model="params.billtype">
                        <Option :value="0">销量</Option>
                        <Option :value="1">综合</Option>

                    </Select>
                </div>
                <div class="search-sub">
                    <Button @click="getResultListData()" type="primary" ghost icon="ios-search">查排名</Button>
                </div>
            </section>
            <div class="content">
                <Table :columns="columns1" :data="data1"></Table>
            </div>
            <Modal v-model="historyModal" footer-hide title="历史排名" width="500" :mask-closable="false"
                   @on-cancel="hiddenHistoryModel">
                <Card>
                    <div slot="title">关键词：{{paramsHistory.keyWord}} 排名目标：{{paramsHistory.target}}</div>
                    <div slot="extra">
                        <DatePicker @on-change="sleectTemplateList(1)" v-model="paramsHistory.date" size="small"
                                    type="month" placeholder="年-月"
                                    style="width: 200px"></DatePicker>
                    </div>
                    <div class="content">
                        <Table :columns="columns2" :data="data2"></Table>
                        <div class="page">
                            <page
                                    :pageNum="paramsHistory.pageNum"
                                    :pageSize="paramsHistory.pageSize"
                                    :count="paramsHistory.count"
                                    @pageCurrentChange="pageCurrentChange"
                                    @pageSizeChange="pageSizeChange"
                            ></page>
                        </div>
                    </div>
                </Card>

            </Modal>
        </div>
    </div>

</template>

<script>
    import {formatInitTime} from "@/libs/util/time";
    import {getCompanyList} from "@/api/customer/customer";
    import {getResultList, getResultInfo} from "@/api/checkRank/checkRank";

    export default {
        created() {
            this.$parent.$parent.setTitle("查排名");
        },
        mounted() {
            this.getUserInfo()
            this.getCompanyList();

        },
        methods: {
            // 查询数据 分页页码重置
            sleectTemplateList(pageNum) {
                this.paramsHistory.pageNum = pageNum;
                this.getResultInfoData();
            },
            // 设置分页页码
            pageCurrentChange(pageNum) {
                this.sleectTemplateList(pageNum);
            },
            // 设置分页大小
            pageSizeChange(pageSize) {
                this.paramsHistory.pageSize = pageSize;
                this.sleectTemplateList(1);
            },
            getResultInfoData() {
                this.paramsHistory.date = formatInitTime(this.paramsHistory.date, 'YYYY-MM')
                getResultInfo(this.paramsHistory).then((res) => {
                    if (res.status != 200) {
                        return MessageBox("历史排名", res.msg);
                    }
                    this.data2 = res.data.list || []
                    this.paramsHistory.count = res.data.count || 0
                })
            },
            getResultListData() {
                getResultList(this.params).then((res) => {
                    if (res.status != 200) {
                        return MessageBox("查排名列表", res.msg);
                    }
                    this.data1 = res.data || []
                })
            },
            getUserInfo() {
                this.userInfo = this.$store.state.User.wxUserInfo || ""
                this.params.companysixiid = this.$store.state.User.wxUserInfo.companySixiId || ""
            },
            async getCompanyList() {
                let res = await getCompanyList();
                if (res.status != 200) {
                    return MessageBox("提示", res.msg);
                }
                this.companyList = res.data || [];
                if (res.data[0]) {
                    this.params.companysixiid = res.data[0]['sixiId'] || ''
                }
                this.getResultListData()
            },
            hiddenHistoryModel() {
                this.historyModal = false
                this.paramsHistory.date = formatInitTime(new Date(), 'YYYY-MM')
                this.paramsHistory.target = ''
                this.paramsHistory.targetNum = 0
                this.paramsHistory.targetIndex = 0
                this.paramsHistory.keyWord = ''
                this.paramsHistory.id = ''
                this.paramsHistory.pageNum = 10
                this.paramsHistory.pageSize = 1
                this.data2 = []
            },
            showHistoryModel(params) {
                this.historyModal = true
                this.paramsHistory.date = formatInitTime(new Date(), 'YYYY-MM')

                if (params.targetNum > 0 && params.targetIndex > 0) {
                    this.paramsHistory.target = "第" + params.targetNum + "页 第" + params.targetIndex + "名"
                    this.paramsHistory.targetNum = params.targetNum || 0
                    this.paramsHistory.targetIndex = params.targetIndex || 0
                } else {
                    this.paramsHistory.target = ''
                    this.paramsHistory.targetNum = 0
                    this.paramsHistory.targetIndex = 0
                }
                this.paramsHistory.keyWord = params.keyWord || ''
                this.paramsHistory.id = params.id

                this.getResultInfoData()
            }
        },
        data() {
            return {
                historyModal: false,
                params: {
                    companysixiid: '',
                    billtype: 0
                },
                paramsHistory: {
                    date: '',
                    id: '',
                    keyWord: '',
                    targetNum: '',
                    targetIndex: '',
                    target: '',
                    pageSize: 15,
                    pageNum: 1,
                    count: 0
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
                        title: '排名目标',
                        render: (h, params) => {
                            let btnGroup = [];
                            let str = ''
                            if (params.row.targetNum > 0 && params.row.targetIndex > 0) {
                                str = "第" + params.row.targetNum + "页 第" + params.row.targetIndex + "名"
                            }
                            btnGroup.push(
                                h(
                                    "span",
                                    {},
                                    str
                                )
                            );
                            return h("div", btnGroup);
                        }
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
                                if (params.row.targetNum > 0 && params.row.targetIndex > 0) {
                                    style = 'color:#FD656B;'
                                    let isPageNum = params.row.targetNum >= params.row.pageNum
                                    let isTargetIndex = params.row.targetIndex >= params.row.pageIndex
                                    let props = h(
                                        "Icon",
                                        {
                                            props: {type: 'md-alert', size: '18'},
                                            style: {
                                                color: '#ff9900',
                                                margin: '0 5px'
                                            },

                                        }
                                    )


                                    if (isPageNum && isTargetIndex) {
                                        style = 'color:#59BC7E;'
                                        props =
                                            h(
                                                "Icon",
                                                {
                                                    props: {type: 'md-checkmark-circle', size: '18'},
                                                    style: {
                                                        color: '#19be6b',
                                                        margin: '0 5px'
                                                    },

                                                }
                                            )
                                    }
                                    btnGroup.push(
                                        props
                                    );
                                }
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
                        title: '查询时间',
                        render: (h, params) => {
                            const format = "YYYY-MM-DD HH:mm:ss";
                            const ele = params.row.selectDate
                                ? formatInitTime(params.row.selectDate, format)
                                : "";
                            return h("span", ele);
                        }
                    },
                    {
                        align: 'center',
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        style: 'margin:5px;color:#218FFF',
                                        props: {size: 'small'},
                                        on: {
                                            click: () => {
                                                this.showHistoryModel(params.row)
                                            }
                                        }
                                    },
                                    '历史排名'
                                )
                            ])
                        }
                    }
                ],
                columns2: [
                    {
                        align: 'center',
                        title: '查询时间',
                        render: (h, params) => {
                            const format = "YYYY-MM-DD HH:mm:ss";
                            const ele = params.row.selectDate
                                ? formatInitTime(params.row.selectDate, format)
                                : "";
                            return h("span", ele);
                        }
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
                                if (this.paramsHistory.targetNum > 0 && this.paramsHistory.targetIndex > 0) {
                                    style = 'color:#FD656B;'
                                    let isPageNum = this.paramsHistory.targetNum >= params.row.pageNum
                                    let isTargetIndex = this.paramsHistory.targetIndex >= params.row.pageIndex
                                    let props = h(
                                        "Icon",
                                        {
                                            props: {type: 'md-alert', size: '18'},
                                            style: {
                                                color: '#ff9900',
                                                margin: '0 5px'
                                            },

                                        }
                                    )


                                    if (isPageNum && isTargetIndex) {
                                        style = 'color:#59BC7E;'
                                        props =
                                            h(
                                                "Icon",
                                                {
                                                    props: {type: 'md-checkmark-circle', size: '18'},
                                                    style: {
                                                        color: '#19be6b',
                                                        margin: '0 5px'
                                                    },

                                                }
                                            )
                                    }
                                    btnGroup.push(
                                        props
                                    );
                                }
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
                    }
                ],
                data1: [],
                data2: []
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
