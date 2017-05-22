/**
 * 接口模型
 */
import mongoose from '../db/index';
import moment from 'moment';

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

export default mongoose.model("ApiMockData", thisSchema);
