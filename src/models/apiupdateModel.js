/**
 * 系统修改记录
 */
const mongoose = require('../db/index');
const moment = require('moment');

const thisSchema = new mongoose.Schema({
  // 接口ID
  apiId: String,
  // 更新日期
  apiUpdateDt: Date,
  // 更新用户
  apiUpdateUser: String,
  // 更新内容
  apiUpdateContent:String
});

module.exports = mongoose.model("ApiUpdateData", thisSchema);
