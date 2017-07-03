const log4js = require('log4js');
const path = require("path");
const fsHelper = require('./fshelper');
const logDirectory = path.join(__dirname, '../../log/app');
//递归判断并创建目录
fsHelper.mkdirsSync(logDirectory);

log4js.configure({
    appenders: [
        {
            type: "dateFile",
            //filename: __dirname + "../../logs/info.log",
            filename: path.join(logDirectory, '/info'),
            pattern:"-yyyy-MM-dd.log",
            absolute: true,
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