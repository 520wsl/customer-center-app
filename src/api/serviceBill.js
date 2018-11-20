/*
 * @Author: xzx
 * @Date: 2018-11-13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-19 14:23:43
 * @explanatory:  api 调用
 */
import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}

export default {
  // 获取客服工单列表
  getWorkSheetList: (sixiId, pageNum = 1, pageSize = 20) => {
    return post("/worksheet/list", {
      sixiId: sixiId,
      pageNum,
      pageSize
    });
  },
  // 获取客户工单列表
  getCompanyWorkSheetList: (companySixiId, pageNum = 1, pageSize = 20) => {
    return post("/worksheet/list", {
      companySixiId: companySixiId,
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
    return post("/worksheet/confirm", {
      workSheetId,
      handleType
    });
  }
};