const ApiLogic = require('../logic/apiLogic');
const ProjectLogic = require('../logic/projectLogic');
const mockJS = require('mockjs');
const _ = require('lodash');
const redis = require('../redis');
const request = require('../utils/request');

class MockController{
  constructor(){
     this.ApiLogic = new ApiLogic();
  }
  HandleRequest = async (req,res,next) => {
    try{
       let path = req.path.replace("/" + req.params.proCode,"");
       res.locals.path = path;
       //从redis中查找是否存在该条记录 
       let apiData = await redis.safeGetStrAsync(`${path}-${req.method}`);
       if(!apiData){
          //根据请求地址和项目编码和Method查询api详情          
          apiData = await this.ApiLogic.GetApiDataByUrl(path, req.params.proCode, req.method);     
          if(apiData) redis.safeSetStrAsync(`${path}-${req.method}`,JSON.stringify(apiData));          
       }
       else{
         apiData = JSON.parse(apiData);
         apiData.id = apiData._id;
       }
       if(apiData && apiData.apiProxyState){  //接口存在并且接口代理状态已开启
          //从redis查找接口mock规则
          let mockData = await redis.safeGetStrAsync(apiData.id);
          if(!mockData){
            //获取接口详情
            mockData = await this.ApiLogic.GetApiMockListDataByapiId(req.ip,apiData.id);
            if(mockData) redis.safeSetStrAsync(apiData.id,JSON.stringify(mockData)); 
          }    
          else{
            mockData = JSON.parse(mockData);
          }  
          if(mockData){           
             let resData = mockJS.mock(JSON.parse(mockData.apiContentMock[0].mockData));
             res.locals.logObj.isMockData = true;
             res.locals.jsonObj = {
               isResponse: true,
               data: resData
             };
             next();
             return;
          }         
       }
       //请求代理
       //修改请求日志中的字段
       res.locals.logObj.isMockData = false;
       let content = await this._requestProxy(apiData,req,res);
       res.locals.jsonObj = {
         isResponse: false,
         data: content
       }
       next();
    }
    catch(e){    
      next(e);
    }
  }
  /**
   * 请求代理
   */
  _requestProxy = async (apiData,req,res) => {
    let url = "";
    if(apiData && Array.isArray(apiData.apiProxy) && apiData.apiProxy.length > 0){
       let index = apiData.apiProxy.findIndex(item => item.proxyState === true);
       if(index !== -1){
         url = apiData.apiProxy[index].proxyUrl;
       }
    }
    if(url === ""){
       //从redis中获取项目配置的全局地址
      let proRedisKey = `${req.params.proCode}-${req.ip}`;
      url = await redis.safeGetStrAsync(proRedisKey);
      if(!url){
        //从项目中获取配置的全局地址
        let project = await ProjectLogic.GetProjectByCode(req.params.proCode);
        if(!project){
          throw '项目不存在';
        }      
        url = this._getProxyUrlInProject(req.ip,project.proProxy);
        if(!url){
          throw '项目代理地址未配置或配置有误';
        }
        redis.safeSetStrAsync(proRedisKey, JSON.stringify(url));
      }
      else{
        url = JSON.parse(url);
      }   
    } 
    if(!url.host || !url.port){
      throw "项目代理地址未配置,请配置正确的地址";
    }
    let path = res.locals.path;
    if(url.prefixUrl){
      let prefix = _.trim(url.prefixUrl, "/");
      path = `/${prefix}${path}`;
    }
    return await request(req,res,{
      url: url.host,
      port: url.port,
      path: path 
    });     
  }
  
  /**
   * 根据ip查找代理地址，先查找精确ip匹配的，未找到找*,都找不到返回null
   * 
   * @memberof MockController
   */
  _getProxyUrlInProject = (ip, address) => {
    if(!address || !_.isArray(address) || address.length === 0){
      return null;
    }
    let addr = _.find(address, item => item.originIp === ip); //先查找精确ip匹配的
    if(addr){
      return addr;
    }
    addr = _.find(address, item => item.originIp === "*"); //未找到找*,都找不到返回null
    return addr;
  }
}

module.exports = new MockController()
