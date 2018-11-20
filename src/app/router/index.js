/*
 * @Author: Mad Dragon 395548460@qq.com 
 * @Date: 2018-11-07 22:19:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-16 15:37:59
 * @explanatory:  路由 配置
 */
import Vue from "vue";
import Router from "vue-router";
import routes from "@/app/router/routers";

Vue.use(Router);
const router = new Router({
  // base:"/",
  routes,
  mode: "history"
});
// 全局守卫
router.beforeEach((to, from, next) => {
  // console.log("router.beforeEach:from=>", from);
  // console.log("router.beforeEach:to=>", to);
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next();
});
// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // console.log("router.beforeResolve:from=>", from);
  // console.log("router.beforeResolve:to=>", to);
  next();
});
// 全局后置钩子
// eslint-disable-next-line
router.afterEach(to => {
  // console.log("router.afterEach:to=>", to);
  window.scrollTo(0, 0);
});

export default router;