var http = require("http");
var server = http.createServer(serverHandler)
function serverHandler(req,res){
  res.end();
}
server.listen(4001,"localhost",function(){
  console.log("服务开启")
})