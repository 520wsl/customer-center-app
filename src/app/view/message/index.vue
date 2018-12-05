<template>
    <div class="message-body" :style="'background-image: url('+$CDN('/save-message-bg.png')+')'">
        <!-- <img class="message-bg" :src="$CDN('/save-message-bg.png')" alt=""> -->
        <div class="message-content">
            <div class="message-item">
                <span>
                    <b>*</b>您的称呼：</span>
                <input type="text" maxlength="12" v-model="params.name">
            </div>
            <div class="line"></div>
            <div class="message-item">
                <span>
                    <b>*</b>联系电话：</span>
                <input type="text" maxlength="11" v-model="params.mobile">
            </div>
            <div class="line"></div>
            <div class="message-item">
                <span>留言：</span>
                <textarea maxlength="120" v-model="params.context"></textarea>
            </div>
            <div class="message-header">
                <img :src="$CDN('/incustomlist_cooperation_icon.png')" alt="">
                <p>
                    请留下您的联系方式，我们的客服人员会在第一时间跟您取得联系！
                </p>
            </div>
            <div class="message-btn">
                <mt-button class="btn" type='primary' @click="sentMessage">确认</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { sentMessageData } from "@/api/workOrder/message";
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            params: {
                name: "",
                context: "",
                mobile: ""
            }
        };
    },
    components: {},
    methods: {
        sentMessage() {
            if (
                this.params.name == "" ||
                this.params.mobile == ""
            ) {
                return MessageBox("提示", "请填写留言必填信息！");
            }
            if (!(/^\d{11}$/.test(this.params.mobile))) {
                MessageBox("提示", '请输入11位手机号');
                return false;
            }
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
    }
};
</script>
<style scoped>
html,
body,
#app,
.message-body{
    height: 100%;
}
.message-body {
  padding-top: 10px;
  position: relative;
  background-size: 100% 100%;
}
.message-body .message-bg {
  position: absolute;
  z-index: 2;
  width: 100%;
  top: 20px;
}
.message-body .message-content {
  background: #fbf5ff;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 3;
  width: 690px;
  padding-top: 40px;
  margin: 424px auto 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.message-body .line {
  border-bottom: 2px solid #fff;
  border-top: 2px solid #d9d9d9;
  margin: 0 30px;
}
.message-body .message-header {
  position: relative;
  padding: 38px 30px;
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
  width: 450px;
  background: 0 none;
}
.message-body .message-item textarea {
  float: left;
  border: 0 none;
  display: block;
  padding: 10px;
  height: 120px;
  color: #6e7790;
  background: 0 none;
  resize: none;
  font-size: 28px;
  line-height: 36px;
  width: 450px;
}
.message-body .message-btn {
  padding: 14px 130px 44px;
}
.message-body .message-btn .btn {
  width: 100%;
  background: #697eff;
  border-radius: 4px;
  height: 76px;
  line-height: 76px;
}
</style>
