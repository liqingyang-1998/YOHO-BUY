import Utils from "./Utils.js"
export default class ProductList{
  filterList={
    "性别":["BOYS","GIRLS"],
    "价格":["￥0-259","￥260-349","￥350-509","￥509以上"],
    "颜色":["红色#ee0000","白色#FFF","橙色#ff5c01","黑色#333","灰色#b9b7af","棕色#8b5402","绿色#47ba17","蓝色#0000fe","紫色#710098","黄色#ffeb00"],
    "高级选项":["风格"]
  }
  sortList=["默认","人气","新品","价格","折扣","打折"]
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
    
  }
  renderHTML(){
    var str = "";
    str += "<div class='banner'>"
    str += "<div class='wrap'>"
    str += "<a href='#'><span></span>店铺首页</a><a href='#'><span></span>店铺介绍</a>"
    str += "<div class='qrcode-box'>"
    str += "<span class='qrcode-icon'></span>"
    str += "</div>"
    str += "</div>"
    str += "</div>"
    str += "<div class='clear'><a href='./index.html' class='path'>BOYS首页</a>"
    str += "<div class='list-left'>"
    str += "</div>"
    str += "<div class='list-right'>"
    str += "<div class='filter-box'>"
    // str += `<dl><dt><dt><dl>`
    let title = Object.keys(this.filterList);
    str += title.reduce((value,item)=>{
      return value+`<dl class='clear'><dt>${item}：</dt>${item === "颜色"?this.filterList[item].reduce((value1,item1)=>{
        return value1+`<dd><span style='background: #${item1.split("#")[1]}'></span>${item1.split("#")[0]}</dd>`;
      },""):this.filterList[item].reduce((value1,item1)=>{
        return value1+`<dd>${item1}</dd>`;
      },"")}</dl>`
    },"")
    str += "</div>"
    str += `<div class='sort'>${this.sortList.reduce((value,item)=>{
      return value+`<a href="#" class='sort-type'>${item}<span></span></a>`
    },"")}<div class="pager-wrap">
    <div class="count"><span></span>每页</div>
    <p class="orient"><span></span></p>
    </div></div>`
    str += "<div class='goods-container clear'></div>"
    str += "</div>"
    return str;
  }
}