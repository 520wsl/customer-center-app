import api from "@/libs/api.request";
const baseUrl = "/evaluate";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 新增评价
export const postEvaluateAdd = ({sixiId, orderNumber, evaluateContent}) => {
  return post("/evaluate/add", {
    sixiId,
    orderNumber,
    evaluateContent
  });
};
// 评价信息
export const postEvaluateInfo = ({sixiId, orderNumber}) => {
  return post("/evaluate/evaluategetone", {
    sixiId,
    orderNumber
  });
};
// 是否评价
export const getCheckEvaluate = ({orderNumber}) => {
  return post("/evaluate/check", {
    orderNumber
  });
};
