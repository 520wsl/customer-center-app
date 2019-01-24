<template>
    <div>
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" :infinite-scroll-distance="10" class="case-list">
            <div class="case-item" v-for="(item,index) in list" :key="index">
                <div class="case-item-header">
                    <h3>{{item.title}}</h3>
                    <div class="info">
                        <div @click="changeDown(index)">
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
                        <div @click="changeDown(index)" :class="item.isDown?'arrow down':'arrow up'">
                            <span class="mint-button-icon">
                                <i class="mintui mintui-back"></i>
                            </span>
                        </div>
                        <div class="info-handleType">
                            {{handleType[item.handleType]}}
                        </div>
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
                            发起人　：{{item.userName}}
                        </div>
                        <div class="detail-item">
                            工单联系电话：{{item.mobile}}
                        </div>
                    </div>
                    <!-- <div class="evaluate-status">
                        状态:{{workType[item.workType]}}
                    </div> -->
                    <!-- <editEvaluation v-if="item.evaluateContent && item.evaluateContent.length !=0" :list='item.evaluateContent' :isEdit='false'></editEvaluation> -->
                    <evaluateList v-if="item.evaluateContent && item.evaluateContent.length !=0" :list='item.evaluateContent'></evaluateList>
                </div>
                <div class="case-item-buttom">
                    <img :src="$CDN('/case-buttom.png')">
                </div>
            </div>
        </div>
        <no-data v-if="list.length == 0 && isSearch" message="抱歉，目前暂无案例访问权限，请联系客服！"></no-data>
    </div>

</template>
<script>
import { getShareWorkList } from "@/api/casebase/case";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
import evaluateList from "@/components/app/caseEvaluate/evaluateList";
import noData from "@/components/app/public/noData";
export default {
    data() {
        return {
            loading: false,
            pageSize: 5,
            count: 0,
            pageNum: 0,
            list: [],
            isSearch: false
        }
    },
    computed: {
        ...mapState({
            workType: state => state.Servicebill.workType,
            handleType: state => state.Servicebill.handleType
        })
    },
    components: {
        evaluateList,
        /* eslint-disable */
        noData
        /* eslint-disable */
    },
    methods: {
        getTime(time, norms) {
            return formatTime(time, norms);
        },
        changeDown(index) {
            this.list[index].isDown = !this.list[index].isDown;
        },
        strSlice(str, startIndex = 0, endIndex = 0, num = 1) {
            if (str) {
                let starStr = "";
                for (let i = 0; i < num; i++) {
                    starStr += "*"
                }
                if (str.length == 2) {
                    return str.slice(0, startIndex) + starStr
                }
                return str.slice(0, startIndex) + starStr + str.slice(endIndex - str.length + 1)
            } else {
                return ""
            }
        },
        getList() {
            this.loading = true;
            this.pageNum = this.pageNum + 1;
            let params = {
                shareKey: this.$route.query.shareKey || '',
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }
            getShareWorkList(params).then(res => {
                if (res.status !== 200) {
                    this.$messagebox("提示", "服务器繁忙，请稍后再试！");
                    return;
                }
                this.isSearch = true;
                res.data.list.forEach(item => {
                    if (this.list.length == this.count && this.count != 0) {
                        this.loading = false;
                        return;
                    }
                    item.handleType = item.type || 4;
                    item.isDown = false;
                    item.identifier = this.strSlice(item.identifier, 2, 4, 3);
                    item.companyName = this.strSlice(item.companyName, 2, item.companyName.length - 6, 3);
                    item.mobile = this.strSlice(item.mobile, 3, 6, 4);
                    item.executorName = this.strSlice(item.executorName, 1, 1, 1);
                    item.userName = this.strSlice(item.userName, 1, 1, 1);
                    item.evaluateContent = item.evaluateContent || [];
                    this.list.push(item);
                });
                this.count = res.data.count || 0;
                this.loading = false;
            })
        },
        loadMore() {
            // 判断是否可以查询 
            if (this.count <= this.list.length && !this.loading && this.isSearch) {
                return;
            }
            if (Math.ceil(this.count / this.pageSize) < this.pageNum + 1 && this.isSearch) {
                return;
            }
            this.getList();

        }
    }
}
</script>
<style scoped>
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
  top: -2px;
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
</style>
