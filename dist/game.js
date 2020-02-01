parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i5FY":[function(require,module,exports) {
"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(i){return typeof i}:function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i})(e)}function e(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function t(i,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,o.key,o)}}function o(i,e,o){return e&&t(i.prototype,e),o&&t(i,o),i}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Scenario=void 0;var n=function(){function t(i,o,n){e(this,t);var s=this.checkInput(i,o,n);"TRUE"!==s?console.log(s):(this.size_x=i,this.size_y=o,n.density?this.density=n.density:this.density=.2,n.dispersion?this.dispersion=n.dispersion:this.dispersion=1,n.maxPropagation?this.maxPropagation=n.maxPropagation:this.maxPropagation=1,n.minPropagation?this.minPropagation=n.minPropagation:this.minPropagation=.25),this.gridMap,this._generateMap()}return o(t,[{key:"checkInput",value:function(e,t,o){return"number"==typeof e&"number"==typeof t&"object"===i(o)?e>0&t>0?e%1==0&t%1==0?"TRUE":"Must use integers: size_x and size_y!":"Must be Greater than zero: size_x and size_y!":"size_x and size_y Must be Natural Numbers and optional_parameters Must be an object. received "+JSON.stringify({size_x:i(e),size_y:i(t),optional_parameters:i(o)})}},{key:"_generateSeedMap",value:function(){var i=this.density*this.dispersion,e=[],t=new Array(this.size_x).fill(new Array(this.size_y).fill(0));if(i>0)for(;0===e.length;)this.gridMap=t.map(function(t,o){return t.map(function(t,n){return Math.random()>i?0:(e.push({x:o,y:n}),1)})});return{blockLocations:e,blocks:e.length}}},{key:"_generateMap",value:function(){var i=this,e=this._generateSeedMap(),t=e.blocks,o=e.blockLocations,n=Math.round(this.size_x*this.size_y*this.density);if(t>0)for(var s=function(){var e=Math.min(i.maxPropagation,Math.max((n-t)/(4*t),i.minPropagation));o.forEach(function(t){[{x:t.x,y:t.y+1},{x:t.x+1,y:t.y},{x:t.x,y:t.y-1},{x:t.x-1,y:t.y}].forEach(function(t){t.x>=0&t.x<i.size_x&t.y>=0&t.y<i.size_y&&0===i.gridMap[t.x][t.y]&&Math.random()<e&&(i.gridMap[t.x][t.y]=1,o.push({x:t.x,y:t.y}))})}),t=o.length};t<n;)s()}},{key:"positionPlayer",value:function(i){i.position.x=Math.round(this.size_x/2-1),i.position.y=Math.round(this.size_y/2-1),this.gridMap[i.position.x][i.position.y]=i.code}},{key:"movePlayer",value:function(i,e,t){0!==e&&!1===i.moving&&i.position.x+i.speed.x<this.size_x&&i.position.x+i.speed.x>=0&&i.position.y+i.speed.y<this.size_y&&i.position.y+i.speed.y>=0&&0===this.gridMap[i.position.x+i.speed.x][i.position.y+i.speed.y]&&(this.gridMap[i.position.x][i.position.y]=0,this.gridMap[i.position.x+i.speed.x][i.position.y+i.speed.y]=i.code,i.position.x=i.position.x+i.speed.x,i.position.y=i.position.y+i.speed.y,i.moving=!0,i.lastMove=t)}},{key:"draw",value:function(i,e,t,o){for(var n=0;n<e;n++)for(var s=0;s<t;s++)1===this.gridMap[n][s]?(i.fillStyle="rgb(64,64,64)",i.fillRect(o*n,o*s,o,o)):this.gridMap[n][s]===player.code&&(i.fillStyle="rgb(64,64,128)",i.fillRect(o*n,o*s,o,o))}}]),t}();exports.Scenario=n;
},{}],"PIPh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resolution=void 0;var e={HD:{GAME_WIDTH:1200,GAME_HEIGHT:720,size_x:15,size_y:9},FULLHD:{GAME_WIDTH:1920,GAME_HEIGHT:1080,size_x:16,size_y:9},SQUARE_MOBILE:{GAME_WIDTH:290,GAME_HEIGHT:290,size_x:15,size_y:15}};exports.resolution=e;
},{}],"qbJK":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Player=void 0;var n=function(){function t(){e(this,t),this.code=100101,this.health=100,this.moving=!1,this.lastMove=0,this.speed={module:200,x:0,y:0},this.position={x:0,y:0}}return o(t,[{key:"move",value:function(e){e-this.lastMove>this.speed.module&&(this.moving=!1)}}]),t}();exports.Player=n;
},{}],"efjR":[function(require,module,exports) {
"use strict";function e(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function a(e,a){for(var s=0;s<a.length;s++){var o=a[s];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,s,o){return s&&a(e.prototype,s),o&&a(e,o),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.InputHandler=void 0;var o=function(){function a(s){e(this,a),this.gamePaused=!1,this.enableCommands(),document.addEventListener("keydown",this.spacebarPause.bind(this)),document.addEventListener("keyup",this.stopCommand)}return s(a,[{key:"enableCommands",value:function(){document.addEventListener("keydown",this.keyboardCommands),document.querySelectorAll(".commands-move img").forEach(function(e){e.classList.remove("commands-move-disabled")}),document.querySelector(".commands-power").classList.remove("commands-power-disabled"),document.querySelector(".move-circle").classList.remove("move-circle-disabled"),document.querySelector(".pause-text").classList.add("pause-text-hide")}},{key:"spacebarPause",value:function(){switch(event.keyCode){case 32:this.pause()}}},{key:"stopCommand",value:function(e){player.speed.x=0,player.speed.y=0}},{key:"keyboardCommands",value:function(e){switch(e.keyCode){case 37:player.speed.x=-1;break;case 38:player.speed.y=-1;break;case 39:player.speed.x=1;break;case 40:player.speed.y=1}}},{key:"buttonDirection",value:function(e){if(!this.gamePaused)switch(e){case"LEFT":player.speed.x=-1;break;case"UP":player.speed.y=-1;break;case"RIGHT":player.speed.x=1;break;case"DOWN":player.speed.y=1}}},{key:"usePower",value:function(){window.location.replace("/ranking")}},{key:"pause",value:function(){var e=document.getElementsByClassName("play-pause")[0];!0===this.gamePaused?(e.style.backgroundColor="#07070700",this.gamePaused=!1,this.enableCommands()):(this.disableCommands(),this.stopCommand(),e.style.backgroundColor="#07070780",this.gamePaused=!0)}},{key:"disableCommands",value:function(){document.removeEventListener("keydown",this.keyboardCommands),document.querySelectorAll(".commands-move img").forEach(function(e){e.classList.add("commands-move-disabled")}),document.querySelector(".commands-power").classList.add("commands-power-disabled"),document.querySelector(".move-circle").classList.add("move-circle-disabled"),document.querySelector(".pause-text").classList.remove("pause-text-hide")}}]),a}();exports.InputHandler=o;
},{}],"QcRT":[function(require,module,exports) {
"use strict";var e=require("./scenario"),r=require("./resolution"),t=require("./player"),i=require("./input"),a=r.resolution.SQUARE_MOBILE,n=a.GAME_WIDTH,o=a.GAME_HEIGHT,l=a.size_x,u=a.size_y,s=new e.Scenario(l,u,{density:.15,dispersion:.2,maxPropagation:.5,minPropagation:.05});window.player=new t.Player(p),s.positionPlayer(player),window.input=new i.InputHandler(player);var p=o/u,y=document.getElementById("gameScreen"),d=y.getContext("2d");y.style.backgroundColor="rgba(200,200,50,0.5)",y.setAttribute("width",n),y.setAttribute("height",o);var c=0;function m(e){var r=e-c;c=e,d.clearRect(0,0,n,o),s.movePlayer(player,r,e),player.move(e),s.draw(d,l,u,p),requestAnimationFrame(m)}m(0);
},{"./scenario":"i5FY","./resolution":"PIPh","./player":"qbJK","./input":"efjR"}]},{},["QcRT"], null)
//# sourceMappingURL=/game.js.map