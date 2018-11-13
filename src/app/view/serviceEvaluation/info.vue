<template>
  <div>
    <div class="evaluation" @click="getClick">请你为{{severType==1?"美工":"运营"}}
      <span>{{name}}</span>，本次拟服务做个评价</div>
    <editEvaluation :list='list' :isEdit='true'></editEvaluation>
  </div>
</template>
<script>
import editEvaluation from "@/components/app/editEvaluation";
export default {
  data() {
    return {
      list: [
        {
          evaluateName: "星级评分",
          value: 4.5,
          type: "number",
          isRequired: 1,
          evaluateType: "评分",
          otherAttribute: {
            isHalf: 1,
            maxNum: "5",
            showType: "score"
          }
        },
        {
          evaluateName: "星级评分2",
          value: 4,
          type: "number",
          isRequired: 1,
          evaluateType: "评分",
          otherAttribute: {
            isHalf: 0,
            maxNum: "5",
            showType: "score"
          }
        },
        {
          evaluateName: "多选",
          evaluateType: "多选",
          type: "checkbox",
          maxNum: 5,
          chooseNum: 3,
          isHalf: 1,
          tagList: [
            {
              name: "选项1",
              id: 1
            },
            {
              name: "选项2",
              id: 2
            },
            {
              name: "选项3",
              id: 3
            },
            {
              name: "选项3",
              id: 4
            }
          ],
          value: [1, 2],
          otherAttribute: {
            showType: "tag"
          }
        },
        {
          evaluateName: "单选",
          evaluateType: "单选",
          type: "radio",
          isHalf: 1,
          tagList: [
            {
              name: "选项1",
              id: 1
            },
            {
              name: "选项2",
              id: 2
            },
            {
              name: "选项3",
              id: 3
            },
            {
              name: "选项4",
              id: 4
            }
          ],
          value: [],
          otherAttribute: {
            showType: "tag"
          }
        },
        {
          evaluateName: "文本",
          value: "123",
          type: "text",
          isRequired: 1,
          evaluateType: "文本",
          otherAttribute: {
            maxLength: "500",
            showType: "textarea"
          }
        }
      ],
      title: "美工服务评价",
      severType: 1,
      name: "张momo"
    };
  },
  components: { editEvaluation },
  created() {
    this.$parent.$parent.setTitle(this.title);
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
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>
