// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Block.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Block = /*#__PURE__*/function () {
  function Block(p, charOb, x, y, col, char, parent) {
    _classCallCheck(this, Block);

    this.p = p;
    this.charOb = charOb;
    this.blockSize = 100;
    this.x = x;
    this.posX = this.x * this.blockSize + this.blockSize / 2;
    this.y = y;
    this.posY = this.y * this.blockSize + this.blockSize / 2;
    this.col = col;
    this.char = char;
    this.parent = parent; //console.log("-----this is Block-----");

    this.startTime = charOb.startTime;
    this.endTime = charOb.endTime;
    /*
        console.log(char);
        console.log("startTime : " + this.startTime);
        console.log("endTime : " + this.endTime);
        */

    this.isDisplayed = false;
  }

  _createClass(Block, [{
    key: "display",
    value: function display() {
      var p = this.p;
      p.push();
      p.translate(this.posX, this.posY);
      p.noStroke();
      p.fill(this.col);
      p.rect(0, 0, this.blockSize, this.blockSize);
      p.pop();
    }
  }, {
    key: "displayText",
    value: function displayText() {
      var p = this.p;
      p.textSize(100);
      p.push();
      p.translate(this.posX, this.posY);
      p.noStroke();
      p.fill(this.col);
      p.text(this.char, 0, 0);
      p.pop();
      this.isDisplayed = true;
    }
  }, {
    key: "displayTextRotate",
    value: function displayTextRotate(bottom) {
      var p = this.p;
      var rad;

      switch (bottom) {
        case 'B':
          rad = 0;
          break;

        case 'T':
          rad = p.radians(180);
          break;

        case 'L':
          rad = p.radians(90);
          break;

        case 'R':
          rad = p.radians(-90);
          break;
      }

      p.textSize(100);
      p.push();
      p.translate(this.posX, this.posY);
      p.rotate(rad);
      p.noStroke();
      p.fill(this.col);
      p.text(this.char, 0, 0);
      p.pop();
    }
  }, {
    key: "X",
    get: function get() {
      return this.x;
    }
  }, {
    key: "Y",
    get: function get() {
      return this.y;
    }
  }, {
    key: "_startTime",
    get: function get() {
      return this.startTime;
    }
  }, {
    key: "_endTime",
    get: function get() {
      return this.endTime;
    }
  }, {
    key: "_isDisplayed",
    get: function get() {
      return this.isDisplayed;
    }
  }]);

  return Block;
}();

exports.Block = Block;
},{}],"js/Empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Empty = /*#__PURE__*/function () {
  function Empty(y, x) {
    _classCallCheck(this, Empty);

    this.initPos = new Array(2);
    this.initPos[0] = x;
    this.initPos[1] = y;
    this.row_poses = new Array();
    this.row_poses.push(this.initPos);
    this.col_poses = new Array();
    this.col_poses.push(this.initPos);
    this.key_row_poses = new Array();
    this.key_row_poses.push(this.initPos);
    this.key_col_poses = new Array();
    this.key_col_poses.push(this.initPos);
    this.rowleng = 0;
    this.colleng = 0;
  }

  _createClass(Empty, [{
    key: "setPos",
    value: function setPos(y, x, s, isKey) {
      var pos = new Array(2);
      pos[0] = x;
      pos[1] = y;

      if (s === 'row') {
        if (isKey) this.key_row_poses.push(pos);
        this.row_poses.push(pos);
      } else if (s === 'col') {
        if (isKey) this.key_col_poses.push(pos);
        this.col_poses.push(pos);
      }
    }
  }, {
    key: "sortDataBy",
    value: function sortDataBy(which) {
      if (which === 'row') {
        this.row_poses.sort(function (a, b) {
          return a[0] - b[0];
        });
      } else if (which === 'col') {
        this.col_poses.sort(function (a, b) {
          return a[1] - b[1];
        });
      }
    }
  }, {
    key: "withinRowleng",
    value: function withinRowleng(num) {
      if (num <= this.row_poses.length) return true;else return false;
    }
  }, {
    key: "withinColleng",
    value: function withinColleng(num) {
      if (num <= this.col_poses.length) return true;else return false;
    }
  }, {
    key: "rowPoses",
    get: function get() {
      return this.row_poses;
    }
  }, {
    key: "colPoses",
    get: function get() {
      return this.col_poses;
    }
  }, {
    key: "keyRowPoses",
    get: function get() {
      return this.key_row_poses;
    }
  }, {
    key: "keyColPoses",
    get: function get() {
      return this.key_col_poses;
    }
  }]);

  return Empty;
}();

exports.Empty = Empty;
},{}],"js/SpiralScan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpiralScan = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SpiralScan = /*#__PURE__*/function () {
  function SpiralScan(startX, startY) {
    _classCallCheck(this, SpiralScan);

    this.length = 1;
    this.now = 1;
    this.d = 1;
    this.isFirst = true;
    this.direct = ['N', 'E', 'S', 'W']; //this.n = (this.w) * (this.h) -1;

    this.x = startX;
    this.y = startY;
  }

  _createClass(SpiralScan, [{
    key: "scanGrid",
    value: function scanGrid() {
      var d0 = this.direct[this.d % 4];

      if (d0 == 'N') {
        this.y--;
      } else if (d0 == 'S') {
        this.y++;
      } else if (d0 == 'E') {
        this.x++;
      } else if (d0 == 'W') {
        this.x--;
      }

      this.length--;

      if (!this.isFirst && this.length == 0) {
        this.isFirst = true;
        this.now++;
        this.length = this.now;
        this.d++;
      } else if (this.length == 0) {
        this.length = this.now;
        this.isFirst = false;
        this.d++;
      }
    }
  }, {
    key: "_x",
    get: function get() {
      return this.x;
    }
  }, {
    key: "_y",
    get: function get() {
      return this.y;
    }
  }]);

  return SpiralScan;
}();

exports.SpiralScan = SpiralScan;
},{}],"js/drawGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizelistTo2Darray_W = exports.sizelistTo2Darray_S = exports.sizelistTo2Darray_N = exports.sizelistTo2Darray_E = exports.drawGrid = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var drawGrid = function drawGrid(p, width, height) {
  var col = height / 100;
  var row = width / 100;
  var size = 100;
  p.strokeWeight(1);
  p.stroke(255);
  p.noFill();

  for (var i = 0; i < row; i++) {
    p.line(i * size, 0, i * size, col * size);
  }

  for (var _i = 0; _i < col; _i++) {
    p.line(0, _i * size, row * size, _i * size);
  }
}; //テキストサイズの配列から二次元配列へ
//row bottom


exports.drawGrid = drawGrid;

var sizelistTo2Darray_N = function sizelistTo2Darray_N(sizelist) {
  var yleng = Math.max.apply(Math, _toConsumableArray(sizelist));
  var xleng = sizelist.reduce(function (sum, num) {
    return sum + num;
  }, 0);
  var res = new Array(yleng);

  for (var y = 0; y < yleng; y++) {
    res[y] = new Array();
  }

  for (var _y = 0; _y < yleng; _y++) {
    for (var i = 0; i < sizelist.length; i++) {
      var insertNum = 0;
      if (res.length - _y <= sizelist[i]) insertNum = 5;
      var count = 0;

      while (count < sizelist[i]) {
        res[_y].push(insertNum);

        count++;
      }
    }
  }

  return res;
}; //col left


exports.sizelistTo2Darray_N = sizelistTo2Darray_N;

var sizelistTo2Darray_E = function sizelistTo2Darray_E(sizelist) {
  var yleng = sizelist.reduce(function (sum, num) {
    return sum + num;
  }, 0);
  var xleng = Math.max.apply(Math, _toConsumableArray(sizelist));
  var res = new Array(yleng);

  for (var y = 0; y < yleng; y++) {
    res[y] = new Array();
  }

  var col = 0;

  for (var i = 0; i < sizelist.length; i++) {
    var num = sizelist[i];

    for (var j = 0; j < num; j++) {
      var count = 0;

      while (count < xleng) {
        var insertNum = 0;
        if (count < num) insertNum = 5;
        res[col].push(insertNum);
        count++;
      }

      col++;
    }
  }

  return res;
}; //col right


exports.sizelistTo2Darray_E = sizelistTo2Darray_E;

var sizelistTo2Darray_W = function sizelistTo2Darray_W(sizelist) {
  var arr = sizelistTo2Darray_E(sizelist); //const arr = sizelist_E;

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      i.reverse();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  arr.reverse();
  return arr;
}; //row top


exports.sizelistTo2Darray_W = sizelistTo2Darray_W;

var sizelistTo2Darray_S = function sizelistTo2Darray_S(sizelist) {
  var arr = sizelistTo2Darray_N(sizelist); //const arr = sizelist_N;

  var _iterator2 = _createForOfIteratorHelper(arr),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var i = _step2.value;
      i.reverse();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  arr.reverse();
  return arr;
};

exports.sizelistTo2Darray_S = sizelistTo2Darray_S;
},{}],"js/Grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var _Empty = require("./Empty");

var _SpiralScan = require("./SpiralScan");

var _drawGrid = require("./drawGrid");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Grid = /*#__PURE__*/function () {
  function Grid(p, canvasW, canvasH) {
    _classCallCheck(this, Grid);

    this.p = p; //グリッドの大きさを指定

    this.canvasW = canvasW;
    this.canvasH = canvasH; //グリッドからマス目

    this.w = this.canvasW / 100;
    this.h = this.canvasH / 100;
    this.centerPos = [Math.floor(this.w / 2), Math.floor(this.h / 2)];
    console.log("center is" + this.centerPos);
    this.grid = new Array(this.h);

    for (var y = 0; y < this.h; y++) {
      this.grid[y] = new Array(this.w).fill(0);
    }

    this.empty = new Array();
    this.setInitFill();
    this.spiralScan = new _SpiralScan.SpiralScan(this.centerPos[0], this.centerPos[1]);
  }

  _createClass(Grid, [{
    key: "setInitFill",
    value: function setInitFill() {
      this.grid[this.centerPos[1]][this.centerPos[0]] = 1; //this.printGrid();

      this.deleteZero();
      this.setEmpty(); //this.printGrid();
      //this.searchGrid();
      //this.printEmpty();
      //console.log(this.empty);
    }
  }, {
    key: "setFilled",
    value: function setFilled(x, y) {
      this.grid[y][x] = 1;
    }
  }, {
    key: "setEmpty",
    value: function setEmpty() {
      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          if (this.grid[y][x] == 1) {
            var tmp = 0; //上方向の空白マス

            tmp = y - 1;

            while (0 <= tmp) {
              if (this.grid[tmp][x] == 1) {
                break;
              } else if (y - tmp == 1) {
                this.grid[tmp][x] = 3;
              } else if (this.grid[tmp][x] == 3) {
                this.grid[tmp][x] = 3;
              } else {
                this.grid[tmp][x] = 2;
              }

              tmp--;
            }

            tmp = y + 1; //下方向の空白マス

            while (tmp < this.h) {
              if (this.grid[tmp][x] == 1) {
                break;
              } else if (tmp - y == 1) {
                this.grid[tmp][x] = 3;
              } else if (this.grid[tmp][x] == 3) {
                this.grid[tmp][x] = 3;
              } else {
                this.grid[tmp][x] = 2;
              }

              tmp++;
            }

            tmp = x - 1; //左方向の空白マス

            while (0 <= tmp) {
              if (this.grid[y][tmp] == 1) {
                break;
              } else if (x - tmp == 1) {
                this.grid[y][tmp] = 3;
              } else if (this.grid[y][tmp] == 3) {
                this.grid[y][tmp] = 3;
              } else {
                this.grid[y][tmp] = 2;
              }

              tmp--;
            }

            tmp = x + 1; //右方向の空白マス

            while (tmp < this.w) {
              if (this.grid[y][tmp] == 1) {
                break;
              } else if (tmp - x == 1) {
                this.grid[y][tmp] = 3;
              } else if (this.grid[y][tmp] == 3) {
                this.grid[y][tmp] = 3;
              } else {
                this.grid[y][tmp] = 2;
              }

              tmp++;
            }
          }
        }
      }
    }
  }, {
    key: "printGrid",
    value: function printGrid() {
      var t = "";

      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          t += "|" + this.grid[y][x];
        }

        t += "\n";
      }

      console.log(t);
    }
  }, {
    key: "displayPoint",
    value: function displayPoint() {
      var p = this.p;

      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          if (this.grid[y][x] != 1 && this.grid[y][x] != 0) {
            if (this.grid[y][x] == 2) {
              p.noStroke();
              p.fill(p.color(0, 0, 255));
              p.ellipse(this.getCoord(x), this.getCoord(y), 10, 10);
            } else if (this.grid[y][x] == 3) {
              p.noStroke();
              p.fill(p.color(255, 0, 0));
              p.ellipse(this.getCoord(x), this.getCoord(y), 10, 10);
            }
          }
        }
      }
    }
  }, {
    key: "searchGrid",
    value: function searchGrid() {
      this.empty.splice(0);

      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          if (this.grid[y][x] == 3) {
            var e = new _Empty.Empty(y, x);
            var tmp = 0;
            var s = "";
            s = "col"; //上方向

            tmp = y - 1;

            while (0 <= tmp) {
              if (this.grid[tmp][x] == 1) {
                break;
              } else if (this.grid[tmp][x] == 2) {
                e.setPos(tmp, x, s, false);
              } else if (this.grid[tmp][x] == 3) {
                e.setPos(tmp, x, s, true);
              }

              tmp--;
            } //下方向


            tmp = y + 1;

            while (tmp < this.h) {
              if (this.grid[tmp][x] == 1) {
                break;
              } else if (this.grid[tmp][x] == 2) {
                e.setPos(tmp, x, s, false);
              } else if (this.grid[tmp][x] == 3) {
                e.setPos(tmp, x, s, true);
              }

              tmp++;
            }

            s = "row"; //左方向

            tmp = x - 1;

            while (0 <= tmp) {
              if (this.grid[y][tmp] == 1) {
                break;
              } else if (this.grid[y][tmp] == 2) {
                e.setPos(y, tmp, s, false);
              } else if (this.grid[y][tmp] == 3) {
                e.setPos(y, tmp, s, true);
              }

              tmp--;
            } //右方向の空白


            tmp = x + 1;

            while (tmp < this.w) {
              if (this.grid[y][tmp] == 1) {
                break;
              } else if (this.grid[y][tmp] == 2) {
                e.setPos(y, tmp, s, false);
              } else if (this.grid[y][tmp] == 3) {
                e.setPos(y, tmp, s, true);
              }

              tmp++;
            }

            this.empty.push(e);
          }
        }
      }
    }
  }, {
    key: "deleteZero",
    value: function deleteZero() {
      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          if (this.grid[y][x] == 0) this.grid[y][x] = 2;
        }
      }
    }
  }, {
    key: "getEmptyPoses",
    value: function getEmptyPoses(textleng, which) {
      var withinPos = new Array();

      var _iterator = _createForOfIteratorHelper(this.empty),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var e = _step.value;

          if (which === 'row') {
            if (e.withinRowleng(textleng)) withinPos.push(e);
          } else if (which === 'col') {
            if (e.withinColleng(textleng)) withinPos.push(e);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var index = Math.floor(Math.random() * withinPos.length);
      var res = withinPos[index];
      return res;
    }
  }, {
    key: "getCoord",
    value: function getCoord(num) {
      return num * 100 + 50;
    }
  }, {
    key: "printEmpty",
    value: function printEmpty() {
      console.log("this is print empty : row");

      var _iterator2 = _createForOfIteratorHelper(this.empty),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var l = _step2.value;
          console.log(l.row_poses);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      console.log("this is print empty : col");

      var _iterator3 = _createForOfIteratorHelper(this.empty),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _l = _step3.value;
          console.log(_l.col_poses);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "getAllAngleArray",
    value: function getAllAngleArray(sizelist) {
      var hash = {};
      hash['N'] = (0, _drawGrid.sizelistTo2Darray_N)(sizelist);
      hash['E'] = (0, _drawGrid.sizelistTo2Darray_E)(sizelist);
      hash['W'] = (0, _drawGrid.sizelistTo2Darray_W)(sizelist);
      hash['S'] = (0, _drawGrid.sizelistTo2Darray_S)(sizelist);
      return hash;
      /*
      const arr = new Array();
      arr.push(sizelistTo2Darray_N(sizelist));
      console.log("N : "+arr[0]);
      arr.push(sizelistTo2Darray_E(sizelist));
      console.log("E : "+arr[1]);
      arr.push(sizelistTo2Darray_W(arr[1]));
      console.log("W : "+arr[2]);
      arr.push(sizelistTo2Darray_S(arr[0]));
      console.log("S : "+arr[3]);
      return arr;
      */
    }
  }, {
    key: "SearchGridBySizeable",
    value: function SearchGridBySizeable(text, sizelist) {
      var _this = this;

      //console.log("this is testSearchGrid");
      var allAngleArray = this.getAllAngleArray(sizelist);
      var reservedPos = new Array();
      var outerReserve = new Array();
      var n = this.w * this.h - 1;

      for (var i = 0; i < n; i++) {
        this.spiralScan.scanGrid();
        var y = this.spiralScan.y;
        var x = this.spiralScan.x;
        if (y < 0 || y >= this.h || x < 0 || x >= this.w) continue;

        if (this.grid[y][x] == 3) {
          var _ret = function () {
            //ターゲットを走査
            var used = new Array();
            var rotationList = ['N', 'E', 'W', 'S']; //let rotation;

            var num = 0;

            while (num < Object.keys(allAngleArray).length) {
              if (!used.length) rotationList = rotationList.filter(function (i) {
                return used.indexOf(i) == -1;
              });
              var index = Math.floor(Math.random() * rotationList.length);
              var targetArr = allAngleArray[rotationList[index]];

              for (var ty = 0; ty < targetArr.length; ty++) {
                for (var tx = 0; tx < targetArr[ty].length; tx++) {
                  if (targetArr[ty][tx] == 5) {
                    var tmpY = y;
                    var ok = 0;
                    var arr = void 0;
                    var isLoop = true;

                    if (ty > 0) {
                      tmpY = tmpY - ty;
                    } //reservedPos.splice(0);


                    var _reservedPos = new Array();

                    while (ok < targetArr.length) {
                      var startPos = x - tx;
                      var endPos = x + (targetArr[ty].length - tx);
                      if (tmpY < 0 || tmpY + ok >= _this.h) break;
                      if (endPos > _this.w) break;
                      arr = _this.grid[tmpY + ok].slice(startPos, endPos);
                      if (arr.length == 0) break;
                      /*
                      if(text === '掛け替えの' || text === '鳴り響け'　|| text === 'Memory') {
                        console.log(text+ " "+arr);
                      }
                      */

                      for (var _n = 0; _n < arr.length; _n++) {
                        var res = _this.isEqual(arr[_n], targetArr[ok][_n]);

                        if (res == -1) {
                          continue;
                        } else if (res == 0) {
                          isLoop = false;
                          break;
                        } else if (res == 1) {
                          var t = [tmpY + ok, startPos + _n];

                          _reservedPos.push(t);
                        }
                      }

                      if (!isLoop) break;
                      ok++;
                    }

                    if (ok == targetArr.length) {
                      //入るマスが見つかった状態
                      if (_reservedPos.length == 0) {
                        console.log("から！！！！");
                        console.log(ok);
                        console.log(arr);
                      } //console.log(reservedPos);


                      var reserved = _this.makeAarray(index, _reservedPos, text, sizelist); //outerReserve.push(reserved);


                      return {
                        v: reserved
                      };
                    }
                  }
                }
              }

              used.push(index);
              num++;
            } //return outerReserve;

          }();

          if (_typeof(_ret) === "object") return _ret.v;
        }
      } //return outerReserve;

    }
  }, {
    key: "makeAarray",
    value: function makeAarray(index, reservedPos, text, sizelist) {
      var dir = '';

      switch (index) {
        case 0:
          dir = 'N';
          break;

        case 1:
          dir = 'E';
          break;

        case 2:
          dir = 'W';
          break;

        case 3:
          dir = 'S';
          break;
      }

      var reserved = this.sortDataBy(dir, reservedPos, sizelist, text);
      return reserved;
    }
  }, {
    key: "sortDataBy",
    value: function sortDataBy(dir, array, sizelist, text) {
      //console.log("sortDataBy です");
      //console.log(array);
      //文字方向によってソート順を変える
      if (dir === 'N') {
        array.sort(function (a, b) {
          return a[1] - b[1];
        });
      } else if (dir === 'S') {
        array.sort(function (a, b) {
          return b[1] - a[1];
        });
      } else if (dir === 'E') {
        array.sort(function (a, b) {
          return a[0] - b[0];
        });
      } else if (dir === 'W') {
        array.sort(function (a, b) {
          return b[0] - a[0];
        });
      }

      var sizedPos = new Array();
      var increment = 0;

      var _iterator4 = _createForOfIteratorHelper(sizelist),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var size = _step4.value;
          var leng = increment + size * size;
          sizedPos.push(array.slice(increment, leng));
          increment = leng;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var res = new Array(); //連想配列をつくる

      for (var i = 0; i < sizelist.length; i++) {
        res.push({
          text: text.split('')[i],
          dir: dir,
          size: sizelist[i],
          pos: sizedPos[i]
        });
      }

      return res;
    }
  }, {
    key: "isEqual",
    value: function isEqual(num1, num2) {
      if (num2 == 0) return -1;
      if (num1 == 3 || num1 == 2) num1 = 5;
      if (num1 == num2) return 1;
      return 0;
    }
  }, {
    key: "isEqualArray",
    value: function isEqualArray(array1, array2) {
      var i = array1.length;
      if (i != array2.length) return false;

      while (i--) {
        var a1 = array1[i];
        if (array2[i] == 0) continue;
        if (a1 == 3 || a1 == 2) array1[i] = 5;
        if (array1[i] !== array2[i]) return false;
      }

      return true;
    }
  }, {
    key: "getActiveGridSize",
    value: function getActiveGridSize(position, wordBlocks) {
      var _this2 = this;

      var activeGrid = new Array(this.h);

      for (var y = 0; y < this.h; y++) {
        activeGrid[y] = new Array(this.w).fill(0);
      }

      var getGridSize = function getGridSize(grid) {
        var xleng = {
          minX: grid[0].length,
          maxX: 0
        };
        var yleng = {
          minY: grid.length,
          maxY: 0
        };

        for (var _y = 0; _y < grid.length; _y++) {
          for (var x = 0; x < grid[_y].length; x++) {
            if (grid[_y][x] == 1) {
              if (x < xleng['minX']) xleng['minX'] = x;
              if (x > xleng['maxX']) xleng['maxX'] = x;
              if (_y < yleng['minY']) yleng['minY'] = _y;
              if (_y > yleng['maxY']) yleng['maxY'] = _y;
            }
          }
        }

        var sizeX = 0;
        var sizeY = 0; //中心からの距離が長い方を抽出

        if (Math.abs(_this2.centerPos[0] - xleng['minX']) < Math.abs(_this2.centerPos[0] - xleng['maxX'])) {
          sizeX = Math.abs(_this2.centerPos[0] - xleng['maxX']) * 2;
        } else {
          sizeX = Math.abs(_this2.centerPos[0] - xleng['minX']) * 2;
        }

        if (Math.abs(_this2.centerPos[1] - yleng['minY']) < Math.abs(_this2.centerPos[1] - yleng['maxY'])) {
          sizeY = Math.abs(_this2.centerPos[1] - yleng['maxY']) * 2;
        } else {
          sizeY = Math.abs(_this2.centerPos[1] - yleng['minY']) * 2;
        }

        var result = {
          sizeX: sizeX,
          sizeY: sizeY
        };
        return result;
      };

      var _iterator5 = _createForOfIteratorHelper(wordBlocks),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var w = _step5.value;

          if (w.startTime < position) {
            var _iterator6 = _createForOfIteratorHelper(w._posInGrid),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var pos = _step6.value;
                activeGrid[pos[0]][pos[1]] = 1;
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        } //this.printActiveGrid(activeGrid);

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return getGridSize(activeGrid);
    }
  }, {
    key: "printActiveGrid",
    value: function printActiveGrid(grid) {
      var t = "";

      for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[0].length; x++) {
          t += "|" + grid[y][x];
        }

        t += "\n";
      }

      console.log(t);
    }
  }]);

  return Grid;
}();

exports.Grid = Grid;
},{"./Empty":"js/Empty.js","./SpiralScan":"js/SpiralScan.js","./drawGrid":"js/drawGrid.js"}],"js/SizingBlock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizingBlock = void 0;

var _index = require("./index.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var _TextAliveApp = TextAliveApp,
    Ease = _TextAliveApp.Ease;

var SizingBlock = /*#__PURE__*/function () {
  function SizingBlock(p, charOb, size, dir, posArray, col, parent) {
    _classCallCheck(this, SizingBlock);

    this.p = p;
    this.charOb = charOb;
    this.blockSize = size * _index.globalBlockSize;
    this.char = charOb.text;
    this.posArray = posArray;
    this.posX = 0;
    this.posY = 0;
    this.calcPos();
    this.alpha = 0;
    this.col = col; //this.col = this.p.color(255, 0, 0, this.alpha);

    this.dir = dir;
    this.parent = parent;
    this.startTime = charOb.startTime;
    this.endTime = charOb.endTime;
    this.isDisplayed = false;
    this.displayTime = this.endTime - this.startTime; //console.log(this.char + ' | '+ this.startTime);
    //console.log(this.posArray);

    this.isChorus;
    this.getIsChorus(); //this.chorusX = 0;
    //this.chorusY = 0;

    this.chorusX = Math.floor(Math.random() * 50);
    this.chorusY = Math.floor(Math.random() * 50); //console.log(this.char + " | " + this.isChorus);
    //this.chorusCol = this.p.color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));

    if (!isFinite(this.posX) || !isFinite(this.posY)) {
      console.log("ブロック [" + this.char + "] は異常値です。");
      console.log("ブロック情報 | 文字 : " + this.char + " posX : " + this.posX + " posY : " + this.posY);
      console.log(this.posArray);
    } //this.distRad;


    this.angle;

    switch (this.dir) {
      case 'N':
        this.angle = 0;
        break;

      case 'S':
        this.angle = 180;
        break;

      case 'E':
        this.angle = 90;
        break;

      case 'W':
        this.angle = 270;
        break;
    }

    this.distRad = p.radians(this.angle);
    this.preAngle = this.angle - 90;
    this.rad = 0;
    this.isSetChorusPos = false;
    this.posX_chorus = 0;
    this.posY_chorus = 0;
    this.size_chorus = 0;
    this.alpha_chorus = 0;
    this.col_chorus = p.color(100, 0, 100);
    this.col_chorusOut = p.color(Math.floor(Math.random() * 100), 100, 100);
  }

  _createClass(SizingBlock, [{
    key: "update_fadein",
    value: function update_fadein(position) {
      var p = this.p;
      var progress = 1 - (this.startTime - position) / _index.time_fadein;
      var eased = Ease.quintIn(progress);
      this.alpha = 100 * eased;
      this.col = p.color(255, 0, 0, this.alpha);
      var r = 90 * eased;
      r = p.constrain(r, 0, 90);
      var a = this.preAngle + r;
      this.rad = p.radians(a); //console.log(this.char + " / " + progress + ' : ' + eased + ' : ' + this.alpha);
      //console.log(this.char + " / " + progress + ' : ' + this.preAngle + ' : ' + r);

      if (progress > 1) this.isDisplayed = true;
    }
  }, {
    key: "update_fadeout",
    value: function update_fadeout(position) {}
  }, {
    key: "displayText",
    value: function displayText() {
      var p = this.p;
      p.textSize(this.blockSize);
      p.push();
      p.translate(this.posX, this.posY);
      p.rotate(this.rad);
      p.noStroke();
      p.fill(p.color(255, 0, 255, this.alpha));
      p.text(this.char, 0, 0);
      p.pop(); //this.isDisplayed = true;
    }
  }, {
    key: "calcPos",
    value: function calcPos() {
      if (this.posArray.length == 1) {
        var pos = this.posArray[0];
        this.posX = pos[1] * _index.globalBlockSize + this.blockSize / 2;
        this.posY = pos[0] * _index.globalBlockSize + this.blockSize / 2;
      } else {
        var x = new Array();
        var y = new Array();

        var _iterator = _createForOfIteratorHelper(this.posArray),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var a = _step.value;
            x.push(a[1]);
            y.push(a[0]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var minX = Math.min.apply(Math, x);
        var minY = Math.min.apply(Math, y);
        this.posX = minX * _index.globalBlockSize + this.blockSize / 2;
        this.posY = minY * _index.globalBlockSize + this.blockSize / 2;
      }
    }
  }, {
    key: "getIsChorus",
    value: function getIsChorus() {
      var _iterator2 = _createForOfIteratorHelper(_index.chorus),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;

          if (c.startTime <= this.startTime && this.startTime <= c.endTime) {
            this.isChorus = true;
            return;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.isChorus = false;
    }
  }, {
    key: "updateChorus_fadeIn",
    value: function updateChorus_fadeIn(position) {
      var p = this.p;
      var progress = 1 - (this.startTime - position) / 500;
      var eased = Ease.quintIn(progress); //this.size_chorus = 1200 * eased;

      var al = 100 * eased;
      this.col_chorus.setAlpha(100 * eased); //console.log(this.col_chorus);
      //if(progress > 1) this.col_chorus = this.col_chorusOut;
    }
  }, {
    key: "displayChorusText",
    value: function displayChorusText() {
      var p = this.p;
      p.push();
      p.textSize(this.size_chorus);
      p.blendMode(p.EXCLUSION);
      p.translate(this.posX_chorus, this.posY_chorus);
      p.noStroke();
      p.fill(this.col_chorus);
      p.text(this.char, 0, 0); //p.blendMode(p.HARD_LIGHT);

      /*
      p.fill(p.color(20, 80, 100, 80));
      p.text(this.char, this.chorusX, 20);
      p.fill(p.color(50, 80, 100, 80));
      p.text(this.char, -20, -this.chorusY);
      */

      p.pop(); //this.isDisplayed = true;
    }
  }, {
    key: "updateChorus_fadeOut",
    value: function updateChorus_fadeOut(position) {
      var p = this.p;
      var progress = 1 - (position - this.endTime) / 500;
      var eased = Ease.quintIn(progress); //this.size_chorus = 1200 * eased;

      var al = 100 - 100 * eased; //this.col_chorus = this.col_chorusOut;

      this.col_chorus.setAlpha(al);
      console.log(al);
    }
  }, {
    key: "setChorusPos",
    value: function setChorusPos(sizeX, sizeY) {
      this.size_chorus = 1200;
      var minX = _index.canvasW / 2 - sizeX * _index.globalBlockSize / 2 + this.size_chorus / 2;
      var maxX = _index.canvasW / 2 + sizeX * _index.globalBlockSize / 2 - this.size_chorus / 2;
      var minY = _index.canvasH / 2 - sizeY * _index.globalBlockSize / 2 + this.size_chorus / 2;
      var maxY = _index.canvasH / 2 + sizeY * _index.globalBlockSize / 2 - this.size_chorus / 2;
      console.log('sizeX : ' + sizeX + ' sizeY : ' + sizeY + ' / minX : ' + minX + ' maxX : ' + maxX);
      this.posX_chorus = Math.floor(Math.random() * (maxX - minX) + minX);
      this.posY_chorus = Math.floor(Math.random() * (maxY - minY) + minY); //console.log(this.posX_chorus + ' / '+this.posY_chorus);

      this.isSetChorusPos = true;
    }
  }, {
    key: "_text",
    get: function get() {
      return this.char;
    }
  }, {
    key: "_posX",
    get: function get() {
      return this.posX;
    }
  }, {
    key: "_posY",
    get: function get() {
      return this.posY;
    }
  }, {
    key: "_startTime",
    get: function get() {
      return this.startTime;
    }
  }, {
    key: "_endTime",
    get: function get() {
      return this.endTime;
    }
  }, {
    key: "_isDisplayed",
    get: function get() {
      return this.isDisplayed;
    }
  }, {
    key: "_isSetChorusPos",
    get: function get() {
      return this.isSetChorusPos;
    }
  }, {
    key: "_posX_chorus",
    get: function get() {
      return this.posX_chorus;
    }
  }, {
    key: "_posY_chorus",
    get: function get() {
      return this.posY_chorus;
    }
  }]);

  return SizingBlock;
}();

exports.SizingBlock = SizingBlock;
},{"./index.js":"js/index.js"}],"js/WordBlock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WordBlock = void 0;

var _Block = require("./Block");

var _Empty = require("./Empty");

var _Grid = require("./Grid");

var _SizingBlock = require("./SizingBlock");

var _index = require("./index.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var WordBlock = /*#__PURE__*/function () {
  function WordBlock(p, g, wordObArray, text, col) {
    _classCallCheck(this, WordBlock);

    this.p = p;
    this.g = g; //console.log("this is chainblock  text length:"+ word.text.length + " which: " + which);
    //this.g.searchGrid();

    this.wordObArray = wordObArray;
    this.text = text;
    this.charArray = this.text.split('');
    this.sizelist = this.makeSizeList(); //charごとの連想配列

    this.aArray = this.g.SearchGridBySizeable(text, this.sizelist); //console.log("ワードブロックです");
    //console.log(this.aArray);

    var dirA = this.aArray[0];
    this.dir = dirA['dir'];
    /*
    this.empty = this.g.getEmptyPoses(text.length, which);
    if(this.empty　=== undefined) console.log("見つかりませんですた！！");
    this.empty.sortDataBy(which);
    */

    this.col = p.color(Math.floor(Math.random() * 100), 100, 70);
    this.blocks = new Array(text.length); //this.which = which;
    //this.bottom = bottom;

    this.displayChildrenCount = 0;
    this.isDisplayAll = false;
    /*
    console.log("this is ChainBlock");
    console.log(wordObArray);
    console.log(this.wordObArray[0].children);
    */

    var l = this.wordObArray[0].children; //console.log(l[0]);
    //console.log(text);

    this.charObArray = new Array();
    this.startTime = null;
    this.endTime = null;

    var _iterator = _createForOfIteratorHelper(this.wordObArray),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var w = _step.value;

        var _iterator2 = _createForOfIteratorHelper(w.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var x = _step2.value;
            this.charObArray.push(x);
            if (x.startTime < this.startTime || !this.startTime) this.startTime = x.startTime;
            if (x.endTime > this.endTime || !this.endTime) this.endTime = x.endTime;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.posX;
    this.posY;
    this.calcPos();
    this.posInGrid;
    this.makePosInGrid();
    this.makeBlock();
  }

  _createClass(WordBlock, [{
    key: "makeBlock",
    value: function makeBlock() {
      var i = 0;

      var _iterator3 = _createForOfIteratorHelper(this.aArray),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var a = _step3.value;
          this.blocks[i] = new _SizingBlock.SizingBlock(this.p, this.charObArray[i], a['size'], a['dir'], a['pos'], this.col, this); //console.log(this.charObArray[i] +" | "+a['dir']+" | "+a['pos']);

          var _iterator4 = _createForOfIteratorHelper(a['pos']),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var p = _step4.value;
              this.g.setFilled(p[1], p[0]);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          i++;
        }
        /*
        const sp = this.selectPos();
        for(const pos of sp) {
          this.blocks[i] = new Block(this.p, this.charObArray[i], pos[0], pos[1], this.col, this.charArray[i], this);
          this.g.setFilled(pos[0], pos[1]);
          i++;
        }
        */

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.g.setEmpty();
    }
  }, {
    key: "selectPos",
    value: function selectPos() {
      var poses = this.which === 'col' ? this.empty.colPoses : this.empty.rowPoses;
      var keyPoses = this.which === 'col' ? this.empty.keyColPoses : this.empty.keyRowPoses; //隣接マスをランダムに決定

      var index = Math.floor(Math.random() * keyPoses.length);
      var keyPos = keyPoses[index];
      var keyindex = 0;
      var i = 0; //隣接マスのインデックスを探索

      var _iterator5 = _createForOfIteratorHelper(poses),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pos = _step5.value;

          if (keyPos[0] == pos[0] && keyPos[1] == pos[1]) {
            keyindex = i; //println("get index! :"+keyindex);

            break;
          }

          i++;
        } //println("pos array size is"+posArray.size());

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var reservedPos = new Array();
      reservedPos.push(keyPos);
      index = keyindex;
      var previndex = index - 1;
      var nextindex = index + 1;
      var seq = true;

      while (reservedPos.length < this.text.length) {
        //booleanをランダム生成
        seq = Math.random() < 0.5;
        if (nextindex >= poses.length) seq = false;
        if (previndex < 0) seq = true;

        if (seq) {
          reservedPos.push(poses[nextindex]);
          nextindex += 1;
        } else {
          reservedPos.push(poses[previndex]);
          previndex -= 1;
        }
      }

      return this.sort(reservedPos);
    }
  }, {
    key: "sort",
    value: function sort(array) {
      if (this.which === 'row') {
        if (this.bottom === 'B') {
          array.sort(function (a, b) {
            return a[0] - b[0];
          });
        } else if (this.bottom === 'T') {
          array.sort(function (a, b) {
            return b[0] - a[0];
          });
        }
      } else if (this.which === 'col') {
        if (this.bottom === 'L') {
          array.sort(function (a, b) {
            return a[1] - b[1];
          });
        } else if (this.bottom === 'R') {
          array.sort(function (a, b) {
            return b[1] - a[1];
          });
        }
      }

      return array;
    }
  }, {
    key: "display",
    value: function display() {
      var _iterator6 = _createForOfIteratorHelper(this.blocks),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var b = _step6.value;
          b.displayTextRotate(this.bottom);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "getText",
    get: function get() {
      return this.text;
    } //子要素が全て描画されたらboolをtrueにする

  }, {
    key: "inrementDisplayChildrenCount",
    value: function inrementDisplayChildrenCount() {
      this.displayChildrenCount++;

      if (this.displayChildrenCount == this.blocks.length) {
        this.isDisplayAll = true;
      }
    }
  }, {
    key: "makeSizeList",
    value: function makeSizeList() {
      var sizelist = new Array(); //漢字判定の正規表現

      var regexp = /((?:[\u3005\u3007\u303B\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])(?:[\uFE00-\uFE02]|\uDB40[\uDD00-\uDDEF])?)/m;

      var _iterator7 = _createForOfIteratorHelper(this.charArray),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var char = _step7.value;
          if (regexp.test(char)) sizelist.push(2);else sizelist.push(1);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return sizelist;
    }
  }, {
    key: "calcPos",
    value: function calcPos() {
      var xarray = new Array();
      var yarray = new Array();

      var _iterator8 = _createForOfIteratorHelper(this.aArray),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var a = _step8.value;

          var _iterator9 = _createForOfIteratorHelper(a['pos']),
              _step9;

          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var pos = _step9.value;
              xarray.push(pos[1]);
              yarray.push(pos[0]);
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var originX = Math.min.apply(Math, xarray);
      var originY = Math.min.apply(Math, yarray);
      var yleng = 0;
      var xleng = 0;

      if (this.dir === 'N' || this.dir === 'S') {
        yleng = Math.max.apply(Math, _toConsumableArray(this.sizelist));
        xleng = this.sizelist.reduce(function (sum, num) {
          return sum + num;
        }, 0);
      } else {
        yleng = this.sizelist.reduce(function (sum, num) {
          return sum + num;
        }, 0);
        xleng = Math.max.apply(Math, _toConsumableArray(this.sizelist));
      }

      this.posX = originX * _index.globalBlockSize + xleng * _index.globalBlockSize / 2;
      this.posY = originY * _index.globalBlockSize + yleng * _index.globalBlockSize / 2;
    }
  }, {
    key: "makePosInGrid",
    value: function makePosInGrid() {
      var posInGrid = new Array();

      var _iterator10 = _createForOfIteratorHelper(this.aArray),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var a = _step10.value;

          var _iterator11 = _createForOfIteratorHelper(a['pos']),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var pos = _step11.value;
              posInGrid.push(pos);
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      this.posInGrid = posInGrid;
    }
  }, {
    key: "_posInGrid",
    get: function get() {
      return this.posInGrid;
    }
  }, {
    key: "_isDisplayAll",
    get: function get() {
      return this.isDisplayAll;
    }
  }, {
    key: "_blocks",
    get: function get() {
      return this.blocks;
    }
  }, {
    key: "_posX",
    get: function get() {
      return this.posX;
    }
  }, {
    key: "_posY",
    get: function get() {
      return this.posY;
    }
  }, {
    key: "_startTime",
    get: function get() {
      return this.startTime;
    }
  }, {
    key: "_endTime",
    get: function get() {
      return this.endTime;
    }
  }]);

  return WordBlock;
}();

exports.WordBlock = WordBlock;
},{"./Block":"js/Block.js","./Empty":"js/Empty.js","./Grid":"js/Grid.js","./SizingBlock":"js/SizingBlock.js","./index.js":"js/index.js"}],"js/PhraseBlock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhraseBlock = void 0;

var _WordBlock = require("./WordBlock");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PhraseBlock = /*#__PURE__*/function () {
  function PhraseBlock(p, g, phrase) {
    _classCallCheck(this, PhraseBlock);

    this.p = p;
    this.g = g;
    this.phrase = phrase;
    this.wordObArray = new Array();
    this.textArr = new Array();
    this.setArrByPartOfSpeech(phrase);
    if (this.phrase.text.includes('、') || this.phrase.text.includes('。') || this.phrase.text.includes('？')) this.setArrByPunct();
    if (this.phrase.text.includes('(')) this.setArrByText();
    if (this.textArr.length != this.wordObArray.length) console.log("要素数違うお！");
    this.phraseleng = this.textArr.length;
    this.wordBlocks = new Array(this.phraseleng);
    this.col = p.color(Math.floor(Math.random() * 100), 60, 70);
    this.displayChildrenCount = 0;
    this.isDisplayAll = false;
    this.makeWordBlock();
  }

  _createClass(PhraseBlock, [{
    key: "makeWordBlock",
    value: function makeWordBlock() {
      for (var i = 0; i < this.phraseleng; i++) {
        this.wordBlocks[i] = new _WordBlock.WordBlock(this.p, this.g, this.wordObArray[i], this.textArr[i], this.col);
      }
    }
  }, {
    key: "display",
    value: function display() {
      var _iterator = _createForOfIteratorHelper(this.wordBlocks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var w = _step.value;
          w.display();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } //指定された品詞をまとめる

  }, {
    key: "setArrByPartOfSpeech",
    value: function setArrByPartOfSpeech(phrase) {
      var words = phrase.children;
      var textArray = new Array();
      var wordObArray = new Array();
      var i = 0;
      var test = "";
      var isA = false;
      var tempAtext = "";
      var tempAob;

      var _iterator2 = _createForOfIteratorHelper(words),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var word = _step2.value;
          test += word.text;
          test += word.pos + " | "; //console.log(test);

          var text = word.text;
          var w = new Array();

          if (isA) {
            text = tempAtext + word.text;
            w.push(tempAob);
            tempAtext = "";
            tempAob = null;
            isA = false;
          }

          w.push(word); //wordオブジェクトを配列にする
          //助詞(P),助動詞(M)のとき前の要素に追加

          if (word.pos === 'P' || word.pos === 'M') {
            textArray[i - 1] += text;
            wordObArray[i - 1].push(word); //連体詞(A)のとき後ろの要素に追加
          } else if (word.pos === 'A') {
            isA = true;
            tempAtext = word.text;
            tempAob = word;
          } else {
            textArray.push(text);
            wordObArray.push(w);
            i++;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.wordObArray = wordObArray;
      this.textArr = textArray;
    }
  }, {
    key: "setArrByPunct",
    value: function setArrByPunct() {
      var textA = this.textArr;
      var obA = this.wordObArray;
      var tmpText = "";
      var tmpOb = new Array();

      for (var i = 0; i < textA.length; i++) {
        if (textA[i].includes('、') || textA[i].includes('。') || textA[i].includes('？')) {
          var _tmpText = textA[i];
          var _tmpOb = obA[i];
          textA.splice(i, 1);
          obA.splice(i, 1);
          textA[i - 1] = textA[i - 1] + _tmpText;

          var _iterator3 = _createForOfIteratorHelper(_tmpOb),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var o = _step3.value;
              obA[i - 1].push(o);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }

      this.textArr = textA;
      this.wordObArray = obA;
    }
  }, {
    key: "setArrByText",
    value: function setArrByText() {
      var textA = this.textArr;
      var obA = this.wordObArray;
      var startIndex = 0;
      var endIndex = 0;
      var tmpText = "";
      var tmpOb = new Array();
      var isStart = false;
      var newA;
      var no;

      for (var i = 0; i < textA.length; i++) {
        if (textA[i].includes('(')) {
          isStart = true;
          startIndex = i;
          endIndex = i;
        }

        if (isStart) {
          tmpText += textA[i];

          var _iterator4 = _createForOfIteratorHelper(obA[i]),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var ob = _step4.value;
              tmpOb.push(ob);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          if (textA[i].includes(')')) {
            textA.splice(startIndex, endIndex);
            obA.splice(startIndex, endIndex);
            textA.push(tmpText);
            obA.push(tmpOb);
            isStart = false;
            startIndex = 0;
            endIndex = 0;
            tmpText = "";
            tmpOb = new Array();
          } else {
            endIndex++;
          }
        } //console.log(" i : "+i+" | isStart : "+isStart+" | startIndex : "+startIndex+" | endIndex : "+endIndex+ " | tmpText : "+tmpText);

      }

      this.textArr = textA;
      this.wordObArray = obA;
    }
  }, {
    key: "_wordBlocks",
    get: function get() {
      return this.wordBlocks;
    }
  }, {
    key: "_isDisplayAll",
    get: function get() {
      return this.isDisplayAll;
    }
  }]);

  return PhraseBlock;
}();

exports.PhraseBlock = PhraseBlock;
},{"./WordBlock":"js/WordBlock.js"}],"js/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Ball = /*#__PURE__*/function () {
  function Ball(p, x, y) {
    _classCallCheck(this, Ball);

    this.p = p;
    this.posX = x;
    this.posY = y;
    this.size = p.random(400, 800);
    var h = p.random(100);
    var s = p.random(70, 100);
    var b = p.random(80, 100);
    this.col = p.color(h, s, b);
    this.col.setAlpha(p.random(p.random(100)));
    this.num = 5;
    this.posXarray = [];
    this.posYarray = [];
    this.sizeArray = [];

    for (var i = 0; i < this.num; i++) {
      this.posXarray.push(p.randomGaussian(this.posX, 300));
      this.posYarray.push(p.randomGaussian(this.posY, 300)); //this.sizeArray.push(p.random(400, 800));

      this.sizeArray.push(p.random(100, 300));
    }
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      this.p.push();
      this.p.blendMode(this.p.LIGHTEST);
      this.p.noStroke();
      this.p.fill(this.col);
      this.p.circle(this.posX, this.posY, this.size);
      this.p.pop();
    }
  }, {
    key: "drawMulti",
    value: function drawMulti() {
      for (var i = 0; i < this.num; i++) {
        this.p.push();
        this.p.blendMode(this.p.LIGHTEST);
        this.p.noStroke();
        this.p.fill(this.col);
        this.p.circle(this.posXarray[i], this.posYarray[i], this.sizeArray[i]);
        this.p.pop();
      }
    }
  }]);

  return Ball;
}();

exports.Ball = Ball;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time_fadeout = exports.time_fadein = exports.globalBlockSize = exports.chorus = exports.canvasW = exports.canvasH = void 0;

var _Block = require("./Block");

var _Grid = require("./Grid");

var _drawGrid = require("./drawGrid");

var _WordBlock = require("./WordBlock");

var _PhraseBlock = require("./PhraseBlock");

var _Ball = require("./Ball");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var P5 = p5;
var _TextAliveApp = TextAliveApp,
    Player = _TextAliveApp.Player,
    Ease = _TextAliveApp.Ease;
var text;
var player = new Player({
  app: {
    token: "6rquYSfCRiWlgifb"
  },
  // 読み込むフォントを指定する。nullだとすべて読み込む。
  //fontFamilies: null,
  mediaBannerPosition: "buttom right",
  // 音源メディアを指定する。
  mediaElement: document.querySelector("#media"),
  // throttleアップデート関数の発行間隔をしていする。ミリセカンド。
  //throttleInterval: 10,
  // TextAlive Playerの音源の再生状態を管理するTimerインスタンス。よくわからん。。。
  //timer: ,
  // V/A空間の座標値を取得するか否か。
  // V/A空間について：https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=142056&file_id=1&file_no=1
  // V/A空間は、ある時刻の音源に対する感情の指標である。VはValance(怪ー不快)、Activation(活性ー日活性)の二軸で表される。例えば、喜びは二軸ともに正。
  valenceArousalEnabled: true,
  // 声量情報を取得するかどうか。
  vocalAmplitudeEnabled: true
}); /////////////////////// イベントリスナを登録する ///////////////////////
// 3種類のイベントリスナから指定する。PlayerEventListener, PlyaerAppListener, LoaderListener
// 指定したイベントリスナは、必ずoverrideして定義しなければならない。
// https://developer.textalive.jp/packages/textalive-app-api/globals.html#playerlistener

player.addListener({
  // PlayerEventListenerのイベントリスナ
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html
  //onDispose, 				// プレイヤーが破棄されるとき
  //onMediaElementSet,	 	// 音源メディアが変更されたとき(配属先のDOM要素が変更されたとき)
  //onMediaSeek,			// 再生中の楽曲の再生位置が変更されたとき
  //onPause,				// 再生中の楽曲が一時停止されたとき
  //onPlay,					// 楽曲の再生が始まったとき
  //onResize,				// ステージサイズが変更されたとき（ステージってなに？2021/08/10）
  //onSeek,					// 再生中の楽曲の再生位置がユーザーによって変更されたとき
  //onStop,					// 再生中の楽曲が一時停止されたとき
  //onThrottledTimeUpdate,	// 動画の再生位置が変更されたときに呼ばれる（あまりに頻繁な発火を防ぐため一定間隔に間引かれる）、間隔時間はPlayerクラスのオプションで設定可能。
  onTimeUpdate: onTimeUpdate,
  // 動画の再生位置が変更されたときに呼ばれる
  //onTimerReady,			// 動画のためのTimerの準備が整ったとき
  onVideoReady: onVideoReady,
  // 動画オブジェクトの準備が整ったとき
  //onVideoSeek,			// 動画のシーク操作が行われたとき
  //onVideoSeekEnd,			// 動画のシーク操作が終わったとき
  //onVideoSeekStart,		// 動画のシーク操作が始まったとき
  //onVolumeUpdate,			// 音量が変更されたとき
  // PlayerAppListenerのイベントリスナ
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playerapplistener.html
  //onAppConnected, 		// TextAliveAppAPIサーバとの接続時に呼ばれる
  //onAppMediaChange,		// 再生すべき楽曲URLが変更されたとき
  //onAppParameterUpdate,	// TextAliveアプリのパラメタが変更されたときに呼ばれる
  onAppReady: onAppReady // TextAliveホストとの接続時に呼ばれる
  // LoaderListenerのイベントリスナ。このリスナは、DataLoaderListenerの中で、さらに4つに分かれる。
  // DataLoaderListener -> VideoLoaderListener, SongLoaderListener, TextLoaderListener, FontLoaderListener
  // ↓ LoaderListenerのリファレンス
  // https://developer.textalive.jp/packages/textalive-app-api/globals.html#loaderlistener
  // ↓ VideoLoaderListenerのリファレンス
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/videoloaderlistener.html
  // ↓ SongLoaderListenerのリファレンス
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/songloaderlistener.html
  // ↓ TextLoaderListenerのリファレンス
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/textloaderlistener.html
  // ↓ FontLoaderListenerのリファレンス
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/fontloaderlistener.html
  //onVideoLoad, 			// 動画データが読み込まれたとき
  //onSongInfoLoad,			// 楽曲の詳細情報が読み込まれたとき
  //onSongLoad,				// 楽曲の基本情報が読み込まれたとき
  //onSongMapLoad,			// 楽曲地図が読み込まれたとき
  //onValenceArousalLoad,	// V/A空間が読み込まれたとき
  //onVocalAmplitudeLoad,	// 声量の情報が読み込まれたとき
  //onLyricsLoad,			// 歌詞テキストの発生タイミング情報が読み込まれたとき
  //onTextLoad,				// 歌詞テキストが読み込まれたとき
  //onFontsLoad,			// フォントが読み込まれたとき

}); // アニメーション関数の定義、フレーズ、単語、文字
// フレーズが発声されていたら #text_phrase に表示する

var animatePhrase = function animatePhrase(now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text_phrase").textContent = unit.text;
    text = unit.text;
  }
}; // 単語が発声されていたら #text_word に表示する


var animateWord = function animateWord(now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text_word").textContent = unit.text;
  }
}; // 文字が発声されていたら #text_char に表示する


var animateChar = function animateChar(now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text_char").textContent = unit.text;
  }
};

function onAppReady(app) {
  player.createFromSongUrl("https://piapro.jp/t/N--x/20210204215604"); //その心に灯る色は
  //player.createFromSongUrl("https://www.youtube.com/watch?v=bMtYf3R0zhY");
  //Loading Memories
  //player.createFromSongUrl("https://www.youtube.com/watch?v=ZOTJgXBkJpc");
  //歌の欠片と
  //player.createFromSongUrl("https://www.youtube.com/watch?v=CkIy0PdUGjk");
  //player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830");
  //player.createFromSongUrl("https://www.youtube.com/watch?v=ygY2qObZv24");

  document.querySelector("#onAppReady").textContent = "準備完了";
}
/*
let timer = null;
function onTimerReady(timer) {
}
*/


var phrases = null;
var sabi = null;
var songInfo = null;
var chorus = null; // 動画データが読み込まれたとき
// 楽曲情報を表示する。アニメーション関数を割り当てる。

exports.chorus = chorus;

function onVideoReady(v) {
  phrases = player.video.phrases;
  songInfo = player.data.songMap.segments; // サビ情報を読み取る

  var segments_contenst = ""; // for文でarrayをすべてたどる
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of

  var _iterator = _createForOfIteratorHelper(player.data.songMap.segments),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      segments_contenst = segments_contenst + String(element.chorus) + "(" + String(element.duration) + " [ms]), ";
      console.log("セグメント情報");
      console.log(element);

      if (element.chorus) {
        sabi = element;
        exports.chorus = chorus = sabi.segments;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  document.querySelector("#segments").textContent = segments_contenst;
  document.querySelector("#song_name").textContent = player.data.song.name;
  document.querySelector("#song_permalink").textContent = player.data.song.permalink;
  document.querySelector("#song_artist").textContent = player.data.song.artist.name; // 定期的に呼ばれる各フレーズの "animate" 関数をセットする

  var w; // Set "animate" function

  w = player.video.firstPhrase;

  while (w) {
    w.animate = animatePhrase;
    w = w.next;
  } // 定期的に呼ばれる各単語の "animate" 関数をセットする
  // Set "animate" function


  w = player.video.firstWord;

  while (w) {
    w.animate = animateWord;
    w = w.next;
  } // 定期的に呼ばれる各文字の "animate" 関数をセットする
  // Set "animate" function


  w = player.video.firstChar;

  while (w) {
    w.animate = animateChar;
    w = w.next;
  }

  document.querySelector("#onVideoReady").textContent = "準備完了";
} // 楽曲の再生位置が更新されたときに呼び出される。（再生中常に呼び出される）
// index.htmlの各変数を随時更新する。


function onTimeUpdate(position) {
  document.querySelector("#position").textContent = position;
  document.querySelector("#beat_index").textContent = player.findBeat(position).index;
  document.querySelector("#beat_duration").textContent = player.findBeat(position).duration;
  document.querySelector("#chord_index").textContent = player.findChord(position).index;
  document.querySelector("#chord_duration").textContent = player.findChord(position).duration;
  document.querySelector("#chorus_index").textContent = player.findChorus(position).index;
  document.querySelector("#chorus_duration").textContent = player.findChorus(position).duration;
  document.querySelector("#VA_A").textContent = player.getValenceArousal(position).a;
  document.querySelector("#VA_V").textContent = player.getValenceArousal(position).v;
  document.querySelector("#volume").textContent = player.getVocalAmplitude(position);
  document.querySelector("#phrase").textContent = player.video.findPhrase(position).text;
  document.querySelector("#word").textContent = player.video.findWord(position).text;
  document.querySelector("#char").textContent = player.video.findChar(position).text;
}

var canvasW = 4000;
exports.canvasW = canvasW;
var canvasH = 4000;
exports.canvasH = canvasH;
var globalBlockSize = 100;
exports.globalBlockSize = globalBlockSize;
var time_fadein = 100;
exports.time_fadein = time_fadein;
var time_fadeout = 100;
exports.time_fadeout = time_fadeout;
new P5(function (p5) {
  var u = 100;
  var centerx = 300;
  var centery = 300;
  var block = 100;
  var showGrid = true;
  var b;
  var b2;
  var g;
  var init;
  var phraseBlocks;
  var testBlocks;
  var worldCamera;
  var autoCamera;
  var zoomCamera;
  var myFont;
  var isChorus = false;
  var chorusList;
  var currentChorus;
  var chorusIndex = 0;
  var chorusSize = {
    sizeX: 0,
    sizeY: 0
  };
  var wordBlocks = new Array();
  var yarimasuta = true;
  var balls = new Array();

  p5.preload = function () {//myFont = p5.loadFont('./assets/MPLUSRounded1c-Light.ttf');
  };

  p5.setup = function () {
    //let result = p5.createCanvas(window.innerWidth, window.innerHeight);
    var result = p5.createCanvas(window.innerHeight, window.innerHeight);
    result.parent("result");
    var media = p5.select('#media');
    media.position(0, 0);
    p5.textFont('Monoton');
    p5.rectMode(p5.CENTER);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.colorMode(p5.HSB, 100);
    p5.frameRate(24);
    worldCamera = new Camera(p5, canvasW, canvasH);
    g = new _Grid.Grid(p5, canvasW, canvasH);
    init = false; //console.log(songInfo);
  };

  p5.draw = function () {
    //console.log("now drawing");
    if (!player || !player.video || !player.timer) {
      return;
    } else if (!init) {
      console.log("---------Start initial draw------------");
      phraseBlocks = new Array(phrases.length);
      var cou = 0;
      var i = 0;
      var test = new Array();

      for (var _cou = 0; _cou < phrases.length; _cou++) {
        test.push(phrases[_cou]);
      }

      testBlocks = new Array(test.length);

      for (var _i = 0, _test = test; _i < _test.length; _i++) {
        var p = _test[_i];
        testBlocks[i] = new _PhraseBlock.PhraseBlock(p5, g, p);
        i++;
      }

      var blocks = new Array(); //const wordBlocks = new Array();

      var _iterator2 = _createForOfIteratorHelper(testBlocks),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var phrase = _step2.value;

          var _iterator3 = _createForOfIteratorHelper(phrase._wordBlocks),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var word = _step3.value;
              wordBlocks.push(word);

              var _iterator4 = _createForOfIteratorHelper(word._blocks),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var char = _step4.value;
                  blocks.push(char);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      console.log(wordBlocks);
      autoCamera = new AutoCamera(p5, blocks, canvasW, canvasH);
      zoomCamera = new ZoomCamera(p5, canvasW, canvasH);
      console.log("-----------End initial draw------------");
      chorusList = sabi.segments;
      currentChorus = chorusList[chorusIndex];
      init = true;
    }

    p5.background(0);
    var position = player.timer.position;
    var beat = player.findBeat(position);

    if (beat) {
      var progress = beat.progress(position);
      var alpha = 100 * Ease.quintIn(progress);
      var size = 500 + 800 * Ease.quintIn(progress);
      var x = p5.width * Ease.quintIn(progress);
      p5.fill(10, 80, 50, alpha);
      p5.strokeWeight(5);
      p5.stroke(80, 100, 100, alpha);
      p5.line(0, p5.height - 20, x, p5.height - 20); //p5.circle(p5.width / 2, p5.height / 2, size);
    } //カメラ移動

    /*
    if(p5.mouseIsPressed) {
    	//console.log("タッチされました" + "worldCameraX is "+worldCamera.pos.x+"  mouseX is "+p5.mouseX);
    	worldCamera.posX = p5.mouseX;
    	worldCamera.posY = p5.mouseY;
    }
    */

    /*
    p5.translate(-worldCamera.posX, -worldCamera.posY);
    p5.scale(worldCamera.zoom);
    */


    if (chorusIndex < chorusList.length && currentChorus.startTime < position + 500) {
      isChorus = true;
      var res = g.getActiveGridSize(currentChorus.endTime, wordBlocks);
      chorusSize['sizeX'] = res['sizeX'];
      chorusSize['sizeY'] = res['sizeY']; //console.log("サビです!!!!!!");
    }

    if (isChorus && currentChorus.endTime < position) {
      isChorus = false;
      zoomCamera._isInit = true; //console.log("サビおわたっw");

      chorusIndex++;
      currentChorus = chorusList[chorusIndex];
    }
    /*
    if(yarimasuta) {
    	const res = g.getActiveGridSize(currentChorus.endTime, wordBlocks);
    	console.log(res);
    	yarimasuta = false;
    }
    */

    /*
    let txt = "";
    let segCount = 0;
    for(const s of songInfo) {
    	for(let i = 0; i < s.segments.length; i++) {
    		if(s.segments[i].startTime < position && position < s.segments[i].endTime) {
    			txt = 'セグメンツ ['+segCount+']の';
    			txt = txt + '['+i+']　番目の要素です。';
    		}
    	}
    	segCount++;
    }
    console.log(txt);
    */


    autoCamera.update(position, isChorus);

    if (!isChorus) {
      p5.translate(-(autoCamera._x - window.innerHeight / 2), -(autoCamera._y - window.innerHeight / 2)); //p5.translate(-(autoCamera._x - (window.innerWidth / 2)),  -(autoCamera._y - (window.innerHeight / 2)));

      p5.scale(autoCamera.zoom);
    } else {
      if (zoomCamera.isInit) {
        zoomCamera.setInit(autoCamera._x - window.innerHeight / 2, autoCamera._y - window.innerHeight / 2, g.getActiveGridSize(currentChorus.endTime, wordBlocks), position, currentChorus.startTime);
      }

      zoomCamera.update(position); //zoomCamera.updateChorus(g.getActiveGridSize(currentChorus.endTime, wordBlocks));

      p5.scale(zoomCamera.zoom);
      p5.translate(-zoomCamera.x, -zoomCamera.y);
    } //console.log("position : " + position + "  camera x : "+autoCamera._x+ "  y : "+ autoCamera._y);
    //ブロックオブジェクトをすべて走査


    var _iterator5 = _createForOfIteratorHelper(testBlocks),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _phrase = _step5.value;

        var _iterator7 = _createForOfIteratorHelper(_phrase._wordBlocks),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _word = _step7.value;

            var _iterator8 = _createForOfIteratorHelper(_word._blocks),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _char = _step8.value;

                if (isChorus) {
                  if (_char._startTime < position + 500 && position < _char._endTime) {
                    if (!_char.isSetChorusPos) {
                      _char.setChorusPos(chorusSize['sizeX'], chorusSize['sizeY']);

                      balls.push(new _Ball.Ball(p5, _char._posX_chorus, _char._posY_chorus));
                    }

                    _char.updateChorus_fadeIn(position);

                    _char.displayChorusText();
                  }
                }

                if (_char._isDisplayed) {
                  //char.update();
                  _char.displayText();
                } else if (_char._startTime < position + time_fadein) {
                  _char.update_fadein(position);

                  _char.displayText();
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    var _iterator6 = _createForOfIteratorHelper(balls),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _b = _step6.value;

        _b.drawMulti();
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    g.displayPoint();
    (0, _drawGrid.drawGrid)(p5, canvasW, canvasH);
  };

  p5.mousePressed = function () {
    console.log('マウス位置 : ' + p5.mouseX + ' / ' + p5.mouseY);
    var posX = p5.mouseX + (autoCamera._x - window.innerWidth / 2);
    var posY = p5.mouseY + (autoCamera._y - window.innerHeight / 2);
    console.log('キャリブレ後 : ' + posX + ' / ' + posY);
    var selectGridPos = [Math.floor(posY / globalBlockSize), Math.floor(posX / globalBlockSize)];
    console.log('グリッドポジション : ' + selectGridPos[1] + ' / ' + selectGridPos[0]); //クリック位置から該当するブロックオブジェクトを探索

    var _iterator9 = _createForOfIteratorHelper(wordBlocks),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var w = _step9.value;

        var _iterator10 = _createForOfIteratorHelper(w._posInGrid),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var pos = _step10.value;

            if (pos.toString() === selectGridPos.toString()) {
              console.log(w.getText);
              return;
            }
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  };

  p5.keyPressed = function (key) {
    worldCamera.draw(key.key);
  };

  p5.mouseDragged = function () {
    worldCamera.posX = p5.mouseX;
    worldCamera.posY = p5.mouseY;
  };
});

var Camera = /*#__PURE__*/function () {
  function Camera(p5, canvasW, canvasH) {
    _classCallCheck(this, Camera);

    this.p5 = p5;
    this.pos = p5.createVector(0, 0);
    this._zoom = 0.3;
  }

  _createClass(Camera, [{
    key: "draw",
    value: function draw(key) {
      if (key == 'w') this.pos.y -= 50;
      if (key == 's') this.pos.y += 50;
      if (key == 'a') this.pos.x -= 50;
      if (key == 'd') this.pos.x += 50;
      if (key == 'x') this._zoom *= 2;
    }
  }, {
    key: "posX",
    get: function get() {
      return this.pos.x;
    },
    set: function set(num) {
      this.pos.x += num - this.pos.x;
    }
  }, {
    key: "posY",
    get: function get() {
      return this.pos.y;
    },
    set: function set(num) {
      this.pos.y += num - this.pos.y;
    }
  }, {
    key: "zoom",
    get: function get() {
      return this._zoom;
    }
  }]);

  return Camera;
}();

var ZoomCamera = /*#__PURE__*/function () {
  function ZoomCamera(p5, canvasW, canvasH) {
    _classCallCheck(this, ZoomCamera);

    this.p = p5;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this._x = 0;
    this._y = 0;
    this._zoom = 0;
    this.isInit = true;
    this.distScale = 0;
    this.distX = 0;
    this.distY = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.preScale = 1;
  }

  _createClass(ZoomCamera, [{
    key: "updateChorus",
    value: function updateChorus(size) {
      var xsize = window.innerHeight / (size['sizeX'] * globalBlockSize) * 1;
      var ysize = window.innerHeight / (size['sizeY'] * globalBlockSize) * 1; //console.log('sizeX : ' + size['sizeX'] + '  sizeY : ' + size['sizeY']);
      //console.log('xsize : ' + xsize + '  ysize : ' + ysize);

      var scale = xsize < ysize ? xsize : ysize; //console.log('スケール' + scale);

      this._zoom = scale;
      this._x = canvasW / 2 - size['sizeX'] * globalBlockSize / 2;
      this._y = canvasH / 2 - size['sizeY'] * globalBlockSize / 2; //console.log(this._x + ' / ' + this._y);
      //console.log(window.innerWidth + ' / ' + window.innerHeight);
    }
  }, {
    key: "update",
    value: function update(position) {
      if (position - this.startTime >= 500) return; //if(this._x == this.distX && this._y == this.distY && this._zoom == this.distScale) return;

      this.moveTime = (position - this.startTime) / 500;
      this._x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
      this._y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
      this._zoom = 1 - (1 - this.distScale) * Ease.quintOut(this.moveTime);
      console.log('moveTime : ' + this.moveTime + ' x : ' + this._x + ' y : ' + this._y + ' zoom : ' + this._zoom);
    }
  }, {
    key: "setInit",
    value: function setInit(preX, preY, size, startTime, endTime) {
      this.preX = preX;
      this.preY = preY;
      var xsize = window.innerHeight / (size['sizeX'] * globalBlockSize) * 1;
      var ysize = window.innerHeight / (size['sizeY'] * globalBlockSize) * 1;
      var scale = xsize < ysize ? xsize : ysize;
      this.distScale = scale;
      this.distX = canvasW / 2 - size['sizeX'] * globalBlockSize / 2;
      this.distY = canvasH / 2 - size['sizeY'] * globalBlockSize / 2;
      this.startTime = startTime;
      this.endTime = endTime;
      this.isInit = false;
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    }
  }, {
    key: "zoom",
    get: function get() {
      return this._zoom;
    }
  }, {
    key: "_isInit",
    set: function set(bool) {
      this.isInit = bool;
    }
  }]);

  return ZoomCamera;
}();

var AutoCamera = /*#__PURE__*/function () {
  function AutoCamera(p5, block, canvasW, canvasH) {
    _classCallCheck(this, AutoCamera);

    this.p = p5;
    this.block = block;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this._zoom = 1.0;
    this.index = 0;
    this.x = 0;
    this.y = 0;
    this.distX;
    this.distY;
    this.distSet();
    console.log(this.distX + "  /  " + this.distY);
    this.preX = this.x;
    this.preY = this.y; //this.preX = canvasW / 2;
    //this.preY = canvasH / 2;

    this.startTime = 0;
    this.moveTime = 0;
    this.stopTime = 0;
    this.isMove = true;
    this.angle = 0;
    this.moveLimit = this.block[this.index].startTime;
    console.log("limit is " + this.moveLimit);
    this.isEnd = false;
    this.quickMove = false;
  }

  _createClass(AutoCamera, [{
    key: "update",
    value: function update(position, isChorus) {
      /*
      if(isChorus) {
      	this._zoom = 0.5;
      	this.x = (this.canvasW / 2) - window.innerWidth;
      	this.y = (this.canvasH / 2) - window.innerHeight;
      	return;
      }
      */
      if (position < this.startTime) return;

      if (this.quickMove) {
        console.log("クイックムーブ！！！");
        this.x = this.block[this.index - 1]._posX;
        this.y = this.block[this.index - 1]._posY; //this.x = this.distX;
        //this.y = this.distY;

        console.log(this.x + "  " + this.y);
        this.quickMove = false;
      } else {
        this.moveTime = (position - this.startTime) / this.moveLimit;
        this.x = this.preX + (this.distX - this.preX) * Ease.quintOut(this.moveTime);
        this.y = this.preY + (this.distY - this.preY) * Ease.quintOut(this.moveTime);
      } //console.log("thisX : "+this.x + "thisY : "+this.y);


      if (position - this.startTime >= this.moveLimit) {
        //console.log("--------move limit !!!!-----------");
        //console.log("x  : "+this.x+"  y : "+this.y);
        this.preX = this.x;
        this.preY = this.y;
        this.index++; //最後の要素

        if (this.index > this.block.length) {
          this.isEnd = true;
          return;
        }

        this.limitSet();
        this.startTime = this.block[this.index].startTime;
        this.distSet(); //console.log("テキスト : " + this.block[this.index]._text);
        //console.log("startTime : " + this.startTime +"next distX : "+this.distX + " distY : "+this.distY+ "moveLimit : "+this.moveLimit);
      }
    }
  }, {
    key: "distSet",
    value: function distSet() {
      this.distX = this.block[this.index]._posX;
      this.distY = this.block[this.index]._posY;
    }
  }, {
    key: "limitSet",
    value: function limitSet() {
      var currentBlock = this.block[this.index]; //console.log("EndTime : "+currentBlock.endTime +"  StartTime : "+currentBlock.startTime);

      this.moveLimit = currentBlock.endTime - currentBlock.startTime;
      /*
      if(this.moveLimit == 0) {
      	this.quickMove = true;
      }
      */
      //movelimitが僅少のときスキップする

      if (this.moveLimit < 31) {
        var limit = 0;
        var tmpIndex = this.index;

        while (limit == 0) {
          var nextBlock = this.block[tmpIndex + 1];
          limit = nextBlock.endTime - nextBlock.startTime;
          tmpIndex++;
        }

        this.moveLimit = limit;
        this.index = tmpIndex; //console.log("スキップするやで！！")
        //console.log("preX : "+this.preX+"  preY : "+this.preY+"distX : "+this.block[this.index]._posX + "  distY : "+this.block[this.index]._posY + "  movelimit : "+this.moveLimit);

        this.quickMove = true;
      }
    }
  }, {
    key: "_x",
    get: function get() {
      return this.x;
    }
  }, {
    key: "_y",
    get: function get() {
      return this.y;
    }
  }, {
    key: "zoom",
    get: function get() {
      return this._zoom;
    }
  }]);

  return AutoCamera;
}();
},{"./Block":"js/Block.js","./Grid":"js/Grid.js","./drawGrid":"js/drawGrid.js","./WordBlock":"js/WordBlock.js","./PhraseBlock":"js/PhraseBlock.js","./Ball":"js/Ball.js"}],"../../.nodebrew/node/v18.3.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64992" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nodebrew/node/v18.3.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map