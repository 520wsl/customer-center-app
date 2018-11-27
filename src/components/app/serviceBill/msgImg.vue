<template>
  <div class="image">
    <img :src="$FILE(enclosure)" />
    <!-- <img src="https://goss.veer.com/creative/vcg/veer/612/veer-103986923.jpg" /> -->
  </div>
</template>
<script>
import config from "@/config";
export default {
  props: ["enclosure"]
};
</script>
<style lang="less" scoped>
.image > img {
  max-width: 450px;
}
</style>