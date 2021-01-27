import Utils from "./Utils";

export default class SecondaryMenu{
  constructor(data){
    this.elem = Utils.ce("div");
    this.elem.className = "secondaryMenu"
    this.elem.innerHTML = this.renderHTML(data)
  }
  renderHTML(data){
    var str = "";
    return str;
  }
}