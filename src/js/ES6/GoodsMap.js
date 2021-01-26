import Utils from "./Utils.js"
export default class GoodsMap{
  constructor(data,bool=false){
    this.elem = Utils.ce("div");
    this.elem.className = "Box";
    this.elem.innerHTML = this.renderHTML(data,bool);
  }
  appendTo(parent){
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    // this.ready();
  }
  renderHTML(data,bool){
    var str = "";
    var title = data.shift()
    str += "<div class='map-header'>";
    str += `<h2 class='title'>${title}</h2>`;
    str += "</div>" ;
    str += "<ul class='g-list clear'>"
    console.log(data);
    str += data.reduce(function(value,item){
      return value+`<li><a href="#"><img src="${item}"></a></li>`;
    },"")
    str += "</ul>"
    return str;
  }
}