<template>
  <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <span class="noData" v-if="billList.length<=0">暂无数据</span>
    <div class="servicebill" v-for="(el,index) in billList" :key="index">
      <router-link :to="{ name: 'serviceBillInfo', query: { id: el.id,identity:2,companySixiId:companySixiId } }" tag="h3">{{workType[el.workType]}}</router-link>
      <p class="BillId">工单编号{{num}}：
        <b>{{el.identifier}}</b>
      </p>
      <ul class="item">
        <li>工单创建时间：{{getTime(el.startTime,'YYYY-MM-DD')}}</li>
        <li>持续时间：{{el.hourSum}}h</li>
        <li>客服人员：{{el.userVo && el.userVo.userName}}</li>
      </ul>
      <p class="status">
        <span>状态：{{handleType[el.type] || ''}}</span>
        <router-link :to="{ name: 'serviceEvaluationInfo', query: { id: el.id } }" tag="mt-button" class="btn">评价</router-link>
      </p>
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
    this.$parent.$parent.setTitle("服务工单");
  },
  data() {
    return {
      loading: false,
      billList: [],
      size: 10,
      count: Number,
      num: 1,
      companySixiId: this.$route.query.companySixiId || ""
      // sixiId: ""
    };
  },
  mounted() {
    // （滚动条底部事件）存在请求两次的情况，暂时去除mounted触发
    // this.getWorkSheetList();
    // if (this.$route.query) {
    //   this.sixiId = this.$route.query.sixiId || "";
    // }
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
      // 客户 companySixiId
      // let companySixiId = this.$route.query.companySixiId || "";
      servicebillApi
        .getCompanyWorkSheetList(this.companySixiId, this.num, this.size)
        .then(e => {
          if (e.status !== 200) return;
          e.data.list.forEach(e => {
            // console.log(e);
            this.billList.push(e);
          });
          this.num = ++e.data.num;
          this.count = e.data.count;
          this.loading = false;
          console.log(this.num);
        });
    },
    getTime(time, norms) {
      return formatTime(time, norms);
    },
    loadMore() {
      this.getWorkSheetList();
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
  }
  .BillId {
    font-size: 28px;
    padding-bottom: 52px;
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
  .status {
    display: flex;
    overflow: hidden;
    height: 100px;
    font-size: 28px;
    border-top: 1px solid #f4f4f4;
    align-items: center;
    span {
      flex: 1;
    }
    .btn {
      font-size: 28px;
      margin-right: 52px;
      width: 136px;
      height: 52px;
    }
  }
}
</style>

