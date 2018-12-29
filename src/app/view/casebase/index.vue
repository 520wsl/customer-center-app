<template>
    <div>
        <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="case-list">
            <div class="case-item" v-for="(item,index) in list" :key="index">
                <div class="case-item-header">
                    <h3>{{item.title}}</h3>
                    <div class="info" @click="changeDown(index)">
                        <div>
                            <img :src="$CDN('/case-company-icon.png')">
                            <span>公司名称：{{item.companyName}}</span>
                        </div>
                        <div>
                            <img :src="$CDN('/case-time-icon.png')">
                            <span>提交时间：{{getTime(item.startTime,'YYYY-MM-DD')}}</span>
                        </div>
                        <div>
                            <img :src="$CDN('/case-number-icon.png')">
                            <span>工单编号：{{item.identifier}}</span>
                        </div>
                        <div :class="item.isDown?'arrow down':'arrow up'">
                            <span class="mint-button-icon">
                                <i class="mintui mintui-back"></i>.
                            </span>
                        </div>
                    </div>
                </div>
                <div class="case-item-detail" v-if="item.isDown">
                    <div class="detail-item">
                        响应时间：{{item.responseStr}}
                    </div>
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
                <div class="case-item-evaluate">
                    <div class="evaluate-status">
                        状态:{{workType[item.workType]}}
                    </div>
                    <editEvaluation v-if="item.evaluateContent && item.evaluateContent.length !=0" :list='item.evaluateContent' :isEdit='false'></editEvaluation>
                </div>
            </div>
        </div>
        <no-data v-if="list.length<=0 && isSearch" message="抱歉，目前暂无案例访问权限，请联系客服！"></no-data>
    </div>

</template>
<script>
import { getShareWorkList } from "@/api/casebase/case";
import { formatTime } from "@/libs/util/time";
import { mapState } from "vuex";
import editEvaluation from "@/components/app/editEvaluation";
import noData from "@/components/app/public/noData";
export default {
    data() {
        return {
            loading: false,
            pageSize: 5,
            count: 0,
            pageNum: 1,
            list: [],
            isSearch: false
        }
    },
    computed: {
        ...mapState({
            workType: state => state.Servicebill.workType
        })
    },
    components: {
        editEvaluation,
        noData
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
                return str.slice(0, startIndex) + starStr + str.slice(endIndex - str.length + 1)
            } else {
                return ""
            }
        },
        getList() {
            // 判断是否可以查询
            if ((this.count / this.pageSize < this.pageNum - 1) && !this.loading) return;
            this.loading = true;
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
                if (this.pageNum == 1 && res.data && res.data.list && res.data.list.length == 0) {
                    return this.isSearch = true;
                }
                res.data.list.forEach(item => {
                    item.isDown = false;
                    item.identifier = this.strSlice(item.identifier, 2, 4, 3);
                    item.companyName = this.strSlice(item.companyName, 2, 4, 3);
                    item.mobile = this.strSlice(item.mobile, 3, 6, 4);
                    item.executorName = this.strSlice(item.executorName, 1, 1, 1);
                    item.userName = this.strSlice(item.userName, 1, 1, 1);
                    if (item.evaluateContent[0]) {
                        item.evaluateContent = item.evaluateContent || [];
                    } else {
                        item.evaluateContent = JSON.parse(item.evaluateContent) || [];
                    }
                    this.list.push(item);
                });
                this.count = res.data.count || 0;
                this.pageNum = res.data.num + 1;
                this.loading = false;
            })
        },
        loadMore() {
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
  margin-bottom: 20px;
}
.case-item-header {
  padding: 30px 0 0 30px;
  background: #fff;
  margin-bottom: 2px;
}
.case-item-header h3 {
  padding: 0 30px 0 0;
  margin: 0 0 26px 0;
  font-size: 30px;
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
  padding: 30px 30px 30px 0;
  position: relative;
}
.case-item-header .info .arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 50px;
  bottom: 28px;
}
.case-item-header .info div {
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.case-item-header .info img {
  width: 30px;
  height: 30px;
  margin-right: 16px;
}
.case-item-detail {
  background: #fff;
  padding: 30px 30px 0;
}
.case-item-detail .detail-item {
  font-size: 26px;
  color: #6e7790;
  padding-bottom: 30px;
}
.case-item-evaluate {
  padding: 30px;
  background: #fff;
  margin-top: 2px;
}
.case-item-evaluate .evaluate-status {
  height: 40px;
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
