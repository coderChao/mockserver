import projectModel from '../models/projectModel';

export default class ProjectLogic{ 
  /**
   * 创建项目数据
   * @param {object} apiData 接口数据
   *
   * @memberOf ApiLogic
   */
  CreateApi = async(apiData) => {
    const _projectData = await projectModel.create(apiData);
    if (!_projectData) {
      throw "创建项目数据";
    }
    return _projectData;
  }

  /**
   * 获取项目列表，支持分页查询
   *
   *
   * @memberOf ApiLogic
   */
  GetProjectListData = async(whereObj, pagesize, currentpage, sort) => {
    const skipnum = (currentpage - 1) * pagesize;
    return await projectModel
      .find(whereObj)
      .skip(skipnum)
      .limit(pagesize)
      .sort(sort);
  }

  /**
   * 根据ID获取项目数据详情
   *
   *
   * @memberOf ApiLogic
   */
  GetApiDataById = async(proId) => {
    return await projectModel.findById(proId);
  }

  /**
   * 更新接口基础数据
   *
   *
   * @memberOf ApiLogic
   */
  UpdateApiData = async(proId, proData) => {
    return await projectModel.findByIdAndUpdate({
      "_id": proId
    }, {$set: {...proData}});
  }
}