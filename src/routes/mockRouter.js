const express = require('express');
const MockController = require('../controller/mockController');
const VisitLogLogic = require('../logic/visitlogLogic');
const router = express.Router();

/*
 *处理所有的mock请求
 *回调方法：1：填充请求日志，2：处理请求，3：记录日志
 */
router.all("/:proCode/*",(req,res,next) =>{  
   try{    
     res.locals.logObj = {   
        visitHost: req.hostname,
        visitIp: req.ip,
        isMockData: true,
        visitAddr: req.path.replace("/" + req.params.proCode,""),
        visitReqContent: JSON.stringify({
            headers: req.headers,
            body: req.body,
            cookies: req.cookies,
            params: req.params,
            query: req.query,        
        })       
     };
     next();    
   }  
   catch(e){     
     next(e);
   }   
},MockController.HandleRequest,(req,res,next) => {
   //添加日志
   try{
     let log = res.locals.logObj;
     log.visitResContent = JSON.stringify({
       headers: res._headers,
       body: res.locals.jsonObj.data
     });
     log.visitResCode = res.statusCode;    
     VisitLogLogic.CreateLog(log).then(data => {
        if(res.locals.jsonObj.isResponse){
          res.json(res.locals.jsonObj.data);
          res.locals.jsonObj = null;
        }
        res.locals.logObj = null;    
     });    
   }
   catch(e){
      next(e);
   }   
});
//捕获错误，记录错误日志，返回错误信息
router.use(function (err, req, res, next) {
  try{  
    let log = res.locals.logObj;
    log.visitErrorMsg = err.message;
    VisitLogLogic.CreateLog(log).then(data => {
      res.status(999);
      res.locals.logObj = null;
      res.json({error: "出错了,错误信息：" + err.message + ""});
    });
  }
  catch(e){
    res.status(999);
    res.locals.logObj = null;
    res.json({error: "出错了,错误信息：" + e.message + ""});
  }
});
module.exports = router;