
export default class Utils{
    static ce(type,style,parent,prop){
        var elem=document.createElement(type);
        Object.assign(elem.style,style);
        if(typeof parent==="string") parent=document.querySelector(parent);
        if(parent) parent.appendChild(elem);
        if(prop) Object.assign(elem,prop);
        return elem;
    }
    static randomColor(){
        var col="#";
        for(var i=0;i<6;i++){
            col+=Math.floor(Math.random()*16).toString(16);
        }
        return col
    }
    static addStyle(selector,style){
        var styleSheet=document.styleSheets[document.styleSheets.length-1];
        if(!styleSheet){
            var styles=document.createElement("style");
            document.head.appendChild(styles);
            styleSheet=document.styleSheets[document.styleSheets.length-1];
        }
        var str=Object.keys(style).reduce(function(value,item){
            return value+item.replace(/[A-Z]/g,function(t){
                return "-"+t.toLowerCase();
            })+":"+style[item]+";";
        },"");

       styleSheet.addRule(selector,str,styleSheet.cssRules.length);
    }
    static loadImage(srcList,fn,basePath,imgType){
        if(basePath){
            srcList=srcList.map(function(item){
                if(item.indexOf("/")>-1) return item;
                return  basePath.slice(-1)==="/" ? basePath+item : basePath+"/"+item;
            })
        }
        if(imgType){
            srcList=srcList.map(function(item){
                if(item.slice(-5).indexOf(".")>-1) return item;
                return item+(imgType.indexOf(".")===0 ? imgType : "."+imgType);
            })
        }
        var img=new Image();
        img.src=srcList[0];
        img.list=[];
        img.srcList=srcList;
        img.fn=fn;
        img.addEventListener("load",Utils.loadHandler);
    }
    static loadHandler(e){
        var img=e.currentTarget;
        img.list.push(img.cloneNode(false));
        if(img.list.length===img.srcList.length){
            if(img.fn){
                img.fn(img.list);
            }else{
                var evt=new Event("loadImageFinish");
                evt.list=img.list;
                document.dispatchEvent(evt);
            }
            return;
        }
        img.src=img.srcList[img.list.length];
    }
    static dragOn(elem,range){
        elem.addEventListener("mousedown",Utils.mouseHandler);
        if(range){
            if(range.width===undefined || range.width<0) range.width=0;
            if(range.height===undefined || range.height<0) range.height=0;
            range.width= range.width-elem.offsetWidth>0 ?range.width-elem.offsetWidth : 0;
            range.height=range.height-elem.offsetHeight>0 ?range.height-elem.offsetHeight : 0;
        }
        elem.range=range;

    }
    static dragOff(elem){
        elem.removeEventListener("mousedown",Utils.mouseHandler);
    }
    static mouseHandler(e){
        if(e.type==="mousedown"){
            var elem=e.currentTarget;
            e.preventDefault();
             document.addEventListener("mousemove",Utils.mouseHandler);
             document.addEventListener("mouseup",Utils.mouseHandler);
             elem.offsetX=e.offsetX;
             elem.offsetY=e.offsetY;
             elem.style.zIndex=99;
             document.div=elem;
        }else if(e.type==="mousemove"){
            var rect={x:0,y:0,width:0,height:0,left:0,right:0};
            
            if(e.target!==document.div)  rect=document.div.rect ? document.div.rect : rect;
            else{
                for(var i=1;i<e.path.length-2;i++){
                    if(getComputedStyle(e.path[i]).position==="relative" || getComputedStyle(e.path[i]).position==="absolute"){
                        rect=e.path[i].getBoundingClientRect();
                        break;
                    }
                }
            }
            var x=e.clientX-rect.x-document.div.offsetX;
            var y=e.clientY-rect.y-document.div.offsetY;
            if(document.div.range){
                if(x<0) x=0;
                if(x>document.div.range.width)x=document.div.range.width;
                if(y<0) y=0;
                if(y>document.div.range.height)y=document.div.range.height;
            }
            document.div.style.left=x+"px";
            document.div.style.top=y+"px";
            document.div.rect=rect;
        }else if(e.type==="mouseup"){
            this.div.style.zIndex=0;
             document.removeEventListener("mousemove",Utils.mouseHandler);
             document.removeEventListener("mouseup",Utils.mouseHandler);
        }
    }
    static changeCSSStr(str){
        return str.replace(/;|-\w/g,function(item){
            if(item===";") return ",";
            return item[1].toUpperCase();
        }).replace(/(?<=:).*?(?=,)/g,function(item){
             return "'"+item.trim()+"'";
        })
    }
    static setStyles(str,title){
        var arr=str.split(/(?<=\})\B/);
        var styleSheet=document.styleSheets;
         if(!styleSheet.length===0 || Array.from(styleSheet).every(item=>item.title!==title)){
                var styles=document.createElement("style");
                styles.title=title;
                document.head.appendChild(styles);
                styleSheet=styleSheet[document.styleSheets.length-1];
        }else{
            styleSheet=Array.from(styleSheet).filter(item=>item.title===title)[0];
        }
        arr.forEach(item=>{
            item=item.trim().replace(/\n/g,"");
            if(!item)return;
            var arr1=item.match(/^(.*?)\{(.*?)\}$/).slice(1);
            styleSheet.addRule(arr1[0].trim(),arr1[1].trim(),styleSheet.cssRules.length)
            // styleSheet.insertRule(item,styleSheet.cssRules.length);
        })
    }
}   