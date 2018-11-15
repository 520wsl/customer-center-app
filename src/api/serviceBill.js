/*
 * @Author: xzx
 * @Date: 2018-11-13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-14 15:42:19
 * @explanatory:  api 调用
 */
import api from "@/libs/api.request";

export default {
  // 获取工单列表
  getWorkSheetList: (id) => {
    return api.post("/worksheet/list", {
      sixiId: id
    });
  },
  // 获取工单单条记录详情
  getDetail: (workSheetId) => {
    return api.post("/worksheet/detail", {
      workSheetId: workSheetId
    });
  },
  // 
  getTalknews: (workSheetId, pageNum = 1, pageSize = 20) => {
    return api.post("/work-order-service/talknews/list", {
      workSheetId,
      pageNum,
      pageSize
    });
  }
};