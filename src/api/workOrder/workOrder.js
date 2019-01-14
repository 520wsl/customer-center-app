import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 创建工单
export const saveWorkOrder = ({
  workOrderType,
  mobile,
  companySixiId,
  companyName,
  remark,
  target
}) => {
  return post("/workorder/save", {
    workOrderType,
    mobile,
    companySixiId,
    companyName,
    sponsorType: 0,
    remark,
    target
  });
}
// 修改工单
export const updataWorkOrder = ({
  id,
  workOrderType,
  context,
  companySixiId,
  companyName
}) => {
  return post("/workorder/update", {
    id,
    workOrderType,
    context,
    companySixiId,
    companyName
  });
}

// 根据workSheetId修改工单手机号码
export const setmobileByworkSheetId = ({
  mobile,
  workSheetId
}) => {
  return post("/workorder/collectphone", {
    mobile,
    workSheetId
  })
}
// 催单
export const setUrgeorder = ({
    id
  }) => {
  return post("/workorder/urgeorder", {
    id
  });
}