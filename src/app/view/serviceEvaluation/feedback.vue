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
  // postTemplateInfo
  // postEvaluateeAdd,
  postEvaluateeInfo
} from "@/api/evaluate";
export default {
  data() {
    return {
      list: []
    };
  },
  components: { editEvaluation },
  created() {
    this.$parent.$parent.setTitle("美工服务评价");
    postEvaluateeInfo(1, 1).then(res => {
      console.log(res);
      this.list = res.data[0].evaluateContent;
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
