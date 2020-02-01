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
})({"scenario.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scenario = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Trocar forearch por for; calcular novos blocos somente nas extremidades (remover blocos antigos)
var Scenario =
/*#__PURE__*/
function () {
  function Scenario(size_x, size_y, optional_parameters) {
    _classCallCheck(this, Scenario);

    var check = this.checkInput(size_x, size_y, optional_parameters);

    if (check !== 'TRUE') {
      console.log(check);
    } else {
      this.size_x = size_x;
      this.size_y = size_y;

      if (optional_parameters.density) {
        this.density = optional_parameters.density;
      } else {
        this.density = 0.2;
      }

      if (optional_parameters.dispersion) {
        this.dispersion = optional_parameters.dispersion;
      } else {
        this.dispersion = 1;
      }

      if (optional_parameters.maxPropagation) {
        this.maxPropagation = optional_parameters.maxPropagation;
      } else {
        this.maxPropagation = 1;
      }

      if (optional_parameters.minPropagation) {
        this.minPropagation = optional_parameters.minPropagation;
      } else {
        this.minPropagation = 0.25;
      }
    }

    this.size = size_x * size_y;
    this.maxBlocks = Math.round(this.size * this.density);
    this.seedBlocksDensity = this.density * this.dispersion;
    this.seedBlocks = 0;
    this.blockLocations = [];
    this.blocks = 0;
    this.gridMap;

    this._generateMap();
  }

  _createClass(Scenario, [{
    key: "checkInput",
    value: function checkInput(size_x, size_y, optional_parameters) {
      if (typeof size_x === 'number' & typeof size_y === 'number' & _typeof(optional_parameters) === 'object') {
        if (size_x > 0 & size_y > 0) {
          if (size_x % 1 === 0 & size_y % 1 === 0) {
            return 'TRUE';
          } else {
            return 'Must use integers: size_x and size_y!';
          }
        } else {
          return 'Must be Greater than zero: size_x and size_y!';
        }
      } else {
        return 'size_x and size_y Must be Natural Numbers and optional_parameters Must be an object. received ' + JSON.stringify({
          size_x: _typeof(size_x),
          size_y: _typeof(size_y),
          optional_parameters: _typeof(optional_parameters)
        });
      }
    }
  }, {
    key: "_generateSeedMap",
    value: function _generateSeedMap() {
      var _this = this;

      var blankMap = new Array(this.size_x).fill(new Array(this.size_y).fill(0));

      if (this.seedBlocksDensity > 0) {
        while (this.blocks === 0) {
          this.gridMap = blankMap.map(function (row, row_index) {
            return row.map(function (col, col_index) {
              var rand = Math.random();

              if (rand > _this.seedBlocksDensity) {
                return 0;
              } else {
                _this.seedBlocks++;

                _this.blockLocations.push({
                  x: row_index,
                  y: col_index
                });

                return 1;
              }
            });
          });
          this.blocks = this.blockLocations.length;
        }
      }
    }
  }, {
    key: "_generateMap",
    value: function _generateMap() {
      var _this2 = this;

      this._generateSeedMap();

      if (this.seedBlocks > 0) {
        var _loop = function _loop() {
          var propagation = Math.min(_this2.maxPropagation, Math.max((_this2.maxBlocks - _this2.blocks) / (4 * _this2.blocks), _this2.minPropagation)); // console.log(propagation)

          _this2.blockLocations.forEach(function (location) {
            var neighboors = [{
              x: location.x,
              y: location.y + 1
            }, {
              x: location.x + 1,
              y: location.y
            }, {
              x: location.x,
              y: location.y - 1
            }, {
              x: location.x - 1,
              y: location.y
            }];
            neighboors.forEach(function (element) {
              if (element.x >= 0 & element.x < _this2.size_x & element.y >= 0 & element.y < _this2.size_y) {
                if (_this2.gridMap[element.x][element.y] === 0) {
                  if (Math.random() < propagation) {
                    _this2.gridMap[element.x][element.y] = 1;

                    _this2.blockLocations.push({
                      x: element.x,
                      y: element.y
                    });
                  }
                }
              }
            });
          });

          _this2.blocks = _this2.blockLocations.length;
        };

        while (this.blocks < this.maxBlocks) {
          _loop();
        }
      }
    }
  }, {
    key: "positionPlayer",
    value: function positionPlayer(player) {
      player.position.x = Math.round(this.size_x / 2 - 1);
      player.position.y = Math.round(this.size_y / 2 - 1);
      this.gridMap[player.position.x][player.position.y] = player.code;
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(player, deltaTime, timestamp) {
      if (deltaTime !== 0 && player.moving === false) {
        if (player.position.x + player.speed.x < this.size_x && player.position.x + player.speed.x >= 0 && player.position.y + player.speed.y < this.size_y && player.position.y + player.speed.y >= 0) {
          if (this.gridMap[player.position.x + player.speed.x][player.position.y + player.speed.y] === 0) {
            this.gridMap[player.position.x][player.position.y] = 0;
            this.gridMap[player.position.x + player.speed.x][player.position.y + player.speed.y] = player.code;
            player.position.x = player.position.x + player.speed.x;
            player.position.y = player.position.y + player.speed.y;
            player.moving = true;
            player.lastMove = timestamp;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx, size_x, size_y, grid_element_size) {
      for (var x = 0; x < size_x; x++) {
        for (var y = 0; y < size_y; y++) {
          if (this.gridMap[x][y] === 1) {
            ctx.fillStyle = 'rgb(64,64,64)';
            ctx.fillRect(grid_element_size * x, grid_element_size * y, grid_element_size, grid_element_size);
          } else if (this.gridMap[x][y] === 100101) {
            ctx.fillStyle = 'rgb(64,64,128)';
            ctx.fillRect(grid_element_size * x, grid_element_size * y, grid_element_size, grid_element_size);
          }
        }
      }
    }
  }]);

  return Scenario;
}();

exports.Scenario = Scenario;
},{}],"resolution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolution = void 0;
var resolution = {
  HD: {
    GAME_WIDTH: 1200,
    GAME_HEIGHT: 720,
    size_x: 15,
    size_y: 9
  },
  FULLHD: {
    GAME_WIDTH: 1920,
    GAME_HEIGHT: 1080,
    size_x: 16,
    size_y: 9
  },
  SQUARE: {
    GAME_WIDTH: 286,
    GAME_HEIGHT: 286,
    size_x: 16,
    size_y: 16
  }
};
exports.resolution = resolution;
},{}],"player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.code = 100101;
    this.health = 100;
    this.moving = false;
    this.lastMove = 0;
    this.speed = {
      module: 200,
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
  }

  _createClass(Player, [{
    key: "move",
    value: function move(timestamp) {
      if (timestamp - this.lastMove > this.speed.module) {
        this.moving = false;
      }
    }
  }]);

  return Player;
}();

exports.Player = Player;
},{}],"input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputHandler = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputHandler =
/*#__PURE__*/
function () {
  function InputHandler(player) {
    _classCallCheck(this, InputHandler);

    document.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 37:
          player.speed.x = -1;
          break;

        case 38:
          player.speed.y = -1;
          break;

        case 39:
          player.speed.x = 1;
          break;

        case 40:
          player.speed.y = 1;
          break;
      }
    });
    document.addEventListener('keyup', function (e) {
      player.speed.x = 0;
      player.speed.y = 0;
    });
  }

  _createClass(InputHandler, [{
    key: "buttonDirection",
    value: function buttonDirection(direction) {
      switch (direction) {
        case "LEFT":
          player.speed.x = -1;
          break;

        case "UP":
          player.speed.y = -1;
          break;

        case "RIGHT":
          player.speed.x = 1;
          break;

        case "DOWN":
          player.speed.y = 1;
          break;
      }
    }
  }, {
    key: "buttonRelease",
    value: function buttonRelease() {
      player.speed.x = 0;
      player.speed.y = 0;
    }
  }]);

  return InputHandler;
}();

exports.InputHandler = InputHandler;
},{}],"dom.js":[function(require,module,exports) {
var gamePaused = false;

window.pause = function () {
  var x = document.getElementsByClassName("play-pause")[0];

  if (gamePaused === true) {
    x.style.backgroundColor = "#07070700";
    gamePaused = false;
  } else {
    x.style.backgroundColor = "#07070780";
    gamePaused = true;
  }
};
},{}],"game.js":[function(require,module,exports) {
"use strict";

var _scenario = require("./scenario");

var _resolution = require("./resolution");

var _player = require("./player");

var _input = require("./input");

// Contains the game logic
// Only called for the play page

/*---------------------------------- ----------------------------------*/
var dom = require('./dom.js');
/*---------------------------------- ----------------------------------*/


var _resolution$SQUARE = _resolution.resolution.SQUARE,
    GAME_WIDTH = _resolution$SQUARE.GAME_WIDTH,
    GAME_HEIGHT = _resolution$SQUARE.GAME_HEIGHT,
    size_x = _resolution$SQUARE.size_x,
    size_y = _resolution$SQUARE.size_y;
var scenario = new _scenario.Scenario(size_x, size_y, {
  density: 0.15,
  dispersion: 0.2,
  maxPropagation: 0.5,
  minPropagation: 0.05
});
window.player = new _player.Player(sqm);
scenario.positionPlayer(player);
window.input = new _input.InputHandler(player);
var sqm = GAME_HEIGHT / size_y;
/*---------------------------------- ----------------------------------*/

var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'rgba(200,200,50,0.5)';
canvas.setAttribute('width', GAME_WIDTH);
canvas.setAttribute('height', GAME_HEIGHT);
/*---------------------------------- ----------------------------------*/

var lastTime = 0;

function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  scenario.movePlayer(player, deltaTime, timestamp);
  player.move(timestamp);
  scenario.draw(ctx, size_x, size_y, sqm);
  requestAnimationFrame(gameLoop);
}

gameLoop(0);
},{"./scenario":"scenario.js","./resolution":"resolution.js","./player":"player.js","./input":"input.js","./dom.js":"dom.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58267" + '/');

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
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game.js"], null)
//# sourceMappingURL=/game.js.map