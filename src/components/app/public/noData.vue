<template>
    <div class="no-data">
        <div class="img">
            <img :src="$CDN('/null-icon.png')" alt="">
        </div>
        <h3>{{message}}</h3>
        <p></p>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: () => {
                return "";
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
<style scoped>
/* 空数据 */
.no-data .img {
  width: 210px;
  margin: 54px auto 0;
}
.no-data .img img {
  width: 100%;
  display: block;
}
.no-data h3 {
  font-size: 28px;
  color: #6e7790;
  text-align: center;
  font-weight: normal;
  margin: 66px 0 40px;
}
.no-data p {
  padding: 0 30px;
  font-size: 26px;
  color: #929eaa;
}
</style>
