import api from "@/libs/api.request";

// 提交留言
export const sentMessageData = (
  unionId,
  openId,
  context,
  type,
  workOrderType = 6
) => {
  return api.post("/workorder/save", {
    unionId,
    openId,
    context,
    type,
    workOrderType
  });
};
