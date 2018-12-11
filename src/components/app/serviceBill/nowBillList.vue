<template>
    <div>
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="billList.lenth != 0">
            <div class="now-bill-title" v-if="billList.length != 0"><img :src="$CDN('/service-sheet.png')"><span>在服工单</span></div>
            <!--此处改为整个div跳转-->
            <router-link :to="{ name: 'serviceBillInfo', query: { id: el.id,identity:2,companySixiId:companySixiId } }" tag="div" class="servicebill" v-for="(el,index) in billList" :key="index">
                <p class="BillId">
                    工单编号：
                    <span>{{el.identifier}}</span>
                </p>
                <ul class="item">
                    <li>我的公司：{{el.companyName}}</li>
                    <li>提交时间：{{getTime(el.startTime,'YYYY-MM-DD')}}</li>
                    <li>持续时间：{{el.durationStr}}</li>
                    <li>客服人员：{{el.userVo && el.userVo.userName}}</li>
                </ul>
                <p class="status">
                    <span>状态：{{handleType[el.type] || ''}}</span>
                    <router-link v-if="el.type == 3" :to="{ name: 'serviceEvaluationInfo', query: { workSheetId: el.id } }" tag="mt-button" class="btn">评价</router-link>
                </p>
            </router-link>
        </div>
    </div>
</template>
<script>
import { getCompanyWorkSheetList } from "@/api/workOrder/worksheet";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
export default {
    poros: ["companyiId"],
    data() {
        return {
            loading: false,
            billList: [],
            size: 10,
            count: Number,
            num: 1,
            isCarryOut: 0,
            companySixiId: this.companyiId
        }
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
            if ((this.count / this.size < this.num - 1) && !this.loading) return;
            this.loading = true;
            let param = {
                isCarryOut: this.isCarryOut,
                companySixiId: this.companySixiId,
                pageNum: this.num,
                pageSize: this.size
            };
            getCompanyWorkSheetList(param).then(e => {
                if (e.status !== 200) {
                    this.$messagebox("提示", "服务器繁忙，请稍后再试！");
                    return;
                }
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
}
</script>
<style  lang="less" scoped>
.top {
  margin-bottom: 10px;
}
.noData {
  font-size: 28px;
  color: #6e7790;
  padding: 30px;
}
.now-bill-title {
  font-size: 28px;
  height: 96px;
  line-height: 96px;
  color: #9b9b9b;
  display: flex;
  align-items: center;
}
.now-bill-title img {
  height: 28px;
}
.now-bill-title span {
  padding-left: 20px;
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
    color: #6e7790;
  }
  .BillId {
    font-size: 28px;
    padding-bottom: 20px;
    span {
      color: #6e7790;
    }
  }
  .item {
    border-top: 2px solid #f4f4f4;
    font-size: 28px;
    padding-top: 20px;
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
