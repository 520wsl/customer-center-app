import api from "@/libs/api.request";
const baseUrl = "/work-order/message";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 获取验证码
export const getcode = (phone) => {
  return post("/sms/sendcode", {
    phone
  });
}
// 验证码是否正确
export const validatecode = (phone, verifyCode) => {
  return post("/sms/validatecode", {
    phone,
    verifyCode
  });
}