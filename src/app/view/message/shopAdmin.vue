<template>
    <div>
        <div class="shop-titile">
            <img :src="$CDN('/shop_admin_bgImg.png')" alt="">
        </div>
        <div class="now-sales">
            <div class="now-sales-title">
                <span>服务详情</span>
            </div>
        </div>
        <div class="shop-info">
            <h3>1．关键词优化 精确优化关键词，提升宝贝曝光量。</h3>
            <p>　　淘宝现在来讲是做不了排名的，我们现在做的就是按照淘宝上客户的搜索习惯，给咱的宝贝策划好最精准的关键词, 也是搜索量比较高的关键词，去适应淘宝的抓取规则, 现在淘宝不比阿里巴巴，淘宝现在要比阿里巴巴的排名更加成熟, 所以现在我们公司就是按照淘宝的规则去提升咱旺铺的曝光量, 这就是我们现在的淘宝的宝贝优化方式。</p>
            <h3>2．商铺装修 专为客户量身定做旺铺精品美化，提升品牌形象。</h3>
            <p>　　现在淘宝来说美化的要求相对较高，在首页上，我们现在做的美化全部是公司最好的一类美化，每一张图片, 每一个海报，每一张展示首图，包括咱的产品亮点, 还有就是很多细节性的展示图片，现在都是经过精心策划设计的, 在首页上，给咱的主打产品, 还有就是我们的旺铺以新颖，大气，美观。通过美化吸引客户的眼球，提升咱的店铺形象。</p>
            <h3>3．制作精品信息，数量为30条以内。</h3>
            <p>　　现在来讲，淘宝上买东西是很快速的，有的时候只要客户看到了咱的宝贝， 通过咱的信息展示， 客户就可以判断这款产品是不是自己要找的,重点就是要把咱的宝贝内页做到更好，我们的用材，我们的宝贝图片，细节图片, 还有就是我们的物流, 公司的宗旨，服务的周全，用户的体验这些方面都是要给您丰富好, 整条信息的图片全部都是要按照高要求给你设计好处理好，排版也是要根据咱的产品给您最适合的排版。</p>
        </div>
        <div class="shop-footer">
            <a :href="'tel:'+tel">电话咨询</a>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tel: "10086"
    };
  },
  components: {},
  methods: {},
  created() {
    this.$parent.$parent.setTitle("旺铺管理");
  }
};
</script>
<style scoped>
.shop-info {
  padding: 20px 30px 98px;
  background: #fff;
}
.shop-info h3 {
  margin: 0;
  padding: 20px 0;
  font-size: 26px;
  color: #444444;
  line-height: 40px;
}
.shop-info p {
  color: #6e7790;
  font-size: 26px;
  line-height: 38px;
}
.shop-titile {
  margin-top: 10px;
}
.shop-titile img {
  display: block;
  width: 100%;
}
.now-sales {
  padding: 10px 30px 0;
  background: #fff;
  overflow: hidden;
  margin-bottom: 2px;
}
.now-sales-title {
  font-size: 28px;
  color: #333;
  border-left: 6px solid #7994ff;
  height: 40px;
  margin: 22px 0;
}
.now-sales-title span {
  padding-left: 24px;
}
.shop-footer {
  padding: 18px 94px;
  background: #fff;
  margin-top: 1px;
}
.shop-footer a {
  display: block;
  width: 240px;
  background: #fc7946;
  border-radius: 2px;
  color: #ffffff;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
  text-align: center;
}
</style>
