import mongoose from 'mongoose';
import moment from 'moment';
import SystemConfig from '../../config/serverconfig';

mongoose.Promise = global.Promise;

const _mongodbUrl=`mongodb://${SystemConfig.dbuser}:${SystemConfig.dbpwd}@${SystemConfig.dbhost}:${SystemConfig.dbport}/${SystemConfig.dbname}`;
// const _mongodbUrl= 'mongodb://root:MasterKey113@dds-bp19c8be30f06c041.mongodb.rds.aliyuncs.com:3717,dds-bp19c8be30f06c042.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3234865';
console.log(_mongodbUrl);
mongoose.connect(_mongodbUrl);

const db = mongoose.connection;

//logger.error(`mongodb连接失败, 错误信息: ${error.message}`)
db.on('error', (error) => {
  console.log(`mongodb连接失败, 错误信息: ${error.message}`)
});
db.once('open', () => {
  logger.info(`mongodb连接成功-${moment().format("YYYY-MM-DD HH:mm:ss")}`);
});
db.on("disconnected", (data) => {c
  onsole.log(`mongodb=>disconnected, 信息: ${data}")`)
})

export default mongoose;

