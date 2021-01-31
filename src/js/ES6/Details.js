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
  idSize;
  colors;
  colorsLi;
  imgShow;
  pos=0;
  dataList;
  recBtn;
  addBtn;
  numText;
  num=1;
  addToCart;
  typeChose;
  balance;
  balanceBtns;
  sizeWarn;
  id;
  ids=[];
  constructor(data,id){
    this.dataList = data;
    this.id = id;
    this.elem = Utils.ce("div");
    this.elem.innerHTML = this.renderHTML(data);
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
    this.size = this.elem.querySelector(".size");
    this.sizeWarn = this.elem.querySelector(".size-warn");
    var btns = this.elem.querySelectorAll(".minus-plus");
    this.recBtn = btns[0];
    this.addBtn = btns[1];
    this.addToCart = this.elem.querySelector("#add-to-cart")
    this.typeChose = this.elem.querySelector(".type-chose");
    this.balance = this.elem.querySelector(".balance")
    this.balanceBtns = this.balance.querySelector(".balance-btns")
    this.addToCart.addEventListener("click",e=>this.addToCartClickhandler(e))
    this.balanceBtns.addEventListener("click",e=>this.addToCartClickhandler(e))
    this.numText = this.elem.querySelector("#num")
    this.recBtn.addEventListener("click",e=>this.btnsClickHandler(e))
    this.addBtn.addEventListener("click",e=>this.btnsClickHandler(e))
    this.colors = this.elem.querySelector(".colors")
    this.colorsLi = this.colors.querySelectorAll("li")
    this.imgShow = this.elem.querySelector(".img-show")
    this.colors.addEventListener("click",e=>this.ClickHandler(e))
    this.size.addEventListener("click",e=>this.ClickHandler(e))
    this.thumbsWrap.addEventListener("mouseover",e=>this.thmouseHandler(e));
    this.moveover.addEventListener("mouseover",e=>this.mouseHandler(e));
    this.moveover.addEventListener("mousemove",e=>this.mouseHandler(e));
    this.moveover.addEventListener("mouseout",e=>this.mouseHandler(e));
    this.updata();
  }
  addToCartClickhandler(e){
    if(e.currentTarget === this.addToCart){
      let lis = this.size.querySelectorAll("li");
      Array.from(lis).forEach(item => {
        if(!item.className.includes("focus")){
          this.sizeWarn.classList.remove("hide")
          return;
        }
        for(var i = 0;i < this.num;i++){
          this.ids.push(this.id+"="+this.idSize);
        }
        let exp = new Date(); 
        exp.setTime(exp.getTime() + 10*24*60*60*1000);
        document.cookie=this.ids+";expires="+exp.toGMTString(); 
        console.log(document.cookie);
        this.sizeWarn.classList.add("hide")
        this.typeChose.classList.add("hide");
        this.balance.classList.remove("hide");
      }); 
    }else{
      if(e.target.nodeName === "SPAN"){
        this.typeChose.classList.remove("hide");
        this.balance.classList.add("hide");
      }
      if(e.target.nodeName === "A"){
        location.href = "./shoppingCart.html?true";
      }
    }  
  }
  btnsClickHandler(e){
    if(e.target === this.recBtn){
      this.num--;
      if(this.num<=1) this.num = 1;
    }else{
      this.num++;
      if(this.num>=99) this.num = 99;
    }
    this.numText.innerText = this.num;
  }
  ClickHandler(e){
    if(e.target.nodeName !== "LI") return;
    if(e.currentTarget === this.size)this.sizeChange(e.target);
    if(e.currentTarget === this.colors) this.colorChange(e.target);    
  }
  updata(){
    if(!this.prevChoseColor) this.prevChoseColor = this.colorsLi[this.pos];
    if(!this.prevImg) this.prevImg = this.thumbs[this.pos];
    this.prevChoseColor.classList.add("focus");
    this.prevImg.classList.add("active");
    this.imgShow.setAttribute("src",this.dataList.showImg[this.pos]);
    this.numText.innerText = this.num;
  }
  colorChange(elem){
    if(this.prevChoseColor){
      this.prevChoseColor.classList.remove("focus");
    }
    this.prevChoseColor = elem;
    this.prevChoseColor.classList.add("focus");
  }
  sizeChange(elem){
    if(elem.className.includes("disable")) return;
    if(this.prevChoseSize){
      this.prevChoseSize.className = "";
    }
    this.prevChoseSize = elem;
    this.prevChoseSize.className = "focus";
    this.idSize = this.prevChoseSize.innerText;
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
    this.pos = Array.from(this.thumbs).indexOf(elem);
    this.prevImg = elem;
    this.prevImg.classList.add("active");
    this.imgShow.setAttribute("src",this.dataList.showImg[this.pos]);
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
  renderHTML(_data){
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
    <img class='img-show'>
    <div class='move hide'></div>
    <div class='move-over'></div>
    <div class='max hide'><img id='big' src='https://img10.static.yhbimg.com/goodsimg/2020/06/18/17/016bb494dee5a81d197abf89e51bdc0ab2.jpg?imageMogr2/thumbnail/750x1000/background/d2hpdGU=/position/center/quality/80'></div>
    </div></div>
    <div class='pull-right thumbs'>
    <div class='thumbs-wrap'><img class='thumb'src='${_data.thumbs[0]}'><img class='thumb'src='${_data.thumbs[1]}'></div>
    </div>
    </div>`
    str += `<div class='pull-right infos'>`
    str += `<h1 class='name'>${_data.title}</h1><div class='line'></div>`
    str += `<p class='market-price'><span class='price-row'><span class='title'>吊牌价：</span><span class='price other-price'>￥${_data.oldprice}</span></span><br><span class='promotion-price'><span class='title'>促销价：</span><span class='price'>￥${_data.nowprice}</span></span><span class='desc'><span class='promotion'>${_data.promotion.toFixed(1)}折</span></span></p>`
    str += '<div class="row activity-wrapper clear">'
    str += "<span class='pull-left title'>促&nbsp;&nbsp;销：</span>"
    str += `<div class='activity-title'><span>展开全部促销</span></div>`
    str += `<div class='pull-left'><ul class='activity'>`;
    str += _data.actPro.reduce((value,item)=>{
      return value+`<li class='promotion-item'><span class='type'>${item.split("|")[0]}</span><span class='des'>${item.split("|")[1]}</span></li>`
    },"")
    str += `</ul></div></div>`;
    str += "<div class='line'></div>"
    str += '<div class="trade-content">'
    str += "<div class='type-chose'>"
    str += `<div class='chose-color row clear'><span class='title pull-left'>颜色 ：</span><ul class='colors pull-left clear'>`;
    str += _data.color.reduce((value,item)=>{
      return value+`<li class="pull-left"><img src='${item.split("|")[0]}'><span class='color-name'>${item.split("|")[1]}</span></li>`
    },"")
    str +=`<ul></div>`
    str += `<div class='chose-size row clear'><span class='title pull-left'>尺码 ：</span><div class='sizes pull-left'><ul class='size'>`;
    str += _data.size.reduce((value,item)=>{
      var key = Object.keys(item);
      return value+`<li ${item[key] === 0? 'class="disable"':""}>${key}</li>`
    },"");
    str += `</ul><p class='size-warn hide'>请选择尺码</p></div></div>`
    str += `<div class='chose-count row clear'><span class='title pull-left'>数量：</span><div class='num-wraper pull-left clear'><span class='minus-plus pull-left'>-</span><span id='num' class='num pull-left'></span><span class='minus-plus pull-left'>+</span></div></div>`
    str += "<div class='line'></div>"
    str += `<span id='add-to-cart' class='buy-btn buy'>加入购物车</span>`
    str += `<span id='sold-out' class='buy-btn dis hide'>已售罄</span>`
    str += `<span id='enable-notify' class='buy-btn hide'>到货通知</span>`
    str += `<span id='collect-product' class='collect-product'>收藏商品</span>`
    str += `<div class='support-service'><span class='title'>服务说明：</span><span class='item'>品牌保障</span><span class='more'>更多</span></div>`
    str += `<span class='code-buy'></span>`
    str += "</div></div>";
    str += `<div class='balance hide'><p class='success-tip'>该商品已成功添加到购物车</p><p class='balance-btns'><a class='go-cart buy-btn'>去购物车结算</a><span class='keep-shopping'>继续购物</span></p></div>`
    str +="</div></div></div>"
    str += "<div class='total-content'>"
    str += "</div>"
    str += "<div class='after-service'>"
    str += "</div>"
    str += "</div>"
    return str;
  }
}