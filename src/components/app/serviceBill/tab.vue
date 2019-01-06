<template>
  <div class="tabBox">
    <div class="unit" v-for="(el,index) in tabList" :key="index" @click="showHiddenList(index,el.callBackFun)" :style="el.icon?iconStyle:''">
      <template v-if="el.click === true">
        {{el.title}}
        <ul class="list">
          <li v-for="el2 in el.list" :key="el2.title" @click="fun(el2.callBackFun)">{{el2.title}}</li>
        </ul>
      </template>
      <template v-else>{{el.title}}</template>
    </div>
  </div>
</template>
<script>
// 执行人id = 客服sixi id 才可以操作，可见此页面

import { confirm } from "@/api/workOrder/worksheet";
import { pickupInformation } from "@/api/workOrder/talknews";
export default {
  props: ["type", "companySixiId"],
  data() {
    return {
      // 工单状态 0:待处理 1:已超时（待处理） 2:处理中 3:待评价 4:已评价
      list: [
        // 待处理
        [
          {
            title: "工单确认",
            callBackFun: () => {
              let workSheetId = this.$route.query.id;
              // 确认工单接口
              confirm(workSheetId, 2).then(e => {
                if (e.status !== 200) {
                  return;
                }
                this.$router.go();
              });
            }
          },
          {
            title: "我的工单",
            callBackFun: () => {
              let sixiId = this.$route.query.sixiId || "",
                identity = this.$route.query.identity,
                routeName = identity == 1 ? "customerService" : "serviceBill"; // identity 身份 1客服 2客户
              this.$router.push({ name: routeName, query: { sixiId } });
            }
          }
        ],
        // 已超时（待处理）
        [],
        // 处理中
        [
          {
            title: "采集信息",
            click: false,
            icon: "/footer.png",
            list: [
              {
                title: "电话号码",
                callBackFun: () => {
                  let userSixiId = this.$route.query.sixiId || "";
                  let workSheetId = this.$route.query.id || "";
                  let workOrderStatus = this.type;
                  let companySixiId = this.companySixiId;
                  let eventType = 2;
                  pickupInformation(
                    workOrderStatus,
                    userSixiId,
                    workSheetId,
                    eventType,
                    companySixiId
                  ).then(e => {
                    if (e.status !== 200) {
                      this.$messagebox("提示", e.msg);
                    }
                    this.$messagebox("提示", e.msg);
                  });
                }
              },
              {
                title: "账号密码",
                callBackFun: () => {
                  let userSixiId = this.$route.query.sixiId || "";
                  let workSheetId = this.$route.query.id || "";
                  let workOrderStatus = this.type;
                  let companySixiId = this.companySixiId;
                  let eventType = 3;
                  pickupInformation(
                    workOrderStatus,
                    userSixiId,
                    workSheetId,
                    eventType,
                    companySixiId
                  ).then(e => {
                    if (e.status !== 200) {
                      this.$messagebox("提示", e.msg);
                    }
                    this.$messagebox("提示", e.msg);
                  });
                }
              }
            ]
          },
          {
            title: "设为完结",
            callBackFun: () => {
              let workSheetId = this.$route.query.id;
              // 确认工单接口
              confirm(workSheetId, 3).then(e => {
                if (e.status !== 200) {
                  return;
                }
                this.$router.go();
              });
            }
          },
          {
            title: "我的工单",
            callBackFun: () => {
              let sixiId = this.$route.query.sixiId || "",
                identity = this.$route.query.identity,
                routeName = identity == 1 ? "customerService" : "serviceBill"; // identity 身份 1客服 2客户
              this.$router.push({ name: routeName, query: { sixiId } });
            }
          }
        ],
        // 待评价
        [
          {
            title: "我的工单",
            callBackFun: () => {
              let sixiId = this.$route.query.sixiId || "",
                identity = this.$route.query.identity,
                routeName = identity == 1 ? "customerService" : "serviceBill"; // identity 身份 1客服 2客户
              this.$router.push({ name: routeName, query: { sixiId } });
            }
          }
        ],
        // 已评价
        [
          {
            title: "查看评价",
            callBackFun: () => {
              let sixiId = this.$route.query.sixiId || "",
                id = this.$route.query.id;
              this.$router.push({
                name: "serviceEvaluationBreview",
                query: { orderNumber: id, sixiId }
              });
            }
          },
          {
            title: "我的工单",
            callBackFun: () => {
              let sixiId = this.$route.query.sixiId || "",
                identity = this.$route.query.identity,
                routeName = identity == 1 ? "customerService" : "serviceBill"; // identity 身份 1客服 2客户
              this.$router.push({ name: routeName, query: { sixiId } });
            }
          }
        ]
      ],
      tabList: [],
      iconStyle: {
        background: "url(" + this.$CDN("/footer.png") + ") no-repeat",
        "background-position": "0.285rem 0.089rem",
        "background-size": "0.03733rem 0.03733rem"
      }
    };
  },
  mounted() {
    // 根据类型设置菜单
    this.tabList = this.list[this.type];
  },
  methods: {
    showHiddenList(index, callBackFun) {
      // 若没有二级菜单，直接触发回调
      if (!this.tabList[index].hasOwnProperty("click")) {
        // if (!name) return;
        // this.routerTo(name);,
        callBackFun();
        return;
      }
      // 关闭其他二级菜单
      this.tabList.forEach(e => {
        if (e.hasOwnProperty("cilck")) {
          e.click = false;
        }
      });
      // 打开当前点击的二级菜单
      this.tabList[index].click = !this.tabList[index].click;
    },
    fun(callBackFun) {
      return callBackFun();
    }
  },
  watch: {
    type() {
      this.tabList = this.list[this.type];
    }
  }
};
</script>

<style lang="less" scoped>
.tabBox {
  display: flex;
  align-items: center;
  height: 100px;
  background: #fff;
  color: #2b3854;
  border-top: 1px solid #ccc;
  font-size: 28px;
  .unit {
    flex: 1;
    height: 100px;
    line-height: 100px;
    position: relative;
    text-align: center;
    border-left: 1px solid #ccc;
    .list {
      position: absolute;
      text-align: center;
      bottom: 120px;
      left: 20px;
      background: #fff;
      z-index: 99;
      word-break: keep-all;
      box-sizing: border-box;
      box-shadow: 1px 1px 10px 1px #ccc;
      li {
        border-bottom: #f4f4f4 solid 1px;
        color: #6e7790;
        height: 80px;
        line-height: 80px;
        padding: 0 20px;
      }
      li:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
  .unit:nth-child(1) {
    border-left: none;
  }
}
</style>

