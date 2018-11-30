<template>
    <div>
        <div class="complany-list" v-if="companyList.length != 0">
            <div v-for="(item,index) in companyList" :key="index" class="company-item" @click="changeCompany(index)">
                <div class="item-title">
                    <div>
                        <img :src="$CDN('/company.png')" alt="">
                        <span>{{item.name}}</span>
                    </div>
                    <span>&gt;</span>
                </div>
                <div class="item-body">
                    <div class="item">
                        <span>网店地址:</span>
                        <a :href="item.url">{{item.url}}</a>
                    </div>
                    <div class="item">
                        <!-- eslint-disable-next-line -->
                        <span>地　　区:</span>
                        <b>{{item.provinceName + " "+item.cityName}}</b>
                    </div>
                    <div class="item">
                        <!-- eslint-disable-next-line -->
                        <span>账　　号:</span>
                        <b>{{item.account}}</b>
                    </div>
                    <div class="item">
                        <span>主营行业:</span>
                        <!-- 目前暂无 -->
                        <b></b>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="complany-no-data">
            <div class="img">
                <img :src="$CDN('/null-icon.png')" alt="">
            </div>
            <h3>抱歉，您还未关联任何公司！</h3>
            <p>注：如果您是已合作客户，请联系我们的业务员，将您的合作公司跟您的微信做关联操作</p>
        </div>
    </div>
</template>
<script>
import { getCompanyList, changeMyCompany } from "@/api/customer/customer";
export default {
    data() {
        return {
            companyList: []
        };
    },
    created() {
        this.$parent.$parent.setTitle("我的公司");
        let customerSixiId = this.$route.query.customerSixiId
        if (customerSixiId) {
            this.getCompanyList(customerSixiId);
        }
    },
    components: {},
    methods: {
        async changeCompany(index) {
            let param = {
                companySixiId: this.companyList[index].sixiId
            }
            let res = await changeMyCompany(param);
            if (res.status != 200) {
                return MessageBox("提示", res.msg);
            }
            this.$router.push({
                name: 'personalServie'
            })
        },
        async getCompanyList(customerSixiId) {
            let res = await getCompanyList({ customerSixiId });
            if (res.status != 200) {
                return MessageBox("提示", res.msg);
            }
            this.companyList = res.data || [];
        }
    }
};
</script>
<style scoped>
.complany-list {
  margin-top: 10px;
}
.company-item {
  font-size: 26px;
  color: #444;
  margin-bottom: 20px;
  background: #fff;
  padding-left: 30px;
}
.company-item .item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-right: 30px;
  border-bottom: 2px solid #f4f4f4;
}
.company-item .item-title div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.company-item .item-title div img {
  width: 30px;
}
.company-item .item-title div span {
  padding-left: 28px;
  font-size: 28px;
}
.company-item .item-body {
  padding: 40px 30px 0 0;
}
.item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 30px 0;
}
.item span {
  width: 140px;
  line-height: 36px;
  padding-right: 20px;
  flex-shrink: 0;
}
.item a {
  color: #697eff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 36px;
}
.item b {
  color: #6e7790;
  font-weight: normal;
  line-height: 36px;
}
/* 空数据 */
.complany-no-data .img {
  width: 210px;
  margin: 54px auto 0;
}
.complany-no-data .img img {
  width: 100%;
  display: block;
}
.complany-no-data h3 {
  font-size: 28px;
  color: #6e7790;
  text-align: center;
  font-weight: normal;
  margin: 66px 0 40px;
}
.complany-no-data p {
  padding: 0 30px;
  font-size: 26px;
  color: #929eaa;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>
