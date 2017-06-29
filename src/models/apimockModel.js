/**
 * 接口模型
 */
const mongoose = require('../db/index');
const moment = require('moment');

const thisSchema = new mongoose.Schema({
  _id:false,
  // 接口ID
  id: String,
  // 响应mock
  apiContentMock: [
      {
        _id:false,        
        id:Number,
        originIp: String, //来源IP 
        mockState: Boolean,
        mockData: String
      }
    ]
});

module.exports = mongoose.model("ApiMockData", thisSchema);
