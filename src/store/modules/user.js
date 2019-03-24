/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-08 10:50:44
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-12-11 16:52:18
 * @explanatory:  store demo
 */
import {getWxSnsapiUserInfoData, logout} from "@/api/wechatProxy/wxSDK";
import {getUserInfoData} from "@/api/customer/customer";
import {ssoCode, ssoSixiIdLogin} from "@/api/user/sso";
import {setStore, getStore} from "@/libs/util/storeage";
import config from "@/config";

const {storeagewxUserInfoKey} = config;
export default {
    namespaced: true,
    state: {
        userName: "Mad Dragon",
        wxUserInfo: {
            companyName: "",
            mobile: "",
            wechatAvatar: "",
            role: 1
        },
        isShowNav: false,
        storeagewxUserInfoKey: storeagewxUserInfoKey,
        avatorImgPath: "http://1.img.dianjiangla.com/assets/user.png"
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name;
        },
        setIsShowNav(state, isShowNav) {
            setStore('isShowNav', isShowNav);
            state.isShowNav = isShowNav;
        },
        setUserInfo(state, wxUserInfo) {
            setStore(state.storeagewxUserInfoKey, wxUserInfo);
            state.wxUserInfo = wxUserInfo;
        },
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath;
        }
    },
    actions: {
        // 退出登录
        handleLogOut({state, commit}) {
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
        async getUserInfoAction({dispatch, state, commit}) {
            let isShowNav = JSON.parse(getStore('isShowNav'));
            if (isShowNav) {
                commit('setIsShowNav', isShowNav)
            }

            let userInfo = JSON.parse(getStore(state.storeagewxUserInfoKey));
            console.log("getUserInfoAction", userInfo);
            if (userInfo) {
                commit("setAvator", userInfo.wechatAvatar);
                commit("setUserInfo", userInfo);
                return true;
            }
            return false;
            // alert("未登录或登陆超时,请退出重新登陆!");
            // await dispatch("getUserInfo");
        },
        // 获取用户相关信息
        async getUserInfo({state, commit}) {
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
        setUser({commit}) {
            commit("setUserName", {a: 1, b: 2});
        },
        async loginScheduler(
            {dispatch, state, commit},
            {codeData, stateData, clientId, pathname}
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
                            return false;
                        }
                        // 测试 使用 勿删 Mad Dragon 395548460@qq.com
                        // setTimeout(() => {
                        // 	dispatch('getUserInfo');
                        // 	console.log("await dispatch('getUserInfo')");
                        //   }, 12000);
                        commit("setIsShowNav", false);
                        return await dispatch("getUserInfo");
                    case "sso":
                        res = await ssoCode({code: codeData, clientId, pathname});
                        console.log('sso', res)
                        res2 = await dispatch("getUserInfo");
                        if (!res2) {
                            console.error("[debug]:getUserInfo", res2);
                            return false;
                        }
                        commit("setIsShowNav", false);
                        return true;
                    case "electron":
                        res = await ssoSixiIdLogin({sixiId: codeData});
                        console.log('electron', res)
                        res2 = await dispatch("getUserInfo");

                        if (!res2) {
                            console.error("[debug]:getUserInfo", res2);
                            return false;
                        }
                        commit("setIsShowNav", true);
                        return true;
                }
            }
        }
    }
};
