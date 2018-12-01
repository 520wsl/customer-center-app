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
  companyName
}) => {
  return post("/workorder/save", {
    workOrderType,
    mobile,
    companySixiId,
    companyName
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