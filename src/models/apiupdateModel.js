/**
 * 系统修改记录
 */
import mongoose from '../db/index';
import moment from 'moment';

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

export default mongoose.model("ApiUpdateData", thisSchema);
