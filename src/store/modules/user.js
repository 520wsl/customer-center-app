/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-30 13:33:57
 * @explanatory:  store demo
 */
import {
	getWxSnsapiUserInfoData,
	getUserInfoData
} from "@/api/wechatProxy/wxSDK";
import { setItem, getItem, logout } from "@/libs/util/session";
import config from "@/config";
const { storeagewxUserInfoKey } = config;
export default {
	namespaced: true,
	state: {
		userName: "Mad Dragon",
		wxUserInfo: {
			companyName: "广东兆亨物流设备有限公司",
			mobile: "12345678912",
			wechatAvatar: "wechatAvatar",
			role: 1
		},
		storeagewxUserInfoKey: storeagewxUserInfoKey,
		avatorImgPath: "http://1.img.dianjiangla.com/assets/user.png"
	},
	mutations: {
		setUserName(state, name) {
			state.userName = name;
		},
		setUserInfo(state, wxUserInfo) {
			setItem(state.storeagewxUserInfoKey, wxUserInfo);
			state.wxUserInfo = wxUserInfo;
		},
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath;
		}
	},
	actions: {
		// 退出登录
		handleLogOut({ state, commit }) {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						commit("setUserInfo", "");
						resolve();
					})
					.catch(err => {
						reject(err);
					});
				//   如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
				// commit("setToken", "");
				// commit("setAccess", []);
				// resolve();
			});
		},
		// 获取用户相关信息
		async getUserInfo({ state, commit }) {
			let res = await getUserInfoData();
			if (!res.status) {
				console.error("[debug]:getUserInfoData", res);
				return false;
			}
			const data = res.data;
			console.log("getUserInfoData", res.data);

			commit("setAvator", data.wechatAvatar);
			commit("setUserInfo", data);
			return true;
		},
		setUser({ commit }) {
			commit("setUserName", { a: 1, b: 2 });
		},
		async loginScheduler(
			{ dispatch, state, commit },
			{ codeData, stateData }
		) {
			console.log("【debug】loginScheduler ** codeData：", codeData);
			console.log("【debug】loginScheduler ** stateData：", stateData);

			let res = "";
			let res2 = "";
			if (codeData) {
				switch (stateData) {
					case "enterpriseWeChat":
						break;
					case "weChat":
						res = await getWxSnsapiUserInfoData({
							code: codeData
						});
						if (res.status !== 200) {
							console.error(
								"[debug]:getWxSnsapiUserInfoData",
								res
							);
							alert("code登录", res.msg);
							return false;
						}

						return await dispatch("getUserInfo");
				}
			}
		}
	}
};
