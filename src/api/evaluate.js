import api from "@/libs/api.request";

export const postEvaluateTemplatedetails = params => {
  return api.post("/evaluate/templatedetails", {
    ...params
  });
};
