import Utils from "./Utils.js";
export default class ShopCart{
  step = ["查看购物车","填写订单","付款，完成购买"];
  close;
  tip;
  titleBtns;
  prev;
  dataList;
  ids=document.cookie.split("; ");
  minus;
  plus;
  num;
  total=[];
  delBnt;
  constructor(data){
    this.dataList = data;
    this.elem = Utils.ce("div");
    this.elem.className = "center-content"
    this.elem.innerHTML = this.renderHTML(data); 
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
  renderHTML(data){
    var str = "";
    str += "<div class='cart-title'>";
    str += "<ul class='shopping-step'>"
    str +=  this.step.reduce(function(value,item,index){
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
    str += "<div class='pay-wapper'>"
    if(!this.ids[0]){
      str += `<div class='cart-empty'><p>购物车空空的哦，去看看心仪的商品吧~</p><a href='./ProductList.html'>去购物</a></div>`
    }else{
      str += `<div class='car-title'><p class='left' style='width:6%'>全选</p><p style='width:35%'>商品信息</p><p style='width:13%'>单价</p><p style='width:15%'>数量</p><p style='width:16%'>小计</p><p class='right' style='width:11.8%'>操作</p></div>`;
      str += `<div class='cart-table'>`;
      for(let i = 0; i<this.ids.length; i++){
        let id = this.ids[i].split("=")[0];
        this.total.push(data[id].nowprice);
        str += `<div class='table-group clear'><div class='pay-pro td' style='width:368px'><i></i><a class='pay-pro-icon'><img src='${data[id].showImg[0]}'></a><p class='pay-pro-info'><a href='#'>${data[id].title}</a><em class='pay-pro-detail'><span><b>颜色：${data[id].color[0].split("|")[1]}</b>尺码：${this.ids[i].split("=")[1]}</span></em></p></div>
        <div class='product-price td' style='width:148px'><p class='p-product-price'>￥${data[id].nowprice.toFixed(2)}</p></div>
        <div class='cart-num td' style='width:128px'><div class='cont'><span class='minus cart-num-btn'>-</span><input type='text' value='1'><span class='plus cart-num-btn'>+</span></div></div>
        <div class='sub-total td' style='width:160px'>￥${this.total[i].toFixed(2)}</div>
        <div class='cart-operation td' style='width:100px'><span class='cart-del-btn'>删除</span></div>
        </div>`
      }
      str +=`</div>`;
    }

    str += "</div></div></div></div>"
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