import Utils from "./Utils.js";
export default class SecondaryMenu{
  list=["上装","下装","热门品牌","鞋履","包","服饰","首饰"];
  dl;
  constructor(data){
    this.elem = Utils.ce("div");
    this.elem.className = "secondaryMenu"
    this.elem.innerHTML = this.renderHTML(data)
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
  }
  renderHTML(data){
    var str = "";
    str += "<div class='center-content'>"
    str += this.createDl(data.menu);
    str += "<div class='show'>"
    str +=  `<a href='#'><img src="${data.right[0]}"></a>`
    str += `<a href='#' class='title'>${data.right[1]}</a>`
    str += "</div>"
    str += "</div>"
    return str;
  }
  createDl(_data,str){
    if(!str) str = "";
    str += "<dl>"
    str += _data.splice(0,9).reduce((value,item)=>{
        return value+`${this.list.indexOf(item)>-1?"<dt>"+item+"</dt>":"<dd>"+item+"</dd>"}`;
      },"")
    str += "</dl>"
    if(_data.length) return this.createDl(_data,str);
    return str;
  }
}