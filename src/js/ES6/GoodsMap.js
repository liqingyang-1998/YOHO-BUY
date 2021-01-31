import Utils from "./Utils.js"
export default class GoodsMap{
  constructor(data,bool){
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
    if(title !== "人气单品"){
      str += `<a href='#'>MORE</a>`
    }
    str += "</div>" ;
    str += "<ul class='g-list clear'>"
    // console.log(data);
    if(bool===false){
      str += data.reduce(function(value,item){
        return value+`<li><a href="./ProductList.html" target='_blank'><img src="${item}"></a></li>`;
      },"")
    }else{
      var frist1 = data.splice(0,2);
      var frist = data.splice(0,4);
      var otherImg = data.splice(0,9);
      str += `<li>${frist1.reduce(function(value,item){
        return value+`<a href="./ProductList.html" target='_blank'><img src="${item}"></a>`
      },"")}</li>`
      str += frist.reduce(function(value,item,index){
        return value+`<li><a href="./ProductList.html" target='_blank'><img src="${item}"></a></li>`;
      },"")
      str += `<li class='goodsMap-list'>${data.reduce(function(value,item){
        return value+"<a href='#'>"+item+"</a>";
      },"")}</li>`
      str += otherImg.reduce(function(value,item){
        return value+`<li><a href="./ProductList.html" target='_blank'><img src="${item}"></a></li>`;
      },"")
    }
    
    str += "</ul>"
    return str;
  }
}