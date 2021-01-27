import Utils from "./Utils.js"
export default class Carousel{
  docs;
  right;
  left;
  imgList;
  imgs;
  prev;
  pos=0;
  imgPrev;
  time = 300;
  bool = true;
  constructor(data){
    this.imgList = data;
    this.elem = Utils.ce("div");
    this.elem.className = "center-content"
    this.elem.innerHTML = this.renderHTML(data);
  }
  appendTo(parent){
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    this.ready();
    if(this.prev === undefined){
      this.prev = this.docs[0];
      console.log()
    }
  }
  ready(){
    let ul = this.elem.querySelector("ul");
    let bnt = this.elem.querySelector(".bnt");
    this.imgs = this.elem.querySelectorAll("img")
    this.elem.addEventListener("mouseover",e=>this.mousehandler(e))
    this.elem.addEventListener("mouseout",e=>this.mousehandler(e))
    ul.addEventListener("click",(e)=>this.clickhandler(e));
    this.docs = ul.querySelectorAll("li");
    this.left = bnt.querySelector(".prev");
    this.right = bnt.querySelector(".next");
    this.left.addEventListener("click",e=>this.bntClickhandler(e));
    this.right.addEventListener("click",e=>this.bntClickhandler(e));
    this.change(this.docs[this.pos])
    this.imgChange(this.imgs[this.pos]);
  }
  bntClickhandler(e){
    if(e.currentTarget === this.left){
      this.pos--;
      if(this.pos<0) this.pos=this.imgList.length-1;
    }else{
      this.pos++;
      if(this.pos>this.imgList.length-1) this.pos = 0;
    }
    this.imgChange(this.imgs[this.pos]);
    this.change(this.docs[this.pos])
  }
  clickhandler(e){
    e.preventDefault();
    if(e.target.nodeName !== "LI") return;
    this.pos = Array.from(this.docs).indexOf(e.target)
    console.log(this.pos);
    let imgFocus = this.imgs[this.pos];
    this.imgChange(imgFocus);
    this.change(e.target);
    // console.log(index);
  }
  change(elem){
    if(this.prev){
      this.prev.removeAttribute("class");
    }
    this.prev = elem;
    this.prev.className = "focus";
  }
  imgChange(img){
    if(this.imgPrev){
      this.imgPrev.removeAttribute("class")
    }
    this.imgPrev = img;
    this.imgPrev.className = "img-focus";
  }
  renderHTML(data){
    let str = "";
    // console.log(data);
    str += "<div class='imgBox'>"
    str += data.reduce(function(value,item){
      return value+`<img src='${item}'>`;
    },"")
    str += "<ul>"
    str += data.reduce(function(value){
      // console.log(value)
      return value+"<li></li>"
    },"")
    str += "</ul>"
    str += "<div class='bnt'>"
    str += "<a class='prev' href='javascript:void(0)'><span class='iconfont icon-shangyige'></span></a>"
    str += "<a class='next' href='javascript:void(0)'><span class='iconfont icon-xiayige'></span></a>"
    str += "</a>"
    str += "</div>"
    return str;
  }
  mousehandler(e){
    if(e.type === "mouseover"){
      this.bool = false;
      this.time = 300;
    }
    if(e.type === "mouseout")
    this.bool = true;
  }
  autoplay(){
    if(!this.bool) return;
    this.time--;
    if(this.time>0)  return;
    this.time = 300;
    var evt = new MouseEvent("click");
    this.right.dispatchEvent(evt);  
  }
}