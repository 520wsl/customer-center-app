<template>
    <div>
        <div class="success-body">
            <img :src="$CDN('/success_icon.png')">
            <span>感谢您的评价，您的信任是的对我们最大的<br>支持，我们将会再接再厉！</span>
        </div>
        <editEvaluation v-if="list.length !=0" :list='list' :isEdit='false'></editEvaluation>
        <div class="timer" v-if="showTime">
            <span>{{timer}}</span>
            <span style="color: #929eaa;">秒后关闭页面</span>
        </div>
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
            showTime: false,
            timer: 3,
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
        let isClose = this.$route.query.isClose || false;
        postEvaluateInfo({ orderNumber }).then(res => {
            console.log(res);
            if (res.status != 200) {
                return MessageBox("提示", res.msg);
            }
            this.list = res.data.evaluateContent || [];
            if (isClose) {
                this.showTime = true;
                let timer = setInterval(() => {
                    this.timer--
                    if (this.timer === 0) {
                        clearInterval(timer)
                        wx.closeWindow();
                    }
                }, 1000);
            }
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
.timer {
  position: fixed;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
  font-size: 32px;
  color: #697eff;
}
</style>
