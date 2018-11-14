<template>
  <div>
    <!-- <sixiheader title="服务工单" class="top"></sixiheader> -->
    <div class="servicebill" v-for="el in list" :key="el.id">
      <!-- <h3>【后端文档没更新】</h3> -->
      <router-link :to="{ name: 'serviceBillInfo', query: { id: el.id } }" tag="h3">【后端文档没更新】</router-link>
      <p class="BillId">工单编号：
        <b>{{el.identifier}}</b>
      </p>
      <ul class="item">
        <!-- <li>工单创建时间：{{formatTime(el.startTime)}}</li> -->
        <li>工单创建时间：{{getTime(el.startTime,'YYYY-MM-DD')}}</li>
        <li>持续时间：{{el.hourSum}}</li>
        <li>客服人员：【后端文档没更新】</li>
      </ul>
      <p class="status">
        <span>状态：{{handleType[el.type] || ''}}</span>
        <!-- <mt-button class="btn">评价</mt-button> -->
        <router-link :to="{ name: 'serviceEvaluationInfo', query: { id: el.id } }" tag="mt-button" class="btn">评价</router-link>
      </p>
    </div>
  </div>
</template>
<script>
// 这里还剩下一些字段没有更新，需要补充，接口请求的id来源暂时也没有确定
// import sixiheader from "@/components/app/header.vue";
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
      list: {}
    };
  },
  mounted() {
    this.getWorkSheetList();
  },
  computed: {
    ...mapState({
      handleType: state => state.Servicebill.handleType
    })
  },
  methods: {
    getWorkSheetList() {
      servicebillApi.getWorkSheetList().then(e => {
        if (e.status !== 200) return;
        this.list = e.data;
      });
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
      margin-right: 52px;
      width: 136px;
      height: 52px;
    }
  }
}
</style>

