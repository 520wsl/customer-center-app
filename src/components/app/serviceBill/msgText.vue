<template>
  <div class="text">
    <span v-if="info.eventType != 0">【{{eventType[info.eventType]}}】</span>
    <span v-html="info.record"></span>
    <p>
      <span class="s-remark" v-if="info.remark">摘要：{{info.remark}}</span>
    </p>
    <img v-if="info.sign == 1" class="horn_l" :src="$CDN('/white_horn_left.png')" alt="">
    <img v-else class="horn_r" :src="$CDN('/white_horn.png')" alt="">
  </div>
</template>
<script>
import config from "@/config";
import { mapState } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapState({
      eventType: state => state.Servicebill.eventType
    })
  }
};
</script>
<style lang="less" scoped>
.text {
  display: inline-block;
  position: relative;
  max-width: 450px;
  min-height: 34px;
  min-width: 20px;
  padding: 15px 20px;
  border-radius: 0 10px 10px 10px;
  box-shadow: 5px 5px 20px 2px #d6d6d6;
  word-wrap: break-word;
  // box-shadow: 5px 5px 20px 2px #000000;
  .s-remark {
    margin-top: 10px;
    display: inline-block;
    color: #363636;
    font-size: 20px;
  }
}
// 箭头的方向定位
.horn_r {
  content: " ";
  position: absolute;
  display: block;
  width: 20px;
  right: -20px;
  top: 0px;
}

.horn_l {
  content: " ";
  position: absolute;
  display: block;
  width: 20px;
  left: -20px;
  top: 0px;
}
</style>