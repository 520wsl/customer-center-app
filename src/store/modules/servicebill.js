/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 10:50:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-13 19:42:58
 * @explanatory:  store demo
 */
export default {
  namespaced: true,
  state: {
    // 工单状态 0:待处理 1:已超时 2:处理中 3:已完结 4:已评价
    handleType: ['待处理', '已超时', '处理中', '已完结', '已评价'],
    // 工单类型 1,店铺美化 2,运营效果3,续费问题 4,小程序问题 5,产品问题, 6,其他
    workType: ['', '店铺美化', '运营效果', '续费问题', '小程序问题', '产品问题', '其他'],
    billStatus: ['受理工单', '处理工单', '工单完结']
  },
  mutations: {},
  actions: {}
};