/**
 * 接口模型
 */
const mongoose = require('../db/index');
const moment = require('moment');

const thisSchema = new mongoose.Schema({
  _id:false,
  // 接口ID
  id: String,
  //头说明
  apiHeadDesc: Number,
  //请求参数说明
  apiReqParDesc: String,
  //响应数据说明
  apiResParDesc: String,
  // 说明内容
  apiDescContent: String
});

module.exports = mongoose.model("ApiPcDesc", thisSchema);
