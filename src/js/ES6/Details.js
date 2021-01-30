import Utils from "./Utils.js";
export default class Details{
  move;
  moveover;
  max;
  bigimg;
  thumbsWrap;
  thumbs;
  choseSize;
  choseColor;
  prevImg;
  prevChoseSize;
  prevChoseColor;
  size;
  colors;
  colorsLi;
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
    this.move = this.elem.querySelector(".move");
    this.moveover = this.elem.querySelector(".move-over");
    this.max = this.elem.querySelector(".max");
    this.bigimg = this.elem.querySelector("#big");
    this.thumbsWrap = this.elem.querySelector(".thumbs-wrap");
    this.thumbs = this.elem.querySelectorAll(".thumb");
    this.size = this.elem.querySelector(".size")
    this.colors = this.elem.querySelector(".colors")
    this.colorsLi = this.colors.querySelectorAll("li")
    this.colors.addEventListener("click",e=>this.ClickHandler(e))
    this.size.addEventListener("click",e=>this.ClickHandler(e))
    this.thumbsWrap.addEventListener("mouseover",e=>this.thmouseHandler(e));
    this.moveover.addEventListener("mouseover",e=>this.mouseHandler(e));
    this.moveover.addEventListener("mousemove",e=>this.mouseHandler(e));
    this.moveover.addEventListener("mouseout",e=>this.mouseHandler(e));
    this.updata();
  }
  ClickHandler(e){
    if(e.target.nodeName !== "LI") return;
    if(e.currentTarget === this.size)this.sizeChange(e.target);
    if(e.currentTarget === this.colors) this.colorChange(e.target);    
  }
  updata(){
    if(!this.prevChoseColor) this.prevChoseColor = this.colorsLi[0];
    this.prevChoseColor.classList.add("focus");
  }
  colorChange(elem){
    if(this.prevChoseColor){
      this.prevChoseColor.classList.remove("focus");
    }
    this.prevChoseColor = elem;
    this.prevChoseColor.classList.add("focus");
  }
  sizeChange(elem){
    if(this.prevChoseSize){
      this.prevChoseSize.className = "";
    }
    this.prevChoseSize = elem;
    this.prevChoseSize.className = "focus";
  }
  thmouseHandler(e){
    if(e.target.nodeName !== "IMG") return;
    this.thumbChange(e.target);
  }
  thumbChange(elem){
    // console.log(elem);
    if(this.prevImg){
      this.prevImg.classList.remove("active");
    }
    this.prevImg = elem;
    this.prevImg.classList.add("active");
  }
  mouseHandler(e){
    if(e.type === "mouseover"){
      this.move.classList.remove("hide");
      this.max.classList.remove("hide");
    }
    if(e.type === "mousemove"){
      let x = e.offsetX-157;
      let y = e.offsetY-157;
      if(x<=0) x=0;
      if(x>=106) x=106;
      if(y<=0) y=0;
      if(y>=246) y=246 
      this.move.style.left = x+"px";
      this.move.style.top = y+"px";
      this.bigimg.style.left = -1000/560*x+"px"
      this.bigimg.style.top = -1000/560*y+"px"
    }

    if( e.type === "mouseout"){
      this.move.classList.add("hide")
      this.max.classList.add("hide")
    }
  }
  renderHTML(){
    var str = "";
    str += "<div class='banner'>"
    str += "<div class='center-content clear'>"
    str += `<a class='pull-left' href='./productList.html'><img src='https://img10.static.yhbimg.com/yhb-img01/2017/11/03/11/01c2cfe93dcbd3b42e94ec3465176a8cc6.jpg?imageMogr2/thumbnail/45x45/extent/45x45/background/d2hpdGU=/position/center/quality/90'></a>`
    str += `<div class='pull-right opt'><a class='home' href='./index.html'><span>home<span></a>`
    str += "</div></div></div>"
    str += "<div class='center-content'>"
    str += "<div class='detailsBox clear'>"
    str += `<div class='pull-left imgs clear'>
    <div class='pull-left img'><div class='tags clear'></div><div class='min-img'>
    <img class='img-show' src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/016bb494dee5a81d197abf89e51bdc0ab2.jpg?imageMogr2/thumbnail/420x560/background/d2hpdGU=/position/center/quality/80'>
    <div class='move hide'></div>
    <div class='move-over'></div>
    <div class='max hide'><img id='big' src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/016bb494dee5a81d197abf89e51bdc0ab2.jpg?imageMogr2/thumbnail/750x1000/background/d2hpdGU=/position/center/quality/80'></div>
    </div></div>
    <div class='pull-right thumbs'>
    <div class='thumbs-wrap'><img class='thumb'src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/016bb494dee5a81d197abf89e51bdc0ab2.jpg?imageMogr2/thumbnail/75x100/background/d2hpdGU=/position/center/quality/80'><img class='thumb'src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/01d17cf10b70f2e9067dd9d7813d6abd19.jpg?imageMogr2/thumbnail/75x100/background/d2hpdGU=/position/center/quality/80'></div>
    </div>
    </div>`
    str += `<div class='pull-right infos'>`
    str += `<h1 class='name'>name</h1><div class='line'></div>`
    str += `<p class='market-price'><span class='price-row'><span class='title'>吊牌价：</span><span class='price other-price'>price</span></span><br><span class='promotion-price'><span class='title'>促销价：</span><span class='price'>price</span></span><span class='desc'><span class='promotion'>7.0折</span></span></p>`
    str += '<div class="row activity-wrapper clear">'
    str += "<span class='pull-left title'>促&nbsp;&nbsp;销：</span>"
    str += `<div class='activity-title'><span>展开全部促销</span></div>`
    str += `<div class='pull-left'><ul class='activity'><li class='promotion-item'><span class='type'>type</span><span class='des'>des</span></li></ul></div></div>`;
    str += "<div class='line'></div>"
    str += '<div class="trade-content">'
    str += "<div class='type-chose'>"
    str += `<div class='chose-color row clear'><span class='title pull-left'>颜色 ：</span><ul class='colors pull-left clear'><li class="pull-left"><img src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/016bb494dee5a81d197abf89e51bdc0ab2.jpg?imageMogr2/thumbnail/25x32/background/d2hpdGU=/position/center/quality/80'><span class='color-name'>黑</span></li><ul></div>`
    str += `<div class='chose-size row clear'><span class='title pull-left'>尺码 ：</span><div class='sizes pull-left'><ul class='size'><li class=''>S<li></ul><p class='color-size-tip'>165-80A</p></div></div>`
    str += `<div class='chose-count row clear'><span class='title pull-left'>数量：</span><div class='num-wraper pull-left clear'><span class='minus-plus pull-left'></span><span id='num' class='num pull-left'>1</span><span class='minus-plus pull-left'></span></div></div>`
    str += "<div class='line'></div>"
    str += `<span id='add-to-cart' class='buy-btn buy'>加入购物车</span>`
    str += `<span id='sold-out' class='buy-btn dis hide'>已售罄</span>`
    str += `<span id='enable-notify' class='buy-btn hide'>到货通知</span>`
    str += `<span id='collect-product' class='collect-product'>收藏商品</span>`
    str += `<div class='support-service'><span class='title'>服务说明：</span><span class='item'>品牌保障</span><span class='more'>更多</span></div>`
    str += `<span class='code-buy'></span>`
    str += "</div></div></div></div></div>"
    str += "<div class='total-content'>"
    str += "</div>"
    str += "<div class='after-service'>"
    str += "</div>"
    str += "</div>"
    return str;
  }
}