import api from "@/libs/api.request";
const baseUrl = "/work-order/evaluate";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 评价信息
export const postEvaluateInfo = ({ orderNumber }) => {
  return post("/evaluate/evaluategetone", {
    orderNumber
  });
};
// 是否评价
export const getCheckEvaluate = ({ orderNumber, time }) => {
  return post("/evaluate/check", {
    orderNumber,
    time
  });
};
