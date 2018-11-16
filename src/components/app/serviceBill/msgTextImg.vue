<template>
  <div>
    <!--文本类型-->
    <div v-if="textType === 1" class="text">
      <span>
        <slot>ssss</slot>
      </span>
      <img v-if="userType === 1" class="horn_l" :src="$CDN('/white_horn_left.png')" alt="">
      <img v-if="userType === 2" class="horn_r" :src="$CDN('/white_horn.png')" alt="">
    </div>
    <!--图片类型-->
    <div v-else-if="textType === 2" class="image">
      <img :src="src" />
    </div>
  </div>
</template>
<script>
export default {
  // textType：附件类型 0:未知 1:文本 2:图片 3:音乐 4:图文 5:链接
  // src：图片地址
  props: ["textType", "userType","src"]
};
</script>
<style lang="less" scoped>
@import url("./msg.less");
</style>