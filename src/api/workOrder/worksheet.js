import api from "@/libs/api.request";
const baseUrl = "/work-order";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 获取客服工单列表
export const getWorkSheetList = ({sixiId, pageNum, pageSize}) => {
  return post("/worksheet/list", {
    sixiId,
    pageNum,
    pageSize
  });
}
// 获取客户工单列表
export const getCompanyWorkSheetList = ({companySixiId, pageNum , pageSize}) => {
  return post("/worksheet/list", {
    companySixiId,
    pageNum,
    pageSize
  });
}
// 获取工单单条记录详情
export const getDetail = workSheetId => {
  return post("/worksheet/detail", {
    workSheetId: workSheetId
  });
}

// 工单确认/工单完结/已评价
export const confirm = (workSheetId, handleType) => {
  return post("/worksheet/confirm", {
    workSheetId,
    handleType
  });
}