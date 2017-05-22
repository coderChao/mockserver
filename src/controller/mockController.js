import ApiLogic from '../logic/apiLogic';
import CreateReData from '../models/returnData';
import mockJS from 'mockjs';
import redis from '../redis';

class MockController{
  constructor(){
     this.ApiLogic = new ApiLogic();
  }
  HandleRequest = async (req,res,next) => {
    debugger;
    try{
       let path = req.path.replace("/" + req.params.proCode,"");
       //从redis中查找是否存在该条记录 
       let apiData = await redis.getAsync(`${path}-${req.method}`);
       if(!apiData){
          //根据请求地址和项目编码和Method查询api详情          
          apiData = await this.ApiLogic.GetApiDataByUrl(path, req.params.proCode, req.method);     
          if(apiData) redis.set(`${path}-${req.method}`,JSON.stringify(apiData));          
       }
       else{
         apiData = JSON.parse(apiData);
         apiData.id = apiData._id;
       }
       if(apiData && apiData.apiProxyState){  //接口存在并且接口代理状态已开启
          //从redis查找接口mock规则
          let mockData = await redis.getAsync(apiData.id);
          if(!mockData){
            //获取接口详情
            mockData = await this.ApiLogic.GetApiMockListDataByapiId(req.ip,apiData.id);
            debugger;
            if(mockData) redis.set(apiData.id,JSON.stringify(mockData)); 
          }    
          else{
            mockData = JSON.parse(mockData);
          }  
          if(mockData){           
             let resData = mockJS.mock(JSON.parse(mockData.mockContent.mockData));
             res.locals.logObj.isMockData = true;
             res.locals.json = resData;
             next();
             return;
          }         
       }
       //请求代理
       //修改请求日志中的字段
       res.locals.logObj.isMockData = false;
       
       next();
    }
    catch(e){
      //  res.locals.logObj.visitErrorMsg = e.message;     
      next(e);
    }
  }
}

export default new MockController()
