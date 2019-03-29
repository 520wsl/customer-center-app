import Vue from "vue";
import App from "@/app/App.vue";
import router from "@/app/router";
import store from "@/store";
import "@/libs/flexible";
import config from "@/config";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import "@/assets/style/common.less";
import "@/assets/style/appBase.css";
import iView from "iview";
import "iview/dist/styles/iview.css";
import {
  CDN,
  FILE
} from "@/libs/tools";
Vue.use(Mint);
Vue.use(iView);

Vue.prototype.$CDN = CDN;
Vue.prototype.$FILE = FILE;
Vue.config.productionTip = false;
Vue.prototype.$config = config;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");