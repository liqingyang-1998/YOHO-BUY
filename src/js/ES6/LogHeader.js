import Utils from './Utils.js';
export default class LogHeader {
  constructor() {
    this.elem = Utils.ce("div")
    this.elem.className = "top center-content clear"
    this.elem.innerHTML = this.renderHTML();
  }
  renderHTML() {
    var str = "";
    str += `<a class="logo" href="index.html"><img src="https://static.yohobuy.com/newheader/img/logo_e.png?imageView2/2/interlace/1/q/75" alt="logo"></a>`;
    str += `<ul>
      <li>Hi~ [ <a href="./login.html">请登录</a> ] [<a href="#">免费注册</a> ]</li>
      <li><a href="#">MY有货</a></li>
      <li><a href="#">订单中心</a></li>
      <li><a href="#">客户服务</a></li>
    </ul>`
    return str;
  }
  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.elem);
  }
}