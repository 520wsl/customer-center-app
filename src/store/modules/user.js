/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-29 22:00:05
 * @explanatory:  store demo
 */
import { getWxSnsapiUserInfoData } from "@/api/wechatProxy/wxSDK";
export default {
	namespaced: true,
	state: {
		userName: "Mad Dragon"
	},
	mutations: {
		setUserName(state, name) {
			state.userName = name;
		}
	},
	actions: {
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
						console.log("res", res);
						break;
				}
			}
		}
	}
};
