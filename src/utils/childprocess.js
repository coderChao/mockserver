const childProcess = require("child_process");
const path = require("path");
const execPath = path.join(__dirname, "/sendmail.js");
const options = {encoding: 'utf8'};

//子进程执行命令行脚本
// var child = childProcess.exec("ls -l", options, function(error,stdout, stderr){  
//  if(error) {
//     console.log(error.stack);
//     console.log('Error Code: '+error.code);
//     console.log('Error Signal: '+error.signal);
//   }
//   console.log('Results: \n' + stdout);
//   if (stderr.length){
//     console.log('Errors: ' + stderr);
//   }
// });

// child.on('exit', function (code) {
//   console.log('Completed with code: '+code);
// });
process.title = "mockserver main process";
console.log(process.pid);
console.log(process.title);
//子进程执行文件
var child = childProcess.fork(execPath);
console.log('fork return pid: ' + child.pid);
child.on('message', function(msg){
    console.log('parent get message: ' + JSON.stringify(msg));
});
child.send({key: 'parent value'});
