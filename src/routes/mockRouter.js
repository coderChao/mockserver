import express from 'express';
import MockController from '../controller/mockController';
import VisitLogLogic from '../logic/visitlogLogic';
const router = express.Router();

/*
 *处理所有的mock请求
 *回调方法：1：记录请求日志，2：处理请求，3：记录响应日志
 */
router.all("/:proCode/*",(req,res,next) =>{  
   try{
     res.locals.logObj = {};
     let logData = {   
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
        }),
        mockResContent: ""
     };
     let data = VisitLogLogic.CreateLog(logData).then(data => {     
        res.locals.logObj.id = data.id;
        next();
     }); 
   }  
   catch(e){
     res.locals.logObj.visitErrorMsg = e.message;
     next(e);
   }   
},MockController.HandleRequest,(req,res,next) => {
   //更新日志
   try{
      debugger;
      let log = res.locals.logObj;
      log.mockResContent = {
        headers: res._headers,
        json: res.locals.json
      }
      let id = log.id;
      delete log.id;
      VisitLogLogic.UpdateLogById(id,log);
      res.json(res.locals.json);
   }
   catch(e){
      next(e);
   }   
});
module.exports = router;