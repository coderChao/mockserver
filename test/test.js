// var ProjectLogic = require("../dist/logic/projectLogic.js");
// function test(){
//   debugger;
//   console.log(ProjectLogic.CreateApi);
// //   pro = new ProjectLogic();
//   ProjectLogic.CreateApi({
//       proCode: "1000000",
//       proName: "项目名称",
//       proProxy: "127.0.0.15"
//   }).catch(function(err){
//     debugger;
//     console.log(err);
//   });
 
// }
// test();

const f = () => {
  debugger;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debugger;
      reject(123);
    }, 2000);
  });
};

const testAsync = async () => {
  try{
    debugger;
    const t = await f();
    console.log(t);
    return t;
  }
  catch(e){
    console.log("aaa",e);
    return e;
  }  
};

const test2Async = () => {
  debugger;
  const t2 = testAsync();
  debugger;
  console.log("bbb",t2);
}

test2Async();