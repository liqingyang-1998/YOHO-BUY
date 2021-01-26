import Utils from "./Utils.js";
export default class Goods {
  static styleBool = false;
  static classObj = {
    tag1: ["自营", "本地仓"],
    tag2: ["放心购", ""],
    tag3: ["新品"],
    tag4: ["免邮", "赠", "券99-5", "京东物流", "券980-60", "券99-10", "满99-11"],
  };
  static bodyChilds = false;
  prev;
  iconList;
  id;
  static ADD_GOODS_EVENT = "add_goods_event";
  constructor(data) {
    this.elem = Utils.ce("a");
    this.elem.className = "goods";
    if (data) this.renderHTML(data);
    if (!Goods.styleBool) Goods.setStyle();
    this.elem.addEventListener("click", e => this.clickHandler(e));
  }

  clickHandler(e) {
    var evt = new Event(Goods.ADD_GOODS_EVENT, {
      bubbles: true
    });
    evt.id = this.id;
    this.elem.dispatchEvent(evt);
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
    if (!document.querySelector(".goods")) return;
    Goods.bodyChilds = true;
    this.ready();
  }
  ready() {
    this.iconList = this.elem.querySelector(".iconList");
    this.iconImg = this.elem.querySelector(".iconImg");
    this.price = this.elem.querySelector(".price");
    var icon = this.elem.querySelector(".icon");
    this.elem.addEventListener('mouseover', e => this.mouseHandler(e));
    var evt = new MouseEvent("mouseover", {
      bubbles: true
    });
    icon.dispatchEvent(evt);
  }
  mouseHandler(e) {
    if (e.target.className !== "icon") return;
    var img, li;
    img = e.target;
    li = e.target.parentElement;
    var index = Array.from(this.iconList.children).indexOf(li);
    this.id = this.data.ids[index];
    this.iconImg.src = img.src;
    this.price.textContent = this.data.price[index];
    if (this.prev) {
      this.prev.style.border = "1px solid #ddd";
      this.prev.style.padding = "1px";
    }
    this.prev = li;
    this.prev.style.boder = '2px solid #e4393c';
    this.prev.style.padding = "0px";
  }
  renderHTML(data) {
    this.data = data;
    var str = "";
    str += `<div class="showImgCon"><img class='iconImg' src=''>${data.subscribeing
            ? '<div class="subscribeing"><img src="./img/presell.gif">预约中</div>'
            : ""
        }</div>`;
    str += "<div class='infoCon'>";
    str += `<ul class="iconList clear">`;
    str += data.icons.reduce((value, item) => {
      return (
        value +
        `<li><img class='icon' src='${item}'></li>`
      );
    }, "");
    str += `</ul>`;
    str +=
      "<div class='priceCon'><span>￥</span><span class='price'></span></div>";
    str += `<div class="title">${data.title}</div>`;
    str += "<div class='infoSpanCon clear'>";
    str += data.info.reduce((value, item) => {
      return value + `<span class="infoSpan">${item}</span>`;
    }, "");
    str += "</div>";
    str += "<div class='comment'>";
    str +=
      (data.commentCount > 10000 ?
        parseInt(data.commentCount / 1000) / 10 + "万" :
        data.commentCount) + "+<span>条评价<span>";
    str += "</div>";
    str += `<div class="shopName"><span>${data.goodShop ? '<img src="./img/goodShop.png">' : ""
        }${data.shopName}</span><img src='./img/chat.png'></div>`;
    str += "<div>";
    str += data.tags.reduce((value, item) => {
      var className = Object.keys(Goods.classObj).filter((key) =>
        Goods.classObj[key].includes(item)
      );
      className = className.length === 0 ? "" : className[0];
      return value + `<span class='${className}'>${item}</span>`;
    }, "");
    str += "</div>";
    str += "</div>";
    this.elem.innerHTML = str;
    if (Goods.bodyChilds) this.ready();
  }


  static setStyle() {
    Goods.styleBool = true;
    Utils.setStyles(`.goods {
        width: 240px;
        height: 466px;
        position: relative;
        float: left;
        margin: 10px;
        display:block;
        text-decoration: none;
        color:#000;
      }
      .goods:hover
      {
        box-shadow: 0px 0px 4px #CCCCCC;
      }
      .showImgCon {
        width: 220px;
        height: 220px;
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
      }
      .subscribeing {
        position: absolute;
        bottom: 0;
        width: 210px;
        height: 20px;
        padding-left: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 12px;
        padding-top: 5px;
      }
      .subscribeing > img {
        vertical-align: middle;
        margin-right: 5px;
      }
      .iconList {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 10px;
      }
      .clear::after {
        content: "";
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
      }
      .iconList > li {
        float: left;
        margin-left: 5px;
        border: 1px solid #ddd;
        padding: 1px;
      }
      .iconList > li:first-child {
        margin-left: 0;
      }
      .icon {
        width: 25px;
        height: 25px;
      }
      .infoCon {
        width: 220px;
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
      }
      .priceCon {
        margin-top: 5px;
        color: #e4393c;
        font: 16px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
          "\u5b8b\u4f53", sans-serif;
      }
      .price {
        font-weight: 400;
        font-family: Verdana;
        font-size: 20px;
      }
      .title {
        font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
          "\u5b8b\u4f53", sans-serif;
        height: 22px;
        line-height: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
      }
      .infoSpan {
        float: left;
        height: 19px;
        line-height: 19px;
        padding: 1px 6px;
        margin-right: 7px;
        background: #f4f4f4;
        display: block;
        font-size: 12px;
        color: #999;
        user-select: none;
      }
      .infoSpan:hover {
        color: #e4393c;
      }
      .infoSpanCon {
        margin: 5px 0px;
      }
      .comment {
        color: #646fb0;
        font-family: verdana;
        font-weight: 700;
        font-size: 12px;
      }
      .comment > span {
        color: #a7a7a7;
        font-weight: 400;
      }
      .shopName {
        margin-top: 5px;
       
        font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
          "\u5b8b\u4f53", sans-serif;
      }
      .shopName>span{
        display: inline-block;
        max-width: 122px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 5px;
      }

      .tag1 {
        float: left;
        height: 16px;
        line-height: 16px;
        padding: 0 3px;
        margin-right: 3px;
        overflow: hidden;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
        background: #e23a3a;
        color: #fff;
        cursor: default;
        border-radius: 2px;
      }
      .tag2 {
        border:1px solid #4d88ff;
        color: #4d88ff;
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 3px;
        margin-right: 3px;
        overflow: hidden;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
        border-radius: 2px;
      }
      .tag3 {
        background: #31c19e;
        float: left;
        height: 16px;
        line-height: 16px;
        padding: 0 3px;
        margin-right: 3px;
        overflow: hidden;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
        color: #fff;
        cursor: default;
        border-radius: 2px;
      }

      .tag4 {
        float: left;
        height: 14px;
        line-height: 14px;
        padding: 0 3px;
        border: 1px solid #e23a3a;
        margin-right: 3px;
        overflow: hidden;
        text-align: center;
        font-style: normal;
        font-size: 12px;
        font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
        border-radius: 2px;
        color: #e23a3a;
      }`, "goods");
  }
}