const childProcess = require("child_process");
const path = require("path");
const execPath = path.join(__dirname, "/sendmail.js");

process.title = "mockserver main process";

//子进程执行文件
var child = childProcess.fork(execPath);
child.on('message', function(result){
    if(result.error){
      logger.error(JSON.stringify(result.error));
      return;
    }
    logger.info(JSON.stringify(result.message));
});

/**
 * mailOptions: object,
 * 传入属性描述
 * to: 发送到谁
 * subject: 邮件标题
 * html: 邮件html内容
 * text: 邮件文本内容 和html传一个即可
 * attachments： array object: 附件 {filename, path}
 */
module.exports = function(mailOptions){
  if(child.connected){
    child.send(mailOptions);
  }
}
