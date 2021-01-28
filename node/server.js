var http = require("http");
var fs = require('fs')

var documentRoot = 'F:/GP22-JS/yohoBuy/src';
var server = http.createServer(serverHandler)
function serverHandler(req,res){
  var url = req.url;
  var file = documentRoot + url;
  fs.readFile(file,function(err,data){
    if(err){
      res.writeHeader(404,{
        'content-type' : 'text/plain;charset="utf-8"'
    });
    res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
    res.end();
    }else{
      res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    res.write(data);//将index.html显示在客户端
    res.end();
    }
  })
}
server.listen(4001,"localhost",function(){
  console.log("服务开启")
})