import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../config/redisconfig';
import moment from 'moment';
import SendMail from '../utils/mail';

//让redis的操作方法支持Promise式的回调
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//创建客户端
const client = redis.createClient(config.port,config.host,{
    retry_strategy: function (options) {
        //纪录错误信息
        logger.error("redis连接出错" + JSON.stringify(options));
        debugger;
        if (options.attempt > 5) {
          logger.error(`redis重连${options.attempt}次后失败，总重连时间: ${options.total_retry_time},错误信息：${options.error.message}`);
          //发送邮件
          SendMail({
            subject: 'Redis错误预警',
            html: `<h3>redis连接出错，请尽快处理</h3><br/><p>错误信息: ${options.error.message}</p>`
          });   
          return undefined;  
        }
        // 3秒后重新连接
        return 3000;
    }
});
client.auth(config.password);

client.on("connect",() => {
  debugger;
  logger.info(`redis连接成功`);
});
// client.on("reconnecting", (data1,data2) => {
//   debugger;
//   console.log(data1);
//   console.log(data2);
// });
client.on("ready",(data) => {
   debugger;
  if(global.RedisWrongData.size > 0){
    client.del(Array.from(RedisWrongData),function(err,res){
      if(err){
        logger.error(`redis删除有可能导致数据不同步的key出错，原因: ${err}`);
        return;
      }
      global.RedisWrongData.clear();
      logger.info(`redis删除有可能导致数据不同步的key成功，删除key: ${JSON.stringify(global.RedisWrongData)}`);
    });  
  }
});
client.on("end",(data) => {
   debugger;
  console.log(data);
});

//https://github.com/NodeRedis/node_redis
//https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/
client.on("error",(err) => {
  debugger;
  logger.error(`redis连接失败-错误信息: ${err}`);
});

client.safeGetAsync = async function(key){
  try{
    return await client.getAsync(key);
  }
  catch(e){    
    console.log(e.message);
    return null;
  }
}

// client.safeSetSync = function(key,value)

export default client;