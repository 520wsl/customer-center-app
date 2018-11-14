<template>
  <div class="checkbox-list">
    <div v-for="(item1,index1) in showList" :key="index1" :class="item1.isChoose?'checkbox-item checkbox-active':'checkbox-item checkbox-default'" @click="chooseItem(index1)">
      {{item1.tag}}
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
      this.list.forEach(item => {
        this.value.forEach(item2 => {
          if (item.tag == item2) {
            // 不可编辑状态
            if (!this.isEdit) {
              arr.push(item);
            }
            item.isChoose = true;
          } else {
            item.isChoose = false;
          }
        });
        // 可编辑状态
        if (this.isEdit) {
          arr.push(item);
        }
      });
      return arr;
    }
  },
  methods: {
    chooseItem(index) {
      // 不可编辑跳出函数
      if (!this.isEdit) {
        return;
      }
      let value = JSON.parse(JSON.stringify(this.value));
      // 点击已经选中状态
      if (this.showList[index].isChoose) {
        this.setItem(index);
        this.showList[index].isChoose = false;
        value = [];
        // 点击未选中状态
      } else {
        this.setItem(index);
        value = [this.showList[index].tag];
      }
      this.$emit("getValue", { value, index: this.index });
    },
    setItem(num) {
      this.showList.forEach((item, index) => {
        if (index == num) {
          item.isChoose = true;
        } else {
          item.isChoose = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.checkbox-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checkbox-item {
  width: 200px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 26px;
  margin-top: 30px;
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
