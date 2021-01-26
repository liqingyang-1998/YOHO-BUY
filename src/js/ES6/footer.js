import Utils from "./Utils.js";
export default class Footer{
  static helpList = {
    新手专区: ["注册登录","购物结算","下单支付","收货评价"],
    会员中心: ["会员制度","会员优惠","账户管理","密码管理"],
    购物指南: ["发票","尺码对照","尺码解读","商品咨询"],
    支付方式: ["在线支付","货到付款","分期支付","优惠券、有货币"],
    配送方式: ["配送说明","运费说明","验货签收","收货样品"],
    售后服务: ["退换货政策","投诉与建议","下单支付","在线客服"],
    APP常见问题: ["IPhone版","Android版","wap版","IPAD版"]
  }
  static linkList = ["返回首页","YOHO!BUY有货","新力传媒","联系我们","商家入驻","隐私条款","友情链接","潮流品牌大全","潮流品类大全","潮流产品大全","潮流资讯","穿衣搭配(男生版)","穿衣搭配(女生版)","潮流人气","潮流潮品","潮流视频","苏公网安备 32010502010132号","出版物经营许可证","苏B2-20120395","食品经营许可证"]
  constructor(){
    this.elem = Utils.ce("div");
    this.elem.innerHTML = this.renderHTML();
  }
  appendTo(parent){
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);

  }
  renderHTML(){
    var dlList = Object.keys(Footer.helpList)
    // console.log(dlList);
    var str = "";
    str += "<div class='center-content'>"
    str += "<ul class='promise'>"
    str += "<li><span class='promise-icon'></span><span class='promise-red'>100%</span>品牌正品</li>"
    str += "<li><span class='promise-icon'></span><span class='promise-red'>7天</span>无理由退换货</li>"
    str += "<li><span class='promise-icon'></span><span class='promise-red'>便捷</span>在线客服</li>"
    str += "</ul>"
    str += "<div class='footerHelp clear'>"
    str += dlList.reduce(function(value,item){
      // console.log(value,item)
      let ddList = Footer.helpList[item];
      // console.log(ddList);
      return value+`<dl><dt>${item}</dt>${ddList.reduce(function(value1,dditem){
        return value1+'<dd><a href="#">'+dditem+'</a></dd>'
      },"")}</dl>`
    }
    ,"")
    str += "</div>"
    str += "<div class='footer-link center-content'>"
    str += "<div class='left-flag'>"
    str += "<a class='govicon' href='#'><img src='https://cdn.yoho.cn/yohobuy-node/6.11.0/img/layout/ebsIcon-new.png?173272e8fcd'></a><a class='govicon' href='#'><img src='https://static.yohobuy.com/images/v3/icon/credit-flag3.png?imageView2/2/interlace/1/q/75'></a><a class='govicon' href='#'><img src='https://static.yohobuy.com/images/v3/icon/isc2.png?imageView2/2/interlace/1/q/75'></a>"
    str += "</div>"
    str += `<p class='links'>`
    str += Footer.linkList.reduce(function(value,item){
      return value+`<a href="#">${item} </a><span>|</span> `
    },"")
    str += "</p>"
    str += "<p class='copyright'>CopyRight © 2007-2021 南京新与力文化传播有限公司 苏ICP备09011225号 NewPower Co. 版权所有 江苏省南京市建邺区嘉陵江东街18号南京国家广告产业园5栋17，18楼 025-87781000</p>"
    str += "</div>"
    str += "<div class='footer-container center-content'>"
    str += "<div class='link-info'>友情链接：</div>"
    str += "</div>"
    str += "</div>"
    return str;
    
  }
}