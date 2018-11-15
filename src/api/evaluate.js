import api from "@/libs/api.request";

export const postTemplateInfo = id => {
  return api.post("/template/info", {
    id
  });
};

export const postEvaluateAdd = (sixiId, orderNumber, evaluateContent) => {
  return api.post("/evaluate/add", {
    sixiId,
    orderNumber,
    evaluateContent
  });
};

export const postEvaluateInfo = (sixiId, orderNumber) => {
  return api.post("/evaluate/info", {
    sixiId,
    orderNumber
  });
};
