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
// 1、<a href="weixin://contacts/profile/微信号原始ID（如：gh_dd4b2c2ada8b）">Baidufe</a>
// 这种方法能直接打开该号的微信资料页，直接关注；但获取原始ID比较麻烦。

// 2、<a href="weixin://contacts/profile/微信号（如：www_baidufe_com）">Baidufe</a>
// 这种方法会打开“加入到通讯录”的界面，然后再是资料页
import servicebillApi from "@/api/serviceBill";
export default {
  props: ["type"],
  data() {
    return {
      // 工单状态 0:待处理 1:已超时 2:处理中 3:已完结 4:已评价
      list: [
        // 待处理
        [
          {
            title: "工单确认",
            callBackFun: () => {
              let workSheetId = this.$route.query.id;
              // 确认工单接口
              servicebillApi.confirm(workSheetId, 2).then(e => {
                if (e.status !== 200) {
                  console.log("失败");
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
        // 已超时
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
                  console.log("跳转至小程序");
                }
              },
              {
                title: "账号密码",
                callBackFun: () => {
                  console.log("跳转至小程序");
                }
              }
            ]
          },
          {
            title: "设为完结",
            callBackFun: () => {
              let workSheetId = this.$route.query.id;
              // 确认工单接口
              servicebillApi.confirm(workSheetId, 3).then(e => {
                if (e.status !== 200) {
                  console.log("失败");
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
        // 已完结
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
                name: "serviceEvaluationInfo",
                query: { id, sixiId }
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
      console.log("执行回调");
      callBackFun();
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

