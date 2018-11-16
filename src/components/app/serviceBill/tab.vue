<template>
  <div class="tabBox">
    <div class="unit" v-for="(el,index) in tabList" :key="index" @click="showHiddenList(index,el.routeName)">
      <template v-if="el.click === true">
        {{el.title}}
        <ul class="list">
          <li v-for="el2 in el.list" :key="el2.title" @click="routerTo(el2.routeName)">{{el2.title}}</li>
        </ul>
      </template>
      <template v-else>{{el.title}}</template>
    </div>
  </div>
</template>
<script>
// handleTypeBODY
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
            routeName: ""
          },
          {
            title: "我的工单",
            routeName: "customerService"
          }
        ],
        // 已超时
        [],
        // 处理中
        [
          {
            title: "采集信息",
            routeName: "",
            click: false,
            list: [
              { title: "账号密码账号密码", routeName: "" },
              { title: "账号密码", routeName: "" }
            ]
          },
          {
            title: "设为完结",
            routeName: ""
          },
          {
            title: "我的工单",
            routeName: "customerService"
          }
        ],
        // 已完结
        [
          {
            title: "我的工单",
            routeName: "customerService"
          }
        ],
        // 已评价
        [
          {
            title: "查看评价",
            routeName: ""
          },
          {
            title: "我的工单",
            routeName: "customerService"
          }
        ]
      ],
      tabList: []
    };
  },
  mounted() {
    // 根据类型设置菜单
    this.tabList = this.list[this.type];
  },
  methods: {
    showHiddenList(index, name) {
      // 若没有二级菜单，直接跳转路由
      if (!this.tabList[index].hasOwnProperty("click")) {
        if (!name) return;
        this.routerTo(name);
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
    routerTo(name) {
      console.log(11);
      this.$router.push({ name: name });
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

