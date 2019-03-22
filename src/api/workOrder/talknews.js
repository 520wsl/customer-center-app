import api from "@/libs/api.request";
const baseUrl = "/work-order-service";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 获取对话记录
export const getTalknews = ({
  workSheetId,
  pageNum,
  pageSize
}) => {
  return post("/talknews/list", {
    workSheetId,
    pageNum,
    pageSize
  });
}
/**
 * 发起信息采集
 * @param workOrderStatus 工单状态
 * @param userSixiId 人员sixiId 用于电话采集
 * @param workSheetId 工单id
 * @param eventType 事件类型 1：电话沟通 2：发起电话采集请求 3：发起账号密码采集请求
 * @param companySixiId 公司SIXIID 用于密码采集
 */
export const pickupInformation = (workOrderStatus, userSixiId, workSheetId, eventType, companySixiId) => {
  return post("/talknews/save", {
    workOrderStatus,
    userSixiId,
    workSheetId,
    eventType,
    companySixiId
  });
}