import api from "@/libs/api.request";

export const postTemplateInfo = id => {
  return api.post("/template/info", {
    id
  });
};

export const postEvaluateeAdd = (sixiId, orderNumber) => {
  return api.post("/evaluate/add", {
    sixiId,
    orderNumber
  });
};

export const postEvaluateeInfo = (sixiId, orderNumber) => {
  return api.post("/evaluate/info", {
    sixiId,
    orderNumber
  });
};
