<template>
    <div>
        <div class="evaluation">请你为{{typeName}}
            <span>{{name}}</span>，本次服务做个评价
        </div>
        <div v-if="list.length>0">
            <editEvaluation :list='list' :isEdit='true'></editEvaluation>
        </div>

        <div class="submit-btn">
            <mt-button class="btn" @click="addEvaluate" :disabled="disabled">提交</mt-button>
            <router-link class="btn2" :to="{name: 'serviceBillInfo',query:{ id: workSheetId, identity: 2, companySixiId: companyId }}">点击 查看工单&gt;&gt;</router-link>
        </div>
    </div>
</template>
<script>
import editEvaluation from "@/components/app/editEvaluation";
import { getCheckEvaluate } from "@/api/evaluate/evaluate";
import { postTemplateInfo } from "@/api/evaluate/template";
import { postEvaluateAdd } from "@/api/workOrder/worksheet";
import { MessageBox } from "mint-ui";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("Servicebill");
export default {
    data() {
        return {
            list: [],
            typeName: "",
            name: "",
            type: "",
            id: "",
            customerId: "",
            servicePersonnel: "",
            sendtime: "",
            workSheetId: "",
            disabled: true
        };
    },
    components: { editEvaluation },
    created() {
        let titleName = "";
        if (this.$route.query) {
            this.id = this.$route.query.templetId || 4; // 评价模板id
            this.type = this.$route.query.type || 0; // 人员类型
            this.customerId = this.$route.query.customerId || ""; // 人员id
            this.workSheetId = this.$route.query.workSheetId || ""; // 工单id
            this.name = this.$route.query.servicePersonnel || ""; // 服务人员
            this.count = this.$route.query.count || 1; // 用于校验是否已经评价参数之一
            this.companyId = this.$route.query.companyId || "";
            if (this.id == 1) {
                this.typeName = "美工";
                titleName = "美工";
            } else if (this.id == 2) {
                this.typeName = "运营";
                titleName = "运营";
            } else if (this.id == 3) {
                this.typeName = "旺旺";
                titleName = "旺旺";
            } else if (this.id == 4) {
                this.typeName = "本次工单服务人员";
                titleName = "工单";
            } else {
                this.typeName = "其他";
                titleName = "其他";
            }
        }
        this.$parent.$parent.setTitle(titleName + "服务评价");
        // 判断工单评价是否评价
        getCheckEvaluate({ orderNumber: this.workSheetId, time: this.count }).then(res => {
            if (res.status != 200) {
                return MessageBox("提示", res.msg);
            }
            if (res.data) {
                // 已评价
                this.$router.push({
                    name: "serviceEvaluationBreview",
                    query: {
                        customerId: this.customerId,
                        workSheetId: this.workSheetId
                    }
                });
            } else {
                // 未评价
                this.getList();
            }
        })
    },
    methods: {
        ...mapMutations(["changeEvaluateList"]),
        getList() {
            // alert(this.id);
            if (this.$store.state.Servicebill.evaluateList.length == 0) {
                postTemplateInfo({ id: this.id }).then(res => {
                    if (res.status != 200) {
                        return MessageBox("提示", res.msg);
                    }
                    let list = res.data[0].content;
                    list.forEach(item => {
                        if (
                            (item.type == "checkbox") ||
                            (item.type == "radio")
                        ) {
                            item.value = [];
                        }
                    });
                    this.disabled = false;
                    this.list = list;
                });
            } else {
                this.disabled = false;
                this.list = this.$store.state.Servicebill.evaluateList;
            }
        },
        addEvaluate() {
            let bool = false;
            let str = "请填写必填项";
            this.list.forEach(item => {
                if (item.isRequired == 1 && (item.value == "" || item.value == [])) {
                    bool = true;
                    str += " " + item.evaluateName;
                }
            });
            if (bool) {
                return MessageBox("提示", str);
            }
            MessageBox.confirm("确定提交评价?")
                .then(action => {
                    console.log(action, this.list);
                    this.disabled = true;
                    postEvaluateAdd({
                        orderNumber: this.workSheetId,
                        evaluateContent: JSON.stringify(this.list)
                    }).then(res => {
                        if (res.status != 200) {
                            return MessageBox("提示", res.msg);
                        }
                        // 提交成功后，清空存在store的数据
                        this.changeEvaluateList([]);
                        this.$router.push({
                            name: "serviceEvaluationBreview",
                            query: {
                                customerId: this.customerId,
                                workSheetId: this.workSheetId,
                                isClose: true
                            }
                        });
                    });
                })
                .catch(res => {
                    console.log(res);
                });
        }
    }
};
</script>
<style scoped>
.evaluation {
  height: 40px;
  line-height: 40px;
  padding: 40px 30px 30px;
  margin: 10px 0 20px;
  color: #444;
  font-size: 28px;
  background: #fff;
}
.evaluation span {
  color: #697eff;
}
.submit-btn {
  background: #fff;
  padding: 150px 100px;
  position: relative;
}
.submit-btn .btn2 {
  position: absolute;
  font-size: 32px;
  color: #697eff;
  right: 100px;
  bottom: 30px;
}
.submit-btn .btn {
  width: 100%;
  display: block;
  background: #697eff;
  border-radius: 2px;
  font-size: 32px;
  color: #ffffff;
}
html,
body,
#app {
  background: #f4f4f4;
  height: auto;
}
</style>
