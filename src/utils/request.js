var http = require('http');

module.exports = function Request(req,res,params){ 
  req.headers["cache-control"] = "no-cache"; //禁用缓存
  let options = {
   	hostname: params.url,
   	port: params.port,
   	method: req.method,
   	path: params.path,
   	headers: req.headers,		   
  }; 
  let bodyChunks = []; 
  return new Promise((resolve,reject) => {
    debugger;
	var sreq = http.request(options,function(sres){
		debugger;
		res.writeHead(sres.statusCode, sres.headers);
      sres.pipe(res);
		sres.on("data",data => {
      bodyChunks.push(data);
		}).on("end", () => {
		  resolve(Buffer.concat(bodyChunks).toString("utf-8"));
		}).on("error", err => {
			debugger;
		  reject(err);
		});
	});
	if (/POST|PUT/i.test(req.method)) {
      req.pipe(sreq);
    } else {
      sreq.end();
    }
	sreq.on("error", err => {
		debugger;
		reject(err);
	});	
  });  
}