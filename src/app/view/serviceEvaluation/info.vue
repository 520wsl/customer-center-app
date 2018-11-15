<template>
  <div>
    <div class="evaluation">请你为{{severType==1?"美工":"运营"}}
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
  postTemplateInfo,
  postEvaluateAdd
  // postEvaluateInfo
} from "@/api/evaluate";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      title: "美工服务评价",
      severType: 1,
      name: "张momo"
    };
  },
  components: { editEvaluation },
  created() {
    this.$parent.$parent.setTitle(this.title);
    this.getList();
    // postEvaluateInfo(1, 1).then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    getList() {
      let data = postTemplateInfo(1);
      data.then(res => {
        // if (res.data) {
        //   return;
        // }
        console.log(res.data);
        let list = res.data[0].content;
        list.forEach(item => {
          if (
            (item.type == "checkbox" &&
              item.otherAttribute.showType == "tag") ||
            (item.type == "radio" && item.otherAttribute.showType == "tag")
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
          postEvaluateAdd(3, 3, JSON.stringify(this.list)).then(res => {
            console.log(res);
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
