import Utils from "./Utils.js";
export default class Header{
  group = ["YOHO!","YOHO!BOYS","YOHO!GIRLS","Mars","YO'HOOD"];
  groupCN = ["集团官网","男生潮流","女生潮流","新鲜好去处","潮流嘉年华"];
  groupMap;
  groupMapLis;
  constructor(){
    this.elem = Utils.ce("div");
    this.elem.innerHTML = this.renderHTML();
  }
  appendTo(parent){
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    this.ready();
  }
  ready(){
    this.groupMap = this.elem.querySelector(".groupMap");
    // console.log(this.groupMap)
    this.groupMapLis = this.groupMap.querySelectorAll("li")
    this.groupMap.addEventListener("mouseover",e=>this.mousehandler(e))
    this.groupMap.addEventListener("mouseout",e=>this.mousehandler(e))
  }
  mousehandler(e){
    if(e.target.nodeName !== "LI") return;
    let index = Array.from(this.groupMapLis).indexOf(e.target);
    if(e.type === "mouseover"){
      e.target.innerText = this.groupCN[index];
    }else{
      e.target.innerText = this.group[index];
    }
  }
  renderHTML(){
    var str = "";
    str += `<div class="head">
    <div class="center-content">
      <div class="left group"><span></span><a href="javascript:viod(0)">YOHOBUY 有货</a>
      <ul class="groupMap">`;
    str += this.group.reduce(function(value,item){
      return value+`<li>${item}</li>`
    },""); 
    str += `</ul></div>
      <div class="left info"><span></span><a href="javascript:viod(0)">关于防诈骗的重要提醒</a></div>
      <ul>
        <li>Hi~ [ <a href="#">请登录</a> ] [<a href="#">免费注册</a> ]</li>
        <li><span class="span-tg"></span><a href="#">MY有货</a><span class="span-icon"></span></li>
        <li><span class="span-tg"></span><span class="span-icon"></span><a href="#">我的订单</a></li>
        <li><span class="span-tg"></span><span  class="span-icon"></span><a href="#">我的收藏</a></li>
        <li><span class="span-tg"></span><span class="span-icon"></span><a href="#">消息</a></li>
        <li><span class="span-tg"></span><span></span><a href="#">客户服务</a></li>
        <li><span class="span-tg"></span><span></span><a href="#">关注有货</a></li>
        <li><span class="span-tg"></span><span></span><a href="#">手机版</a></li>
      </ul>
    </div>
  </div>
  <div class="search center-content">
    <h1 class="logo">
      <a href="#"></a>
    </h1>
    <div class="search-right">
      <form action="#">
        <input type="text"><a></a>   
      </form>
      <span>gou</span>
    </div>
  </div>
  <nav>
    <ul class="center-content">
      <li><a herf="#">新品到着</a></li>
      <li><a herf="#">品牌一览</a></li>
      <li><a herf="#">服饰</a></li>
      <li><a herf="#">鞋履</a></li>
      <li><a herf="#">包袋</a></li>
      <li><a herf="#">配饰·其他</a></li>
      <li><a herf="#">SALE</a></li>
      <li><a herf="#">证照/协议</a></li>
    </ul>
  </nav>`;
    return str;
  }
}