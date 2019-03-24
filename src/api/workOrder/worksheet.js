import api from "@/libs/api.request";
const baseUrl = "/work-order-service";

function post(url, params) {
  return api.post(baseUrl + url, params);
}

function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 获取客服工单列表
export const getWorkSheetList = ({sixiId, pageNum, pageSize}) => {
  return post("/worksheet/list", {
    sixiId,
    pageNum,
    pageSize
  });
}
// 获取客户工单列表
export const getCompanyWorkSheetList = ({ isCarryOut, companySixiId, pageNum, pageSize, companyId}) => {
  return post("/worksheet/custom/list", {
    isCarryOut,
    companySixiId,
    pageNum,
    pageSize,
    companyId
  });
}
// 获取工单单条记录详情
export const getDetail = workSheetId => {
  return post("/worksheet/detail", {
    workSheetId: workSheetId
  });
}

// 工单确认/工单完结/已评价
export const confirm = (workSheetId, handleType) => {
  return post("/worksheet/confirm", {
    workSheetId,
    handleType
  });
}
// 新增工单评价
export const postEvaluateAdd = ({
        orderNumber,
        evaluateContent,
        isBad
    }) => {
    return post("/worksheet/evaluate/add", {
        orderNumber,
        evaluateContent,
        isBad
    });
};
// 工单撤销
export const revokeWorkorder = ({
    workOrderId,
    customerSixiId
}) => {
return post("/worksheet/undoworkorder", {
    workOrderId,
    customerSixiId
    });
};
// 设为当前工单
export const setCurrentWorkorder = ({
    workOrderId,
    customerSixiId
}) => {
return post("/workorder/defaultworkorder", {
    workOrderId,
    customerSixiId
    });
};
// 得到用户当前工单Id
export const getCurrentWorkorderId = ({
    customerSixiId
}) => {

return post("/worksheet/getdefaultworkorder", {
    customerSixiId
    });
};
// 工单详情  设置工单 受理 状态
// handleType  受理状态 0:待受理 1:已超时 2:工单确认 3:设为完结 4:已评价
// handlerMode  受理人员 0:客户（微信） 1:客服（企业微信）
export const setWorkSheetState = ({
    workSheetId,
    handleType,
    handlerMode = 0,
    customerSixiId
}) => {
    return post("/worksheet/confirm", {
        workSheetId,
        handleType,
        handlerMode,
        customerSixiId
    });
};