import api from "@/libs/api.request";

const baseUrl = "/work-order";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 提交留言
export const sentMessageData = ({
  unionId,
  openId,
  context,
  type,
  workOrderType = 6
}) => {
  return post("/workorder/save", {
    unionId,
    openId,
    context,
    type,
    workOrderType
  });
};
