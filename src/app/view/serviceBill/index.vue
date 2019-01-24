<template>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="case-list">
        <no-data v-if="billList.length<=0 && bool" message="抱歉，您还未创建工单！"></no-data>
        <!--此处改为整个div跳转-->
        <router-link :to="{ name: 'serviceBillInfo', query: { id: item.id,identity:2,companySixiId:companySixiId } }" tag="div" class="case-item" v-for="(item,index) in billList" :key="index">
            <!-- <h3>{{workType[el.workType]}}</h3>
            <p class="BillId" @click.stop="getEventTar">
                工单编号：
                <span>{{el.identifier}}</span>
            </p>
            <ul class="item">
                <li>我的公司：{{el.companyName}}</li>
                <li>提交时间：{{getTime(el.startTime,'YYYY-MM-DD')}}</li>
                <li>持续时间：{{el.durationStr}}</li>
                <li>客服人员：{{el.userVo && el.userVo.extattr || el.userVo && el.userVo.userName}}</li>
            </ul>
            <p class="status">
                <span>状态：{{handleType[el.type] || ''}}</span>
                <router-link v-if="el.type == 3" :to="{ name: 'serviceEvaluationInfo', query: { workSheetId: el.id } }" tag="mt-button" class="btn">评价</router-link>
            </p> -->
            <div class="case-item-header">
                <h3>{{item.title}}</h3>
                <div class="info">
                    <div @click.stop="changeDown(index)">
                        <img :src="$CDN('/case-company-icon.png')">
                        <span>公司名称：{{item.companyName}}</span>
                    </div>
                    <div>
                        <img :src="$CDN('/case-time-icon.png')">
                        <span>提交时间：{{getTime(item.startTime,'YYYY-MM-DD')}}</span>
                    </div>
                    <div>
                        <img :src="$CDN('/case-responsetime-icon.png')">
                        <span>响应时间：{{item.responseStr}}</span>
                    </div>
                    <div>
                        <img :src="$CDN('/case-number-icon.png')">
                        <span>工单编号：{{item.identifier}}</span>
                    </div>
                    <div @click.stop="changeDown(index)" :class="item.isDown?'arrow down':'arrow up'">
                        <span class="mint-button-icon">
                            <i class="mintui mintui-back"></i>
                        </span>
                    </div>
                    <div class="info-handleType" v-if="item.type != 3">
                        {{handleType[item.type]}}
                    </div>
                    <span v-if="item.type == 3" class="evaluate-btn">
                        <mt-button type="default" class="btn" @click.stop="toEvaluate(item)">评价</mt-button>
                    </span>
                </div>
            </div>
            <div class="case-item-evaluate" :style="item.isDown?'padding-top:26px;':''">
                <div class="case-item-detail" v-if="item.isDown">
                    <div class="detail-item">
                        持续时间：{{item.durationStr}}
                    </div>
                    <div class="detail-item">
                        客服人员：{{item.executorName}}
                    </div>
                    <div class="detail-item">
                        <!-- eslint-disable-next-line -->
                        发起人　：{{item.wechatNickname}}
                    </div>
                    <div class="detail-item">
                        工单联系电话：{{item.mobile}}
                    </div>
                </div>
                <!-- <div class="evaluate-status">
                        状态:{{workType[item.workType]}}
                    </div> -->
                <!-- <evaluateList v-if="item.evaluateContent && item.evaluateContent.length !=0" :list='item.evaluateContent'></evaluateList> -->
                <evaluateList v-if="item.evaluateInfoVo && item.evaluateInfoVo.evaluateContent && item.evaluateInfoVo.evaluateContent.length !=0" :list='item.evaluateInfoVo.evaluateContent'></evaluateList>
            </div>
            <div class="case-item-buttom">
                <img :src="$CDN('/case-buttom.png')">
            </div>
        </router-link>
    </div>
</template>
<script>
import { getCompanyWorkSheetList } from "@/api/workOrder/worksheet";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
import noData from "@/components/app/public/noData";
import evaluateList from "@/components/app/caseEvaluate/evaluateList";
export default {
    components: {
        /* eslint-disable */
        noData,
        evaluateList
        /* eslint-disable */
    },
    created() {
        // this.$parent.$parent.setTitle("历史工单");
    },
    data() {
        return {
            bool: false,
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
            if ((this.count / this.size < this.num - 1) && !this.loading) return;
            this.loading = true;
            let param = {
                companySixiId: this.companySixiId,
                pageNum: this.num,
                pageSize: this.size,
                // 已完成工单状态
                isCarryOut: 1,
                companyId: this.$store.state.User.wxUserInfo.companySixiId || ''
            };
            getCompanyWorkSheetList(param).then(e => {
                if (e.status !== 200) {
                    this.$messagebox("提示", "服务器繁忙，请稍后再试！");
                    return;
                }
                e.data.list.forEach(e => {
                    // console.log(e);
                    e.executorName = e.userVo && e.userVo.extattr ? e.userVo.extattr : e.userVo.userName || ""
                    e.isDown = false;
                    this.billList.push(e);
                });
                if (this.billList.length == 0) {
                    this.bool = true;
                } else {
                    this.bool = false;
                }
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
        },
        changeDown(index) {
            this.billList[index].isDown = !this.billList[index].isDown;
        },
        // 跳转评价页面
        toEvaluate(info) {
            let query = {
                type: info.workType,
                customerId: '',
                workSheetId: info.id,
                servicePersonnel: info.userVo.extattr ? info.userVo.extattr : info.userVo.userName
            }
            this.$router.push({
                name: 'serviceEvaluationInfo',
                query
            })
        }
    }
};
</script>
<style scoped>
.top {
  margin-bottom: 10px;
}
.noData {
  font-size: 28px;
  color: #6e7790;
  padding: 30px;
}
.case-list {
  padding-top: 10px;
}
.case-item {
  margin: 14px 22px 20px;
}
.case-item-header {
  padding: 24px 0 0 0;
  margin-bottom: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 4px 0 #cdcdcd;
}
.case-item-header h3 {
  padding: 0 30px 0 30px;
  margin: 0 0 20px 0;
  font-size: 28px;
  color: #444;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.case-item-header .info {
  border-top: 2px solid #f4f4f4;
  font-size: 26px;
  color: #6e7790;
  padding: 30px 30px 0;
  position: relative;
}
.case-item-header .info .arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 50px;
  top: 28px;
}
.case-item-header .info .info-handleType {
  position: absolute;
  right: 50px;
  bottom: 0;
  font-size: 24px;
  color: #6e7790;
  margin-bottom: 0;
}
.case-item-header .info div {
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
}
.case-item-header .info img {
  width: 30px;
  height: 30px;
  margin-right: 16px;
}
.case-item-detail {
  margin: 0 44px;
  padding: 14px 62px 0;
  background: #f3f3f3;
  border-radius: 6px;
}
.case-item-detail .detail-item {
  font-size: 26px;
  color: #6e7790;
  padding-bottom: 16px;
}
.case-item-evaluate {
  background: #fff;
  box-shadow: 0 2px 4px 0 #cdcdcd;
}
.case-item-buttom {
  width: 100%;
  position: relative;
  top: -3px;
  height: 68px;
}
.case-item-buttom img {
  display: block;
  width: 735px;
  left: -14px;
  position: absolute;
}
.case-item-evaluate .evaluate-status {
  height: 40px;
  padding: 0 30px;
  line-height: 40px;
  font-size: 28px;
  color: #6e7790;
  padding-bottom: 32px;
}
.down {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -moz-transform: rotate(90deg); /* Firefox */
  -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
  -o-transform: rotate(90deg); /* Opera */
}
.up {
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg); /* IE 9 */
  -moz-transform: rotate(-90deg); /* Firefox */
  -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
  -o-transform: rotate(-90deg); /* Opera */
}
.evaluate-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 52px 6px;
}
.evaluate-btn .btn {
  height: 52px;
  font-size: 26px;
  color: #666;
  margin-left: 20px;
}
</style>

