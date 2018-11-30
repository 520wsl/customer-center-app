import api from "@/libs/api.request";
const baseUrl = "/wechat-proxy-service";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 微信  获取 微信 jsapi SDK config 配置
export const getWxJSSDKConfig = ({ url }) => {
	return get("/wx/wxJSSDKConfig", { url });
};

// 微信 code 登录
export const getWxSnsapiUserInfoData = ({ code }) => {
	return get("/wx/snsapi/userinfo", { code });
};

// 微信 获取 微信用户信息
export const getUserInfoData = ({ code }) => {
	return get("/wx/snsapi/userinfo", { code });
};
