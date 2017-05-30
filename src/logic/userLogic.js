import userModel from '../models/userModel';

export default class UserLogic {
  /* 新建用户
   *
   *
   * @memberOf UserModel
   */
  CreateUser = async(data) => {
    return await userModel
      .create(data)
      .catch((e) => {
        const _errStr = `新建用户错误(${moment().format('L')})：${e}`;
        throw _errStr;
      });
  }

  /**
   * 根据项目ID更新数据
   *
   *
   * @memberOf UserModel
   */
  UpdateUserById = async(id, updateobj) => {
    return await userModel
      .findByIdAndUpdate(id, updateobj)
      .catch((e) => {
        const _errStr = `更新用户错误(${moment().format('L')})：${e}`;
        throw _errStr;
      }); 
  }

  /**
   * 根据条件更新项目
   *
   *
   * @memberOf UserModel
   */
  UpdateUser = async(whereobj, updateobj) => {
    return await userModel
      .update(whereobj, updateobj)
      .catch((e) => {
        const _errStr = `更新用户错误(${moment().format('L')})：${e}`;
        throw _errStr;
      });
  }

  /**
   * 根据用户名查找用户信息，支持模糊查询
   *
   *
   * @memberOf UserModel
   */
  GetDataByUserName = async(namestr) => {
    const _whereObj = {
      "userName": new RegExp(namestr)
    };
    return await userModel
      .find(whereobj);
  }

  /**
   * 根据条件查找用户
   *
   *
   * @memberOf UserModel
   */
  GetDataByWhere = async(whereObj) => {
    return await userModel
      .find(whereObj);
  }

  /**
   * 根据ID查询用户信息
   *
   *
   * @memberOf UserModel
   */
  GetDataById = async(id) => {
    return await userModel
      .findById(id)
      .catch((e) => {
        const _errStr = `查询ID：${id}失败(${moment().format('L')})：${e}`;
        throw _errStr;
      })
  }
  
  /*
   * 根据用户名获取用户详情
   */
  static GetUserByUserName = async(name) => {
    return await userModel.findOne({userCode: name});
  }
  
  /**
   * 比对密码是否一致
   */
  static ComparePassword = async(originPwd,salt,encryptPwd) => {
    return await userModel.ComparePassword(originPwd,salt,encryptPwd);
  }
}