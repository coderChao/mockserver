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
          return 2000;  //如果重试五次后仍连接不上，发送报警邮件，并在之后每隔两秒重试一次  
        }
        // 1秒后重新连接
        return 1000;
    }
});
client.auth(config.password);

client.on("connect",() => {
  logger.info(`redis连接成功`);
});
// client.on("reconnecting", (data1,data2) => {
//   debugger;
//   console.log(data1);
//   console.log(data2);
// });
client.on("ready",(data) => {
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
  logger.info("redis end",data);
});

//https://github.com/NodeRedis/node_redis
//https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/
client.on("error",(err) => {
  logger.error(`redis连接失败-错误信息: ${err}`);
});

client.safeGetStrAsync = async function(key){
  try{
    if(client.connected){
      return await client.getAsync(key);
    }
    return null;
  }
  catch(e){
    logger.error(`redis get 失败, key: ${key}错误信息: e.message`);
    return null;
  }
}

/**
 * 安全set，expires单位为秒 默认为一天 24 * 60 * 60 ＝ 86400
 */
client.safeSetStrAsync = async function(key,value,expires = 86400) {
  debugger;
  try{
    if(client.connected){
      return await client.setAsync(key,value, 'EX', expires);
    }
    global.RedisWrongData.add(key);
    return null;
  }
  catch(e){
    global.RedisWrongData.add(key);
    logger.error(`redis set 失败 key: ${key}, value: ${value}, expires: ${expires},错误信息: ${e.message}`);
    return null;
  }
}

export default client;