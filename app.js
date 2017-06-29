var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var uuid = require('node-uuid');
var moment = require('moment');
require('moment/min/locales')
moment.updateLocale('zh-CN',{
  longDateFormat: {
    'L': 'YYYY-MM-DD HH:mm:ss'
  } 
}); //设置moment本地化
global.logger  = require('./dist/utils/log'); //设置全局log方法

//mock系统自身业务路由
var business = require('./dist/routes/businessRouter');
//需要mock数据的路由
var mockRouter = require('./dist/routes/mockRouter');

//redis出错时，有可能导致数据不同步的key,值唯一
global.RedisWrongData = new Set();

var app = express();

// 统一设置返回请求头
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Accept:application/json
  //Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept,JW_DATA,JW_TOKEN,JW_UID,JW_HOTEL_DT
  //Access-Control-Allow-Methods:POST, GET, OPTIONS, DELETE
  //Access-Control-Allow-Origin:*
  //Access-Control-Max-Age:3600
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,JW_DATA,JW_TOKEN,JW_UID,JW_HOTEL_DT");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// =日志============================== 生成请求编号
function assignId(req, res, next) {
  req.id = uuid.v4()
  next()
}
// 日志目录
var logDirectory = __dirname + '/log/access'
// 判断是否存在目录，如果不存在则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: true
});
logger.token('id', function getId(req) {
  return req.id
});
// 创建日志
app.use(logger(':id :method :url :status :response-time :remote-addr :user-agent ', {stream: accessLogStream}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 启用gzip压缩
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// 设置静态目录
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, 'public')));

// 应用路由
// app.use('/', index);
// app.use('/users', users);
app.use('/mockserver',business);
app.use('/api',mockRouter);

// 捕获错误
app.use(function (err, req, res, next) {
  debugger
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   debugger
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;
