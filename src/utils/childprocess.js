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

//子进程执行文件
var child = childProcess.execFile(execPath, options, function(error,stdout, stderr){  
 if(error) {
    console.log(error.stack);
    console.log('Error Code: '+error.code);
    console.log('Error Signal: '+error.signal);
  }
  console.log('Results: \n' + stdout);
  if (stderr.length){
    console.log('Errors: ' + stderr);
  }
});
