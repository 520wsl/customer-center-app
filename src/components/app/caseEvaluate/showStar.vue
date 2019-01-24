<template>
    <div class="star-item">
        <span>{{evaluateName}}：</span>
        <div v-for="(item,index1) in list" :key="index1" class="star">
            <!-- 整星情况 -->
            <img v-if="item<chooseNum && isHalf ==0" :src="$CDN('/star_choose.png')">
            <!-- 半星情况 -->
            <img v-if="item<chooseNum && item!=chooseNum-0.5 && isHalf ==1" :src="$CDN('/star_choose.png')">
            <img v-if="item==chooseNum-0.5 && isHalf ==1" :src="$CDN('/star_choose.png')" class="left-clip">
        </div>
    </div>
</template>
<script>
export default {
    props: ["evaluateName", "chooseNum", "isHalf", "maxNum"],
    data() {
        return {
        }
    },
    computed: {
        list: function () {
            let arr = [];
            for (let i = 0; i < this.maxNum; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    components: {
    },
    methods: {
    }
}
</script>
<style scoped>
.star-item {
  padding-left: 48px;
  color: #444;
  font-size: 26px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.star-item .star {
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 6px;
}
.star-item .star img {
  position: absolute;
  width: 24px;
}
.left-clip {
  clip: rect(0px 12px 24px 0px);
}
</style>
