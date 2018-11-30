<template>
    <div>
        <div class="evaluation">请你为{{typeName}}
            <span>{{name}}</span>，本次服务做个评价</div>
        <editEvaluation :list='list' :isEdit='true'></editEvaluation>
        <div class="submit-btn">
            <mt-button class="btn" @click="addEvaluate">提交</mt-button>
        </div>
    </div>
</template>
<script>
import editEvaluation from "@/components/app/editEvaluation";
import {

    postEvaluateAdd,
    getCheckEvaluate
} from "@/api/evaluate/evaluate";
import {
    postTemplateInfo
} from "@/api/evaluate/template";
import { MessageBox } from "mint-ui";
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
            sendtime: ""
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
            this.sendtime = this.$route.query.sendtime || ""; // 用于校验是否已经评价参数之一
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
        getCheckEvaluate({ orderNumber: this.workSheetId, sendtime: this.sendtime }).then(res => {
            if (res.status != 200) {
                return MessageBox("提示", "服务器繁忙，请稍后再试！");
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
        });
    },
    methods: {
        getList() {
            // alert(this.id);
            postTemplateInfo({ id: this.id }).then(res => {
                // if (res.data) {
                //   return;
                // }
                let list = res.data[0].content;
                list.forEach(item => {
                    if (
                        (item.type == "checkbox") ||
                        (item.type == "redio")
                    ) {
                        item.value = [];
                    }
                });
                this.list = list;
            });
        },
        addEvaluate() {
            let bool = false;
            this.list.forEach(item => {
                if (item.isRequired == 1 && (item.value == "" || item.value == [])) {
                    bool = true;
                }
            });
            if (bool) {
                return MessageBox("提示", "请填写必填选项！");
            }
            MessageBox.confirm("确定提交评价?")
                .then(action => {
                    console.log(action, this.list);
                    postEvaluateAdd({
                        sixiId: this.customerId,
                        orderNumber: this.workSheetId,
                        evaluateContent: JSON.stringify(this.list),
                        sendtime: this.sendtime
                    }).then(res => {
                        if (res.status != 200) {
                            return MessageBox("提示", res.msg);
                        }
                        this.$router.push({
                            name: "serviceEvaluationBreview",
                            query: {
                                customerId: this.customerId,
                                workSheetId: this.workSheetId
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
}
.submit-btn .btn {
  width: 100%;
  display: block;
  background: #697eff;
  border-radius: 2px;
  font-size: 32px;
  color: #ffffff;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>
