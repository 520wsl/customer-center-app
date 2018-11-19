<template>
    <div class="checkbox-list">
        <div v-for="(item,index1) in showList" :key="index1" :class="item.isChoose?'checkbox-item checkbox-active':'checkbox-item checkbox-default'" @click="chooseItem(index1)">
            {{item.tag}}
        </div>
    </div>
</template>
<script>
export default {
  props: ["isEdit", "index", "list", "value"],
  data() {
    return {};
  },
  components: {},
  computed: {
    showList: function() {
      let arr = [];
      this.list.forEach(item1 => {
        let bool = false;
        this.value.forEach(item2 => {
          if (item1 == item2) {
            bool = true;
          }
        });
        if (this.isEdit) {
          arr.push({
            tag: item1,
            isChoose: bool
          });
        } else {
          if (bool) {
            arr.push({
              tag: item1,
              isChoose: bool
            });
          }
        }
      });
      return arr;
    }
  },
  methods: {
    chooseItem(num) {
      // 不可编辑状态跳出
      if (!this.isEdit) {
        return;
      }
      this.showList[num].isChoose = !this.showList[num].isChoose;
      let value = [];
      this.showList.forEach(item => {
        if (item.isChoose) {
          value.push(item.tag);
        }
      });
      this.$emit("getValue", { value: value, index: this.index });
    }
  }
};
</script>
<style scoped>
.checkbox-list {
  display: flex;
  flex-wrap: wrap;
}
.checkbox-item {
  width: 200px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 26px;
  margin-top: 30px;
}
.checkbox-list .checkbox-item {
  margin-right: 25px;
}
.checkbox-active {
  background: rgba(105, 126, 255, 0.1);
  border: 1px solid #697eff;
  color: #697eff;
}
.checkbox-default {
  border: 1px solid #ddd;
  color: #999;
}
</style>
