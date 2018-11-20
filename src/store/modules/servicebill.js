/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 10:50:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-20 09:30:43
 * @explanatory:  store demo
 */
export default {
  namespaced: true,
  state: {
    // 工单状态 0:待处理 1:已超时 2:处理中 3:已完结 4:已评价
    handleType: ['待处理', '已超时', '处理中', '已完结', '已评价'],
    // 工单类型: 0：未知资源类型 2：（xk）找续开工单 3：（mg）找美工工单 4：（sdyy）找深度运营 5：（yy）找运营
    workType: ['', '', '续开工单', '美工工单', '深度运营工单', '运营工单'],
    billStatus: ['受理工单', '处理工单', '工单完结'],
    //视频播放状态
    videoPlayStatus: false
  },
  mutations: {
    // 关闭
    changevideoPlayStatus(state, isTrue) {
      state.videoPlayStatus = isTrue
    }
  },
  actions: {},
};