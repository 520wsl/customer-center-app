<template>
    <div class="start-loading">
        <div class="img">
            <img :src="$CDN('/start-loading.gif')">
        </div>
        <span>玩命加载中...</span>
        <div class="loading-bar">
            <div>
                <mt-progress :value="number" :barHeight="6">
                </mt-progress>
            </div>
            <span>{{number}}%</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            number: 0
        }
    },
    created() {
        this.setStart();
    },
    components: {
    },
    methods: {
        setStart() {
            this.number = 0;
            let timer = setInterval(() => {
                this.number += 3;
                if (this.number >= 80) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 10)
        }
    }
}
</script>
<style scoped>
.start-loading {
  position: fixed;
  z-index: 9999999;
  width: 100%;
  background: #fff;
  height: 100%;
  top: 0;
}
.start-loading .img {
  width: 400px;
  margin: 150px auto 0;
}
.start-loading .img img {
  width: 100%;
}
.start-loading span {
  display: block;
  text-align: center;
  font-size: 36px;
  color: #666;
}
.loading-bar {
  width: 400px;
  margin: 50px auto 0;
}
</style>
