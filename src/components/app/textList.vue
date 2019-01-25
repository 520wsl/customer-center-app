<template>
    <div style="width:100%;">
        <textarea v-if="isEdit == true" class="textarea" v-model='showValue' @blur="descArea" :maxLength="maxLength" placeholder="还有其他想说的写这里"></textarea>
        <div v-if="isEdit == false && value" class="show-textarea">{{value}}</div>
    </div>
  
</template>
<script>
export default {
  props: ["index", "isEdit", "value", "maxLength"],
  data() {
    return {
      showValue: this.value
    };
  },
  components: {},
  methods: {
    descArea() {
      this.$emit("getValue", { value: this.showValue, index: this.index });
      this.toTop();
    },
    toTop(){
        window.scrollTo(0,0);
    }
  }
};
</script>
<style scoped>
.textarea {
  width: 100%;
  resize: none;
  margin-top: 60px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 28px;
  color: #999;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 150px;
  line-height: 40px;
  font-size: 26px;
}
.show-textarea {
  display: inline-block;
  width: auto;
  line-height: 42px;
  font-size: 26px;
  margin-top: 10px;
  padding: 5px 30px;
  background: rgba(105, 126, 255, 0.1);
  border: 1px solid #697eff;
  color: #697eff;
  word-break: break-all;
}
</style>
