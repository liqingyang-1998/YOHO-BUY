import Utils from "./Utils.js";

export default class ShopCart{
  step = ["查看购物车","填写订单","付款，完成购买"];
  close;
  tip;
  titleBtns;
  prev;
  constructor(){
    this.elem = Utils.ce("div");
    this.elem.className = "center-content"
    this.elem.innerHTML = this.renderHTML(); 
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    this.ready();
  }
  ready(){
    this.close = this.elem.querySelector(".close");
    this.tip = this.elem.querySelector(".tips")
    this.titleBtns = this.elem.querySelectorAll(".bottom-title")
    this.close.addEventListener("click",e=>this.closeClickhandler(e))
    this.titleBtns[0].addEventListener("click",e=>this.btnClickhandler(e))
    this.titleBtns[1].addEventListener("click",e=>this.btnClickhandler(e))
  }
  btnClickhandler(e){
    // e.target.classList.add("cur")
    this.btnChange(e.target);
  }
  btnChange(elem){
    if(this.prev){
      this.prev.classList.remove("cur")
    }
    this.prev = elem;
    this.prev.classList.add("cur");
  }
  closeClickhandler(e){
    this.tip.classList.add("tips-none")
    setTimeout(() => {
      this.tip.style.display = "none"
    }, 700);
  }
  renderHTML(){
    var str = "";
    str += "<div class='cart-title'>";
    str += "<ul class='shopping-step'>"
    str +=  this.step.reduce(function(value,item,index){
      // console.log(index)
      let li = `<li class="step">${item}</li>`;
      if(index === 0 ) li = `<li class="step first focus">${item}</li>`
      if(index === 2 ) li = `<li class="step last">${item}</li>`
      return value+li;
    },"")
    str += "</ul>"
    str += "</div>";
    str += "<div class='tips'>"
    str += "<a href='javascript:void(0);'class='close'></a>"
    str += `<strong>温馨提示：</strong> 亲爱的顾客，你还没有 <a href='./login.html' class="a_eu">登录</a> 哦，所有商品价格、活动信息以登录后显示为准`;
    str += "</div>"
    str += "<div class='order-pay'>"
    str += "</div>"
    str += "<div class='bottom-tab'>"
    str += "<span class='bottom-title'>为您优选</span><span class='bottom-title'>最近浏览</span>"
    str += "<span class='change'>换一批</span>"
    str += "</div>"
    str += "<div class='individual-slide'>"
    str += "<div class='slide-panel'>"
    str += "</div>"
    str += "<div class='slide-panel'>"
    str += "</div>"
    str += "</div>"
    return str;
  }
}