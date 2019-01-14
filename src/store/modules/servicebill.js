/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 10:50:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-07 10:30:08
 * @explanatory:  store demo
 */
import {
    selectCompanyAndMobile
} from "@/api/customer/customer";

export default {
    namespaced: true,
    state: {
        // 工单状态 0:待处理 1:已超时 2:处理中 3:待评价 4:已评价
        handleType: ['待处理', '待处理', '处理中', '待评价', '已评价'],
        // 工单类型: 0：未知资源类型 2：（xk）找续开工单 3：（mg）找美工工单 4：（sdyy）找深度运营 5：（yy）找运营
        workType: ['', '', '续开工单', '美工工单', '深度运营工单', '运营工单','','','','建议','投诉'],
        billStatus: ['受理工单', '处理工单', '工单完结'],
        workSheetType: [

            {
                key: 5,
                value: "运营问题"
            },
            {
                key: 3,
                value: "店铺美化问题"
            },
            {
                key: 2,
                value: "续费问题"
            },
            {
                key: 7,
                value: "其他"
            }
        ],
        // 发起事件类型
        eventType: ['普通消息', '电话沟通', '发起电话采集', '发起账号密码采集', "其他类型", "工单动态"],
        companyAndMobile: {},
        //视频播放状态
        videoPlayStatus: false,
        // 评价详情未提交保存数据
        evaluateList: []
    },
    mutations: {
        // 关闭
        changevideoPlayStatus(state, isTrue) {
            state.videoPlayStatus = isTrue
        },
        selectCAM(state, value) {
            state.companyAndMobile = value;
        },
        changeEvaluateList(state, value) {
            state.evaluateList = value;
        }
    },
    actions: {
        async selectCompanyAndMobile({
                                         commit,
                                         state
                                     }) {
            const res = await selectCompanyAndMobile();
            if (res.status == 200) {
                const {
                    companys,
                    mobile
                } = res.data;
                if (companys.length > 0 && mobile > 0) {
                    // 公司手机号都存在
                    commit('selectCAM', {
                        status: 1,
                        companys,
                        mobile,
                        msg: '公司手机号都存在'
                    });
                }
                if (companys.length > 0 && mobile <= 0) {
                    // 公司存在手机不存在
                    commit('selectCAM', {
                        status: 2,
                        companys,
                        mobile,
                        msg: '公司存在,手机不存在'
                    });
                }
                if (companys.length <= 0 && mobile > 0) {
                    // 公司不存在手机存在
                    commit('selectCAM', {
                        status: 3,
                        companys,
                        mobile,
                        msg: '公司不存在,手机存在'
                    });
                }
                if (companys.length <= 0 && mobile <= 0) {
                    // 公司不存在手机不存在存在
                    commit('selectCAM', {
                        status: 4,
                        companys,
                        mobile,
                        msg: '公司不存在,手机不存在'
                    });
                }
            } else {
                // 数据请求有问题
                commit('selectCAM', {
                    status: -1,
                    companys: [],
                    mobile: '',
                    msg: '数据有问题'
                });
            }
        }
    },
};