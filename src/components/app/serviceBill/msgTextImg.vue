<template>
  <div>
    <!--文本类型-->
    <div v-if="textType === 1" class="text">
      <span>
        <slot></slot>
      </span>
      <img v-if="userType === 1" class="horn_l" :src="$CDN('/white_horn_left.png')" alt="">
      <img v-if="userType === 0" class="horn_r" :src="$CDN('/white_horn.png')" alt="">
    </div>
    <!--图片类型-->
    <div v-else-if="textType === 2" class="image">
      <img :src="serviceUrl" />
    </div>
  </div>
</template>
<script>
import config from "@/config";
export default {
  // userType：用户类型 0:客户,1:不是客户
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：图片地址
  props: ["textType", "userType", "src"],
  computed: {
    serviceUrl() {
      return config.AUDIOCDN + this.src;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>