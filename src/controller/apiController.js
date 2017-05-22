import ApiLogic from '../logic/apiLogic';
import CreateReData from '../models/returnData';

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
    // 验证数据
    const _reData = await this
      .ApiLogic
      .CreateApi(req.body)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
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
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
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
   * 创建接口修改记录
   *
   *
   * @memberOf ApiController
   */
  CreateModData = async(req, res, next) => {
    const _reData = await this
      .ApiLogic
      .CreateModData(req.body)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

  /**
   * 根据接口名称和接口地址查找接口列表
   *
   *
   * @memberOf ApiController
   */
  GetApiListDataByNameOrUrl = async(req, res, next) => {
    // 获取查询相关参数
    const {searchValue, pagesize, currentpage, sort} = req.body;
    const _reData = await this
      .ApiLogic
      .GetApiListDataByNameOrUrl(searchValue, pagesize, currentpage, sort)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
  }

  /**
   * 根据api编号查找接口详情
   * 
   * 
   * @memberOf ApiController
   */
  GetApiDataById = async(req, res, next) => {
    const _reData = await this
      .ApiLogic
      .GetApiDataById(req.body.apiId)
      .catch((e) => {
        res.json(CreateReData(e, null));
      });
    res.json(CreateReData(null, _reData));
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
    const _reData = await this
    .ApiLogic
      .UpdateApiDataById(req.body.apiId,req.body.submitData)
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