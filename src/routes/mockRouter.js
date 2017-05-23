import express from 'express';
import MockController from '../controller/mockController';
import VisitLogLogic from '../logic/visitlogLogic';
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
     log.mockResContent = {
       headers: res._headers,
       json: res.locals.jsonObj.data
     }      
     VisitLogLogic.CreateLog(log).then(data => {
        if(res.locals.jsonObj.isResponse){
          res.json(res.locals.jsonObj.data);
        }        
     });     
   }
   catch(e){
      next(e);
   }   
});
//捕获错误，记录错误日志，返回错误信息
router.use(function (err, req, res, next) {
  debugger; 
  try{  
    let log = res.locals.logObj;
    log.visitErrorMsg = err.message;
    VisitLogLogic.CreateLog(log).then(data => {
      res.status(500);
      res.json({error: "mock系统出错,错误信息：" + err.message + ",请联系管理员"});
    });
  }
  catch(e){
    res.status(500);
    res.json({error: "mock系统出错,错误信息：" + e.message + ",请联系管理员"});
  }
});
module.exports = router;