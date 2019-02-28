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
    AUDIOCDN: "http://wechat-base-images.oss-cn-hangzhou.aliyuncs.com/",
    storeagewxUserInfoKey: "wxUserInfo",
    toLoginUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=https%3A%2F%2Foauth.sixi.com%2Fgzh%2Fcallback&response_type=code&scope=snsapi_base&state=Y2xpZW50X2lkPXdvcmtvcmRlciZyZWRpcmVjdF91cmk9aHR0cCUzQSUyRiUyRndvcmthcHAuc2l4aS5jb20lMkZwZXJzb25hbCUyRmluZGV4JTNGcGFyJTNEY0dGblpVNWhiV1VsTTBSd1pYSnpiMjVoYkZObGNuWnBaUSUzRCUzRCZzdGF0ZT1zc28=#wechat_redirect",
    // toLoginUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c0c1aef00b3d175&redirect_uri=http://workapp.sixi.com/personal/index&response_type=code&scope=snsapi_userinfo&state=weChat&connect_redirect=1#wechat_redirect",
    ssoConfig: {
        login: {
            clientId: 'workorder',
            pathname: '/personal/index'
        }
    },
};
