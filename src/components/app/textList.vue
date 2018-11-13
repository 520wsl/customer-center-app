<template>
  <textarea class="textarea" v-model='showValue' @input="descArea" :maxLength="maxLength" placeholder="还有其他想说的写这里"></textarea>
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
  height: 300px;
  line-height: 40px;
  font-size: 26px;
}
</style>
