const ApiLogic = require('../logic/apiLogic');
const CreateReData = require('../utils/returndata');
const redis = require('redis');

class ApiController {
  constructor() {
    this.ApiLogic = new ApiLogic();
  }

  /**
   * 创建接口基础数据
   *
   *
   * @memberOf ApiController
   */
  CreateApiData = async(req, res, next) => {
    try{
      const _reData = await this.ApiLogic.CreateApi(req.body);
      //存入redis中
      redis.safeSetStrAsync(_reData.id,JSON.stringify(_reData));
      res.locals.json = CreateReData(0, _reData);
      next();
    }
    catch(e){
      next(e);
    }
  }

  /**
   * 根据接口名称或接口地址查找接口列表
   *
   *
   * @memberOf ApiController
   */
  GetApiListDataByNameOrUrl = async(req, res, next) => {
    try{
      // 获取查询相关参数
      const {searchValue, pagesize, currentpage, sort} = req.query;
      const _reData = await this.ApiLogic.GetApiListDataByNameOrUrl(searchValue, pagesize, currentpage, sort);        
      res.json(CreateReData(0, _reData));
    }
    catch(e){
      next(e);
    }
  }

  /**
   * 根据api编号查找接口详情
   * 
   * 
   * @memberOf ApiController
   */
  GetApiDataById = async(req, res, next) => {
    try{
      let _reData = await redis.safeGetStrAsync(req.params.apiId);
      if(!_reData){
        _reData = await this.ApiLogic.GetApiDataById(req.params.apiId);
      }
      res.locals.json = CreateReData(0, _reData)
      next();
    }
    catch(e){
      next(e);
    }
  }

  /**
   * 创建接口模拟数据
   *
   *
   * @memberOf ApiController
   */
  CreateApiMock = async(req, res, next) => {
    // 验证数据
    const _reData = await this
      .ApiLogic
      .CreateApiMock(req.body.apiId, req.body.submitData)
      .catch((e) => {
        res.json((e, null));
      });
    res.json((null, _reData));
  }

  /**
   * 根据接口编号获取mock列表数据
   * 
   * 
   * @memberOf ApiController
   */
  GetApiMockListDataByapiId = async(req,res,next) => {
    const _reData = await this
      .ApiLogic
      .GetApiMockListDataByapiId(req.body.apiId)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

  /**
   * 根据ID更新接口基础数据
   * 
   * 
   * @memberOf ApiController
   */
  UpdateApiDataById = async(req,res,next) => {
    try{
      const _reData = await this.ApiLogic.UpdateApiDataById(req.body.apiId,req.body.submitData);
      //修改redis中的缓存数据
      redis.safeSetStrAsync(_reData.id,JSON.stringify(_reData));
      res.locals.json = CreateReData(0, _reData);
      next();
    }
    catch(e){
      next(e);
    }
  }

   /**
   * 创建接口说明数据
   *
   *
   * @memberOf ApiController
   */
  CreatePcDesc = async(req, res, next) => {
    const _reData = await this
      .ApiLogic
      .CreatePcDesc(req.body)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

  /**
   * 根据接口编号更新接口说明数据
   * 
   * 
   * @memberOf ApiController
   */
  UpdateApiPcDescDataByapiId = async(req,res,next) => {
    const _reData = await this
    .ApiLogic
      .UpdateApiPcDescDataByapiId(req.body.apiId,req.body.submitData)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

  /**
   * 更新接口模拟数据
   * 
   * 
   * @memberOf ApiController
   */
  UpdateApiMockDataByapiId = async(req,res,next) => {
    const _reData = await this
    .ApiLogic
      .UpdateApiMockDataByapiId(req.body.apiId,req.body.submitData)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

}

module.exports = new ApiController();

// export default new ApiController();