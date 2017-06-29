const mongoose = require('mongoose');
const moment = require('moment');
const SystemConfig = require('../../config/serverconfig');

mongoose.Promise = global.Promise;

const _mongodbUrl=`mongodb://${SystemConfig.dbuser}:${SystemConfig.dbpwd}@${SystemConfig.dbhost}:${SystemConfig.dbport}/${SystemConfig.dbname}`;
// const _mongodbUrl= 'mongodb://root:MasterKey113@dds-bp19c8be30f06c041.mongodb.rds.aliyuncs.com:3717,dds-bp19c8be30f06c042.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3234865';
console.log(_mongodbUrl);
mongoose.connect(_mongodbUrl,{server: {auto_reconnect: true, reconnectTries: 5}});

const db = mongoose.connection;

//logger.error(`mongodb连接失败, 错误信息: ${error.message}`)
db.on('error', (error) => {
  logger.error(`mongodb连接失败, 错误信息: ${error.message}`)
});
db.once('open', () => {
  logger.info(`mongodb连接成功-${moment().format("YYYY-MM-DD HH:mm:ss")}`);
});
db.on("disconnected", (data) => {
  logger.info(`mongodb=>disconnected, 信息: ${data}")`)
});
db.on('reconnected', function() {
  logger.info('重新连接mongodb');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
  db.close(function () {
      console.log('Force to close the MongoDB conection');
      process.exit(0);
  });
});

module.exports = mongoose;

