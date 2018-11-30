<template>
    <div>
        <div class="success-body">
            <img :src="$CDN('/success_icon.png')">
            <span>感谢您的评价，您的信任是的对我们最大的<br>支持，我们将会再接再厉！</span>
        </div>
        <editEvaluation v-if="list.length !=0" :list='list' :isEdit='false'></editEvaluation>
    </div>
</template>
<script>
import editEvaluation from "@/components/app/editEvaluation";
import {
    postEvaluateInfo
} from "@/api/evaluate/evaluate";
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            list: [],
            sixiId: "",
            orderNumber: ""
        };
    },
    components: { editEvaluation },
    created() {
        this.$parent.$parent.setTitle("服务评价反馈");
        let sixiId = this.$route.query.customerId;
        let orderNumber = this.$route.query.workSheetId;
        postEvaluateInfo({ sixiId, orderNumber }).then(res => {
            console.log(res);
            if (res.status != 200) {
                return MessageBox("提示", "服务器繁忙，请稍后再试！");
            }
            this.list = res.data.evaluateContent || [];
        });
    },
    methods: {}
};
</script>
<style scoped>
.success-body {
  border-top: 10px solid #f4f4f4;
  padding: 0 100px 40px;
  background: #fff;
  margin-bottom: 10px;
}
.success-body img {
  display: block;
  width: 120px;
  margin: 52px auto;
}
.success-body span {
  display: block;
  font-size: 28px;
  color: #6e7790;
  text-align: center;
}
</style>
