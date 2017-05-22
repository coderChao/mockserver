import express from 'express';
import redis from '../redis';

import ApiController from '../controller/apiController';
let router = express.Router();

/**
 * 记录请求日志
 */
// router.all("*",(req,res,next) => {
//    next();
// })

/**
 * Api基本信息接口
 */


// // 新建接口基础数据
// router.post('/api', ApiController.CreateApiData);
// // 修改接口基础数据
// router.put('/api',function(req,res,next){});
// // 根据id查询接口基础数据详情
// router.get('/api',function(){});
// // 根据条件查询接口列表数据，支持翻页
// router.get('/apis',function(){});

router.get("/api",(req,res,next) => {
   debugger;
   res.json({name: "zhangsan",age: 12});
   redis.set("key1",'123');
   redis.get("key1").then(function(err,result){
      if(err) console.log(err);
      console.log("redis result",result);
   });
   res.locals.type = "json";
   next();
});

router.get("*",(req,res,next) => {
   debugger;
})


module.exports = router;
