<template>
  <div class="evaluation-body">
    <div v-for="(item,index) in list" :key="index" class="evaluation-item">
      <div v-if="item.evaluateName">{{item.evaluateName}}:</div>
      <starList v-if="item.type == 'number' && item.otherAttribute.showType == 'score'" :maxNum='item.otherAttribute.maxNum' :chooseNum='item.value' :index='index' @getValue='getValue' :isEdit='isEdit' :isHalf='item.otherAttribute.isHalf'></starList>
      <checkboxList v-if="item.type == 'checkbox'  && item.otherAttribute.showType == 'tag'" :isEdit='isEdit' :index='index' :list='item.tagList' :value='item.value' class="checkBox" @getValue='getValue'></checkboxList>
      <radioList v-if="item.type == 'radio'  && item.otherAttribute.showType == 'tag'" :isEdit='isEdit' :index='index' :list='item.tagList' :value='item.value' class="checkBox" @getValue='getValue'></radioList>
      <textList v-if="item.type == 'text'  && item.otherAttribute.showType == 'textarea'" :isEdit='isEdit' :index='index' :value='item.value' :maxLength='item.otherAttribute.maxLength' @getValue='getValue'></textList>
    </div>
  </div>
</template>
<script>
import starList from "./starList";
import checkboxList from "./checkboxList";
import radioList from "./radioList";
import textList from "./textList";
export default {
  props: ["list", "isEdit"],
  data() {
    return {};
  },
  components: { starList, checkboxList, radioList, textList },
  methods: {
    getValue(obj) {
      this.list[obj.index].value = obj.value;
    }
  }
};
</script>
<style scoped>
.evaluation-body {
  padding: 40px 30px 0;
  background: #fff;
  overflow: hidden;
}
.evaluation-item {
  display: flex;
  font-size: 28px;
  color: #353a42;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.checkBox {
  width: 100%;
  padding-top: 10px;
}
</style>
