/**
 * 项目配置
 */
const mongoose = require('../db/index');
const moment = require('moment');

const thisSchema = new mongoose.Schema({
      // 项目代码
      proCode: String,
      // 项目名称
      proName: String,
      // 项目默认代理地址
      proProxy: {
        host: String,
        port: String,
        prefixUrl: String
      }
    });

module.exports = mongoose.model("Project", thisSchema);



// export default class UserModel {
//   constructor() {
//     this.thisSchema = new mongoose.Schema({
//       // 项目代码
//       proCode: {
//         type: String,
//       },
//       // 项目名称
//       proName: {
//         type: String
//       },
//       // 项目默认代理地址
//       proProxy: {
//         type: String
//       }
//     });

//     this.thisModel = mongoose.model("Project", this.thisSchema);
//   }
//   /**
//    * 创建项目
//    *
//    *
//    * @memberOf UserModel
//    */
//   CreateProject = async(data) => {
//     return await this.thisModel
//       .create(data)
//       .catch((e) => {
//         const _errStr = `新建项目错误(${moment().format('L')})：${e}`;
//         throw _errStr;
//       });
//   }

//   /**
//    * 根据项目ID更新数据
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   UpdateProjectById = async(id, updateobj) => {
//     return await this.thisModel.findByIdAndUpdate(id, updateobj).catch((e) => {
//       const _errStr = `更新项目错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
//   }

//   /**
//    * 根据条件更新项目
//    * 
//    * 
//    * @memberOf UserModel
//    */
//   UpdateProject = async(whereobj, updateobj) => {
//     return await this.thisModel.update(whereobj, updateobj).catch((e) => {
//       const _errStr = `更新项目错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
//   }

//   /**
//    * 根据项目名称查询项目，支持模糊查询
//    * 
//    * @param {string} namestr  用户姓名
//    * @param {Number} pagesize 页尺寸
//    * @param {Number} currentpage 当前页数
//    * @param {Object} sort 排序对象
//    * @memberOf UserModel
//    */
//   GetDataByProjectName = async(namestr,pagesize,currentpage,sort) => {
//     const _whereObj = {
//       "proName": new RegExp(namestr)
//     };
//     const skipnum = (currentpage-1) * pagesize;
//     return await this.thisModel
//     .find(_whereObj)
//     .skip(skipnum)
//     .limit(pagesize)
//     .sort(sort)
//     .catch((e) => {
//       const _errStr = `查询项目错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
//   }

//   /**
//    * 根据ID查询项目信息
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
