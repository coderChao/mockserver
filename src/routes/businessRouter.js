import express from 'express';
import redis from '../redis';
import CreateReData from '../utils/returndata';

import ApiController from '../controller/apiController';
import UserController from '../controller/userController';
const router = express.Router();
const ignoreAuthPath = ["/login","/register"];

//验证用户信息,记录请求日志
router.use(function(req,res,next){
  try{
    res.locals.logObj = {
      sysAddr: req.path,
      sysReqContent: JSON.stringify({
        headers: req.headers,
        body: req.body,
        cookies: req.cookies,
        params: req.params,
        query: req.query,        
      })
    };
    if(ignoreAuthPath.findIndex(item => item === req.path) === -1){
        let code = req.header("MS");
        redis.get(code, data => {
            if(data){
              let userInfo = JSON.parse(data);
              res.locals.UserInfo = userInfo;
              //拼接请求日志
              res.locals.logObj.sysUserId = userInfo.id;
              res.locals.logObj.sysUserName = userInfo.userName;             
              return next();
            }
            res.json(CreateReData(-2,null,"用户未登录"));
        });
        return;
    }
    next();
  }
  catch(e){
    next(e);
  }
});

/***********************用户模块******************************/
//登录
router.post('/login',UserController.Login);
//注册
router.post('/register',UserController.Register);

/***********************Api基本信息接口************************/
//新建接口基础数据
router.post('/api', ApiController.CreateApiData);
//修改接口基础数据
router.put('/api', ApiController.UpdateApiDataById);
//根据id查询接口基础数据详情
router.get('/api/:apiId', ApiController.GetApiDataById);
//根据条件查询接口列表数据，支持翻页
router.get('/api', ApiController.GetApiListDataByNameOrUrl);
//根据Id将Api数据置为无效
// router.delete('/api', ApiController.DeleteApiDataById);


module.exports = router;
