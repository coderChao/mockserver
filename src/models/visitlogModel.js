/**
 * Mock访问记录
 */
import mongoose from '../db/index';
import moment from 'moment';

const logScheme = new mongoose.Schema({
   //访问时间
   visitDt: String,
   //用户host
   visitHost: String,
   //用户ip
   visitIp: String,
   //是否使用的Mock数据
   isMockData: Boolean,
   //访问地址
   visitAddr: String,
   //访问方式
   visitMethod: String,
   //请求内容
   visitReqContent: String,
   //响应内容
   visitResContent: String,
   //出错时的错误信息
   visitErrorMsg: String
});

logScheme.pre("save",function(next){
   if(this.isNew){
     this.visitDt = moment().format('L');
   }   
   next();
});

export default mongoose.model("MockVisitLog", logScheme);