import config from "@/config";
import { MessageBox } from "mint-ui";
export const randomPath = (name, size = "") => {
  const n = Math.floor(Math.random() * 5) + 1;
  return `http://${n}.img.dianjiangla.com/assets/${name}${size}`;
};

export const CDN = name => {
  return config.CDN + name;
};

export const FILE = name => {
  return config.AUDIOCDN + name;
};

/*
 * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
 * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
 * 返回精度为：秒，分，小时，天
 */
export const getDateDiff = (startTime, endTime, diffType) => {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/-/g, "/");
  endTime = endTime.replace(/-/g, "/");
  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  var eTime = new Date(endTime); //结束时间
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    case "month":
      divNum = 1000 * 3600 * 24 * 30;
      break;
    default:
      break;
  }
  return (
    parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)) || 1
  );
};

/***
 *
 * 获取请求的UUID，指定长度和进制,如
 * getUUID(8, 2)   //"01001010" 8 character (base=2)
 * getUUID(8, 10) // "47473046" 8 character ID (base=10)
 * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
 *
 */
export const getUUID = function (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};
// 登录信息过期，跳转到登录页 仅限手机端
export const judgeLogin = function () {
    if(isMobile()){
        MessageBox.confirm("登录失败,是否重新登录?").then(action => {
            if(action === "confirm"){
                window.location.href = config.toLoginUrl;
            }
        }).catch(action=>{
            console.log(action);
        });
    }
};
// 判断当前使用页面的是手机 还是PC
export const isMobile = function () {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
};