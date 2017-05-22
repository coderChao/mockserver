"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var f = function f() {
  debugger;
  return new _promise2.default(function (resolve, reject) {
    setTimeout(function () {
      debugger;
      reject(123);
    }, 2000);
  });
};

var testAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var t;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            debugger;
            _context.next = 4;
            return f();

          case 4:
            t = _context.sent;

            console.log(t);
            return _context.abrupt("return", t);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            console.log("aaa", _context.t0);
            return _context.abrupt("return", _context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function testAsync() {
    return _ref.apply(this, arguments);
  };
}();

var test2Async = function test2Async() {
  debugger;
  var t2 = testAsync();
  debugger;
  console.log("bbb", t2);
};

test2Async();
