/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:22:23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-05 10:19:53
 * @explanatory: Routers Config   路由 路径 配置
 */
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
const Main1 = r =>
  require.ensure([], () => r(require("_c/template/main1")), "main"); //模板页 不带底部导航
export default [{
    path: "/demo/test01",
    name: "demoTest01",
    component: r =>
      require.ensure([], () => r(require("@/app/view/demo/test01")), "appDemo") //demo
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login-登录"
    },
    component: r =>
      require.ensure([], () => r(require("@/app/view/login/login")), "appLogin") //登录页面
  },
  {
    path: "/",
    redirect: {
      name: "personalServie"
    },
  },
  // {
  //   path: "/",
  //   name: "_home",
  //   redirect: {
  //     name: "home"
  //   },
  //   component: Main1,
  //   children: [{
  //     path: "home",
  //     name: "home",
  //     meta: {
  //       title: "首页"
  //     },
  //     component: r =>
  //       require.ensure(
  //         [],
  //         () => r(require("@/app/view/home/home")),
  //         "appLogin"
  //       ) //首页
  //   }]
  // },
  {
    path: "/contract",
    name: "_contract",
    redirect: {
      name: "contract"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "contract",
        meta: {
          title: "我的合同"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/contract/index")),
            "appLontract"
          )
      },
      {
        path: "info",
        name: "contractInfo",
        meta: {
          title: "合同详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/contract/info")),
            "appContract"
          )
      },
      {
        path: "pay",
        name: "contractPay",
        meta: {
          title: "支付"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/contract/pay")),
            "appContract"
          )
      },
      {
        path: "paySuccess",
        name: "contractPaySuccess",
        meta: {
          title: "支付成功"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/contract/paySuccess")),
            "appContract"
          )
      }
    ]
  },
  // {
  //   path: "/log",
  //   name: "_log",
  //   redirect: {
  //     name: "saleRecord"
  //   },
  //   component: Main1,
  //   children: [{
  //     path: "saleRecord",
  //     name: "saleRecord",
  //     meta: {
  //       title: "记录"
  //     },
  //     component: r =>
  //       require.ensure(
  //         [],
  //         () => r(require("@/app/view/log/saleRecord")),
  //         "appLog"
  //       )
  //   }]
  // },
  {
    path: "/message",
    name: "_message",
    redirect: {
      name: "message"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "message",
        meta: {
          title: "留言"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/message/index")),
            "message"
          )
      },
      {
        path: "messageInfo",
        name: "messageInfo",
        meta: {
          title: "提交成功"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/message/messageInfo")),
            "message"
          )
      },
      {
        path: "success",
        name: "messageSuccess",
        meta: {
          title: "留言提交成功"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/message/success")),
            "message"
          )
      },
      {
        path: "shopAdmin",
        name: "messageShopAdmin",
        meta: {
          title: "旺铺管理"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/message/shopAdmin")),
            "message"
          )
      }
    ]
  },
  {
    path: "/personal",
    name: "_personal",
    redirect: {
      name: "personal"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "personalServie",
        meta: {
          title: "我的服务"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/personal/index")),
            "appPersonal"
          )
      },
      {
        path: "company",
        name: "personalCompany",
        meta: {
          title: "我的公司"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/personal/company")),
            "appPersonal"
          )
      },
      {
        path: "passwordSearch",
        name: "passwordSearch",
        meta: {
          title: "店铺账号密码查询"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/personal/passwordSearch")),
            "appPersonal"
          )
      },
      {
        path: "passwordStore",
        name: "passwordStore",
        meta: {
          title: "店铺账号密码"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/personal/passwordStore")),
            "appPersonal"
          )
      }
    ]
  },
  {
    path: "/question",
    name: "_question",
    redirect: {
      name: "question"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "question",
        meta: {
          title: "常见问题"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/question/index")),
            "appQuestion"
          )
      },
      {
        path: "info",
        name: "questionInfo",
        meta: {
          title: "常见问题详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/question/info")),
            "appQuestion"
          )
      }
    ]
  },
  {
    path: "/wechatService",
    name: "_wechatService",
    redirect: {
      name: "wechatService"
    },
    component: Main1,
    children: [{
      path: "index",
      name: "wechatService",
      meta: {
        title: "喜小帮微信服务号"
      },
      component: r =>
        require.ensure(
          [],
          () => r(require("@/app/view/wechatService/index")),
          "wechatService"
        )
    }]
  },
  {
    path: "/serviceBill",
    name: "_serviceBill",
    redirect: {
      name: "serviceBill"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "serviceBill",
        meta: {
          title: "历史工单"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/index")),
            "appServiceBill"
          )
      },
      {
        path: "addbill",
        name: "addBill",
        meta: {
          title: "创建客服工单"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/addBill")),
            "customerService"
          )
      },
      {
        path: "editbill",
        name: "editBill",
        meta: {
          title: "修改客服工单"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/editBill")),
            "customerService"
          )
      },
      // customerService
      {
        path: "customerService",
        name: "customerService",
        meta: {
          title: "我的工单"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/customerService")),
            "customerService"
          )
      },
      {
        path: "info",
        name: "serviceBillInfo",
        meta: {
          title: "服务工单-详情记录"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/info")),
            "appServiceBill"
          )
      },
      {
        path: "preview",
        name: "serviceBillBreview",
        meta: {
          title: "服务工单-详情记录"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/preview")),
            "appServiceBill"
          )
      },
      // getPhone
      {
        path: "getPhone",
        name: "getPhone",
        meta: {
          title: "绑定手机号"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/getPhone")),
            "getPhone"
          )
      },
      // billGetPhone 工单采集手机号
      {
        path: "billGetPhone",
        name: "billGetPhone",
        meta: {
          title: "完善工单联系人"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/billGetPhone")),
            "billGetPhone"
          )
      },
      // 绑定成功
      {
        path: "bindSuccess",
        name: "bindSuccess",
        meta: {
          title: "绑定成功"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceBill/bindSuccess")),
            "bindSuccess"
          )
      }
    ]
  },
  {
    path: "/serviceEvaluation",
    name: "_serviceEvaluation",
    redirect: {
      name: "serviceEvaluation"
    },
    component: Main1,
    children: [{
        path: "index",
        name: "serviceEvaluation",
        meta: {
          title: "服务评价"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceEvaluation/index")),
            "appServiceEvaluation"
          )
      },
      {
        path: "feedback",
        name: "serviceEvaluationBreview",
        meta: {
          title: "服务评价反馈"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceEvaluation/feedback")),
            "appServiceEvaluation"
          )
      },
      {
        path: "info",
        name: "serviceEvaluationInfo",
        meta: {
          title: "服务评价详情"
        },
        component: r =>
          require.ensure(
            [],
            () => r(require("@/app/view/serviceEvaluation/info")),
            "appServiceEvaluation"
          )
      }
    ]
  }
];