<template>
    <div class="evaluate">
        <div class="evaluate-left">
            <div v-for="(item,index) in showList" :key="index">
                <showStar v-if="item.type == 'number' && item.otherAttribute.showType == 'score'" :maxNum='item.otherAttribute.maxNum' :evaluateName="item.evaluateName" :chooseNum='item.value' :isHalf='item.otherAttribute.isHalf'></showStar>
            </div>
        </div>
        <div class="evaluate-right">
            <div v-for="(item,index) in showList" :key="index">
                <div v-if="item.type == 'radio' || item.type == 'checkbox'" class="right-item">
                    {{item.showValue}}
                </div>
                <div v-if="item.type == 'text'" class="right-item text">
                    {{item.value}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import showStar from "./showStar";
export default {
    props: ["list"],
    data() {
        return {
        }
    },
    computed: {
        showList: function () {
            let arr = [];
            this.list.forEach(item => {
                if (item.type == "radio" || item.type == "checkbox") {
                    let showValue = "";
                    item.value.forEach(i => {
                        showValue += i + "  ";
                    })
                    item.showValue = showValue;
                }
                arr.push(item)
            })
            return arr;
        }
    },
    components: {
        showStar
    },
    methods: {
    }
}
</script>
<style scoped>
.evaluate {
  display: flex;
  box-shadow: 0 2px 4px 0 #cdcdcd;
}
.evaluate-left,
.evaluate-right {
  width: 50%;
  margin-top: 32px;
  box-sizing: border-box;
}
.evaluate-left {
  border-right: 2px solid #f4f4f4;
}
.evaluate-right {
  padding-left: 45px;
  font-size: 22px;
  color: #697eff;
}
.evaluate-right .right-item {
  margin-bottom: 20px;
  margin-top: 0;
}
.evaluate-right .text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
