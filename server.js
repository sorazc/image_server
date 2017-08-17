var app = require("./app")
    ,http = require("http");

var server = http.createServer(app).listen(3000 ,function() {
    console.log("服务器已启动 正在监听:%s", 3000);
})