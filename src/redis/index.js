import redis from 'redis';
import bluebird from 'bluebird';
import config from '../../config/redisconfig';
import moment from 'moment';

//让redis的操作方法支持Promise式的回调
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//创建客户端
const client = redis.createClient(config.port,config.host);
client.auth(config.password);

client.on("connect",() => {
  console.log(`redis连接成功-${moment().format("L")}`);
});
//https://github.com/NodeRedis/node_redis
//https://www.ibm.com/developerworks/cn/opensource/os-cn-nodejs-redis/
client.on("error",(err) => {
  console.log(`redis连接失败-${moment().format("L")}`,err);
});

export default client;