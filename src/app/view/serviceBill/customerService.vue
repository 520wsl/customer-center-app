<template>
  <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <span class="noData" v-if="billList.length<=0">暂无数据</span>
    <div class="servicebill" v-for="(el,index) in billList" :key="index">
      <router-link :to="{ name: 'serviceBillInfo', query: { id: el.id,identity:1,sixiId:sixiId } }" tag="h3">
        {{el.title}}
        <span>{{handleType[el.type] || ''}}</span>
      </router-link>
      <p class="BillId">工单编号：
        <b>{{el.identifier}}</b>
      </p>
      <ul class="item">
        <li>工单类型：{{workType[el.workType]}}</li>
        <li>工单创建时间：{{getTime(el.startTime,'YYYY-MM-DD')}}</li>
        <li>持续时间：{{el.hourSum}}h</li>
        <li>客服人员：{{el.userVo && el.userVo.userName}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
// 这里还剩下一些字段没有更新，需要补充，接口请求的id来源暂时也没有确定
import servicebillApi from "@/api/serviceBill";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
export default {
  components: {},
  created() {
    this.$parent.$parent.setTitle("我的工单");
  },
  data() {
    return {
      loading: false,
      size: 10,
      num: 1,
      count: Number,
      sixiId: this.$route.query.sixiId || "",
      billList: []
    };
  },
  mounted() {
    // this.getWorkSheetList();
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType,
      workType: state => state.Servicebill.workType
    })
  },
  methods: {
    getWorkSheetList() {
      // 是否可以请求
      if (this.count / this.size < this.num) return;
      this.loading = true;
      // 客服 SIXIID
      // let sixiId = this.$route.query.sixiId || "";
      servicebillApi
        .getWorkSheetList(this.sixiId, this.num, this.size)
        .then(e => {
          if (e.status !== 200) return;
          e.data.list.forEach(e => {
            this.billList.push(e);
          });
          this.num = ++e.data.num;
          this.count = e.data.count;
          this.loading = false;
          // console.log(this.num);
        });
    },
    loadMore() {
      this.getWorkSheetList();
    },
    getTime(time, norms) {
      return formatTime(time, norms);
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  margin-bottom: 10px;
}
.noData {
  font-size: 28px;
  color: #6e7790;
  padding: 30px;
}
.servicebill {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
  color: #6e7790;
  margin-bottom: 20px;
  h3 {
    font-size: 30px;
    margin: 10px 0;
    span {
      color: #697eff;
      font-weight: 100;
      float: right;
      margin-right: 30px;
    }
  }
  .BillId {
    font-size: 28px;
    margin-top: 20px;
    padding-bottom: 32px;
    margin-bottom: 20px;
    border-bottom: 2px solid #f4f4f4;
    b {
      color: #170000;
    }
  }
  .item {
    font-size: 28px;
    margin-bottom: 20px;
    overflow: hidden;
    li {
      padding-bottom: 20px;
    }
  }
}
</style>

