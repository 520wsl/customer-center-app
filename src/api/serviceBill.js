/*
 * @Author: xzx
 * @Date: 2018-11-13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-17 12:28:11
 * @explanatory:  api 调用
 */
import api from "@/libs/api.request";

const baseUrl = "/work-order-service";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

export default {
  // 获取工单列表
  getWorkSheetList: (id, pageNum = 1, pageSize = 20) => {
    return post("/worksheet/list", {
      sixiId: id,
      pageNum,
      pageSize
    });
  },
  // 获取工单单条记录详情
  getDetail: workSheetId => {
    return post("/worksheet/detail", {
      workSheetId: workSheetId
    });
  },
  // 获取对话记录
  getTalknews: (workSheetId, pageNum = 1, pageSize = 20) => {
    return post("/talknews/list", {
      workSheetId,
      pageNum,
      pageSize
    });
  },
  // 工单确认/工单完结/已评价
  confirm: (workSheetId, handleType) => {
    return api.post("/work-order-service/worksheet/confirm", {
      workSheetId,
      handleType
    });
  }
};
