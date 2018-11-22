import api from "@/libs/api.request";
const baseUrl = "/evaluate";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 评价模板详情
export const postTemplateInfo = ({ id }) => {
  return post("/template/info", {
    id
  });
};
