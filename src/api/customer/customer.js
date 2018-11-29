import api from "@/libs/api.request";
const baseUrl = "/customer";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 根据customerSixiId获取客户信息
export const getcustomerbysixiid = (customerSixiId) => {
  return post("/customer/getcustomerbysixiid", {
    customerSixiId
  });
}
// 根据customerSixiId修改手机号码
export const setmobilebysixiid = (customerSixiId, mobile) => {
  return post("/customer/setmobilebysixiid", {
    customerSixiId,
    mobile
  });
}
export const selectCompanyAndMobile = () => {
  return post("/customer/selectcompanyandmobile", {});
}
export const getCompanyListBoss = () => {
  return post("/company/mycompanylisttoboss", {
    customerSixiId: "1182862037307360255"
  });
}