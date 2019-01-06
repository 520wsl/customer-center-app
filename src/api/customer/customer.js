import api from "@/libs/api.request";
const baseUrl = "/work-order/customer";
const noWorkOrderBaseUrl = "/customer";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function noWorkOrderPost(url, params) {
    return api.post(noWorkOrderBaseUrl + url, params);
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
// 根据customerSixiId获取我的公司列表
export const getCompanyList = () => {
  return post("/company/mycompanylist", {});
}
// 切换我的公司
export const changeMyCompany = ({
  companySixiId
}) => {
  return post("/customer/switchcompany", {
    companySixiId
  });
}
// 根据companySixiId,customerSixiId修改手机号码
export const setmobilebysixiid = (customerSixiId, companySixiId, mobile) => {
  return post("/customer/setmobilebysixiid", {
    customerSixiId,
    companySixiId,
    mobile
  });
}

export const selectCompanyAndMobile = () => {
  return post("/customer/selectcompanyandmobile", {});
}
export const getCompanyListBoss = () => {
  return post("/company/mycompanylisttoboss", {});
}
export const addUser = ({
  account,
  password,
  captcha,
  workSheetId
}) => {
  return post("/secretstore/add", {
    account,
    password,
    captcha,
    workSheetId,
    type: "wangwang"
  });
}
export const updateUser = ({
  account,
  password,
  captcha,
  workSheetId
}) => {
  return post("/secretstore/update", {
    account,
    password,
    captcha,
    workSheetId,
    type: "wangwang"
  });
}
export const getUserDetail = ({
  account
}) => {
  return noWorkOrderPost("/secretstore/detail", {
    account,
    type: "wangwang"
  });
}

// 微信 获取 微信用户信息
export const getUserInfoData = () => {
  return post("/customer/getcustomerinfo");
};
export const sendInfo = ({
  account,
  password,
  mobile
}) => {
  return post("/customer/send", {
    account,
    password,
    mobile
  })
}