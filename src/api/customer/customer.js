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
// 根据customerSixiId获取我的公司列表
export const getCompanyList = ({customerSixiId}) => {
    return post("/company/mycompanylist", {
        customerSixiId
    });
}
// 切换我的公司
export const changeMyCompany = ({companySixiId}) => {
    return post("/customer/switchcompany", {
        companySixiId
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
  return post("/company/mycompanylisttoboss", {});
}
export const addUser = ({
  account,
  password
}) => {
  return post("/secretstore/add", {
    account,
    password,
    type: "wangwang"
  });
}
export const updateUser = ({
  account,
  password
}) => {
  return post("/secretstore/update", {
    account,
    password,
    type: "wangwang"
  });
}
export const getUserDetail = ({
  account
}) => {
  return post("/secretstore/detail", {
    account,
    type: "wangwang"
  });
}

// 微信 获取 微信用户信息
export const getUserInfoData = () => {
	return post("/customer/getcustomerinfo");
};
