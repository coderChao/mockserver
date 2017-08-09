/**
 * 接口模型
 */
const mongoose = require('../db/index');
const moment = require('moment');

const thisSchema = new mongoose.Schema({
  // 项目代码
  proCode: String,
  // 接口名称
  apiName: String,
  // 接口状态 0：未生效 1：已确认 2：待确认 3: 已删除
  apiState:Number,
  // 接口method类型
  apiMethod: String,
  // 接口响应状态吗
  apiStateCode: Number,
  // 是否使用精确匹配 针对url后增加参数的类型，采用模糊匹配
  apiExactMatch: Boolean,
  // 接口地址
  apiUrl: String,
  // 接口代理状态 false：未开启 true：已开启
  apiProxyState: Boolean,
  // 接口代理地址
  apiProxy: [
    {
      proxyState: Boolean,
      proxyUrl: {
        host: String,
        port: String,
        prefixUrl: String
      },     
    }
  ],
  // 接口关联的用户 userCode
  apiRelateUser: Array,
  // 创建日期
  createDt: Date
});

const _thisModel = mongoose.model("ApiInformation", thisSchema);

module.exports = _thisModel;

// export default class ApiModel {
//   constructor() {
//     this.thisSchema = new
//     mongoose.Schema({ // 项目代码       proCode: String,       // 接口名称 apiName:
//       String, // 接口method类型       apiMethod: String,       // 接口响应状态吗
//       apiStateCode: Number, // 是否使用精确匹配 针对url后增加参数的类型，采用模糊匹配
//       apiExactMatch: Boolean, // 接口地址       apiUrl: String,       // 接口请求参数说明
//       apiParmsDesc: String, // 接口响应内容       apiContent: {    // 接口响应内容说明
//       apiContentDesc: String, // 接口响应模拟数据 apiContentMock:
//       [
//         {
//           _id: false,
//           mockState: Boolean,
//           mockData: String
//         }
//       ]
//     }, // 接口代理状态 false：未开启
//         true：已开启 apiProxyState : Boolean, // 接口代理地址
//         apiProxy : [
//       {
//         _id: false,
//         proxyState: Boolean,
//         proxyUrl: String
//       }
//     ], // 接口关联的用户
//         userCode apiRelateUser : Array, // 创建日期 createDt:Date,
//         upData : [
//       {
//         _id: false,
//         upDt: Date,
//         upUser: String
//       }
//     ]
//   });
//   this.thisModel = mongoose.model("ApiInformation", this.thisSchema);
// }
// CreatetApi = async(data) => {
//   return await this
//     .thisModel
//     .create(data)
//     .catch((e) => {
//       const _errStr = `新建接口错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
// }
// UpdateApiById = async(id, updateobj) => {
//   return await
//   this
//     .thisModel
//     .findByIdAndUpdate(id, updateobj)
//     .catch((e) => {
//       const _errStr = `更新接口错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
// }
// UpdateApi = async(whereobj, updateobj) => {
//   return await
//   this
//     .thisModel
//     .update(whereobj, updateobj)
//     .catch((e) => {
//       const _errStr = `更新接口错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
// }
// GetData = async(whereObj, pagesize, currentpage, sort) => {
//   const skipnum = (currentpage - 1) * pagesize;
//   return await this
//     .thisModel
//     .find(whereObj)
//     .skip(skipnum)
//     .limit(pagesize)
//     .sort(sort)
//     .catch((e) => {
//       const _errStr = `查询项目错误(${moment().format('L')})：${e}`;
//       throw _errStr;
//     });
// }
// GetDataById = async(id) => {
//   return await
//   this
//     .thisModel
//     .findById(id)
//     .catch((e) => {
//       const _errStr = `查询ID：${id}失败(${moment().format('L')})：${e}`;
//       throw _errStr;
//     })
// }
// }