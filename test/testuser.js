import ApiModel from '../server_logic/models/apiModel';
import ApiLogic from '../server_logic/logic/apiLogic';
import mongoose from 'mongoose';
import moment from 'moment';

// const _apiModel = new ApiModel();

// const _paramsData = {
//   "a": "1233",
//   "b": "2323",
//   "c": {
//     "c1": "12313",
//     "c2": "123123",
//     "c3": [
//       {
//         "c3-0-1": "123123",
//         "c3-0-2": moment().valueOf()
//       }, {
//         "c3-1-1": "qweqeqwe",
//         "c3-1-2": moment().valueOf()
//       }
//     ]
//   }
// }

// const insert = async() => {
//   const apiData = {
//     // 项目代码
//     proCode: "1",
//     // 接口名称
//     apiName: "测试接口",
//     // 接口method类型
//     apiMethod: "Post",
//     // 接口响应状态吗
//     apiStateCode: 200,
//     // 是否使用精确匹配 针对url后增加参数的类型，采用模糊匹配
//     apiExactMatch: false,
//     // 接口地址
//     apiUrl: "/Api/getuser",
//     // 接口请求参数说明
//     apiParmsDesc: JSON.stringify(_paramsData),
//     // 接口响应内容
//     apiContent: {
//       // 接口响应内容说明
//       apiContentDesc: JSON.stringify(_paramsData),
//       // 接口响应模拟数据
//       apiContentMock: [
//         {
//           mockId: new mongoose.Types.ObjectId,
//           // 模拟数据状态，true启用，false未启用
//           mockState: true,
//           // 模拟数据
//           mockData: JSON.stringify(_paramsData)
//         }
//       ]
//     },
//     // 接口代理状态 false：未开启 true：已开启
//     apiProxyState: true,
//     // 接口代理地址
//     apiProxy: [
//       {
//         proxyState: true,
//         proxyUrl: "http://192.168.1.1"
//       }, {
//         proxyState: false,
//         proxyUrl: "http://192.168.1.2"
//       }
//     ],
//     // 接口关联的用户 userCode
//     apiRelateUser: [
//       "u0001", "u0002"
//     ],
//     // 创建日期
//     createDt: moment().valueOf(),
//     // 更新数据
//     upData: [
//       {
//         // 更新日期
//         upDt: moment().valueOf(),
//         // 用户代码
//         upUser: "u0001"
//       }, {
//         upDt: moment().valueOf(),
//         upUser: "u0002"
//       }
//     ]
//   };
//   const _reData = await new ApiLogic().CreateApi(apiData, null, null, null);
// }

// const getbyid = async() => {
//   const _reData = await _apiModel.GetDataById('58ff08538924790c11d7f259');
//   console.log('reData', _reData);
// }

// const test = async() => {
//   // await insert().catch((e) => {   console.log('e', e); }); const _reData =
//   // await new ApiLogic().GetApiDataById("5901af0f4d910e070d3cbdb4"); const
//   // _reData = await new
//   // ApiLogic().CreateApiMock("5901af0f4d910e070d3cbdb4",{"afafef3333333333a":{"faf
//   // eaf":2324324}}); const _reData2=await new
//   // ApiLogic().UpdateApiMockData("5901af0f4d910e070d3cbdb4",{   id:1,
//   // mockState: false,   mockData: "" }); const _reData = await new
//   // ApiLogic().CreatePcDesc({   "apiId":"5901af0f4d910e070d3cbdb4",
//   // "apiDescType":"0",   "apiDescContent":"eqrq3r3q3qr{fafeaf}" }); const _reData
//   // = await new ApiLogic().GetApiPcDescDataById("5901af0f4d910e070d3cbdb4","0");
//   const _reData = await new ApiLogic().UpdateApiPcDescData("5901af0f4d910e070d3cbdb4", {
//     "apiDescType": "2",
//     "apiDescContent": "fffffffffffffffffffffff"
//   })
//   console.log("_reData", _reData);
// }
// await getbyid().catch((e)=>{   console.log('e',e); }) } test();
function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}

class test2 {
  @log
  async insert(a){
    const _reData = await new ApiLogic().UpdateApiPcDescData("5901af0f4d910e070d3cbdb4", {
      "apiDescType": "2",
      "apiDescContent": "fffffffffffffffffffffff"
    })
    return _reData;
  }
}

new test2().insert("2234324");