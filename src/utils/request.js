var http = require('http');

module.exports = function Request(req,res,params){ 
  req.headers["cache-control"] = "no-cache"; //禁用缓存
  // req.headers.host = params.url;
	// req.headers.origin = 'http://127.0.0.1:3000';
	// req.headers.referer = "http://127.0.0.1:3000";
  let options = {
   	hostname: params.url,
   	port: params.port,
   	method: req.method,
   	path: params.path,
   	headers: req.headers,		   
  }; 
  let bodyChunks = []; 
  return new Promise((resolve,reject) => {
		var sreq = http.request(options,function(sres){
			res.writeHead(sres.statusCode, sres.headers);
				sres.pipe(res);
			sres.on("data",data => {
				bodyChunks.push(data);
			}).on("end", () => {
				let content = Buffer.concat(bodyChunks).toString("utf-8");
				resolve(content);
			}).on("error", err => {
				reject(err);
			});
		});
		if (/POST|PUT/i.test(req.method)) {		
			sreq.write(JSON.stringify(req.body));
		} 
		req.pipe(sreq);
		sreq.on("error", err => {
			reject(err);
		});	
  });  
}