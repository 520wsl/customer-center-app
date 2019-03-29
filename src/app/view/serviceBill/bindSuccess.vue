<template>
  <div class="mian bindSuccess">
    <img :src="$CDN('/success_icon.png')">
    <h3>{{type ==1 ? '手机号绑定成功':'联系人手机号提交成功'}}</h3>
    <p class="bindPhone">{{type ==1 ? '绑定手机号：':'联系人手机号：'}}{{hidePhone}} &emsp;
      <router-link v-if="type == 1" :to="{name:'getPhone',query:{userSixiId:userSixiId}}" tag="span">变更手机号</router-link>
    </p>
    <router-link :to="{name:'personalServie',query:{userSixiId:userSixiId}}" class="bind" tag="mt-button">查看我的服务</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userSixiId: this.$route.query.userSixiId || "",
      mobile: this.$route.query.mobile || "",
      type: this.$route.query.type || 1
    };
  },
  computed: {
    hidePhone() {
      let phone = String(this.mobile);
      phone = phone ? phone.slice(0, 3) + "****" + phone.slice(-4) : "";
      return phone;
    }
  },
  methods: {
    seeMyService() {}
  }
};
</script>
<style lang="less" scoped>
.bindSuccess {
  height: 100%;
  text-align: center;
  img {
    margin: 60px 0;
    width: 128px;
    height: 128px;
  }
  h3 {
    font-size: 32px;
    margin: 0;
    color: #444444;
  }
  .bindPhone {
    color: #929eaa;
    font-size: 28px;
    margin-top: 40px;
    span {
      color: #697eff;
    }
  }
}

.bind {
  display: block;
  width: 480px;
  margin: 100px auto;
  color: #fff;
  font-weight: 300;
  background: #697eff;
  border-color: #697eff;
}
</style>


