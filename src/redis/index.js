import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../config/redisconfig';
import moment from 'moment';

//让redis的操作方法支持Promise式的回调
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//创建客户端
const client = redis.createClient(config.port,config.host,{
    retry_strategy: function (options) {
        debugger;
        if (options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error 
            report('连接被拒绝');
        }
        if (options.times_connected > 10) {
            report('重试连接超过十次');        
        }
        // reconnect after 
        return Math.max(options.attempt * 100, 3000);
    }
});
client.auth(config.password);

client.on("connect",() => {
  debugger;
  console.log(`redis连接成功-${moment().format("L")}`);
});
client.on("reconnecting", (data1,data2) => {
  debugger;
  console.log(data1);
  console.log(data2);
});
client.on("ready",(data) => {
   debugger;
  console.log(data);
});
client.on("end",(data) => {
   debugger;
  console.log(data);
});

//https://github.com/NodeRedis/node_redis
//https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/
client.on("error",(err) => {
  debugger;
  console.log(`redis连接失败-${moment().format("L")}`,err);
});

export default client;