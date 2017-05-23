import _ from "lodash";
import apiModel from '../models/apiModel';
import apimockModel from '../models/apimockModel';
import apipcdescModel from '../models/apipcdescModel';
import apiupdateModel from '../models/apiupdateModel';

export default class ApiLogic {

  /**
   * 创建接口基础数据
   * @param {object} apiData 接口数据
   *
   * @memberOf ApiLogic
   */
  CreateApi = async(apiData) => {
    const _apiReData = await apiModel.create(apiData);
    if (!_apiReData) {
      throw "base数据插入错误";
    }
    return _apiReData;
  }

  /**
   * 创建接口mock数据
   * @param {object} apimockData 接口mock数据
   *
   * @memberOf ApiLogic
   */
  CreateApiMock = async(apiId, apimockData) => {
    // 根据apiId查询mock数据
    let _reData = await this.GetApiMockDataById(apiId);
    let _apiReData = null;
    if (_reData) {
      // 如果数据有值，则在mock数据中push一条
      _apiReData = await apimockModel.update({
        "id": apiId
      }, {$push:{"apiContentMock":{"id":_reData.apiContentMock.length,"mockState": true, "mockData": JSON.stringify(apimockData)}} });
    } else {
      // 如果没有找到则直接创建原始对象
      _reData = {
        id: apiId,
        apiContentMock: [
          {
            "id":0,
            "mockState": true,
            "mockData": JSON.stringify(apimockData)
          }
        ]
      }
      _apiReData = await apimockModel.create(_reData);
    }
    if (!_apiReData) {
      throw "mock数据插入错误";
    }
    return _apiReData;
  }

  /**
   * 创建接口说明数据
   * @param {object} apipcdescData 接口说明数据
   *
   * @memberOf ApiLogic
   */
  CreatePcDesc = async(apipcdescData) => {
    const _apiReData = await apipcdescModel.create(apipcdescData);
    if (!_apiReData) {
      throw "说明数据插入错误";
    }
    return _apiReData;
  }

  /**
   * 创建修改记录
   * 
   * 
   * @memberOf ApiLogic
   */
  CreateModData = async(apiupdateData) =>{
    const _apiModData = await apiupdateModel.create(apiupdateData);
    if(!_apiModData){
      throw "更新数据插入错误";
    }
    return _apiModData;
  }

  /**
   * 获取Api列表数据，支持分页查询
   *
   *
   * @memberOf ApiLogic
   */
  GetApiListData = async(whereObj, pagesize, currentpage, sort) => {
    const skipnum = (currentpage - 1) * pagesize;
    return await apiModel
      .find(whereObj)
      .skip(skipnum)
      .limit(pagesize)
      .sort(sort);
  }

  /**
   * 根据接口名称和接口地址模糊查找接口列表
   * 
   * 
   * @memberOf ApiLogic
   */
  GetApiListDataByNameOrUrl = async(searchValue,pagesize,currentpage,sort) => {
    // 创建正则查询条件
    const regParam = new RegExp(searchValue,"i");
    const whereObj = {
      $or:[
        {"apiName":{$regex:regParam}},
        {"apiUrl":{$regex:regParam}}
      ]
    }
    return await this.GetApiListData(whereObj,pagesize,currentpage,sort);
  }
  
  /**
   * 根据接口地址查询接口详情
   * url: 接口地址
   * method：请求方式
   */
  GetApiDataByUrl = async(url, proCode, method) => {    
    const urlPar = new RegExp(url,"i");
    const _whereObj = {
      "apiState": 1,
      "apiMethod": method,
      "proCode": proCode,
      $or: [
        {"apiExactMatch": true, "apiUrl": url},
        {"apiExactMatch": false, "apiUrl": {$regex: urlPar}}
      ]
    };
    return await apiModel.findOne(_whereObj)
  }

  /**
   * 根据ID获取Api基础数据详情
   *
   *
   * @memberOf ApiLogic
   */
  GetApiDataById = async(apiId) => {
    return await apiModel.findById(apiId);
  }

  /**
   * 根据ID和来源地址获取Api mock数据详情
   *
   *
   * @memberOf ApiLogic
   */
  GetApiMockListDataByapiId = async(ip,apiId) => {
    const _whereObj = {
      id: apiId,
      $or: [
        {"apiContentMock.originIp": ip, "apiContentMock.mockState": true},
        {"apiContentMock.originIp": "","apiContentMock.mockState": true}
      ],
    };
    return await apimockModel.find(_whereObj).sort({"apiContentMock.originIp": -1}).limit(1).then((mockData) => {      
       let data = null;
       if(mockData.length > 0){
         data = mockData[0];
       }
       return data;
    });
  }

  /**
   * 获取Api update列表数据
   *
   *
   * @memberOf ApiLogic
   */
  GetApiUpdateListData = async(whereObj, pagesize, currentpage, sort) => {
    const skipnum = (currentpage - 1) * pagesize;
    return await apiupdateModel
      .find(whereObj)
      .skip(skipnum)
      .limit(pagesize)
      .sort(sort);
  }

  /**
   * 根据ID获取Api update数据总数
   *
   *
   * @memberOf ApiLogic
   */
  GetApiUpdateCountDataById = async(apiId) => {
    const _whereObj = {
      "apiId": apiId
    }
    return await apiupdateModel.count(_whereObj);
  }

  /**
   * 根据ID获取Api 说明数据详情
   *
   *
   * @memberOf ApiLogic
   */
  GetApiPcDescDataById = async(apiId, apiDescType) => {
    const _whereObj = {
      "id": apiId,
      "apiDescType": apiDescType
    }
    return await apipcdescModel.findOne(_whereObj);
  }

  /**
   * 更新接口基础数据
   *
   *
   * @memberOf ApiLogic
   */
  UpdateApiDataById = async(id, ApiData) => {
    return await apiModel.findByIdAndUpdate({
      "_id": id
    }, {$set: {...ApiData}});
  }

  /**
   * 更新接口说明数据
   *
   *
   * @memberOf ApiLogic
   */
  UpdateApiPcDescDataByapiId = async(apiId, ApiPcDescData) => {
    return await apipcdescModel.update({
      "id": apiId
    }, {$set: {"apiDescType":ApiPcDescData.apiDescType,"apiDescContent":ApiPcDescData.apiDescContent}});
  }

  /**
   * 更新接口模拟数据
   *
   *
   * @memberOf ApiLogic
   */
  UpdateApiMockDataByapiId = async(apiId, ApiMockData) => {
    let _reData = await this.GetApiMockDataById(apiId);
    const _mockIndex = _.findIndex(_reData.apiContentMock, (item) => {
      return item.id == ApiMockData.id;
    })
    if(_mockIndex==-1){
      throw "未找到该接口模拟数据";
    }
    _reData.apiContentMock[_mockIndex] = ApiMockData;
    return await apimockModel.update({
      "apiId": apiId
    }, {$set: {"apiContentMock":_reData.apiContentMock}});
  }

}