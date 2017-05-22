import visitLogModel from '../models/visitlogModel';

export default class VisitLogLogic{
  /**
   * 创建请求日志
   */
  static CreateLog = async (log) => {  
    const _logData = await visitLogModel.create(log);  
    return _logData;
  }

   /**
   * 获取日志列表，支持分页查询
   *
   *
   * @memberOf visitlogLogic
   */
  static GetLogListData = async(whereObj, pagesize, currentpage, sort) => {
    const skipnum = (currentpage - 1) * pagesize;
    return await visitLogModel
      .find(whereObj)
      .skip(skipnum)
      .limit(pagesize)
      .sort(sort);
  }
  
  /**
   * 根据id查询日志详情
   */
  static GetLogById = async (id) => {
    return await visitLogModel.findById(id);
  }

  static UpdateLogById = async (id,updateobj) => {
    return await visitLogModel
      .findByIdAndUpdate(id, updateobj);      
  }
}