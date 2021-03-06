/**
 * Mock访问记录
 */
const mongoose = require('../db/index');
const moment = require('moment');

const logScheme = new mongoose.Schema({
   //访问时间
   visitDt: String,
   //用户host
   visitHost: String,
   //用户ip
   visitIp: String,
   //是否使用的Mock数据
   isMockData: Boolean,
   //非mock数据时，访问的真实服务地址
   visitRealServiceHost: String,
   //访问地址
   visitAddr: {type: String, index: true},
   //访问方式
   visitMethod: String,
   //请求内容
   visitReqContent: String,
    //响应状态码
   visitResCode: Number,
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

module.exports = mongoose.model("MockVisitLog", logScheme);