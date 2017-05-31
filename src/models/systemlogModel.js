/**
 * 系统访问记录
 */
import mongoose from '../db/index';
import moment from 'moment';

const thisSchema = new mongoose.Schema({ 
  //访问日期
  sysDt: {
      type: Date,
      default: Data.now
  },
  //访问用户id
  sysUserId: string,
  //访问用户姓名
  sysUserName: string,  
  //访问地址
  sysAddr: String,
  //访问类型  1：增 2：删 3：改 4：查
  sysType:Number,
  //请求头
  sysReqContent: String,
  //响应头
  sysResContent: String,
  //出错时的错误信息
  sysErrorMsg: String,
});

thisSchema.pre("save",function(next){
   if(this.isNew){
     this.sysDt = moment().format('L');
   }   
   next();
});

export default mongoose.model("SystemLog", thisSchema);
