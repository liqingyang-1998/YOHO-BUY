import Utils from "./Utils.js"
export default class Goods{
  constructor(data){
    this.elem = Utils.ce("div")
    this.elem.className = "good-info"
    this.elem.innerHTML = this.renderHTML(data);
  }
  appendTo(parent){
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);

  }
  renderHTML(_data){
    var shop = Object.keys(_data)
    var str = "";
    str += "<div class='good-img'>"
    str += `<a href='./productDetails.html'><img src='${_data.imgsrc}'><a>`
    if(_data.sellOut){
      str += "<p class='few-tag'>即将售罄</p>"
    }
    str += "</div>"
    str += "<div class='good-text'>"
    str += `<a href='#'>${_data.title}</a>`
    str += `<p class='brand'>${_data.shop}</p>`
    str += `<p class='price'><span class='market-price'>￥${_data.oldPrice.toFixed(2)}</span><span class='sale-price'>￥${_data.nowPrice.toFixed(2)}</span></p>`
    str += "</div>";
    return str;
  }
}