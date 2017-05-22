var http = require('http');

export default function Request(req,res,url,port){
   headers.host = req.hostname;
    var options = {
   	hostname: url,
   	port: port,
   	method: req.method,
   	path: '/users/getUser',
   	headers: headers
   }
}

var app = http.createServer(function(req,res){
   var headers = req.headers;
   console.log("headers:", req.headers);
   headers.host = "127.0.0.1:3000";
   var options = {
   	hostname: '127.0.0.1',
   	port: '3000',
   	method: 'GET',
   	path: '/users/getUser',
   	headers: headers
   }
   var sreq = http.request(options,function(sres) {
   	  console.log('STATUS: ' + sres.statusCode); 
   	  sres.on("data",function(data){
   	  	  console.log(data);
          //var data = json.parse(data);
          //res.setEncoding("utf-8");
          res.setHeader("content-type","application/json; charset=utf-8");
          //res.contentType("application/json");
          res.write(data);
          res.end();
   	  });
   	  sres.on("end",function(data) {
   	  	  console.log("end ", data);
   	  	// body...
   	  })
   });
   //sreq.setEncoding("utf-8");
   sreq.on("error",function(e) {
   	 console.log(e.message);
   	 res.write(e.message);
   	 res.end();
   });
   sreq.end();
});

app.listen("8989");
console.log("listen in 8989");