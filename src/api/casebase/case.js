import api from "@/libs/api.request";
const baseUrl = "/work-order";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 分享链接跳转案例工单详情
export const getShareWorkList = ({ pageNum, pageSize, shareKey }) => {
  return post("/case/share/work", {
    pageNum,
    pageSize,
    shareKey
  });
};
