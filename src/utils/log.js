const log4js = require('log4js');
const fs = require("fs");
const path = require("path");
const logDirectory = path.join(__dirname, '../../log/app');
// 判断是否存在目录，如果不存在则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
log4js.configure({
    appenders: [
        // {
        //     type: 'console',
        //     category: "console"

        // }, //控制台输出
        {
            type: "dateFile",
            filename: logDirectory + '/info',
            pattern: "-yyyyMMdd.log",
            // absolute: false,
            alwaysIncludePattern: true,
            // maxLogSize: 20480,
            // backups: 3,
            category: 'logInfo'

        }//日期文件格式
    ],
    // replaceConsole: true,   //替换console.log
    levels:{
        logInfo: 'info', //info及以上级别输出到日志文件
        // console: 'debug' //debug及以上级别输出到控制台
    }
});

const logger = log4js.getLogger('logInfo'); 

module.exports = logger;