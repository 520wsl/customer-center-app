/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-08 09:15:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-14 09:18:01
 * @explanatory:  # 我们组装模块并导出 store 的地方
 */
import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import Servicebill from "./modules/servicebill";
// import createLogger from "vuex/dist/logger";

import User from "./modules/user";
Vue.use(Vuex);
// 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
const debug = process.env.NODE_ENV !== "production";

const Store = new Vuex.Store({
  modules: {
    User,
    Servicebill
  },
  // plugins: debug ? [createLogger()] : [],
  strict: debug,
  actions,
  mutations
});

export default Store;