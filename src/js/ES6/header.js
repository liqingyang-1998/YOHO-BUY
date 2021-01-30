import Utils from "./Utils.js";
import SecondaryMenu from './SecondaryMenu.js';
export default class Header {
  group = ["YOHO!", "YOHO!BOYS", "YOHO!GIRLS", "Mars", "YO'HOOD"];
  groupCN = ["集团官网", "男生潮流", "女生潮流", "新鲜好去处", "潮流嘉年华"];
  groupMap;
  groupMapLis;
  shopCart;
  clothes = {
    "menu": ["上装","T恤", "卫衣", "夹克", "衬衫", "POLO", "防风外套","下装","休闲裤", "牛仔裤", "运动裤", "短裤", "工装裤","热门品牌","Dickies", "Levi's", "DUSTY", "THETHING", "viishow", "STORE by NIGO®", "NBA STYLE", "鬼洗"],
    "right": ["https://img10.static.yhbimg.com/yhb-img01/2019/09/06/15/01b9fb0416a35473b24f8fd2aae06a6ec8.jpg?imageView2/2/w/337/h/250/q/90", "IN季新品全面开售"],
  }
  shoes = {
    "menu":["鞋履","运动鞋","板鞋","跑步鞋","篮球鞋","靴子","热门品牌","DC","CAT","STARTER","PENSOLE","VEJA","TRENDIANO","Onitsuka Tiger"],
    "right": ["https://img11.static.yhbimg.com/yhb-img01/2019/09/06/15/010d8518a8d63176d49126e91801c8c8ab.jpg?imageView2/2/w/337/h/250/q/90","人气鞋靴"]
  }
  bag = {
    "menu":["包","双肩包","手拎包/单肩包","腰包/胸包","钱包/卡包","旅行箱","热门品牌","COMBACK","Mandarina Duck","初弎","SPRAYGROUND","Draconite","Herschel Supply","RAWROW","STAYREAL","SubCrew 箱包","the MAD HATcher","BABAMA","TYAKASHA"],
    "right": ["https://img10.static.yhbimg.com/yhb-img01/2019/09/06/15/01a40d82ac6a65d20ef6b7b9b37463ae62.jpg?imageView2/2/w/337/h/250/q/90","出街必备包袋集合"]
  }
  others = {
    "menu":["服饰","帽子","袜子","手表","腰带","配饰","首饰","项链/吊坠","手链","耳钉","戒指","热门品牌","MYFUN","New Era","Daniel Wellington","Caivin Klein","BBF","AVI-8","焕懋手表集合店","G-SHOCK","PINKORANGE","MLB WATCH","oammi","oasso"],
    "right": ["https://img10.static.yhbimg.com/yhb-img01/2019/09/06/15/011f68bc9e61585fb7c073ab891a8e0b01.jpg?imageView2/2/w/337/h/250/q/90","热门小物优选"]
  }
  constructor() {
    this.elem = Utils.ce("div");
    this.elem.innerHTML = this.renderHTML();
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    this.ready();
  }
  ready() {
    this.groupMap = this.elem.querySelector(".groupMap");
    // console.log(this.groupMap)
    this.groupMapLis = this.groupMap.querySelectorAll("li")
    this.shopCart = this.elem.querySelector(".search-right").querySelector("span");
    let clothes = this.elem.querySelector("#clothes")
    let shoes = this.elem.querySelector("#shoes")
    let bag = this.elem.querySelector("#bag")
    let others = this.elem.querySelector("#others")
    let clothesMenu = new SecondaryMenu(this.clothes);
    let shoesMenu = new SecondaryMenu(this.shoes);
    let bagMenu = new SecondaryMenu(this.bag);
    let othersMenu = new SecondaryMenu(this.others);
    clothesMenu.appendTo(clothes)
    shoesMenu.appendTo(shoes)
    bagMenu.appendTo(bag)
    othersMenu.appendTo(others)
    this.shopCart.addEventListener("click", e => this.clickhandler(e));
    this.groupMap.addEventListener("mouseover", e => this.mousehandler(e))
    this.groupMap.addEventListener("mouseout", e => this.mousehandler(e))
  }
  clickhandler(e) {
    window.location.href = "./shoppingCart.html";
  }
  mousehandler(e) {
    if (e.target.nodeName !== "LI") return;
    let index = Array.from(this.groupMapLis).indexOf(e.target);
    if (e.type === "mouseover") {
      e.target.innerText = this.groupCN[index];
    } else {
      e.target.innerText = this.group[index];
    }
  }
  renderHTML() {
    var str = "";
    str += `<div class="head">
    <div class="center-content">
      <div class="left group"><span></span><a href="javascript:viod(0)">YOHOBUY 有货</a>
      <ul class="groupMap">`;
    str += this.group.reduce(function (value, item) {
      return value + `<li>${item}</li>`
    }, "");
    str += `</ul></div>
      <div class="left info"><span></span><a href="javascript:viod(0)">关于防诈骗的重要提醒</a></div>
      <ul>
        <li>Hi~ [ <a href="./login.html">请登录</a> ] [<a href="#">免费注册</a> ]</li>
        <li><span class="span-tg"></span><a href="#">MY有货</a><span class="span-icon"></span></li>
        <li><span class="span-tg"></span><span class="span-icon"></span><a href="#">我的订单</a></li>
        <li><span class="span-tg"></span><span  class="span-icon"></span><a href="#">我的收藏</a></li>
        <li><span class="span-tg"></span><span class="span-icon"></span><a href="#">消息</a></li>
        <li><span class="span-tg"></span><a href="#"><span></span>客户服务</a></li>
        <li><span class="span-tg"></span><a href="#"><span></span> 关注有货</a></li>
        <li><span class="span-tg"></span><a href="#"><span></span>手机版</a></li>
      </ul>
    </div>
  </div>
  <div class="search center-content">
    <h1 class="logo">
      <a href="./index.html"></a>
    </h1>
    <div class="search-right">
      <form action="#">
        <input type="text"><a></a>   
      </form>
      <span class="iconfont icon-tianchongxing-"></span>
    </div>
  </div>
  <nav>
    <ul class="center-content">
      <li><a herf="#">新品到着</a></li>
      <li><a herf="#">品牌一览</a></li>`
    str += `<li id="clothes"><a herf="#">服饰</a></li>`
    str += `<li id="shoes"><a herf="#">鞋履</a></li>`
    str += `<li id="bag"><a herf="#">包袋</a></li>`
    str += `<li id="others"><a herf="#">配饰·其他</a></li>
      <li><a herf="#">SALE</a></li>
      <li><a herf="#">证照/协议</a></li>
    </ul>
  </nav>`;
    return str;
  }
}