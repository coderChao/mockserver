/**
 * 用户数据
 */
import mongoose from '../db/index';
import moment from 'moment';

const thisSchema = new mongoose.Schema({
      // 用户名
      userCode: {
        type: String
      },
      // 用户姓名
      userName: {
        type: String
      },
      // 用户密码
      userPwd: {
        type: String
      },
      // 用户邮箱
      userEmail: {
        type: String
      },
      // 注册日期
      regDate: {
        type: Number
      },
      // 最后登录时间
      lastDate: {
        type: Number
      }
    });

export default mongoose.model("User", thisSchema);

// export default class UserModel {
//   constructor() {
//     this.thisSchema = new mongoose.Schema({
//       // 用户名
//       userCode: {
//         type: String
//       },
//       // 用户姓名
//       userName: {
//         type: String
//       },
//       // 用户密码
//       userPwd: {
//         type: String
//       },
//       // 用户邮箱
//       userEmail: {
//         type: String
//       },
//       // 注册日期
//       regDate: {
//         type: Number
//       },
//       // 最后登录时间
//       lastDate: {
//         type: Number
//       }
//     });

//     this.thisModel = mongoose.model("User", this.thisSchema);
//   }

//   /**
//    * 新建用户
//    *
//    *
//    * @memberOf UserModel
//    */
//   CreateUser = async(data) => {
//     return await this.thisModel
//       .create(data)
//       .catch((e) => {
//         const _errStr = `新建用户错误(${moment().format('L')})：${e}`;
//         throw _errStr;
//       });
//   }

//   /**
//    * 根据项目ID更新数据
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   UpdateUserById = async(id, updateobj) => {
//     return await this.thisModel.findByIdAndUpdate(id, updateobj).catch((e) => {
//       const _errStr = `更新用户错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
//   }

//   /**
//    * 根据条件更新项目
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   UpdateUser = async(whereobj, updateobj) => {
//     return await this.thisModel.update(whereobj, updateobj).catch((e) => {
//       const _errStr = `更新用户错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
//   }

//   /**
//    * 根据用户名查找用户信息，支持模糊查询
//    *
//    *
//    * @memberOf UserModel
//    */
//   GetDataByUserName = async(namestr) => {
//     const _whereObj = {
//       "userName": new RegExp(namestr)
//     };
//     return await this.thisModel.find(whereobj);
//   }

//   /**
//    * 根据条件查找用户
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   GetDataByWhere = async(whereObj) => {
//     return await this.thisModel.find(whereObj);
//   }

//   /**
//    * 根据ID查询用户信息
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   GetDataById = async(id) => {
//     return await this.thisModel.findById(id).catch((e)=>{
//       const _errStr=`查询ID：${id}失败(${moment().format('L')})：${e}`;
//       throw _errStr;
//     })
//   }
// }
