<template>
    <div class="now-bill-list">
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="billList.lenth != 0">
            <div class="now-bill-title" v-if="billList.length != 0"><img :src="$CDN('/service-sheet.png')">
                <span>在服工单</span>
            </div>
            <!--此处改为整个div跳转-->
            <router-link :to="{ name: 'serviceBillInfo', query: { id: item.id,identity:2,companySixiId:companySixiId } }" tag="div" class="case-item" v-for="(item,index) in billList" :key="index">
                <!-- <p class="BillId">
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
                    <h3>
                        <span v-if="item.isCurrent">当前工单</span>{{item.title}}</h3>
                    <div class="info">
                        <div @click.stop="changeDown(index)">
                            <img :src="$CDN('/case-company-icon.png')">
                            <span style="padding-right:40px;">公司名称：{{item.companyName}}</span>
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
                        <span class="evaluate-btn">
                            <mt-button type="default" class="btn" @click.stop="reminder(item.id)">催单</mt-button>
                            <mt-button type="default" class="btn" v-if="!item.isCurrent" @click.stop="setCurrent(item, index)">设为当前工单</mt-button>
                            <mt-button type="default" class="btn" v-if="item.type < 2" @click.stop="revoke(item)">撤销</mt-button>
                            <mt-button type="default" class="btn" v-if="item.type == 2" @click.stop="finishWorkorder(item.id)">完结</mt-button>
                        </span>
                    </div>
                </div>
                <div class="case-item-evaluate" :style="item.isDown?'padding-top:26px;':''">
                    <div class="case-item-detail" v-if="item.isDown">
                        <div class="detail-item">
                            持续时间：{{item.durationStr}}
                        </div>
                        <div class="detail-item">
                            客服人员：{{item.userVo && item.userVo.extattr ? item.userVo.extattr : item.userVo.userName}}
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
                </div>
                <div class="case-item-buttom">
                    <img :src="$CDN('/case-buttom.png')">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import { getCompanyWorkSheetList, revokeWorkorder, setCurrentWorkorder, getCurrentWorkorderId, setWorkSheetState } from "@/api/workOrder/worksheet";
import { setUrgeorder } from "@/api/workOrder/workOrder"
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
import { MessageBox } from "mint-ui";
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
    mounted() {
        console.log(this.$store.state.User.wxUserInfo.customerSixiId)
    },
    methods: {
        changeDown(index) {
            this.billList[index].isDown = !this.billList[index].isDown;
        },
        getWorkSheetList() {
            // 是否可以请求
            if ((this.count / this.size < this.num - 1) && !this.loading) return;
            this.loading = true;
            let params = {
                customerSixiId: this.$store.state.User.wxUserInfo.customerSixiId || ""
            }
            getCurrentWorkorderId(params).then(res => {
                let currentWorkorderId = res.data || '';
                this.getNowList(currentWorkorderId);
            }).catch(error => {
                let currentWorkorderId = '';
                this.getNowList(currentWorkorderId);
            })
        },
        getTime(time, norms) {
            return formatTime(time, norms);
        },
        loadMore() {
            this.getWorkSheetList();
        },
        getNowList(currentWorkorderId) {
            let param = {
                isCarryOut: this.isCarryOut,
                companySixiId: this.companySixiId,
                pageNum: this.num,
                pageSize: this.size,
                companyId: this.$store.state.User.wxUserInfo.companySixiId || ''
            };
            getCompanyWorkSheetList(param).then(e => {
                if (e.status !== 200) {
                    this.$messagebox("提示", e.msg);
                    return;
                }
                e.data.list.forEach(e => {
                    // console.log(e);
                    if (e.id == currentWorkorderId) {
                        e.isCurrent = true;
                    } else {
                        e.isCurrent = false;
                    }
                    e.isDown = false;
                    this.billList.push(e);
                });
                this.num = ++e.data.num;
                this.count = e.data.count;
                this.loading = false;
                console.log(this.num);
            });
        },
        // 工单撤回
        revoke(info) {
            MessageBox.confirm("确定撤销该工单?").then(action => {
                let params = {
                    workOrderId: info.id,
                    customerSixiId: this.$store.state.User.wxUserInfo.customerSixiId || ""
                }
                revokeWorkorder(params).then(res => {
                    this.num = 1;
                    this.billList = [];
                    // this.getWorkSheetList();
                }).catch(error => {
                    this.$messagebox("提醒", error.msg || error.message || "");
                })
                return;
            }).catch(action => {
            })
        },
        // 设置为当前工单
        setCurrent(info, num) {
            MessageBox.confirm("确定设置该工单为当前工单?").then(action => {
                let params = {
                    workOrderId: info.id,
                    customerSixiId: this.$store.state.User.wxUserInfo.customerSixiId || ""
                }
                setCurrentWorkorder(params).then(res => {
                    this.billList.forEach((item, index) => {
                        if (num == index) {
                            item.isCurrent = true;
                        } else {
                            item.isCurrent = false;
                        }

                    })
                    // this.num = 1;
                    // this.billList = [];
                    // this.getWorkSheetList();
                }).catch(error => {
                    this.$messagebox("提醒", error.msg || error.message || "");
                })
                return;
            }).catch(action => {
            })
        },
        // 催单
        reminder(id) {
            setUrgeorder({ id }).then(result => {
                this.$messagebox("提醒", result.msg);
            }).catch(error => {
                this.$messagebox("提醒", error.msg);
            })
        },
        // 客户完结工单
        finishWorkorder(id) {
            let params = {
                workSheetId: id,
                handleType: 3
            }
            setWorkSheetState(params).then(res => {
                this.num = 1;
                this.billList = [];
                // this.getWorkSheetList();
            }).catch(error => {
                this.$messagebox("提醒", error.msg);
            })
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
.now-bill-list {
  background: #f4f4f4;
}
.now-bill-title {
  font-size: 28px;
  height: 96px;
  line-height: 96px;
  color: #9b9b9b;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background: #fff;
}
.now-bill-title img {
  height: 28px;
}
.now-bill-title span {
  padding-left: 20px;
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
.case-item-header h3 span {
  padding: 5px 10px;
  background-image: linear-gradient(-90deg, #ff0066 0%, #697eff 100%);
  font-size: 20px;
  line-height: 28px;
  height: 28px;
  color: #fff;
  display: inline-block;
  margin-right: 10px;
  border-radius: 6px;
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
  top: 200px;
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
  padding: 0 19px 12px 0;
}
.evaluate-btn .btn {
  height: 52px;
  font-size: 26px;
  color: #666;
  margin-left: 25px;
}
</style>
