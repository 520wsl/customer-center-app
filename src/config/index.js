/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-07 22:13:25
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-30 11:02:56
 * @explanatory:  config
 */
export default {
  baseUrl: {
    dev: "/api",
    pro: "/api"
  },
  CDN: "http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image",
  AUDIOCDN:"http://wechat-base-images.oss-cn-hangzhou.aliyuncs.com/",
  storeagewxUserInfoKey: "wxUserInfo",
  toLoginUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://workapp.sixi.com/personal/index&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1#wechat_redirect"
};
