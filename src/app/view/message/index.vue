<template>
    <div class="message-body">
        <div class="message-header">
            <img :src="$CDN('/incustomlist_cooperation_icon.png')" alt="">
            <p>
                请留下您的联系方式，我们的客服人员会在第一时间跟您取得联系！
            </p>
        </div>
        <div class="message-item">
            <span>
                <b>*</b>您的称呼：</span>
            <input type="text" maxlength="12" v-model="content.name">
        </div>
        <div class="message-item">
            <span>
                <b>*</b>联系电话：</span>
            <input type="number" maxlength="11" v-model="content.phone">
        </div>
        <div class="message-item">
            <span>留言：</span>
            <textarea maxlength="120" v-model="content.message"></textarea>
        </div>
        <div class="message-footer">
            <p>
                杭州四喜信息技术有限公司致力于企业电子商务托管服务企业商铺装修、 企业信息托管维护、 企业信息推广和企业信息化建设是目前国内电子商务托管领域的优秀领跑者。
            </p>
        </div>
        <div class="message-btn">
            <mt-button class="btn" type='primary' @click="sentMessage">确认</mt-button>
        </div>
    </div>
</template>
<script>
import { sentMessageData } from "@/api/workOrder/message";
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            content: {
                name: "",
                phone: "",
                message: ""
            },
            params: {
                unionId: "",
                openId: "",
                context: "",
                type: "text",
                workOrderType: 6
            }
        };
    },
    components: {},
    methods: {
        sentMessage() {
            if (
                this.content.name == "" ||
                this.content.phone == ""
            ) {
                return MessageBox("提示", "请填写留言必填信息！");
            }
            this.params.context =
                "称呼：" +
                this.content.name +
                "，电话：" +
                this.content.phone +
                "，留言：" +
                this.content.message;
            sentMessageData(this.params).then(res => {
                if (res.status != 200) {
                    return MessageBox("提示", "请稍后再试！");
                }
                this.$router.push({ name: "messageSuccess" });
            });
        }
    },
    created() {
        this.$parent.$parent.setTitle("业务合作");
        this.params.openId = this.$route.query.openId || "";
        this.params.unionId = this.$route.query.unionId || "";
    }
};
</script>
<style scoped>
.message-body {
  padding-top: 10px;
}
.message-body .message-header {
  position: relative;
  background: #fff;
  padding: 38px 30px 66px;
}
.message-body .message-header img {
  position: absolute;
  width: 30px;
  top: 42px;
  left: 34px;
}
.message-body .message-header p {
  text-indent: 2em;
  font-size: 26px;
  color: #697eff;
  line-height: 40px;
}
.message-body .message-footer {
  margin: 30px 0;
  padding: 0 30px;
}
.message-body .message-footer p {
  text-indent: 2em;
  font-size: 24px;
  color: #929eaa;
  line-height: 40px;
}
.message-body .message-item {
  background: #fff;
  margin-bottom: 2px;
  font-size: 26px;
  overflow: hidden;
  padding: 20px 10px;
  border-radius: 5px;
}
.message-body .message-item span {
  float: left;
  display: block;
  padding: 10px;
  height: 40px;
  line-height: 40px;
  color: #929eaa;
  width: 170px;
  text-align: right;
}
.message-body .message-item span b {
  color: red;
}
.message-body .message-item input {
  float: left;
  border: 0 none;
  display: block;
  padding: 10px;
  color: #6e7790;
  height: 40px;
  width: 500px;
}
.message-body .message-item textarea {
  float: left;
  border: 0 none;
  display: block;
  padding: 10px;
  height: 240px;
  color: #6e7790;
  resize: none;
  font-size: 28px;
  line-height: 36px;
  width: 500px;
}
.message-body .message-btn {
  padding: 40px 130px;
}
.message-body .message-btn .btn {
  width: 100%;
  background: #697eff;
  border-radius: 4px;
}
</style>
