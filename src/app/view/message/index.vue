<template>
    <div class="message-body">
        <div class="message-item">
            <span>您的称呼：</span>
            <input type="text" v-model="content.name">
        </div>
        <div class="message-item">
            <span>联系电话：</span>
            <input type="number" maxlength="11" v-model="content.phone">
        </div>
        <div class="message-item">
            <span>留言：</span>
            <textarea maxlength="500" v-model="content.message"></textarea>
        </div>
        <div class="message-btn">
            <mt-button class="btn" type='primary' @click="sentMessage">确认</mt-button>
        </div>
    </div>
</template>
<script>
import { sentMessageData } from "@/api/message";
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
                this.content.phone == "" ||
                this.content.message == ""
            ) {
                return MessageBox("提示", "请填写完留言信息！");
            }
            this.params.context =
                "称呼：" +
                this.content.name +
                "，电话：" +
                this.content.phone +
                "，留言：" +
                this.content.message;

            sentMessageData(
                this.params.unionId,
                this.params.openId,
                this.params.context,
                this.params.type,
                this.params.workOrderType
            ).then(res => {
                if (res.status != 200) {
                    return MessageBox("提示", "请稍后再试！");
                }
                this.$router.push({ name: "messageSuccess" });
            });
        }
    },
    created() {
        this.$parent.$parent.setTitle("留言");
        this.params.openId = this.$route.query.openId || "";
        this.params.unionId = this.$route.query.unionId || "";
    }
};
</script>
<style scoped>
.message-body {
  padding-top: 10px;
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
  width: 150px;
  text-align: right;
}
.message-body .message-item input {
  float: left;
  border: 0 none;
  display: block;
  padding: 10px;
  color: #6e7790;
  height: 40px;
  width: 530px;
}
.message-body .message-item textarea {
  float: left;
  border: 0 none;
  display: block;
  padding: 10px;
  height: 240px;
  width: 500px;
  color: #6e7790;
  resize: none;
  font-size: 28px;
  line-height: 36px;
  width: 530px;
}
.message-body .message-btn {
  padding: 40px 130px;
}
.message-body .message-btn .btn {
  width: 100%;
  background: #697eff;
  border-radius: 2px;
}
</style>
