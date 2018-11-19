import api from "@/libs/api.request";
const baseUrl = "/evaluate-service";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

export const postTemplateInfo = id => {
  return post("/template/info", {
    id
  });
};

export const postEvaluateAdd = (sixiId, orderNumber, evaluateContent) => {
  return post("/evaluate/add", {
    sixiId,
    orderNumber,
    evaluateContent
  });
};

export const postEvaluateInfo = (sixiId, orderNumber) => {
  return post("/evaluate/info", {
    sixiId,
    orderNumber
  });
};
