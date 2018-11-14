<template>
  <div>
    <div class="evaluation" @click="getClick">请你为{{severType==1?"美工":"运营"}}
      <span>{{name}}</span>，本次拟服务做个评价</div>
    <editEvaluation :list='list' :isEdit='true'></editEvaluation>
    <div class="submit-btn">
      <mt-button class="btn">提交</mt-button>
    </div>
  </div>
</template>
<script>
import editEvaluation from "@/components/app/editEvaluation";
import { postEvaluateTemplatedetails } from "@/api/evaluate";
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
    let data = postEvaluateTemplatedetails({ id: 8 });
    data.then(res => {
      console.log(res.data[0].content);
      let list = res.data[0].content;
      list.forEach(item => {
        if (item.type == "checkbox" && item.otherAttribute.showType == "tag") {
          item.value = [];
        }
      });
      this.list = list;
    });
  },
  methods: {
    getClick() {
      console.log(this.list);
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
