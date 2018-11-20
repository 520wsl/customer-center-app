/*
 * @Author: xzx
 * @Date: 2018-11-13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-20 21:14:58
 * @explanatory:  api 调用
 */
import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function primordialPost(url, params) {
  return api.post(url, params);
}


function get(url, params) {
  return api.get(baseUrl + url, params);
}

export default {
  // 获取客服工单列表
  getWorkSheetList: (sixiId, pageNum = 1, pageSize = 20) => {
    return post("/worksheet/list", {
      sixiId: sixiId,
      pageNum,
      pageSize
    });
  },
  // 获取客户工单列表
  getCompanyWorkSheetList: (companySixiId, pageNum = 1, pageSize = 20) => {
    return post("/worksheet/list", {
      companySixiId: companySixiId,
      pageNum,
      pageSize
    });
  },
  // 获取工单单条记录详情
  getDetail: workSheetId => {
    return post("/worksheet/detail", {
      workSheetId: workSheetId
    });
  },
  // 获取对话记录
  getTalknews: (workSheetId, pageNum = 1, pageSize = 20) => {
    return post("/talknews/list", {
      workSheetId,
      pageNum,
      pageSize
    });
  },
  // 工单确认/工单完结/已评价
  confirm: (workSheetId, handleType) => {
    return post("/worksheet/confirm", {
      workSheetId,
      handleType
    });
  },
  // 信息采集
  /**
   * @param workOrderStatus 工单状态
   * @param userSixiId 人员sixiId
   * @param workSheetId 工单id
   * @param eventType 事件类型 1：电话沟通 2：发起电话采集请求 3：发起账号密码采集请求
   */
  pickupInformation: (workOrderStatus, userSixiId, workSheetId, eventType, companySixiId) => {
    return post("/talknews/save", {
      workOrderStatus,
      userSixiId,
      workSheetId,
      eventType,
      companySixiId
    });
  },
  // 根据customerSixiId获取客户信息
  getcustomerbysixiid: (customerSixiId) => {
    return primordialPost("/customer/customer/getcustomerbysixiid", {
      customerSixiId
    });
  },
  // 根据customerSixiId修改手机号码
  setmobilebysixiid: (customerSixiId, mobile) => {
    return primordialPost("/customer/customer/setmobilebysixiid", {
      customerSixiId,
      mobile
    });
  },
  // 获取验证码
  getcode: (phone) => {
    return primordialPost("/message-service/sms/sendcode", {
      phone
    });
  },
  // 验证是否正确
  validatecode: (phone, verifyCode) => {
    return primordialPost("/message-service/sms/validatecode", {
      phone,
      verifyCode
    });
  }
};