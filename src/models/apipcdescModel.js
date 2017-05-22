/**
 * 接口模型
 */
import mongoose from '../db/index';
import moment from 'moment';

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

export default mongoose.model("ApiPcDesc", thisSchema);
