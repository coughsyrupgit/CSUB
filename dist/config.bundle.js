/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(5);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(7)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../css-loader/index.js!./uikit.min.css", function() {
		var newContent = require("!!../../../css-loader/index.js!./uikit.min.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, "/*! UIkit 3.0.0-beta.38 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */html{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background:#fff;color:#666}body{margin:0}a{-webkit-text-decoration-skip:objects}a:active,a:hover{outline:0}.uk-link,a{color:#1e87f0;text-decoration:none;cursor:pointer}.uk-link:hover,a:hover{color:#0f6ecd;text-decoration:underline}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}:not(pre)>code,:not(pre)>kbd,:not(pre)>samp{font-size:.875rem;font-family:Consolas,monaco,monospace;color:#f0506e;white-space:nowrap;padding:2px 6px;background:#f8f8f8}em{color:#f0506e}ins{background:#ffd;color:#666;text-decoration:none}mark{background:#ffd;color:#666}q{font-style:italic}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}audio,canvas,iframe,img,svg,video{vertical-align:middle}audio,canvas,img,video{max-width:100%;height:auto;box-sizing:border-box}svg:not(:root){overflow:hidden}address,dl,fieldset,figure,ol,p,pre,ul{margin:0 0 20px 0}*+address,*+dl,*+fieldset,*+figure,*+ol,*+p,*+pre,*+ul{margin-top:20px}.uk-h1,.uk-h2,.uk-h3,.uk-h4,.uk-h5,.uk-h6,h1,h2,h3,h4,h5,h6{margin:0 0 20px 0;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;font-weight:400;color:#333;text-transform:none}*+.uk-h1,*+.uk-h2,*+.uk-h3,*+.uk-h4,*+.uk-h5,*+.uk-h6,*+h1,*+h2,*+h3,*+h4,*+h5,*+h6{margin-top:40px}.uk-h1,h1{font-size:2.625rem;line-height:1.2}.uk-h2,h2{font-size:2rem;line-height:1.3}.uk-h3,h3{font-size:1.5rem;line-height:1.4}.uk-h4,h4{font-size:1.25rem;line-height:1.4}.uk-h5,h5{font-size:16px;line-height:1.4}.uk-h6,h6{font-size:.875rem;line-height:1.4}ol,ul{padding-left:30px}ol>li>ol,ol>li>ul,ul>li>ol,ul>li>ul{margin:0}dt{font-weight:700}dd{margin-left:0}.uk-hr,hr{box-sizing:content-box;height:0;overflow:visible;text-align:inherit;margin:0 0 20px 0;border:0;border-top:1px solid #e5e5e5}*+.uk-hr,*+hr{margin-top:20px}address{font-style:normal}blockquote{margin:0 0 20px 0;font-size:1.25rem;line-height:1.5;font-style:italic;color:#333}*+blockquote{margin-top:20px}blockquote p:last-of-type{margin-bottom:0}blockquote footer{margin-top:10px;font-size:.875rem;line-height:1.5;color:#666}blockquote footer::before{content:\"\\2014   \"}pre{font:.875rem/1.5 Consolas,monaco,monospace;color:#666;-moz-tab-size:4;tab-size:4;overflow:auto;padding:10px;border:1px solid #e5e5e5;border-radius:3px;background:#fff}pre code{font-family:Consolas,monaco,monospace}::-moz-selection{background:#39f;color:#fff;text-shadow:none}::selection{background:#39f;color:#fff;text-shadow:none}details,main{display:block}summary{display:list-item}progress{vertical-align:baseline}template{display:none}iframe{border:0}a,area,button,input,label,select,summary,textarea{touch-action:manipulation}.var-media-s::before{content:'640px'}.var-media-m::before{content:'960px'}.var-media-l::before{content:'1200px'}.var-media-xl::before{content:'1600px'}.uk-link-muted a,a.uk-link-muted{color:#999}.uk-link-muted a:hover,a.uk-link-muted:hover{color:#666}.uk-link-text a:not(:hover),a.uk-link-text:not(:hover){color:inherit!important}.uk-link-text a:hover,a.uk-link-text:hover{color:#999}.uk-link-reset a,.uk-link-reset a:hover,a.uk-link-reset,a.uk-link-reset:hover{color:inherit!important;text-decoration:none!important}.uk-heading-primary{font-size:2.625rem;line-height:1.2}@media (min-width:960px){.uk-heading-primary{font-size:3.75rem;line-height:1.1}}.uk-heading-hero{font-size:4rem;line-height:1.1}@media (min-width:640px){.uk-heading-hero{font-size:6rem;line-height:1}}@media (min-width:960px){.uk-heading-hero{font-size:8rem;line-height:1}}.uk-heading-divider{padding-bottom:10px;border-bottom:1px solid #e5e5e5}.uk-heading-bullet{position:relative}.uk-heading-bullet::before{content:\"\";display:inline-block;position:relative;top:calc(-.1 * 1em);vertical-align:middle;height:.9em;margin-right:10px;border-left:5px solid #e5e5e5}.uk-heading-line{overflow:hidden}.uk-heading-line>*{display:inline-block;position:relative}.uk-heading-line>::after,.uk-heading-line>::before{content:\"\";position:absolute;top:calc(50% - (1px / 2));width:2000px;border-bottom:1px solid #e5e5e5}.uk-heading-line>::before{right:100%;margin-right:.6em}.uk-heading-line>::after{left:100%;margin-left:.6em}[class*=uk-divider]{border:none;margin-bottom:20px}*+[class*=uk-divider]{margin-top:20px}.uk-divider-icon{position:relative;height:20px;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23e5e5e5%22%20stroke-width%3D%222%22%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\");background-repeat:no-repeat;background-position:50% 50%}.uk-divider-icon::after,.uk-divider-icon::before{content:\"\";position:absolute;top:50%;max-width:calc(50% - (50px / 2));border-bottom:1px solid #e5e5e5}.uk-divider-icon::before{right:calc(50% + (50px / 2));width:100%}.uk-divider-icon::after{left:calc(50% + (50px / 2));width:100%}.uk-divider-small{line-height:0}.uk-divider-small::after{content:\"\";display:inline-block;width:100px;max-width:100%;border-top:1px solid #e5e5e5;vertical-align:top}.uk-list{padding:0;list-style:none}.uk-list>li::after,.uk-list>li::before{content:\"\";display:table}.uk-list>li::after{clear:both}.uk-list>li>:last-child{margin-bottom:0}.uk-list ul{margin:0;padding-left:30px;list-style:none}.uk-list>li:nth-child(n+2),.uk-list>li>ul{margin-top:10px}.uk-list-divider>li:nth-child(n+2){margin-top:10px;padding-top:10px;border-top:1px solid #e5e5e5}.uk-list-striped>li{padding:10px 10px}.uk-list-striped>li:nth-of-type(odd){border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}.uk-list-striped>li:nth-of-type(odd){background:#f8f8f8}.uk-list-striped>li:nth-child(n+2){margin-top:0}.uk-list-bullet>li{position:relative;padding-left:calc(1.5em + 10px)}.uk-list-bullet>li::before{content:\"\";position:absolute;top:0;left:0;width:1.5em;height:1.5em;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23666%22%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20%2F%3E%0A%3C%2Fsvg%3E\");background-repeat:no-repeat;background-position:50% 50%;float:left}.uk-list-large>li:nth-child(n+2),.uk-list-large>li>ul{margin-top:20px}.uk-list-large.uk-list-divider>li:nth-child(n+2){margin-top:20px;padding-top:20px}.uk-list-large.uk-list-striped>li{padding:20px 10px}.uk-list-large.uk-list-striped>li:nth-of-type(odd){border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}.uk-list-large.uk-list-striped>li:nth-child(n+2){margin-top:0}.uk-description-list>dt{color:#333;font-size:.875rem;font-weight:400;text-transform:uppercase}.uk-description-list>dt:nth-child(n+2){margin-top:20px}.uk-description-list-divider>dt:nth-child(n+2){margin-top:20px;padding-top:20px;border-top:1px solid #e5e5e5}.uk-table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:20px}*+.uk-table{margin-top:20px}.uk-table th{padding:16px 12px;text-align:left;vertical-align:bottom;font-size:.875rem;font-weight:400;color:#999;text-transform:uppercase}.uk-table td{padding:16px 12px;vertical-align:top}.uk-table td>:last-child{margin-bottom:0}.uk-table tfoot{font-size:.875rem}.uk-table caption{font-size:.875rem;text-align:left;color:#999}.uk-table tbody tr.uk-active,.uk-table>tr.uk-active{background:#ffd}.uk-table-middle,.uk-table-middle td{vertical-align:middle!important}.uk-table-divider>:first-child>tr:not(:first-child),.uk-table-divider>:not(:first-child)>tr,.uk-table-divider>tr:not(:first-child){border-top:1px solid #e5e5e5}.uk-table-striped tbody tr:nth-of-type(odd),.uk-table-striped>tr:nth-of-type(odd){background:#f8f8f8;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}.uk-table-hover tbody tr:hover,.uk-table-hover>tr:hover{background:#ffd}.uk-table-small td,.uk-table-small th{padding:10px 12px}.uk-table-justify td:first-child,.uk-table-justify th:first-child{padding-left:0}.uk-table-justify td:last-child,.uk-table-justify th:last-child{padding-right:0}.uk-table-shrink{width:1px}.uk-table-expand{min-width:300px}.uk-table-link{padding:0!important}.uk-table-link>a{display:block;padding:16px 12px}.uk-table-small .uk-table-link>a{padding:10px 12px}@media (max-width:959px){.uk-table-responsive,.uk-table-responsive tbody,.uk-table-responsive td,.uk-table-responsive th,.uk-table-responsive tr{display:block}.uk-table-responsive thead{display:none}.uk-table-responsive td,.uk-table-responsive th{width:auto!important;max-width:none!important;min-width:0!important;overflow:visible!important;white-space:normal!important}.uk-table-responsive .uk-table-link:not(:first-child)>a,.uk-table-responsive td:not(:first-child):not(.uk-table-link),.uk-table-responsive th:not(:first-child):not(.uk-table-link){padding-top:5px!important}.uk-table-responsive .uk-table-link:not(:last-child)>a,.uk-table-responsive td:not(:last-child):not(.uk-table-link),.uk-table-responsive th:not(:last-child):not(.uk-table-link){padding-bottom:5px!important}.uk-table-justify.uk-table-responsive td,.uk-table-justify.uk-table-responsive th{padding-left:0;padding-right:0}}.uk-table tbody tr{transition:background-color .1s linear}.uk-icon{margin:0;border:none;border-radius:0;overflow:visible;font:inherit;color:inherit;text-transform:none;padding:0;background-color:transparent;display:inline-block;fill:currentcolor;line-height:0}button.uk-icon:not(:disabled){cursor:pointer}.uk-icon::-moz-focus-inner{border:0;padding:0}.uk-icon [FILL*='#']:not(.uk-preserve),.uk-icon [fill*='#']:not(.uk-preserve){fill:currentcolor}.uk-icon [STROKE*='#']:not(.uk-preserve),.uk-icon [stroke*='#']:not(.uk-preserve){stroke:currentcolor}.uk-icon>*{transform:translate(0,0)}.uk-icon-image{width:20px;height:20px;background-position:50% 50%;background-repeat:no-repeat;background-size:contain;vertical-align:middle}.uk-icon-link{color:#999}.uk-icon-link:focus,.uk-icon-link:hover{color:#666;outline:0}.uk-active>.uk-icon-link,.uk-icon-link:active{color:#595959}.uk-icon-button{box-sizing:border-box;width:36px;height:36px;border-radius:500px;background:#f8f8f8;color:#999;vertical-align:middle;display:inline-flex;justify-content:center;align-items:center;transition:.1s ease-in-out;transition-property:color,background-color}.uk-icon-button:focus,.uk-icon-button:hover{background-color:#ebebeb;color:#666;outline:0}.uk-active>.uk-icon-button,.uk-icon-button:active{background-color:#dfdfdf;color:#666}.uk-range{box-sizing:border-box;margin:0;vertical-align:middle;max-width:100%;width:100%;-webkit-appearance:none;background:0 0;padding:0}.uk-range:focus{outline:0}.uk-range::-moz-focus-outer{border:none}.uk-range::-ms-track{height:15px;background:0 0;border-color:transparent;color:transparent}.uk-range:not(:disabled)::-webkit-slider-thumb{cursor:pointer}.uk-range:not(:disabled)::-moz-range-thumb{cursor:pointer}.uk-range:not(:disabled)::-ms-thumb{cursor:pointer}.uk-range::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-7px;height:15px;width:15px;border-radius:500px;background:#fff;border:1px solid #ccc}.uk-range::-moz-range-thumb{border:none;height:15px;width:15px;border-radius:500px;background:#fff;border:1px solid #ccc}.uk-range::-ms-thumb{margin-top:0}.uk-range::-ms-thumb{border:none;height:15px;width:15px;border-radius:500px;background:#fff;border:1px solid #ccc}.uk-range::-ms-tooltip{display:none}.uk-range::-webkit-slider-runnable-track{height:3px;background:#ebebeb;border-radius:500px}.uk-range:active::-webkit-slider-runnable-track,.uk-range:focus::-webkit-slider-runnable-track{background:#d2d2d2}.uk-range::-moz-range-track{height:3px;background:#ebebeb;border-radius:500px}.uk-range:focus::-moz-range-track{background:#d2d2d2}.uk-range::-ms-fill-lower,.uk-range::-ms-fill-upper{height:3px;background:#ebebeb;border-radius:500px}.uk-range:focus::-ms-fill-lower,.uk-range:focus::-ms-fill-upper{background:#d2d2d2}.uk-checkbox,.uk-input,.uk-radio,.uk-select,.uk-textarea{box-sizing:border-box;margin:0;border-radius:0;font:inherit}.uk-input{overflow:visible}.uk-select{text-transform:none}.uk-select optgroup{font:inherit;font-weight:700}.uk-textarea{overflow:auto}.uk-input[type=search]::-webkit-search-cancel-button,.uk-input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.uk-input[type=number]::-webkit-inner-spin-button,.uk-input[type=number]::-webkit-outer-spin-button{height:auto}.uk-input::-moz-placeholder,.uk-textarea::-moz-placeholder{opacity:1}.uk-checkbox:not(:disabled),.uk-radio:not(:disabled){cursor:pointer}.uk-fieldset{border:none;margin:0;padding:0}.uk-input,.uk-textarea{-webkit-appearance:none}.uk-input,.uk-select,.uk-textarea{max-width:100%;width:100%;border:0 none;padding:0 10px;background:#fff;color:#666;border:1px solid #e5e5e5;transition:.2s ease-in-out;transition-property:color,background-color,border}.uk-input,.uk-select:not([multiple]):not([size]){height:40px;vertical-align:middle;display:inline-block}.uk-input:not(input),.uk-select:not(select){line-height:38px}.uk-select[multiple],.uk-select[size],.uk-textarea{padding-top:4px;padding-bottom:4px;vertical-align:top}.uk-input:focus,.uk-select:focus,.uk-textarea:focus{outline:0;background-color:#fff;color:#666;border-color:#1e87f0}.uk-input:disabled,.uk-select:disabled,.uk-textarea:disabled{background-color:#f8f8f8;color:#999;border-color:#e5e5e5}.uk-input:-ms-input-placeholder{color:#999!important}.uk-input::placeholder{color:#999}.uk-textarea:-ms-input-placeholder{color:#999!important}.uk-textarea::placeholder{color:#999}.uk-form-small{font-size:.875rem}.uk-form-small:not(textarea):not([multiple]):not([size]){height:30px;padding-left:8px;padding-right:8px}.uk-form-small:not(select):not(input):not(textarea){line-height:28px}.uk-form-large{font-size:1.25rem}.uk-form-large:not(textarea):not([multiple]):not([size]){height:55px;padding-left:12px;padding-right:12px}.uk-form-large:not(select):not(input):not(textarea){line-height:53px}.uk-form-danger,.uk-form-danger:focus{color:#f0506e;border-color:#f0506e}.uk-form-success,.uk-form-success:focus{color:#32d296;border-color:#32d296}.uk-form-blank{background:0 0;border-color:transparent}.uk-form-blank:focus{border-color:#e5e5e5;border-style:dashed}input.uk-form-width-xsmall{width:50px}select.uk-form-width-xsmall{width:75px}.uk-form-width-small{width:130px}.uk-form-width-medium{width:200px}.uk-form-width-large{width:500px}.uk-select:not([multiple]):not([size]){-webkit-appearance:none;-moz-appearance:none;padding-right:20px;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\");background-repeat:no-repeat;background-position:100% 50%}.uk-select:not([multiple]):not([size])::-ms-expand{display:none}.uk-select:not([multiple]):not([size]):disabled{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-checkbox,.uk-radio{display:inline-block;height:16px;width:16px;overflow:hidden;margin-top:-4px;vertical-align:middle;-webkit-appearance:none;-moz-appearance:none;background-color:transparent;background-repeat:no-repeat;background-position:50% 50%;border:1px solid #ccc;transition:.2s ease-in-out;transition-property:background-color,border}.uk-radio{border-radius:50%}.uk-checkbox:focus,.uk-radio:focus{outline:0;border-color:#1e87f0}.uk-checkbox:checked,.uk-checkbox:indeterminate,.uk-radio:checked{background-color:#1e87f0;border-color:transparent}.uk-checkbox:checked:focus,.uk-checkbox:indeterminate:focus,.uk-radio:checked:focus{background-color:#0e6dcd}.uk-radio:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23fff%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23fff%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-checkbox:indeterminate{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23fff%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:disabled,.uk-radio:disabled{background-color:#f8f8f8;border-color:#e5e5e5}.uk-radio:disabled:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23999%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-checkbox:disabled:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-checkbox:disabled:indeterminate{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23999%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-legend{width:100%;color:inherit;padding:0;font-size:1.5rem;line-height:1.4}.uk-form-custom{display:inline-block;position:relative;max-width:100%;vertical-align:middle}.uk-form-custom input[type=file],.uk-form-custom select{position:absolute;top:0;z-index:1;width:100%;height:100%;left:0;-webkit-appearance:none;opacity:0;cursor:pointer}.uk-form-custom input[type=file]{font-size:500px;overflow:hidden}.uk-form-label{color:#333;font-size:.875rem}.uk-form-stacked .uk-form-label{display:block;margin-bottom:5px}@media (max-width:959px){.uk-form-horizontal .uk-form-label{display:block;margin-bottom:5px}}@media (min-width:960px){.uk-form-horizontal .uk-form-label{width:200px;margin-top:7px;float:left}.uk-form-horizontal .uk-form-controls{margin-left:215px}.uk-form-horizontal .uk-form-controls-text{padding-top:7px}}.uk-form-icon{position:absolute;top:0;bottom:0;left:0;width:40px;display:inline-flex;justify-content:center;align-items:center;color:#999}.uk-form-icon:hover{color:#666}.uk-form-icon:not(a):not(button):not(input){pointer-events:none}.uk-form-icon:not(.uk-form-icon-flip)+.uk-input{padding-left:40px}.uk-form-icon-flip{right:0;left:auto}.uk-form-icon-flip+.uk-input{padding-right:40px}.uk-button{margin:0;border:none;border-radius:0;overflow:visible;font:inherit;color:inherit;text-transform:none;display:inline-block;box-sizing:border-box;padding:0 30px;vertical-align:middle;font-size:.875rem;line-height:38px;text-align:center;text-decoration:none;text-transform:uppercase;transition:.1s ease-in-out;transition-property:color,background-color,border-color}.uk-button:not(:disabled){cursor:pointer}.uk-button::-moz-focus-inner{border:0;padding:0}.uk-button:hover{text-decoration:none}.uk-button:focus{outline:0}.uk-button-default{background-color:transparent;color:#333;border:1px solid #e5e5e5}.uk-button-default:focus,.uk-button-default:hover{background-color:transparent;color:#333;border-color:#b2b2b2}.uk-button-default.uk-active,.uk-button-default:active{background-color:transparent;color:#333;border-color:#999}.uk-button-primary{background-color:#1e87f0;color:#fff;border:1px solid transparent}.uk-button-primary:focus,.uk-button-primary:hover{background-color:#0f7ae5;color:#fff}.uk-button-primary.uk-active,.uk-button-primary:active{background-color:#0e6dcd;color:#fff}.uk-button-secondary{background-color:#222;color:#fff;border:1px solid transparent}.uk-button-secondary:focus,.uk-button-secondary:hover{background-color:#151515;color:#fff}.uk-button-secondary.uk-active,.uk-button-secondary:active{background-color:#080808;color:#fff}.uk-button-danger{background-color:#f0506e;color:#fff;border:1px solid transparent}.uk-button-danger:focus,.uk-button-danger:hover{background-color:#ee395b;color:#fff}.uk-button-danger.uk-active,.uk-button-danger:active{background-color:#ec2147;color:#fff}.uk-button-danger:disabled,.uk-button-default:disabled,.uk-button-primary:disabled,.uk-button-secondary:disabled{background-color:transparent;color:#999;border-color:#e5e5e5}.uk-button-small{padding:0 15px;line-height:28px;font-size:.875rem}.uk-button-large{padding:0 40px;line-height:53px;font-size:.875rem}.uk-button-text{padding:0;line-height:1.5;background:0 0;color:#333;position:relative}.uk-button-text::before{content:\"\";position:absolute;bottom:0;left:0;right:100%;border-bottom:1px solid #333;transition:right .3s ease-out}.uk-button-text:focus,.uk-button-text:hover{color:#333}.uk-button-text:focus::before,.uk-button-text:hover::before{right:0}.uk-button-text:disabled{color:#999}.uk-button-text:disabled::before{display:none}.uk-button-link{padding:0;line-height:1.5;background:0 0;color:#1e87f0}.uk-button-link:focus,.uk-button-link:hover{color:#0f6ecd;text-decoration:underline}.uk-button-link:disabled{color:#999;text-decoration:none}.uk-button-group{display:inline-flex;vertical-align:middle;position:relative}.uk-button-group>.uk-button:nth-child(n+2),.uk-button-group>div:nth-child(n+2) .uk-button{margin-left:-1px}.uk-button-group .uk-button.uk-active,.uk-button-group .uk-button:active,.uk-button-group .uk-button:focus,.uk-button-group .uk-button:hover{position:relative;z-index:1}.uk-section{box-sizing:border-box;padding-top:40px;padding-bottom:40px}@media (min-width:960px){.uk-section{padding-top:70px;padding-bottom:70px}}.uk-section::after,.uk-section::before{content:\"\";display:table}.uk-section::after{clear:both}.uk-section>:last-child{margin-bottom:0}.uk-section-xsmall{padding-top:20px;padding-bottom:20px}.uk-section-small{padding-top:40px;padding-bottom:40px}.uk-section-large{padding-top:70px;padding-bottom:70px}@media (min-width:960px){.uk-section-large{padding-top:140px;padding-bottom:140px}}.uk-section-xlarge{padding-top:140px;padding-bottom:140px}@media (min-width:960px){.uk-section-xlarge{padding-top:210px;padding-bottom:210px}}.uk-section-default{background:#fff}.uk-section-muted{background:#f8f8f8}.uk-section-primary{background:#1e87f0}.uk-section-secondary{background:#222}.uk-container{box-sizing:content-box;max-width:1200px;margin-left:auto;margin-right:auto;padding-left:15px;padding-right:15px}@media (min-width:640px){.uk-container{padding-left:30px;padding-right:30px}}@media (min-width:960px){.uk-container{padding-left:40px;padding-right:40px}}.uk-container::after,.uk-container::before{content:\"\";display:table}.uk-container::after{clear:both}.uk-container>:last-child{margin-bottom:0}.uk-container .uk-container{padding-left:0;padding-right:0}.uk-container-small{max-width:900px}.uk-container-large{max-width:1600px}.uk-container-expand{max-width:none}.uk-grid{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none}.uk-grid>*{margin:0}.uk-grid>*>:last-child{margin-bottom:0}.uk-grid{margin-left:-30px}.uk-grid>*{padding-left:30px}*+.uk-grid-margin,.uk-grid+.uk-grid,.uk-grid>.uk-grid-margin{margin-top:30px}@media (min-width:1200px){.uk-grid{margin-left:-40px}.uk-grid>*{padding-left:40px}*+.uk-grid-margin,.uk-grid+.uk-grid,.uk-grid>.uk-grid-margin{margin-top:40px}}.uk-grid-small{margin-left:-15px}.uk-grid-small>*{padding-left:15px}*+.uk-grid-margin-small,.uk-grid+.uk-grid-small,.uk-grid-small>.uk-grid-margin{margin-top:15px}.uk-grid-medium{margin-left:-30px}.uk-grid-medium>*{padding-left:30px}*+.uk-grid-margin-medium,.uk-grid+.uk-grid-medium,.uk-grid-medium>.uk-grid-margin{margin-top:30px}.uk-grid-large{margin-left:-40px}.uk-grid-large>*{padding-left:40px}*+.uk-grid-margin-large,.uk-grid+.uk-grid-large,.uk-grid-large>.uk-grid-margin{margin-top:40px}@media (min-width:1200px){.uk-grid-large{margin-left:-70px}.uk-grid-large>*{padding-left:70px}*+.uk-grid-margin-large,.uk-grid+.uk-grid-large,.uk-grid-large>.uk-grid-margin{margin-top:70px}}.uk-grid-collapse{margin-left:0}.uk-grid-collapse>*{padding-left:0}.uk-grid+.uk-grid-collapse,.uk-grid-collapse>.uk-grid-margin{margin-top:0}.uk-grid-divider>*{position:relative}.uk-grid-divider>:not(.uk-first-column)::before{content:\"\";position:absolute;top:0;bottom:0;border-left:1px solid #e5e5e5}.uk-grid-divider.uk-grid-stack>.uk-grid-margin::before{content:\"\";position:absolute;left:0;right:0;border-top:1px solid #e5e5e5}.uk-grid-divider{margin-left:-60px}.uk-grid-divider>*{padding-left:60px}.uk-grid-divider>:not(.uk-first-column)::before{left:30px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin{margin-top:60px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin::before{top:-30px;left:60px}@media (min-width:1200px){.uk-grid-divider{margin-left:-80px}.uk-grid-divider>*{padding-left:80px}.uk-grid-divider>:not(.uk-first-column)::before{left:40px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin{margin-top:80px}.uk-grid-divider.uk-grid-stack>.uk-grid-margin::before{top:-40px;left:80px}}.uk-grid-divider.uk-grid-small{margin-left:-30px}.uk-grid-divider.uk-grid-small>*{padding-left:30px}.uk-grid-divider.uk-grid-small>:not(.uk-first-column)::before{left:15px}.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin{margin-top:30px}.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin::before{top:-15px;left:30px}.uk-grid-divider.uk-grid-medium{margin-left:-60px}.uk-grid-divider.uk-grid-medium>*{padding-left:60px}.uk-grid-divider.uk-grid-medium>:not(.uk-first-column)::before{left:30px}.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin{margin-top:60px}.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin::before{top:-30px;left:60px}.uk-grid-divider.uk-grid-large{margin-left:-80px}.uk-grid-divider.uk-grid-large>*{padding-left:80px}.uk-grid-divider.uk-grid-large>:not(.uk-first-column)::before{left:40px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin{margin-top:80px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin::before{top:-40px;left:80px}@media (min-width:1200px){.uk-grid-divider.uk-grid-large{margin-left:-140px}.uk-grid-divider.uk-grid-large>*{padding-left:140px}.uk-grid-divider.uk-grid-large>:not(.uk-first-column)::before{left:70px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin{margin-top:140px}.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin::before{top:-70px;left:140px}}.uk-grid-item-match,.uk-grid-match>*{display:flex;flex-wrap:wrap}.uk-grid-item-match>:not([class*=uk-width]),.uk-grid-match>*>:not([class*=uk-width]){box-sizing:border-box;width:100%;flex:auto}.uk-tile{position:relative;box-sizing:border-box;padding-left:15px;padding-right:15px;padding-top:40px;padding-bottom:40px}@media (min-width:640px){.uk-tile{padding-left:30px;padding-right:30px}}@media (min-width:960px){.uk-tile{padding-left:40px;padding-right:40px;padding-top:70px;padding-bottom:70px}}.uk-tile::after,.uk-tile::before{content:\"\";display:table}.uk-tile::after{clear:both}.uk-tile>:last-child{margin-bottom:0}.uk-tile-xsmall{padding-top:20px;padding-bottom:20px}.uk-tile-small{padding-top:40px;padding-bottom:40px}.uk-tile-large{padding-top:70px;padding-bottom:70px}@media (min-width:960px){.uk-tile-large{padding-top:140px;padding-bottom:140px}}.uk-tile-xlarge{padding-top:140px;padding-bottom:140px}@media (min-width:960px){.uk-tile-xlarge{padding-top:210px;padding-bottom:210px}}.uk-tile-default{background:#fff}.uk-tile-muted{background:#f8f8f8}.uk-tile-primary{background:#1e87f0}.uk-tile-secondary{background:#222}.uk-card{position:relative;box-sizing:border-box;transition:box-shadow .1s ease-in-out}.uk-card-body{padding:30px 30px}.uk-card-header{padding:15px 30px}.uk-card-footer{padding:15px 30px}@media (min-width:1200px){.uk-card-body{padding:40px 40px}.uk-card-header{padding:20px 40px}.uk-card-footer{padding:20px 40px}}.uk-card-body::after,.uk-card-body::before,.uk-card-footer::after,.uk-card-footer::before,.uk-card-header::after,.uk-card-header::before{content:\"\";display:table}.uk-card-body::after,.uk-card-footer::after,.uk-card-header::after{clear:both}.uk-card-body>:last-child,.uk-card-footer>:last-child,.uk-card-header>:last-child{margin-bottom:0}.uk-card-title{font-size:1.5rem;line-height:1.4}.uk-card-badge{position:absolute;top:30px;right:30px;z-index:1}.uk-card-badge:first-child+*{margin-top:0}.uk-card-hover:not(.uk-card-default):not(.uk-card-primary):not(.uk-card-secondary):hover{background:#fff;box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-card-default{background:#fff;color:#666;box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-card-default .uk-card-title{color:#333}.uk-card-default.uk-card-hover:hover{background-color:#fff;box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-card-default .uk-card-header{border-bottom:1px solid #e5e5e5}.uk-card-default .uk-card-footer{border-top:1px solid #e5e5e5}.uk-card-primary{background:#1e87f0;color:#fff;box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-card-primary .uk-card-title{color:#fff}.uk-card-primary.uk-card-hover:hover{background-color:#1e87f0;box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-card-secondary{background:#222;color:#fff;box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-card-secondary .uk-card-title{color:#fff}.uk-card-secondary.uk-card-hover:hover{background-color:#222;box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-card-small .uk-card-body,.uk-card-small.uk-card-body{padding:20px 20px}.uk-card-small .uk-card-header{padding:13px 20px}.uk-card-small .uk-card-footer{padding:13px 20px}@media (min-width:1200px){.uk-card-large .uk-card-body,.uk-card-large.uk-card-body{padding:70px 70px}.uk-card-large .uk-card-header{padding:35px 70px}.uk-card-large .uk-card-footer{padding:35px 70px}}.uk-card-body .uk-nav-default{margin:-15px -30px}.uk-card-title+.uk-nav-default{margin-top:0}.uk-card-body .uk-nav-default .uk-nav-divider,.uk-card-body .uk-nav-default .uk-nav-header,.uk-card-body .uk-nav-default>li>a{padding-left:30px;padding-right:30px}.uk-card-body .uk-nav-default .uk-nav-sub{padding-left:45px}@media (min-width:1200px){.uk-card-body .uk-nav-default{margin:-25px -40px}.uk-card-title+.uk-nav-default{margin-top:0}.uk-card-body .uk-nav-default .uk-nav-divider,.uk-card-body .uk-nav-default .uk-nav-header,.uk-card-body .uk-nav-default>li>a{padding-left:40px;padding-right:40px}.uk-card-body .uk-nav-default .uk-nav-sub{padding-left:55px}}.uk-card-small .uk-nav-default{margin:-5px -20px}.uk-card-small .uk-card-title+.uk-nav-default{margin-top:0}.uk-card-small .uk-nav-default .uk-nav-divider,.uk-card-small .uk-nav-default .uk-nav-header,.uk-card-small .uk-nav-default>li>a{padding-left:20px;padding-right:20px}.uk-card-small .uk-nav-default .uk-nav-sub{padding-left:35px}@media (min-width:1200px){.uk-card-large .uk-nav-default{margin:-55px -70px}.uk-card-large .uk-card-title+.uk-nav-default{margin-top:0}}.uk-close{color:#999;transition:.1s ease-in-out;transition-property:color,opacity}.uk-close:focus,.uk-close:hover{color:#666;outline:0}.uk-spinner>*{animation:uk-spinner-rotate 1.4s linear infinite}@keyframes uk-spinner-rotate{0%{transform:rotate(0)}100%{transform:rotate(270deg)}}.uk-spinner>*>*{stroke-dasharray:88px;stroke-dashoffset:0;transform-origin:center;animation:uk-spinner-dash 1.4s ease-in-out infinite;stroke-width:1;stroke-linecap:round}@keyframes uk-spinner-dash{0%{stroke-dashoffset:88px}50%{stroke-dashoffset:22px;transform:rotate(135deg)}100%{stroke-dashoffset:88px;transform:rotate(450deg)}}.uk-totop{padding:5px;color:#999;transition:color .1s ease-in-out}.uk-totop:focus,.uk-totop:hover{color:#666;outline:0}.uk-totop:active{color:#333}.uk-marker{padding:5px;background:#222;color:#fff;border-radius:500px}.uk-marker:focus,.uk-marker:hover{color:#fff;outline:0}.uk-alert{position:relative;margin-bottom:20px;padding:15px 29px 15px 15px;background:#f8f8f8;color:#666}*+.uk-alert{margin-top:20px}.uk-alert>:last-child{margin-bottom:0}.uk-alert-close{position:absolute;top:20px;right:15px;color:inherit;opacity:.4}.uk-alert-close:first-child+*{margin-top:0}.uk-alert-close:focus,.uk-alert-close:hover{color:inherit;opacity:.8}.uk-alert-primary{background:#d8eafc;color:#1e87f0}.uk-alert-success{background:#edfbf6;color:#32d296}.uk-alert-warning{background:#fff6ee;color:#faa05a}.uk-alert-danger{background:#fef4f6;color:#f0506e}.uk-alert h1,.uk-alert h2,.uk-alert h3,.uk-alert h4,.uk-alert h5,.uk-alert h6{color:inherit}.uk-alert a:not([class]){color:inherit;text-decoration:underline}.uk-alert a:not([class]):hover{color:inherit;text-decoration:underline}.uk-badge{box-sizing:border-box;min-width:22px;height:22px;padding:0 5px;border-radius:500px;vertical-align:middle;background:#1e87f0;color:#fff;font-size:.875rem;display:inline-flex;justify-content:center;align-items:center}.uk-badge:focus,.uk-badge:hover{color:#fff;text-decoration:none;outline:0}.uk-label{display:inline-block;padding:0 10px;background:#1e87f0;line-height:1.5;font-size:.875rem;color:#fff;vertical-align:middle;white-space:nowrap;border-radius:2px;text-transform:uppercase}.uk-label-success{background-color:#32d296;color:#fff}.uk-label-warning{background-color:#faa05a;color:#fff}.uk-label-danger{background-color:#f0506e;color:#fff}.uk-overlay{padding:30px 30px}.uk-overlay>:last-child{margin-bottom:0}.uk-overlay-default{background:rgba(255,255,255,.8)}.uk-overlay-primary{background:rgba(34,34,34,.8)}.uk-article::after,.uk-article::before{content:\"\";display:table}.uk-article::after{clear:both}.uk-article>:last-child{margin-bottom:0}.uk-article+.uk-article{margin-top:70px}.uk-article-title{font-size:2.625rem;line-height:1.2}.uk-article-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-article-meta a{color:#999}.uk-article-meta a:hover{color:#666;text-decoration:none}.uk-comment-header{margin-bottom:20px}.uk-comment-body::after,.uk-comment-body::before,.uk-comment-header::after,.uk-comment-header::before{content:\"\";display:table}.uk-comment-body::after,.uk-comment-header::after{clear:both}.uk-comment-body>:last-child,.uk-comment-header>:last-child{margin-bottom:0}.uk-comment-title{font-size:1.25rem;line-height:1.4}.uk-comment-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-comment-list{padding:0;list-style:none}.uk-comment-list>:nth-child(n+2){margin-top:70px}.uk-comment-list .uk-comment~ul{margin:70px 0 0 0;padding-left:30px;list-style:none}@media (min-width:960px){.uk-comment-list .uk-comment~ul{padding-left:100px}}.uk-comment-list .uk-comment~ul>:nth-child(n+2){margin-top:70px}.uk-comment-primary{padding:30px;background-color:#f8f8f8}.uk-search{display:inline-block;position:relative;max-width:100%;margin:0}.uk-search-input::-webkit-search-cancel-button,.uk-search-input::-webkit-search-decoration{-webkit-appearance:none}.uk-search-input::-moz-placeholder{opacity:1}.uk-search-input{box-sizing:border-box;margin:0;border-radius:0;font:inherit;overflow:visible;-webkit-appearance:none;vertical-align:middle;width:100%;border:none;color:#666}.uk-search-input:focus{outline:0}.uk-search-input:-ms-input-placeholder{color:#999!important}.uk-search-input::placeholder{color:#999}.uk-search-icon:focus{outline:0}.uk-search .uk-search-icon{position:absolute;top:0;bottom:0;left:0;display:inline-flex;justify-content:center;align-items:center;color:#999}.uk-search .uk-search-icon:hover{color:#999}.uk-search .uk-search-icon:not(a):not(button):not(input){pointer-events:none}.uk-search .uk-search-icon-flip{right:0;left:auto}.uk-search-default{width:180px}.uk-search-default .uk-search-input{height:40px;padding-left:6px;padding-right:6px;background:0 0;border:1px solid #e5e5e5}.uk-search-default .uk-search-input:focus{background-color:transparent}.uk-search-default .uk-search-icon{width:40px}.uk-search-default .uk-search-icon:not(.uk-search-icon-flip)+.uk-search-input{padding-left:40px}.uk-search-default .uk-search-icon-flip+.uk-search-input{padding-right:40px}.uk-search-navbar{width:400px}.uk-search-navbar .uk-search-input{height:40px;background:0 0;font-size:1.5rem}.uk-search-navbar .uk-search-icon{width:40px}.uk-search-navbar .uk-search-icon:not(.uk-search-icon-flip)+.uk-search-input{padding-left:40px}.uk-search-navbar .uk-search-icon-flip+.uk-search-input{padding-right:40px}.uk-search-large{width:500px}.uk-search-large .uk-search-input{height:80px;background:0 0;font-size:2.625rem}.uk-search-large .uk-search-icon{width:80px}.uk-search-large .uk-search-icon:not(.uk-search-icon-flip)+.uk-search-input{padding-left:80px}.uk-search-large .uk-search-icon-flip+.uk-search-input{padding-right:80px}.uk-search-toggle{color:#999}.uk-search-toggle:focus,.uk-search-toggle:hover{color:#666}.uk-nav,.uk-nav ul{margin:0;padding:0;list-style:none}.uk-nav li>a{display:block;text-decoration:none}.uk-nav li>a:focus{outline:0}.uk-nav>li>a{padding:5px 0}ul.uk-nav-sub{padding:5px 0 5px 15px}.uk-nav-sub ul{padding-left:15px}.uk-nav-sub a{padding:2px 0}.uk-nav-parent-icon>.uk-parent>a::after{content:\"\";width:1.5em;height:1.5em;float:right;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%2210%201%204%207%2010%2013%22%20%2F%3E%0A%3C%2Fsvg%3E\");background-repeat:no-repeat;background-position:50% 50%}.uk-nav-parent-icon>.uk-parent.uk-open>a::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%221%204%207%2010%2013%204%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-nav-header{padding:5px 0;text-transform:uppercase;font-size:.875rem}.uk-nav-header:not(:first-child){margin-top:20px}.uk-nav-divider{margin:5px 0}.uk-nav-default{font-size:.875rem}.uk-nav-default>li>a{color:#999}.uk-nav-default>li>a:focus,.uk-nav-default>li>a:hover{color:#666}.uk-nav-default>li.uk-active>a{color:#333}.uk-nav-default .uk-nav-header{color:#333}.uk-nav-default .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-nav-default .uk-nav-sub a{color:#999}.uk-nav-default .uk-nav-sub a:focus,.uk-nav-default .uk-nav-sub a:hover{color:#666}.uk-nav-primary>li>a{font-size:1.5rem;line-height:1.5;color:#999}.uk-nav-primary>li>a:focus,.uk-nav-primary>li>a:hover{color:#666}.uk-nav-primary>li.uk-active>a{color:#333}.uk-nav-primary .uk-nav-header{color:#333}.uk-nav-primary .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-nav-primary .uk-nav-sub a{color:#999}.uk-nav-primary .uk-nav-sub a:focus,.uk-nav-primary .uk-nav-sub a:hover{color:#666}.uk-nav-center{text-align:center}.uk-nav-center .uk-nav-sub,.uk-nav-center .uk-nav-sub ul{padding-left:0}.uk-nav-center.uk-nav-parent-icon>.uk-parent>a::after{position:absolute}.uk-navbar{display:flex;position:relative}.uk-navbar-container:not(.uk-navbar-transparent){background:#f8f8f8}.uk-navbar-container>::after,.uk-navbar-container>::before{display:none!important}.uk-navbar-center,.uk-navbar-center-left>*,.uk-navbar-center-right>*,.uk-navbar-left,.uk-navbar-right{display:flex;align-items:center}.uk-navbar-right{margin-left:auto}.uk-navbar-center:only-child{margin-left:auto;margin-right:auto;position:relative}.uk-navbar-center:not(:only-child){position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:990}.uk-navbar-center:not(:only-child) .uk-navbar-item,.uk-navbar-center:not(:only-child) .uk-navbar-nav>li>a,.uk-navbar-center:not(:only-child) .uk-navbar-toggle{white-space:nowrap}.uk-navbar-center-left,.uk-navbar-center-right{position:absolute;top:0}.uk-navbar-center-left{right:100%}.uk-navbar-center-right{left:100%}[class*=uk-navbar-center-] .uk-navbar-item,[class*=uk-navbar-center-] .uk-navbar-nav>li>a,[class*=uk-navbar-center-] .uk-navbar-toggle{white-space:nowrap}.uk-navbar-nav{display:flex;margin:0;padding:0;list-style:none}.uk-navbar-center:only-child,.uk-navbar-left,.uk-navbar-right{flex-wrap:wrap}.uk-navbar-item,.uk-navbar-nav>li>a,.uk-navbar-toggle{display:flex;justify-content:center;align-items:center;box-sizing:border-box;height:80px;padding:0 15px;font-size:.875rem;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;text-decoration:none}.uk-navbar-nav>li>a{color:#999;text-transform:uppercase;transition:.1s ease-in-out;transition-property:color,background-color}.uk-navbar-nav>li:hover>a,.uk-navbar-nav>li>a.uk-open,.uk-navbar-nav>li>a:focus{color:#666;outline:0}.uk-navbar-nav>li>a:active{color:#333}.uk-navbar-nav>li.uk-active>a{color:#333}.uk-navbar-item{color:#666}.uk-navbar-toggle{color:#999}.uk-navbar-toggle.uk-open,.uk-navbar-toggle:focus,.uk-navbar-toggle:hover{color:#666;outline:0;text-decoration:none}.uk-navbar-subtitle{font-size:.875rem}.uk-navbar-dropdown{display:none;position:absolute;z-index:1020;box-sizing:border-box;width:200px;padding:25px;background:#fff;color:#666;box-shadow:0 5px 12px rgba(0,0,0,.15)}.uk-navbar-dropdown.uk-open{display:block}[class*=uk-navbar-dropdown-top]{margin-top:-15px}[class*=uk-navbar-dropdown-bottom]{margin-top:15px}[class*=uk-navbar-dropdown-left]{margin-left:-15px}[class*=uk-navbar-dropdown-right]{margin-left:15px}.uk-navbar-dropdown-grid{margin-left:-50px}.uk-navbar-dropdown-grid>*{padding-left:50px}.uk-navbar-dropdown-grid>.uk-grid-margin{margin-top:50px}.uk-navbar-dropdown-stack .uk-navbar-dropdown-grid>*{width:100%!important}.uk-navbar-dropdown-width-2:not(.uk-navbar-dropdown-stack){width:400px}.uk-navbar-dropdown-width-3:not(.uk-navbar-dropdown-stack){width:600px}.uk-navbar-dropdown-width-4:not(.uk-navbar-dropdown-stack){width:800px}.uk-navbar-dropdown-width-5:not(.uk-navbar-dropdown-stack){width:1000px}.uk-navbar-dropdown-dropbar{margin-top:0;margin-bottom:0;box-shadow:none}.uk-navbar-dropdown-nav{font-size:.875rem}.uk-navbar-dropdown-nav>li>a{color:#999}.uk-navbar-dropdown-nav>li>a:focus,.uk-navbar-dropdown-nav>li>a:hover{color:#666}.uk-navbar-dropdown-nav>li.uk-active>a{color:#333}.uk-navbar-dropdown-nav .uk-nav-header{color:#333}.uk-navbar-dropdown-nav .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-navbar-dropdown-nav .uk-nav-sub a{color:#999}.uk-navbar-dropdown-nav .uk-nav-sub a:focus,.uk-navbar-dropdown-nav .uk-nav-sub a:hover{color:#666}.uk-navbar-dropbar{background:#fff}.uk-navbar-dropbar-slide{position:absolute;z-index:980;left:0;right:0;box-shadow:0 5px 7px rgba(0,0,0,.05)}.uk-navbar-container>.uk-container .uk-navbar-left{margin-left:-15px;margin-right:-15px}.uk-navbar-container>.uk-container .uk-navbar-right{margin-right:-15px}.uk-navbar-dropdown-grid>*{position:relative}.uk-navbar-dropdown-grid>:not(.uk-first-column)::before{content:\"\";position:absolute;top:0;bottom:0;left:25px;border-left:1px solid #e5e5e5}.uk-navbar-dropdown-grid.uk-grid-stack>.uk-grid-margin::before{content:\"\";position:absolute;top:-25px;left:50px;right:0;border-top:1px solid #e5e5e5}.uk-subnav{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none}.uk-subnav>*{flex:none;padding-left:20px;position:relative}.uk-subnav>*>:first-child{display:block;color:#999;font-size:.875rem;text-transform:uppercase;transition:.1s ease-in-out;transition-property:color,background-color}.uk-subnav>*>a:focus,.uk-subnav>*>a:hover{color:#666;text-decoration:none;outline:0}.uk-subnav>.uk-active>a{color:#333}.uk-subnav-divider>*{display:flex;align-items:center}.uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before{content:\"\";height:1.5em;margin-left:0;margin-right:20px;border-left:1px solid #e5e5e5}.uk-subnav-pill>*>:first-child{padding:5px 10px;background:0 0;color:#999}.uk-subnav-pill>*>a:focus,.uk-subnav-pill>*>a:hover{background-color:#f8f8f8;color:#666}.uk-subnav-pill>*>a:active{background-color:#f8f8f8;color:#666}.uk-subnav-pill>.uk-active>a{background-color:#1e87f0;color:#fff}.uk-subnav>.uk-disabled>a{color:#999}.uk-breadcrumb{display:flex;flex-wrap:wrap;padding:0;list-style:none}.uk-breadcrumb>*{flex:none}.uk-breadcrumb>*>*{display:inline-block;font-size:.875rem;color:#999}.uk-breadcrumb>*>:focus,.uk-breadcrumb>*>:hover{color:#666;text-decoration:none}.uk-breadcrumb>:last-child>*{color:#666}.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before{content:\"/\";display:inline-block;margin:0 20px;color:#999}.uk-pagination{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none}.uk-pagination>*{flex:none;padding-left:20px;position:relative}.uk-pagination>*>*{display:block;color:#999;transition:color .1s ease-in-out}.uk-pagination>*>:focus,.uk-pagination>*>:hover{color:#666;text-decoration:none}.uk-pagination>.uk-active>*{color:#666}.uk-pagination>.uk-disabled>*{color:#999}.uk-tab{display:flex;flex-wrap:wrap;margin-left:-20px;padding:0;list-style:none;position:relative}.uk-tab::before{content:\"\";position:absolute;bottom:0;left:20px;right:0;border-bottom:1px solid #e5e5e5}.uk-tab>*{flex:none;padding-left:20px;position:relative}.uk-tab>*>a{display:block;text-align:center;padding:5px 10px;color:#999;border-bottom:1px solid transparent;font-size:.875rem;text-transform:uppercase;transition:color .1s ease-in-out}.uk-tab>*>a:focus,.uk-tab>*>a:hover{color:#666;text-decoration:none}.uk-tab>.uk-active>a{color:#333;border-color:#1e87f0}.uk-tab>.uk-disabled>a{color:#999}.uk-tab-bottom::before{top:0;bottom:auto}.uk-tab-bottom>*>a{border-top:1px solid transparent;border-bottom:none}.uk-tab-left,.uk-tab-right{flex-direction:column;margin-left:0}.uk-tab-left>*,.uk-tab-right>*{padding-left:0}.uk-tab-left::before{top:0;bottom:0;left:auto;right:0;border-left:1px solid #e5e5e5;border-bottom:none}.uk-tab-right::before{top:0;bottom:0;left:0;right:auto;border-left:1px solid #e5e5e5;border-bottom:none}.uk-tab-left>*>a{text-align:left;border-right:1px solid transparent;border-bottom:none}.uk-tab-right>*>a{text-align:left;border-left:1px solid transparent;border-bottom:none}.uk-tab .uk-dropdown{margin-left:30px}.uk-slidenav{padding:5px 10px;color:rgba(102,102,102,.5);transition:color .1s ease-in-out}.uk-slidenav:focus,.uk-slidenav:hover{color:rgba(102,102,102,.9);outline:0}.uk-slidenav:active{color:rgba(102,102,102,.5)}.uk-slidenav-large{padding:10px 10px}.uk-slidenav-container{display:flex}.uk-dotnav{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-12px}.uk-dotnav>*{flex:none;padding-left:12px}.uk-dotnav>*>*{display:block;box-sizing:border-box;width:10px;height:10px;border-radius:50%;background:0 0;text-indent:100%;overflow:hidden;white-space:nowrap;border:1px solid rgba(102,102,102,.4);transition:.2s ease-in-out;transition-property:background-color,border-color}.uk-dotnav>*>:focus,.uk-dotnav>*>:hover{background-color:rgba(102,102,102,.6);outline:0;border-color:transparent}.uk-dotnav>*>:active{background-color:rgba(102,102,102,.2);border-color:transparent}.uk-dotnav>.uk-active>*{background-color:rgba(102,102,102,.6);border-color:transparent}.uk-dotnav-vertical{flex-direction:column;margin-left:0;margin-top:-12px}.uk-dotnav-vertical>*{padding-left:0;padding-top:12px}.uk-thumbnav{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-15px}.uk-thumbnav>*{flex:none;padding-left:15px}.uk-thumbnav>*>*{display:inline-block;position:relative}.uk-thumbnav>*>::after{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(255,255,255,.4);transition:background-color .1s ease-in-out}.uk-thumbnav>*>:focus,.uk-thumbnav>*>:hover{outline:0}.uk-thumbnav>*>:focus::after,.uk-thumbnav>*>:hover::after{background-color:transparent}.uk-thumbnav>.uk-active>::after{background-color:transparent}.uk-thumbnav-vertical{flex-direction:column;margin-left:0;margin-top:-15px}.uk-thumbnav-vertical>*{padding-left:0;padding-top:15px}.uk-accordion{padding:0;list-style:none}.uk-accordion>:nth-child(n+2){margin-top:20px}.uk-accordion-title{display:block;font-size:1.25rem;line-height:1.4;color:#333;overflow:hidden}.uk-accordion-title::after{content:\"\";width:1.4em;height:1.4em;float:right;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%221%22%20height%3D%2213%22%20x%3D%226%22%20y%3D%220%22%20%2F%3E%0A%3C%2Fsvg%3E\");background-repeat:no-repeat;background-position:50% 50%}.uk-open>.uk-accordion-title::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-accordion-title:focus,.uk-accordion-title:hover{color:#666;text-decoration:none;outline:0}.uk-accordion-content{margin-top:20px}.uk-accordion-content::after,.uk-accordion-content::before{content:\"\";display:table}.uk-accordion-content::after{clear:both}.uk-accordion-content>:last-child{margin-bottom:0}.uk-drop{display:none;position:absolute;z-index:1020;box-sizing:border-box;width:300px}.uk-drop.uk-open{display:block}[class*=uk-drop-top]{margin-top:-20px}[class*=uk-drop-bottom]{margin-top:20px}[class*=uk-drop-left]{margin-left:-20px}[class*=uk-drop-right]{margin-left:20px}.uk-drop-stack .uk-drop-grid>*{width:100%!important}.uk-dropdown{display:none;position:absolute;z-index:1020;box-sizing:border-box;min-width:200px;padding:25px;background:#fff;color:#666;box-shadow:0 5px 12px rgba(0,0,0,.15)}.uk-dropdown.uk-open{display:block}.uk-dropdown-nav{white-space:nowrap;font-size:.875rem}.uk-dropdown-nav>li>a{color:#999}.uk-dropdown-nav>li.uk-active>a,.uk-dropdown-nav>li>a:focus,.uk-dropdown-nav>li>a:hover{color:#666}.uk-dropdown-nav .uk-nav-header{color:#333}.uk-dropdown-nav .uk-nav-divider{border-top:1px solid #e5e5e5}.uk-dropdown-nav .uk-nav-sub a{color:#999}.uk-dropdown-nav .uk-nav-sub a:focus,.uk-dropdown-nav .uk-nav-sub a:hover{color:#666}[class*=uk-dropdown-top]{margin-top:-10px}[class*=uk-dropdown-bottom]{margin-top:10px}[class*=uk-dropdown-left]{margin-left:-10px}[class*=uk-dropdown-right]{margin-left:10px}.uk-dropdown-stack .uk-dropdown-grid>*{width:100%!important}.uk-modal{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1010;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:15px 15px;background:rgba(0,0,0,.6);opacity:0;transition:opacity .15s linear}@media (min-width:640px){.uk-modal{padding:50px 30px}}@media (min-width:960px){.uk-modal{padding-left:40px;padding-right:40px}}.uk-modal.uk-open{opacity:1}.uk-modal-page{overflow:hidden}.uk-modal-dialog{position:relative;box-sizing:border-box;margin:0 auto;width:600px;max-width:calc(100% - .01px)!important;background:#fff;opacity:0;transform:translateY(-100px);transition:.3s linear;transition-property:opacity,transform}.uk-open>.uk-modal-dialog{opacity:1;transform:translateY(0)}.uk-modal-container .uk-modal-dialog{width:1200px}.uk-modal-full{padding:0;background:0 0}.uk-modal-full .uk-modal-dialog{margin:0;width:100%;max-width:100%;transform:translateY(0)}.uk-modal-body{padding:30px 30px}.uk-modal-header{padding:15px 30px;background:#fff;border-bottom:1px solid #e5e5e5}.uk-modal-footer{padding:15px 30px;background:#fff;border-top:1px solid #e5e5e5}.uk-modal-body::after,.uk-modal-body::before,.uk-modal-footer::after,.uk-modal-footer::before,.uk-modal-header::after,.uk-modal-header::before{content:\"\";display:table}.uk-modal-body::after,.uk-modal-footer::after,.uk-modal-header::after{clear:both}.uk-modal-body>:last-child,.uk-modal-footer>:last-child,.uk-modal-header>:last-child{margin-bottom:0}.uk-modal-title{font-size:2rem;line-height:1.3}[class*=uk-modal-close-]{position:absolute;z-index:1010;top:10px;right:10px;padding:5px}[class*=uk-modal-close-]:first-child+*{margin-top:0}.uk-modal-close-outside{top:0;right:-5px;transform:translate(0,-100%);color:#fff}.uk-modal-close-outside:hover{color:#fff}@media (min-width:960px){.uk-modal-close-outside{right:0;transform:translate(100%,-100%)}}.uk-modal-close-full{top:0;right:0;padding:20px;background:#fff}.uk-lightbox{display:none;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1010;background:#000;opacity:0;transition:opacity .15s linear}.uk-lightbox.uk-open{display:block;opacity:1}.uk-lightbox-page{overflow:hidden}.uk-lightbox-items>*{position:absolute;top:0;right:0;bottom:0;left:0;display:none;justify-content:center;align-items:center;color:rgba(255,255,255,.7);will-change:transform,opacity}.uk-lightbox-items>*>*{max-width:100vw;max-height:100vh}.uk-lightbox-items>*>:not(iframe){width:auto;height:auto}.uk-lightbox-items>.uk-active{display:flex}.uk-lightbox-toolbar{padding:10px 10px;background:rgba(0,0,0,.3);color:rgba(255,255,255,.7)}.uk-lightbox-toolbar *{color:rgba(255,255,255,.7)}.uk-lightbox-toolbar-icon{padding:5px;color:rgba(255,255,255,.7)}.uk-lightbox-toolbar-icon:hover{color:#fff}.uk-lightbox-button{box-sizing:border-box;width:50px;height:50px;background:rgba(0,0,0,.3);color:rgba(255,255,255,.7);display:inline-flex;justify-content:center;align-items:center}.uk-lightbox-button:hover{color:#fff}.uk-lightbox-iframe{width:80%;height:80%}.uk-slideshow{-webkit-tap-highlight-color:transparent}.uk-slideshow-items{position:relative;z-index:0;margin:0;padding:0;list-style:none;overflow:hidden;-webkit-touch-callout:none}.uk-slideshow-items>*{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;will-change:transform,opacity}.uk-slideshow-items>:not(.uk-active){display:none}.uk-slider{-webkit-tap-highlight-color:transparent}.uk-slider-container{overflow:hidden}.uk-slider-items{will-change:transform}.uk-slider-items:not(.uk-grid){display:flex;margin:0;padding:0;list-style:none;-webkit-touch-callout:none}.uk-slider-items.uk-grid{flex-wrap:nowrap}.uk-slider-items>*{flex:none;position:relative}.uk-sticky-fixed{z-index:980;box-sizing:border-box;margin:0!important;-webkit-backface-visibility:hidden;backface-visibility:hidden}.uk-sticky[class*=uk-animation-]{animation-duration:.2s}.uk-sticky.uk-animation-reverse{animation-duration:.2s}.uk-offcanvas{display:none;position:fixed;top:0;bottom:0;left:0;z-index:1000}.uk-offcanvas-flip .uk-offcanvas{right:0;left:auto}.uk-offcanvas-bar{position:absolute;top:0;bottom:0;left:0;box-sizing:border-box;width:270px;padding:20px 20px;background:#222;overflow-y:auto;-webkit-overflow-scrolling:touch;transform:translateX(-100%)}@media (min-width:960px){.uk-offcanvas-bar{width:350px;padding:40px 40px}}.uk-offcanvas-flip .uk-offcanvas-bar{left:auto;right:0;transform:translateX(100%)}.uk-open>.uk-offcanvas-bar{transform:translateX(0)}.uk-offcanvas-bar-animation{transition:transform .3s ease-out}.uk-offcanvas-reveal{position:absolute;top:0;bottom:0;left:0;width:0;overflow:hidden;transition:width .3s ease-out}.uk-offcanvas-reveal .uk-offcanvas-bar{transform:translateX(0)}.uk-open>.uk-offcanvas-reveal{width:270px}@media (min-width:960px){.uk-open>.uk-offcanvas-reveal{width:350px}}.uk-offcanvas-flip .uk-offcanvas-reveal{right:0;left:auto}.uk-offcanvas-close{position:absolute;z-index:1000;top:20px;right:20px;padding:5px}.uk-offcanvas-overlay{width:100vw;touch-action:none}.uk-offcanvas-overlay::before{content:\"\";position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.1);opacity:0;transition:opacity .15s linear}.uk-offcanvas-overlay.uk-open::before{opacity:1}.uk-offcanvas-container,.uk-offcanvas-page{overflow-x:hidden}.uk-offcanvas-container-overlay{overflow:hidden}.uk-offcanvas-container .uk-offcanvas-content{position:relative;left:0;transition:left .3s ease-out;-webkit-overflow-scrolling:touch}.uk-offcanvas-overlay .uk-offcanvas-content{overflow-y:hidden}:not(.uk-offcanvas-flip)>.uk-offcanvas-content-animation{left:270px}.uk-offcanvas-flip>.uk-offcanvas-content-animation{left:-270px}@media (min-width:960px){:not(.uk-offcanvas-flip)>.uk-offcanvas-content-animation{left:350px}.uk-offcanvas-flip>.uk-offcanvas-content-animation{left:-350px}}.uk-switcher{margin:0;padding:0;list-style:none}.uk-switcher>:not(.uk-active){display:none}.uk-switcher>*>:last-child{margin-bottom:0}.uk-iconnav{display:flex;flex-wrap:wrap;margin:0;padding:0;list-style:none;margin-left:-10px}.uk-iconnav>*{flex:none;padding-left:10px}.uk-iconnav>*>*{display:block;color:#999}.uk-iconnav>*>:focus,.uk-iconnav>*>:hover{color:#666;outline:0}.uk-iconnav>.uk-active>*{color:#666}.uk-iconnav-vertical{flex-direction:column;margin-left:0;margin-top:-10px}.uk-iconnav-vertical>*{padding-left:0;padding-top:10px}.uk-notification{position:fixed;top:10px;left:10px;z-index:1040;box-sizing:border-box;width:350px}.uk-notification-bottom-right,.uk-notification-top-right{left:auto;right:10px}.uk-notification-bottom-center,.uk-notification-top-center{left:50%;margin-left:-175px}.uk-notification-bottom-center,.uk-notification-bottom-left,.uk-notification-bottom-right{top:auto;bottom:10px}@media (max-width:639px){.uk-notification{left:10px;right:10px;width:auto;margin:0}}.uk-notification-message{position:relative;margin-bottom:10px;padding:15px;background:#f8f8f8;color:#666;font-size:1.25rem;line-height:1.4;cursor:pointer}.uk-notification-close{display:none;position:absolute;top:20px;right:15px}.uk-notification-message:hover .uk-notification-close{display:block}.uk-notification-message-primary{color:#1e87f0}.uk-notification-message-success{color:#32d296}.uk-notification-message-warning{color:#faa05a}.uk-notification-message-danger{color:#f0506e}.uk-tooltip{display:none;position:absolute;z-index:1030;box-sizing:border-box;max-width:200px;padding:3px 6px;background:#666;border-radius:2px;color:#fff;font-size:12px}.uk-tooltip.uk-active{display:block}[class*=uk-tooltip-top]{margin-top:-10px}[class*=uk-tooltip-bottom]{margin-top:10px}[class*=uk-tooltip-left]{margin-left:-10px}[class*=uk-tooltip-right]{margin-left:10px}.uk-placeholder{margin-bottom:20px;padding:30px 30px;background:0 0;border:1px dashed #e5e5e5}*+.uk-placeholder{margin-top:20px}.uk-placeholder>:last-child{margin-bottom:0}.uk-progress{-webkit-appearance:none;-moz-appearance:none;display:block;width:100%;border:0;background-color:#f8f8f8;margin-bottom:20px;height:15px;border-radius:500px;overflow:hidden}*+.uk-progress{margin-top:20px}.uk-progress:indeterminate{color:transparent}.uk-progress::-webkit-progress-bar{background-color:#f8f8f8;border-radius:500px;overflow:hidden}.uk-progress:indeterminate::-moz-progress-bar{width:0}.uk-progress::-webkit-progress-value{background-color:#1e87f0;transition:width .6s ease}.uk-progress::-moz-progress-bar{background-color:#1e87f0}.uk-progress::-ms-fill{background-color:#1e87f0;transition:width .6s ease;border:0}.uk-sortable{position:relative}.uk-sortable>*{touch-action:none}.uk-sortable svg{pointer-events:none}.uk-sortable>:last-child{margin-bottom:0}.uk-sortable-drag{position:absolute!important;z-index:1050!important;pointer-events:none}.uk-sortable-placeholder{opacity:0}.uk-sortable-empty{min-height:50px}.uk-sortable-handle:hover{cursor:move}.uk-countdown-number,.uk-countdown-separator{line-height:70px}.uk-countdown-number{font-size:2rem}@media (min-width:640px){.uk-countdown-number{font-size:4rem}}@media (min-width:960px){.uk-countdown-number{font-size:6rem}}.uk-countdown-separator{font-size:1rem}@media (min-width:640px){.uk-countdown-separator{font-size:2rem}}@media (min-width:960px){.uk-countdown-separator{font-size:3rem}}[class*=uk-animation-]{animation-duration:.5s;animation-timing-function:ease-out;animation-fill-mode:both}.uk-animation-reverse{animation-direction:reverse;animation-timing-function:ease-in}.uk-animation-fade{animation-name:uk-fade;animation-duration:.8s;animation-timing-function:linear}.uk-animation-scale-up{animation-name:uk-fade-scale-02}.uk-animation-scale-down{animation-name:uk-fade-scale-18}.uk-animation-slide-top{animation-name:uk-fade-top}.uk-animation-slide-bottom{animation-name:uk-fade-bottom}.uk-animation-slide-left{animation-name:uk-fade-left}.uk-animation-slide-right{animation-name:uk-fade-right}.uk-animation-slide-top-small{animation-name:uk-fade-top-small}.uk-animation-slide-bottom-small{animation-name:uk-fade-bottom-small}.uk-animation-slide-left-small{animation-name:uk-fade-left-small}.uk-animation-slide-right-small{animation-name:uk-fade-right-small}.uk-animation-slide-top-medium{animation-name:uk-fade-top-medium}.uk-animation-slide-bottom-medium{animation-name:uk-fade-bottom-medium}.uk-animation-slide-left-medium{animation-name:uk-fade-left-medium}.uk-animation-slide-right-medium{animation-name:uk-fade-right-medium}.uk-animation-kenburns{animation-name:uk-scale-kenburns;animation-duration:15s}.uk-animation-shake{animation-name:uk-shake}.uk-animation-fast{animation-duration:.1s}.uk-animation-toggle:not(:hover):not(.uk-hover) [class*=uk-animation-]{animation-name:none}@keyframes uk-fade{0%{opacity:0}100%{opacity:1}}@keyframes uk-fade-top{0%{opacity:0;transform:translateY(-100%)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom{0%{opacity:0;transform:translateY(100%)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left{0%{opacity:0;transform:translateX(-100%)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right{0%{opacity:0;transform:translateX(100%)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-top-small{0%{opacity:0;transform:translateY(-10px)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom-small{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left-small{0%{opacity:0;transform:translateX(-10px)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right-small{0%{opacity:0;transform:translateX(10px)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-top-medium{0%{opacity:0;transform:translateY(-50px)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-bottom-medium{0%{opacity:0;transform:translateY(50px)}100%{opacity:1;transform:translateY(0)}}@keyframes uk-fade-left-medium{0%{opacity:0;transform:translateX(-50px)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-right-medium{0%{opacity:0;transform:translateX(50px)}100%{opacity:1;transform:translateX(0)}}@keyframes uk-fade-scale-02{0%{opacity:0;transform:scale(.2)}100%{opacity:1;transform:scale(1)}}@keyframes uk-fade-scale-18{0%{opacity:0;transform:scale(1.8)}100%{opacity:1;transform:scale(1)}}@keyframes uk-scale-kenburns{0%{transform:scale(1)}100%{transform:scale(1.2)}}@keyframes uk-shake{0%,100%{transform:translateX(0)}10%{transform:translateX(-9px)}20%{transform:translateX(8px)}30%{transform:translateX(-7px)}40%{transform:translateX(6px)}50%{transform:translateX(-5px)}60%{transform:translateX(4px)}70%{transform:translateX(-3px)}80%{transform:translateX(2px)}90%{transform:translateX(-1px)}}[class*=uk-child-width]>*{box-sizing:border-box;width:100%}.uk-child-width-1-2>*{width:50%}.uk-child-width-1-3>*{width:calc(100% * 1 / 3.001)}.uk-child-width-1-4>*{width:25%}.uk-child-width-1-5>*{width:20%}.uk-child-width-1-6>*{width:calc(100% * 1 / 6.001)}.uk-child-width-auto>*{width:auto}.uk-child-width-expand>*{width:1px}.uk-child-width-expand>:not([class*=uk-width]){flex:1;min-width:0;flex-basis:1px}@media (min-width:640px){.uk-child-width-1-1\\@s>*{width:100%}.uk-child-width-1-2\\@s>*{width:50%}.uk-child-width-1-3\\@s>*{width:calc(100% * 1 / 3.001)}.uk-child-width-1-4\\@s>*{width:25%}.uk-child-width-1-5\\@s>*{width:20%}.uk-child-width-1-6\\@s>*{width:calc(100% * 1 / 6.001)}.uk-child-width-auto\\@s>*{width:auto}.uk-child-width-expand\\@s>*{width:1px}.uk-child-width-expand\\@s>:not([class*=uk-width]){flex:1;min-width:0;flex-basis:1px}}@media (min-width:960px){.uk-child-width-1-1\\@m>*{width:100%}.uk-child-width-1-2\\@m>*{width:50%}.uk-child-width-1-3\\@m>*{width:calc(100% * 1 / 3.001)}.uk-child-width-1-4\\@m>*{width:25%}.uk-child-width-1-5\\@m>*{width:20%}.uk-child-width-1-6\\@m>*{width:calc(100% * 1 / 6.001)}.uk-child-width-auto\\@m>*{width:auto}.uk-child-width-expand\\@m>*{width:1px}.uk-child-width-expand\\@m>:not([class*=uk-width]){flex:1;min-width:0;flex-basis:1px}}@media (min-width:1200px){.uk-child-width-1-1\\@l>*{width:100%}.uk-child-width-1-2\\@l>*{width:50%}.uk-child-width-1-3\\@l>*{width:calc(100% * 1 / 3.001)}.uk-child-width-1-4\\@l>*{width:25%}.uk-child-width-1-5\\@l>*{width:20%}.uk-child-width-1-6\\@l>*{width:calc(100% * 1 / 6.001)}.uk-child-width-auto\\@l>*{width:auto}.uk-child-width-expand\\@l>*{width:1px}.uk-child-width-expand\\@l>:not([class*=uk-width]){flex:1;min-width:0;flex-basis:1px}}@media (min-width:1600px){.uk-child-width-1-1\\@xl>*{width:100%}.uk-child-width-1-2\\@xl>*{width:50%}.uk-child-width-1-3\\@xl>*{width:calc(100% * 1 / 3.001)}.uk-child-width-1-4\\@xl>*{width:25%}.uk-child-width-1-5\\@xl>*{width:20%}.uk-child-width-1-6\\@xl>*{width:calc(100% * 1 / 6.001)}.uk-child-width-auto\\@xl>*{width:auto}.uk-child-width-expand\\@xl>*{width:1px}.uk-child-width-expand\\@xl>:not([class*=uk-width]){flex:1;min-width:0;flex-basis:1px}}[class*=uk-width]{box-sizing:border-box;width:100%;max-width:100%}.uk-width-1-2{width:50%}.uk-width-1-3{width:calc(100% * 1 / 3.001)}.uk-width-2-3{width:calc(100% * 2 / 3.001)}.uk-width-1-4{width:25%}.uk-width-3-4{width:75%}.uk-width-1-5{width:20%}.uk-width-2-5{width:40%}.uk-width-3-5{width:60%}.uk-width-4-5{width:80%}.uk-width-1-6{width:calc(100% * 1 / 6.001)}.uk-width-5-6{width:calc(100% * 5 / 6.001)}.uk-width-small{width:150px}.uk-width-medium{width:300px}.uk-width-large{width:450px}.uk-width-xlarge{width:600px}.uk-width-xxlarge{width:750px}.uk-width-auto{width:auto}.uk-width-expand{width:1px;flex:1;min-width:0;flex-basis:1px}@media (min-width:640px){.uk-width-1-1\\@s{width:100%}.uk-width-1-2\\@s{width:50%}.uk-width-1-3\\@s{width:calc(100% * 1 / 3.001)}.uk-width-2-3\\@s{width:calc(100% * 2 / 3.001)}.uk-width-1-4\\@s{width:25%}.uk-width-3-4\\@s{width:75%}.uk-width-1-5\\@s{width:20%}.uk-width-2-5\\@s{width:40%}.uk-width-3-5\\@s{width:60%}.uk-width-4-5\\@s{width:80%}.uk-width-1-6\\@s{width:calc(100% * 1 / 6.001)}.uk-width-5-6\\@s{width:calc(100% * 5 / 6.001)}.uk-width-small\\@s{width:150px}.uk-width-medium\\@s{width:300px}.uk-width-large\\@s{width:450px}.uk-width-xlarge\\@s{width:600px}.uk-width-xxlarge\\@s{width:750px}.uk-width-auto\\@s{width:auto}.uk-width-expand\\@s{width:1px;flex:1;min-width:0;flex-basis:1px}}@media (min-width:960px){.uk-width-1-1\\@m{width:100%}.uk-width-1-2\\@m{width:50%}.uk-width-1-3\\@m{width:calc(100% * 1 / 3.001)}.uk-width-2-3\\@m{width:calc(100% * 2 / 3.001)}.uk-width-1-4\\@m{width:25%}.uk-width-3-4\\@m{width:75%}.uk-width-1-5\\@m{width:20%}.uk-width-2-5\\@m{width:40%}.uk-width-3-5\\@m{width:60%}.uk-width-4-5\\@m{width:80%}.uk-width-1-6\\@m{width:calc(100% * 1 / 6.001)}.uk-width-5-6\\@m{width:calc(100% * 5 / 6.001)}.uk-width-small\\@m{width:150px}.uk-width-medium\\@m{width:300px}.uk-width-large\\@m{width:450px}.uk-width-xlarge\\@m{width:600px}.uk-width-xxlarge\\@m{width:750px}.uk-width-auto\\@m{width:auto}.uk-width-expand\\@m{width:1px;flex:1;min-width:0;flex-basis:1px}}@media (min-width:1200px){.uk-width-1-1\\@l{width:100%}.uk-width-1-2\\@l{width:50%}.uk-width-1-3\\@l{width:calc(100% * 1 / 3.001)}.uk-width-2-3\\@l{width:calc(100% * 2 / 3.001)}.uk-width-1-4\\@l{width:25%}.uk-width-3-4\\@l{width:75%}.uk-width-1-5\\@l{width:20%}.uk-width-2-5\\@l{width:40%}.uk-width-3-5\\@l{width:60%}.uk-width-4-5\\@l{width:80%}.uk-width-1-6\\@l{width:calc(100% * 1 / 6.001)}.uk-width-5-6\\@l{width:calc(100% * 5 / 6.001)}.uk-width-small\\@l{width:150px}.uk-width-medium\\@l{width:300px}.uk-width-large\\@l{width:450px}.uk-width-xlarge\\@l{width:600px}.uk-width-xxlarge\\@l{width:750px}.uk-width-auto\\@l{width:auto}.uk-width-expand\\@l{width:1px;flex:1;min-width:0;flex-basis:1px}}@media (min-width:1600px){.uk-width-1-1\\@xl{width:100%}.uk-width-1-2\\@xl{width:50%}.uk-width-1-3\\@xl{width:calc(100% * 1 / 3.001)}.uk-width-2-3\\@xl{width:calc(100% * 2 / 3.001)}.uk-width-1-4\\@xl{width:25%}.uk-width-3-4\\@xl{width:75%}.uk-width-1-5\\@xl{width:20%}.uk-width-2-5\\@xl{width:40%}.uk-width-3-5\\@xl{width:60%}.uk-width-4-5\\@xl{width:80%}.uk-width-1-6\\@xl{width:calc(100% * 1 / 6.001)}.uk-width-5-6\\@xl{width:calc(100% * 5 / 6.001)}.uk-width-small\\@xl{width:150px}.uk-width-medium\\@xl{width:300px}.uk-width-large\\@xl{width:450px}.uk-width-xlarge\\@xl{width:600px}.uk-width-xxlarge\\@xl{width:750px}.uk-width-auto\\@xl{width:auto}.uk-width-expand\\@xl{width:1px;flex:1;min-width:0;flex-basis:1px}}.uk-text-lead{font-size:1.5rem;line-height:1.5;color:#333}.uk-text-meta{font-size:.875rem;line-height:1.4;color:#999}.uk-text-meta a{color:#999}.uk-text-meta a:hover{color:#666;text-decoration:none}.uk-text-small{font-size:.875rem;line-height:1.5}.uk-text-large{font-size:1.5rem;line-height:1.5}.uk-text-bold{font-weight:bolder}.uk-text-uppercase{text-transform:uppercase!important}.uk-text-capitalize{text-transform:capitalize!important}.uk-text-lowercase{text-transform:lowercase!important}.uk-text-muted{color:#999!important}.uk-text-primary{color:#1e87f0!important}.uk-text-success{color:#32d296!important}.uk-text-warning{color:#faa05a!important}.uk-text-danger{color:#f0506e!important}.uk-text-background{-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;color:#1e87f0!important}@supports (-webkit-background-clip:text){.uk-text-background{background-color:#1e87f0}}.uk-text-left{text-align:left!important}.uk-text-right{text-align:right!important}.uk-text-center{text-align:center!important}.uk-text-justify{text-align:justify!important}@media (min-width:640px){.uk-text-left\\@s{text-align:left!important}.uk-text-right\\@s{text-align:right!important}.uk-text-center\\@s{text-align:center!important}}@media (min-width:960px){.uk-text-left\\@m{text-align:left!important}.uk-text-right\\@m{text-align:right!important}.uk-text-center\\@m{text-align:center!important}}@media (min-width:1200px){.uk-text-left\\@l{text-align:left!important}.uk-text-right\\@l{text-align:right!important}.uk-text-center\\@l{text-align:center!important}}@media (min-width:1600px){.uk-text-left\\@xl{text-align:left!important}.uk-text-right\\@xl{text-align:right!important}.uk-text-center\\@xl{text-align:center!important}}.uk-text-top{vertical-align:top!important}.uk-text-middle{vertical-align:middle!important}.uk-text-bottom{vertical-align:bottom!important}.uk-text-baseline{vertical-align:baseline!important}.uk-text-nowrap{white-space:nowrap}.uk-text-truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}td.uk-text-truncate,th.uk-text-truncate{max-width:0}.uk-text-break{overflow-wrap:break-word;word-wrap:break-word;-ms-hyphens:auto;-webkit-hyphens:auto;hyphens:auto}td.uk-text-break,th.uk-text-break{word-break:break-all}[class*=uk-column-]{column-gap:30px}@media (min-width:1200px){[class*=uk-column-]{column-gap:40px}}[class*=uk-column-] img{transform:translate3d(0,0,0)}.uk-column-divider{column-rule:1px solid #e5e5e5;column-gap:60px}@media (min-width:1200px){.uk-column-divider{column-gap:80px}}.uk-column-1-2{column-count:2}.uk-column-1-3{column-count:3}.uk-column-1-4{column-count:4}.uk-column-1-5{column-count:5}.uk-column-1-6{column-count:6}@media (min-width:640px){.uk-column-1-2\\@s{column-count:2}.uk-column-1-3\\@s{column-count:3}.uk-column-1-4\\@s{column-count:4}.uk-column-1-5\\@s{column-count:5}.uk-column-1-6\\@s{column-count:6}}@media (min-width:960px){.uk-column-1-2\\@m{column-count:2}.uk-column-1-3\\@m{column-count:3}.uk-column-1-4\\@m{column-count:4}.uk-column-1-5\\@m{column-count:5}.uk-column-1-6\\@m{column-count:6}}@media (min-width:1200px){.uk-column-1-2\\@l{column-count:2}.uk-column-1-3\\@l{column-count:3}.uk-column-1-4\\@l{column-count:4}.uk-column-1-5\\@l{column-count:5}.uk-column-1-6\\@l{column-count:6}}@media (min-width:1600px){.uk-column-1-2\\@xl{column-count:2}.uk-column-1-3\\@xl{column-count:3}.uk-column-1-4\\@xl{column-count:4}.uk-column-1-5\\@xl{column-count:5}.uk-column-1-6\\@xl{column-count:6}}.uk-column-span{column-span:all}.uk-cover{max-width:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}iframe.uk-cover{pointer-events:none}.uk-cover-container{overflow:hidden;position:relative}.uk-background-default{background-color:#fff}.uk-background-muted{background-color:#f8f8f8}.uk-background-primary{background-color:#1e87f0}.uk-background-secondary{background-color:#222}.uk-background-contain,.uk-background-cover{background-position:50% 50%;background-repeat:no-repeat}.uk-background-cover{background-size:cover}.uk-background-contain{background-size:contain}.uk-background-top-left{background-position:0 0}.uk-background-top-center{background-position:50% 0}.uk-background-top-right{background-position:100% 0}.uk-background-center-left{background-position:0 50%}.uk-background-center-center{background-position:50% 50%}.uk-background-center-right{background-position:100% 50%}.uk-background-bottom-left{background-position:0 100%}.uk-background-bottom-center{background-position:50% 100%}.uk-background-bottom-right{background-position:100% 100%}.uk-background-norepeat{background-repeat:no-repeat}.uk-background-fixed{background-attachment:fixed}@media (pointer:coarse){.uk-background-fixed{background-attachment:scroll}}@media (max-width:639px){.uk-background-image\\@s{background-image:none!important}}@media (max-width:959px){.uk-background-image\\@m{background-image:none!important}}@media (max-width:1199px){.uk-background-image\\@l{background-image:none!important}}@media (max-width:1599px){.uk-background-image\\@xl{background-image:none!important}}.uk-background-blend-multiply{background-blend-mode:multiply}.uk-background-blend-screen{background-blend-mode:screen}.uk-background-blend-overlay{background-blend-mode:overlay}.uk-background-blend-darken{background-blend-mode:darken}.uk-background-blend-lighten{background-blend-mode:lighten}.uk-background-blend-color-dodge{background-blend-mode:color-dodge}.uk-background-blend-color-burn{background-blend-mode:color-burn}.uk-background-blend-hard-light{background-blend-mode:hard-light}.uk-background-blend-soft-light{background-blend-mode:soft-light}.uk-background-blend-difference{background-blend-mode:difference}.uk-background-blend-exclusion{background-blend-mode:exclusion}.uk-background-blend-hue{background-blend-mode:hue}.uk-background-blend-saturation{background-blend-mode:saturation}.uk-background-blend-color{background-blend-mode:color}.uk-background-blend-luminosity{background-blend-mode:luminosity}[class*=uk-align]{display:block;margin-bottom:30px}*+[class*=uk-align]{margin-top:30px}.uk-align-center{margin-left:auto;margin-right:auto}.uk-align-left{margin-top:0;margin-right:30px;float:left}.uk-align-right{margin-top:0;margin-left:30px;float:right}@media (min-width:640px){.uk-align-left\\@s{margin-top:0;margin-right:30px;float:left}.uk-align-right\\@s{margin-top:0;margin-left:30px;float:right}}@media (min-width:960px){.uk-align-left\\@m{margin-top:0;margin-right:30px;float:left}.uk-align-right\\@m{margin-top:0;margin-left:30px;float:right}}@media (min-width:1200px){.uk-align-left\\@l{margin-top:0;float:left}.uk-align-right\\@l{margin-top:0;float:right}.uk-align-left,.uk-align-left\\@l,.uk-align-left\\@m,.uk-align-left\\@s{margin-right:40px}.uk-align-right,.uk-align-right\\@l,.uk-align-right\\@m,.uk-align-right\\@s{margin-left:40px}}@media (min-width:1600px){.uk-align-left\\@xl{margin-top:0;margin-right:40px;float:left}.uk-align-right\\@xl{margin-top:0;margin-left:40px;float:right}}.uk-panel{position:relative;box-sizing:border-box}.uk-panel::after,.uk-panel::before{content:\"\";display:table}.uk-panel::after{clear:both}.uk-panel>:last-child{margin-bottom:0}.uk-panel-scrollable{height:170px;padding:10px;border:1px solid #e5e5e5;overflow:auto;-webkit-overflow-scrolling:touch;resize:both}.uk-clearfix::before{content:\"\";display:table-cell}.uk-clearfix::after{content:\"\";display:table;clear:both}.uk-float-left{float:left}.uk-float-right{float:right}[class*=uk-float-]{max-width:100%}.uk-overflow-hidden{overflow:hidden}.uk-overflow-auto{overflow:auto;-webkit-overflow-scrolling:touch}.uk-overflow-auto>:last-child{margin-bottom:0}.uk-resize{resize:both}.uk-resize-vertical{resize:vertical}.uk-display-block{display:block!important}.uk-display-inline{display:inline!important}.uk-display-inline-block{display:inline-block!important}[class*=uk-inline]{display:inline-block;position:relative;max-width:100%;vertical-align:middle;-webkit-backface-visibility:hidden}.uk-inline-clip{overflow:hidden}[class*=uk-height]{box-sizing:border-box}.uk-height-1-1{height:100%}.uk-height-viewport{min-height:100vh}.uk-height-small{height:150px}.uk-height-medium{height:300px}.uk-height-large{height:450px}.uk-height-max-small{max-height:150px}.uk-height-max-medium{max-height:300px}.uk-height-max-large{max-height:450px}.uk-preserve-width,.uk-preserve-width audio,.uk-preserve-width canvas,.uk-preserve-width img,.uk-preserve-width svg,.uk-preserve-width video{max-width:none}.uk-responsive-height,.uk-responsive-width{box-sizing:border-box}.uk-responsive-width{max-width:100%!important;height:auto}.uk-responsive-height{max-height:100%;width:auto;max-width:none}.uk-border-circle{border-radius:50%}.uk-border-rounded{border-radius:5px}.uk-inline-clip[class*=uk-border-]{-webkit-transform:translateZ(0)}.uk-box-shadow-small{box-shadow:0 2px 8px rgba(0,0,0,.08)}.uk-box-shadow-medium{box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-box-shadow-large{box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-box-shadow-xlarge{box-shadow:0 28px 50px rgba(0,0,0,.16)}[class*=uk-box-shadow-hover]{transition:box-shadow .1s ease-in-out}.uk-box-shadow-hover-small:hover{box-shadow:0 2px 8px rgba(0,0,0,.08)}.uk-box-shadow-hover-medium:hover{box-shadow:0 5px 15px rgba(0,0,0,.08)}.uk-box-shadow-hover-large:hover{box-shadow:0 14px 25px rgba(0,0,0,.16)}.uk-box-shadow-hover-xlarge:hover{box-shadow:0 28px 50px rgba(0,0,0,.16)}@supports (filter:blur(0)){.uk-box-shadow-bottom{display:inline-block;position:relative;max-width:100%;vertical-align:middle}.uk-box-shadow-bottom::before{content:'';position:absolute;bottom:-30px;left:0;right:0;height:30px;border-radius:100%;background:#444;filter:blur(20px)}.uk-box-shadow-bottom>*{position:relative}}.uk-dropcap::first-letter,.uk-dropcap>p:first-of-type::first-letter{display:block;margin-right:10px;float:left;font-size:4.5em;line-height:1;margin-bottom:-2px}.uk-leader{overflow:hidden}.uk-leader-fill::after{display:inline-block;margin-left:15px;width:0;content:attr(data-fill);white-space:nowrap}.uk-leader-fill.uk-leader-hide::after{display:none}.var-leader-fill:before{content:'.'}.uk-logo{font-size:1.5rem;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;color:#666;text-decoration:none}.uk-logo:focus,.uk-logo:hover{color:#666;outline:0;text-decoration:none}.uk-logo-inverse{display:none}.uk-svg,.uk-svg:not(.uk-preserve) [FILL*='#']:not(.uk-preserve),.uk-svg:not(.uk-preserve) [fill*='#']:not(.uk-preserve){fill:currentcolor}.uk-svg:not(.uk-preserve) [STROKE*='#']:not(.uk-preserve),.uk-svg:not(.uk-preserve) [stroke*='#']:not(.uk-preserve){stroke:currentcolor}.uk-svg{transform:translate(0,0)}.uk-disabled{pointer-events:none}.uk-drag,.uk-drag *{cursor:move}.uk-drag iframe{pointer-events:none}.uk-dragover{box-shadow:0 0 20px rgba(100,100,100,.3)}.uk-blend-multiply{mix-blend-mode:multiply}.uk-blend-screen{mix-blend-mode:screen}.uk-blend-overlay{mix-blend-mode:overlay}.uk-blend-darken{mix-blend-mode:darken}.uk-blend-lighten{mix-blend-mode:lighten}.uk-blend-color-dodge{mix-blend-mode:color-dodge}.uk-blend-color-burn{mix-blend-mode:color-burn}.uk-blend-hard-light{mix-blend-mode:hard-light}.uk-blend-soft-light{mix-blend-mode:soft-light}.uk-blend-difference{mix-blend-mode:difference}.uk-blend-exclusion{mix-blend-mode:exclusion}.uk-blend-hue{mix-blend-mode:hue}.uk-blend-saturation{mix-blend-mode:saturation}.uk-blend-color{mix-blend-mode:color}.uk-blend-luminosity{mix-blend-mode:luminosity}.uk-transform-center{transform:translate(-50%,-50%)}.uk-transform-origin-top-left{transform-origin:0 0}.uk-transform-origin-top-center{transform-origin:50% 0}.uk-transform-origin-top-right{transform-origin:100% 0}.uk-transform-origin-center-left{transform-origin:0 50%}.uk-transform-origin-center-right{transform-origin:100% 50%}.uk-transform-origin-bottom-left{transform-origin:0 100%}.uk-transform-origin-bottom-center{transform-origin:50% 100%}.uk-transform-origin-bottom-right{transform-origin:100% 100%}.uk-flex{display:flex}.uk-flex-inline{display:inline-flex}.uk-flex-inline::after,.uk-flex-inline::before,.uk-flex::after,.uk-flex::before{display:none}.uk-flex-left{justify-content:flex-start}.uk-flex-center{justify-content:center}.uk-flex-right{justify-content:flex-end}.uk-flex-between{justify-content:space-between}.uk-flex-around{justify-content:space-around}@media (min-width:640px){.uk-flex-left\\@s{justify-content:flex-start}.uk-flex-center\\@s{justify-content:center}.uk-flex-right\\@s{justify-content:flex-end}.uk-flex-between\\@s{justify-content:space-between}.uk-flex-around\\@s{justify-content:space-around}}@media (min-width:960px){.uk-flex-left\\@m{justify-content:flex-start}.uk-flex-center\\@m{justify-content:center}.uk-flex-right\\@m{justify-content:flex-end}.uk-flex-between\\@m{justify-content:space-between}.uk-flex-around\\@m{justify-content:space-around}}@media (min-width:1200px){.uk-flex-left\\@l{justify-content:flex-start}.uk-flex-center\\@l{justify-content:center}.uk-flex-right\\@l{justify-content:flex-end}.uk-flex-between\\@l{justify-content:space-between}.uk-flex-around\\@l{justify-content:space-around}}@media (min-width:1600px){.uk-flex-left\\@xl{justify-content:flex-start}.uk-flex-center\\@xl{justify-content:center}.uk-flex-right\\@xl{justify-content:flex-end}.uk-flex-between\\@xl{justify-content:space-between}.uk-flex-around\\@xl{justify-content:space-around}}.uk-flex-stretch{align-items:stretch}.uk-flex-top{align-items:flex-start}.uk-flex-middle{align-items:center}.uk-flex-bottom{align-items:flex-end}.uk-flex-row{flex-direction:row}.uk-flex-row-reverse{flex-direction:row-reverse}.uk-flex-column{flex-direction:column}.uk-flex-column-reverse{flex-direction:column-reverse}.uk-flex-nowrap{flex-wrap:nowrap}.uk-flex-wrap{flex-wrap:wrap}.uk-flex-wrap-reverse{flex-wrap:wrap-reverse}.uk-flex-wrap-stretch{align-content:stretch}.uk-flex-wrap-top{align-content:flex-start}.uk-flex-wrap-middle{align-content:center}.uk-flex-wrap-bottom{align-content:flex-end}.uk-flex-wrap-between{align-content:space-between}.uk-flex-wrap-around{align-content:space-around}.uk-flex-first{order:-1}.uk-flex-last{order:99}@media (min-width:640px){.uk-flex-first\\@s{order:-1}.uk-flex-last\\@s{order:99}}@media (min-width:960px){.uk-flex-first\\@m{order:-1}.uk-flex-last\\@m{order:99}}@media (min-width:1200px){.uk-flex-first\\@l{order:-1}.uk-flex-last\\@l{order:99}}@media (min-width:1600px){.uk-flex-first\\@xl{order:-1}.uk-flex-last\\@xl{order:99}}.uk-flex-none{flex:none}.uk-flex-auto{flex:auto}.uk-flex-1{flex:1}.uk-margin{margin-bottom:20px}*+.uk-margin{margin-top:20px!important}.uk-margin-top{margin-top:20px!important}.uk-margin-bottom{margin-bottom:20px!important}.uk-margin-left{margin-left:20px!important}.uk-margin-right{margin-right:20px!important}.uk-margin-small{margin-bottom:10px}*+.uk-margin-small{margin-top:10px!important}.uk-margin-small-top{margin-top:10px!important}.uk-margin-small-bottom{margin-bottom:10px!important}.uk-margin-small-left{margin-left:10px!important}.uk-margin-small-right{margin-right:10px!important}.uk-margin-medium{margin-bottom:40px}*+.uk-margin-medium{margin-top:40px!important}.uk-margin-medium-top{margin-top:40px!important}.uk-margin-medium-bottom{margin-bottom:40px!important}.uk-margin-medium-left{margin-left:40px!important}.uk-margin-medium-right{margin-right:40px!important}.uk-margin-large{margin-bottom:40px}*+.uk-margin-large{margin-top:40px!important}.uk-margin-large-top{margin-top:40px!important}.uk-margin-large-bottom{margin-bottom:40px!important}.uk-margin-large-left{margin-left:40px!important}.uk-margin-large-right{margin-right:40px!important}@media (min-width:1200px){.uk-margin-large{margin-bottom:70px}*+.uk-margin-large{margin-top:70px!important}.uk-margin-large-top{margin-top:70px!important}.uk-margin-large-bottom{margin-bottom:70px!important}.uk-margin-large-left{margin-left:70px!important}.uk-margin-large-right{margin-right:70px!important}}.uk-margin-xlarge{margin-bottom:70px}*+.uk-margin-xlarge{margin-top:70px!important}.uk-margin-xlarge-top{margin-top:70px!important}.uk-margin-xlarge-bottom{margin-bottom:70px!important}.uk-margin-xlarge-left{margin-left:70px!important}.uk-margin-xlarge-right{margin-right:70px!important}@media (min-width:1200px){.uk-margin-xlarge{margin-bottom:140px}*+.uk-margin-xlarge{margin-top:140px!important}.uk-margin-xlarge-top{margin-top:140px!important}.uk-margin-xlarge-bottom{margin-bottom:140px!important}.uk-margin-xlarge-left{margin-left:140px!important}.uk-margin-xlarge-right{margin-right:140px!important}}.uk-margin-remove{margin:0!important}.uk-margin-remove-top{margin-top:0!important}.uk-margin-remove-bottom{margin-bottom:0!important}.uk-margin-remove-left{margin-left:0!important}.uk-margin-remove-right{margin-right:0!important}.uk-margin-remove-vertical{margin-top:0!important;margin-bottom:0!important}.uk-margin-remove-adjacent+*{margin-top:0!important}.uk-margin-auto{margin-left:auto!important;margin-right:auto!important}.uk-margin-auto-top{margin-top:auto!important}.uk-margin-auto-bottom{margin-bottom:auto!important}.uk-margin-auto-left{margin-left:auto!important}.uk-margin-auto-right{margin-right:auto!important}.uk-margin-auto-vertical{margin-top:auto!important;margin-bottom:auto!important}.uk-padding{padding:30px}@media (min-width:1200px){.uk-padding{padding:40px}}.uk-padding-small{padding:15px}.uk-padding-large{padding:30px}@media (min-width:1200px){.uk-padding-large{padding:70px}}.uk-padding-remove{padding:0!important}.uk-padding-remove-top{padding-top:0!important}.uk-padding-remove-bottom{padding-bottom:0!important}.uk-padding-remove-left{padding-left:0!important}.uk-padding-remove-right{padding-right:0!important}.uk-padding-remove-vertical{padding-top:0!important;padding-bottom:0!important}.uk-padding-remove-horizontal{padding-left:0!important;padding-right:0!important}[class*=uk-position-bottom],[class*=uk-position-center],[class*=uk-position-left],[class*=uk-position-right],[class*=uk-position-top]{position:absolute!important}.uk-position-top{top:0;left:0;right:0}.uk-position-bottom{bottom:0;left:0;right:0}.uk-position-left{top:0;bottom:0;left:0}.uk-position-right{top:0;bottom:0;right:0}.uk-position-top-left{top:0;left:0}.uk-position-top-right{top:0;right:0}.uk-position-bottom-left{bottom:0;left:0}.uk-position-bottom-right{bottom:0;right:0}.uk-position-center{top:50%;left:50%;transform:translate(-50%,-50%);display:table;width:-moz-max-content;max-width:100%;box-sizing:border-box}[class*=uk-position-center-left],[class*=uk-position-center-right]{top:50%;transform:translateY(-50%)}.uk-position-center-left{left:0}.uk-position-center-right{right:0}.uk-position-center-left-out{right:100%;width:max-content}.uk-position-center-right-out{left:100%;width:max-content}.uk-position-bottom-center,.uk-position-top-center{left:50%;transform:translateX(-50%);display:table;width:-moz-max-content;max-width:100%;box-sizing:border-box}.uk-position-top-center{top:0}.uk-position-bottom-center{bottom:0}.uk-position-cover{position:absolute;top:0;bottom:0;left:0;right:0}.uk-position-relative{position:relative!important}.uk-position-absolute{position:absolute!important}.uk-position-fixed{position:fixed!important}.uk-position-z-index{z-index:1}.uk-position-small{margin:15px}.uk-position-small.uk-position-center{transform:translate(-50%,-50%) translate(-15px,-15px)}.uk-position-small[class*=uk-position-center-left],.uk-position-small[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-15px)}.uk-position-small.uk-position-bottom-center,.uk-position-small.uk-position-top-center{transform:translateX(-50%) translateX(-15px)}.uk-position-medium{margin:30px}.uk-position-medium.uk-position-center{transform:translate(-50%,-50%) translate(-30px,-30px)}.uk-position-medium[class*=uk-position-center-left],.uk-position-medium[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-30px)}.uk-position-medium.uk-position-bottom-center,.uk-position-medium.uk-position-top-center{transform:translateX(-50%) translateX(-30px)}.uk-position-large{margin:30px}.uk-position-large.uk-position-center{transform:translate(-50%,-50%) translate(-30px,-30px)}.uk-position-large[class*=uk-position-center-left],.uk-position-large[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-30px)}.uk-position-large.uk-position-bottom-center,.uk-position-large.uk-position-top-center{transform:translateX(-50%) translateX(-30px)}@media (min-width:1200px){.uk-position-large{margin:50px}.uk-position-large.uk-position-center{transform:translate(-50%,-50%) translate(-50px,-50px)}.uk-position-large[class*=uk-position-center-left],.uk-position-large[class*=uk-position-center-right]{transform:translateY(-50%) translateY(-50px)}.uk-position-large.uk-position-bottom-center,.uk-position-large.uk-position-top-center{transform:translateX(-50%) translateX(-50px)}}.uk-transition-fade,[class*=uk-transition-scale],[class*=uk-transition-slide]{transition:.3s ease-out;transition-property:opacity,transform,filter}.uk-transition-toggle:focus{outline:0}.uk-transition-fade{opacity:0}.uk-transition-active.uk-active [class*=uk-transition-fade],.uk-transition-toggle.uk-hover [class*=uk-transition-fade],.uk-transition-toggle:focus [class*=uk-transition-fade],.uk-transition-toggle:hover [class*=uk-transition-fade]{opacity:1}[class*=uk-transition-scale]{opacity:0}.uk-transition-scale-up{transform:scale3d(1,1,1)}.uk-transition-scale-down{transform:scale3d(1.1,1.1,1)}.uk-transition-active.uk-active .uk-transition-scale-up,.uk-transition-toggle.uk-hover .uk-transition-scale-up,.uk-transition-toggle:focus .uk-transition-scale-up,.uk-transition-toggle:hover .uk-transition-scale-up{opacity:1;transform:scale3d(1.1,1.1,1)}.uk-transition-active.uk-active .uk-transition-scale-down,.uk-transition-toggle.uk-hover .uk-transition-scale-down,.uk-transition-toggle:focus .uk-transition-scale-down,.uk-transition-toggle:hover .uk-transition-scale-down{opacity:1;transform:scale3d(1,1,1)}[class*=uk-transition-slide]{opacity:0}.uk-transition-slide-top{transform:translateY(-100%)}.uk-transition-slide-bottom{transform:translateY(100%)}.uk-transition-slide-left{transform:translateX(-100%)}.uk-transition-slide-right{transform:translateX(100%)}.uk-transition-slide-top-small{transform:translateY(-10px)}.uk-transition-slide-bottom-small{transform:translateY(10px)}.uk-transition-slide-left-small{transform:translateX(-10px)}.uk-transition-slide-right-small{transform:translateX(10px)}.uk-transition-slide-top-medium{transform:translateY(-50px)}.uk-transition-slide-bottom-medium{transform:translateY(50px)}.uk-transition-slide-left-medium{transform:translateX(-50px)}.uk-transition-slide-right-medium{transform:translateX(50px)}.uk-transition-active.uk-active [class*=uk-transition-slide],.uk-transition-toggle.uk-hover [class*=uk-transition-slide],.uk-transition-toggle:focus [class*=uk-transition-slide],.uk-transition-toggle:hover [class*=uk-transition-slide]{opacity:1;transform:translateX(0) translateY(0)}.uk-transition-opaque{opacity:1}.uk-transition-slow{transition-duration:.7s}.uk-hidden,[hidden]{display:none!important}@media (min-width:640px){.uk-hidden\\@s{display:none!important}}@media (min-width:960px){.uk-hidden\\@m{display:none!important}}@media (min-width:1200px){.uk-hidden\\@l{display:none!important}}@media (min-width:1600px){.uk-hidden\\@xl{display:none!important}}@media (max-width:639px){.uk-visible\\@s{display:none!important}}@media (max-width:959px){.uk-visible\\@m{display:none!important}}@media (max-width:1199px){.uk-visible\\@l{display:none!important}}@media (max-width:1599px){.uk-visible\\@xl{display:none!important}}.uk-invisible{visibility:hidden!important}.uk-visible-toggle:not(:hover):not(.uk-hover) .uk-hidden-hover:not(:focus){position:absolute!important;width:0!important;height:0!important;padding:0!important;margin:0!important;overflow:hidden!important}.uk-visible-toggle:not(:hover):not(.uk-hover) .uk-invisible-hover:not(:focus){opacity:0!important}@media (pointer:coarse){.uk-hidden-touch{display:none!important}}.uk-hidden-notouch{display:none!important}@media (pointer:coarse){.uk-hidden-notouch{display:block!important}}.uk-card-primary.uk-card-body,.uk-card-primary>:not([class*=uk-card-media]),.uk-card-secondary.uk-card-body,.uk-card-secondary>:not([class*=uk-card-media]),.uk-light,.uk-offcanvas-bar,.uk-overlay-primary,.uk-section-primary:not(.uk-preserve-color),.uk-section-secondary:not(.uk-preserve-color),.uk-tile-primary:not(.uk-preserve-color),.uk-tile-secondary:not(.uk-preserve-color){color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-link,.uk-card-primary.uk-card-body a,.uk-card-primary>:not([class*=uk-card-media]) .uk-link,.uk-card-primary>:not([class*=uk-card-media]) a,.uk-card-secondary.uk-card-body .uk-link,.uk-card-secondary.uk-card-body a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-link,.uk-card-secondary>:not([class*=uk-card-media]) a,.uk-light .uk-link,.uk-light a,.uk-offcanvas-bar .uk-link,.uk-offcanvas-bar a,.uk-overlay-primary .uk-link,.uk-overlay-primary a,.uk-section-primary:not(.uk-preserve-color) .uk-link,.uk-section-primary:not(.uk-preserve-color) a,.uk-section-secondary:not(.uk-preserve-color) .uk-link,.uk-section-secondary:not(.uk-preserve-color) a,.uk-tile-primary:not(.uk-preserve-color) .uk-link,.uk-tile-primary:not(.uk-preserve-color) a,.uk-tile-secondary:not(.uk-preserve-color) .uk-link,.uk-tile-secondary:not(.uk-preserve-color) a{color:#fff}.uk-card-primary.uk-card-body .uk-link:hover,.uk-card-primary.uk-card-body a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-link:hover,.uk-card-primary>:not([class*=uk-card-media]) a:hover,.uk-card-secondary.uk-card-body .uk-link:hover,.uk-card-secondary.uk-card-body a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-link:hover,.uk-card-secondary>:not([class*=uk-card-media]) a:hover,.uk-light .uk-link:hover,.uk-light a:hover,.uk-offcanvas-bar .uk-link:hover,.uk-offcanvas-bar a:hover,.uk-overlay-primary .uk-link:hover,.uk-overlay-primary a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-link:hover,.uk-section-primary:not(.uk-preserve-color) a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-link:hover,.uk-section-secondary:not(.uk-preserve-color) a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-link:hover,.uk-tile-primary:not(.uk-preserve-color) a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-link:hover,.uk-tile-secondary:not(.uk-preserve-color) a:hover{color:#fff}.uk-card-primary.uk-card-body :not(pre)>code,.uk-card-primary.uk-card-body :not(pre)>kbd,.uk-card-primary.uk-card-body :not(pre)>samp,.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>code,.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>kbd,.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>samp,.uk-card-secondary.uk-card-body :not(pre)>code,.uk-card-secondary.uk-card-body :not(pre)>kbd,.uk-card-secondary.uk-card-body :not(pre)>samp,.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>code,.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>kbd,.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>samp,.uk-light :not(pre)>code,.uk-light :not(pre)>kbd,.uk-light :not(pre)>samp,.uk-offcanvas-bar :not(pre)>code,.uk-offcanvas-bar :not(pre)>kbd,.uk-offcanvas-bar :not(pre)>samp,.uk-overlay-primary :not(pre)>code,.uk-overlay-primary :not(pre)>kbd,.uk-overlay-primary :not(pre)>samp,.uk-section-primary:not(.uk-preserve-color) :not(pre)>code,.uk-section-primary:not(.uk-preserve-color) :not(pre)>kbd,.uk-section-primary:not(.uk-preserve-color) :not(pre)>samp,.uk-section-secondary:not(.uk-preserve-color) :not(pre)>code,.uk-section-secondary:not(.uk-preserve-color) :not(pre)>kbd,.uk-section-secondary:not(.uk-preserve-color) :not(pre)>samp,.uk-tile-primary:not(.uk-preserve-color) :not(pre)>code,.uk-tile-primary:not(.uk-preserve-color) :not(pre)>kbd,.uk-tile-primary:not(.uk-preserve-color) :not(pre)>samp,.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>code,.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>kbd,.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>samp{color:rgba(255,255,255,.7);background:rgba(255,255,255,.1)}.uk-card-primary.uk-card-body em,.uk-card-primary>:not([class*=uk-card-media]) em,.uk-card-secondary.uk-card-body em,.uk-card-secondary>:not([class*=uk-card-media]) em,.uk-light em,.uk-offcanvas-bar em,.uk-overlay-primary em,.uk-section-primary:not(.uk-preserve-color) em,.uk-section-secondary:not(.uk-preserve-color) em,.uk-tile-primary:not(.uk-preserve-color) em,.uk-tile-secondary:not(.uk-preserve-color) em{color:#fff}.uk-card-primary.uk-card-body .uk-h1,.uk-card-primary.uk-card-body .uk-h2,.uk-card-primary.uk-card-body .uk-h3,.uk-card-primary.uk-card-body .uk-h4,.uk-card-primary.uk-card-body .uk-h5,.uk-card-primary.uk-card-body .uk-h6,.uk-card-primary.uk-card-body h1,.uk-card-primary.uk-card-body h2,.uk-card-primary.uk-card-body h3,.uk-card-primary.uk-card-body h4,.uk-card-primary.uk-card-body h5,.uk-card-primary.uk-card-body h6,.uk-card-primary>:not([class*=uk-card-media]) .uk-h1,.uk-card-primary>:not([class*=uk-card-media]) .uk-h2,.uk-card-primary>:not([class*=uk-card-media]) .uk-h3,.uk-card-primary>:not([class*=uk-card-media]) .uk-h4,.uk-card-primary>:not([class*=uk-card-media]) .uk-h5,.uk-card-primary>:not([class*=uk-card-media]) .uk-h6,.uk-card-primary>:not([class*=uk-card-media]) h1,.uk-card-primary>:not([class*=uk-card-media]) h2,.uk-card-primary>:not([class*=uk-card-media]) h3,.uk-card-primary>:not([class*=uk-card-media]) h4,.uk-card-primary>:not([class*=uk-card-media]) h5,.uk-card-primary>:not([class*=uk-card-media]) h6,.uk-card-secondary.uk-card-body .uk-h1,.uk-card-secondary.uk-card-body .uk-h2,.uk-card-secondary.uk-card-body .uk-h3,.uk-card-secondary.uk-card-body .uk-h4,.uk-card-secondary.uk-card-body .uk-h5,.uk-card-secondary.uk-card-body .uk-h6,.uk-card-secondary.uk-card-body h1,.uk-card-secondary.uk-card-body h2,.uk-card-secondary.uk-card-body h3,.uk-card-secondary.uk-card-body h4,.uk-card-secondary.uk-card-body h5,.uk-card-secondary.uk-card-body h6,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h1,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h2,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h3,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h4,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h5,.uk-card-secondary>:not([class*=uk-card-media]) .uk-h6,.uk-card-secondary>:not([class*=uk-card-media]) h1,.uk-card-secondary>:not([class*=uk-card-media]) h2,.uk-card-secondary>:not([class*=uk-card-media]) h3,.uk-card-secondary>:not([class*=uk-card-media]) h4,.uk-card-secondary>:not([class*=uk-card-media]) h5,.uk-card-secondary>:not([class*=uk-card-media]) h6,.uk-light .uk-h1,.uk-light .uk-h2,.uk-light .uk-h3,.uk-light .uk-h4,.uk-light .uk-h5,.uk-light .uk-h6,.uk-light h1,.uk-light h2,.uk-light h3,.uk-light h4,.uk-light h5,.uk-light h6,.uk-offcanvas-bar .uk-h1,.uk-offcanvas-bar .uk-h2,.uk-offcanvas-bar .uk-h3,.uk-offcanvas-bar .uk-h4,.uk-offcanvas-bar .uk-h5,.uk-offcanvas-bar .uk-h6,.uk-offcanvas-bar h1,.uk-offcanvas-bar h2,.uk-offcanvas-bar h3,.uk-offcanvas-bar h4,.uk-offcanvas-bar h5,.uk-offcanvas-bar h6,.uk-overlay-primary .uk-h1,.uk-overlay-primary .uk-h2,.uk-overlay-primary .uk-h3,.uk-overlay-primary .uk-h4,.uk-overlay-primary .uk-h5,.uk-overlay-primary .uk-h6,.uk-overlay-primary h1,.uk-overlay-primary h2,.uk-overlay-primary h3,.uk-overlay-primary h4,.uk-overlay-primary h5,.uk-overlay-primary h6,.uk-section-primary:not(.uk-preserve-color) .uk-h1,.uk-section-primary:not(.uk-preserve-color) .uk-h2,.uk-section-primary:not(.uk-preserve-color) .uk-h3,.uk-section-primary:not(.uk-preserve-color) .uk-h4,.uk-section-primary:not(.uk-preserve-color) .uk-h5,.uk-section-primary:not(.uk-preserve-color) .uk-h6,.uk-section-primary:not(.uk-preserve-color) h1,.uk-section-primary:not(.uk-preserve-color) h2,.uk-section-primary:not(.uk-preserve-color) h3,.uk-section-primary:not(.uk-preserve-color) h4,.uk-section-primary:not(.uk-preserve-color) h5,.uk-section-primary:not(.uk-preserve-color) h6,.uk-section-secondary:not(.uk-preserve-color) .uk-h1,.uk-section-secondary:not(.uk-preserve-color) .uk-h2,.uk-section-secondary:not(.uk-preserve-color) .uk-h3,.uk-section-secondary:not(.uk-preserve-color) .uk-h4,.uk-section-secondary:not(.uk-preserve-color) .uk-h5,.uk-section-secondary:not(.uk-preserve-color) .uk-h6,.uk-section-secondary:not(.uk-preserve-color) h1,.uk-section-secondary:not(.uk-preserve-color) h2,.uk-section-secondary:not(.uk-preserve-color) h3,.uk-section-secondary:not(.uk-preserve-color) h4,.uk-section-secondary:not(.uk-preserve-color) h5,.uk-section-secondary:not(.uk-preserve-color) h6,.uk-tile-primary:not(.uk-preserve-color) .uk-h1,.uk-tile-primary:not(.uk-preserve-color) .uk-h2,.uk-tile-primary:not(.uk-preserve-color) .uk-h3,.uk-tile-primary:not(.uk-preserve-color) .uk-h4,.uk-tile-primary:not(.uk-preserve-color) .uk-h5,.uk-tile-primary:not(.uk-preserve-color) .uk-h6,.uk-tile-primary:not(.uk-preserve-color) h1,.uk-tile-primary:not(.uk-preserve-color) h2,.uk-tile-primary:not(.uk-preserve-color) h3,.uk-tile-primary:not(.uk-preserve-color) h4,.uk-tile-primary:not(.uk-preserve-color) h5,.uk-tile-primary:not(.uk-preserve-color) h6,.uk-tile-secondary:not(.uk-preserve-color) .uk-h1,.uk-tile-secondary:not(.uk-preserve-color) .uk-h2,.uk-tile-secondary:not(.uk-preserve-color) .uk-h3,.uk-tile-secondary:not(.uk-preserve-color) .uk-h4,.uk-tile-secondary:not(.uk-preserve-color) .uk-h5,.uk-tile-secondary:not(.uk-preserve-color) .uk-h6,.uk-tile-secondary:not(.uk-preserve-color) h1,.uk-tile-secondary:not(.uk-preserve-color) h2,.uk-tile-secondary:not(.uk-preserve-color) h3,.uk-tile-secondary:not(.uk-preserve-color) h4,.uk-tile-secondary:not(.uk-preserve-color) h5,.uk-tile-secondary:not(.uk-preserve-color) h6{color:#fff}.uk-card-primary.uk-card-body blockquote,.uk-card-primary>:not([class*=uk-card-media]) blockquote,.uk-card-secondary.uk-card-body blockquote,.uk-card-secondary>:not([class*=uk-card-media]) blockquote,.uk-light blockquote,.uk-offcanvas-bar blockquote,.uk-overlay-primary blockquote,.uk-section-primary:not(.uk-preserve-color) blockquote,.uk-section-secondary:not(.uk-preserve-color) blockquote,.uk-tile-primary:not(.uk-preserve-color) blockquote,.uk-tile-secondary:not(.uk-preserve-color) blockquote{color:#fff}.uk-card-primary.uk-card-body blockquote footer,.uk-card-primary>:not([class*=uk-card-media]) blockquote footer,.uk-card-secondary.uk-card-body blockquote footer,.uk-card-secondary>:not([class*=uk-card-media]) blockquote footer,.uk-light blockquote footer,.uk-offcanvas-bar blockquote footer,.uk-overlay-primary blockquote footer,.uk-section-primary:not(.uk-preserve-color) blockquote footer,.uk-section-secondary:not(.uk-preserve-color) blockquote footer,.uk-tile-primary:not(.uk-preserve-color) blockquote footer,.uk-tile-secondary:not(.uk-preserve-color) blockquote footer{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-hr,.uk-card-primary.uk-card-body hr,.uk-card-primary>:not([class*=uk-card-media]) .uk-hr,.uk-card-primary>:not([class*=uk-card-media]) hr,.uk-card-secondary.uk-card-body .uk-hr,.uk-card-secondary.uk-card-body hr,.uk-card-secondary>:not([class*=uk-card-media]) .uk-hr,.uk-card-secondary>:not([class*=uk-card-media]) hr,.uk-light .uk-hr,.uk-light hr,.uk-offcanvas-bar .uk-hr,.uk-offcanvas-bar hr,.uk-overlay-primary .uk-hr,.uk-overlay-primary hr,.uk-section-primary:not(.uk-preserve-color) .uk-hr,.uk-section-primary:not(.uk-preserve-color) hr,.uk-section-secondary:not(.uk-preserve-color) .uk-hr,.uk-section-secondary:not(.uk-preserve-color) hr,.uk-tile-primary:not(.uk-preserve-color) .uk-hr,.uk-tile-primary:not(.uk-preserve-color) hr,.uk-tile-secondary:not(.uk-preserve-color) .uk-hr,.uk-tile-secondary:not(.uk-preserve-color) hr{border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-link-muted a,.uk-card-primary.uk-card-body a.uk-link-muted,.uk-card-primary>:not([class*=uk-card-media]) .uk-link-muted a,.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-muted,.uk-card-secondary.uk-card-body .uk-link-muted a,.uk-card-secondary.uk-card-body a.uk-link-muted,.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-muted a,.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-muted,.uk-light .uk-link-muted a,.uk-light a.uk-link-muted,.uk-offcanvas-bar .uk-link-muted a,.uk-offcanvas-bar a.uk-link-muted,.uk-overlay-primary .uk-link-muted a,.uk-overlay-primary a.uk-link-muted,.uk-section-primary:not(.uk-preserve-color) .uk-link-muted a,.uk-section-primary:not(.uk-preserve-color) a.uk-link-muted,.uk-section-secondary:not(.uk-preserve-color) .uk-link-muted a,.uk-section-secondary:not(.uk-preserve-color) a.uk-link-muted,.uk-tile-primary:not(.uk-preserve-color) .uk-link-muted a,.uk-tile-primary:not(.uk-preserve-color) a.uk-link-muted,.uk-tile-secondary:not(.uk-preserve-color) .uk-link-muted a,.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-muted{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-link-muted a:hover,.uk-card-primary.uk-card-body a.uk-link-muted:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-link-muted a:hover,.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-muted:hover,.uk-card-secondary.uk-card-body .uk-link-muted a:hover,.uk-card-secondary.uk-card-body a.uk-link-muted:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-muted a:hover,.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-muted:hover,.uk-light .uk-link-muted a:hover,.uk-light a.uk-link-muted:hover,.uk-offcanvas-bar .uk-link-muted a:hover,.uk-offcanvas-bar a.uk-link-muted:hover,.uk-overlay-primary .uk-link-muted a:hover,.uk-overlay-primary a.uk-link-muted:hover,.uk-section-primary:not(.uk-preserve-color) .uk-link-muted a:hover,.uk-section-primary:not(.uk-preserve-color) a.uk-link-muted:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-link-muted a:hover,.uk-section-secondary:not(.uk-preserve-color) a.uk-link-muted:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-link-muted a:hover,.uk-tile-primary:not(.uk-preserve-color) a.uk-link-muted:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-link-muted a:hover,.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-muted:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-link-text a:hover,.uk-card-primary.uk-card-body a.uk-link-text:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-link-text a:hover,.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-text:hover,.uk-card-secondary.uk-card-body .uk-link-text a:hover,.uk-card-secondary.uk-card-body a.uk-link-text:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-text a:hover,.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-text:hover,.uk-light .uk-link-text a:hover,.uk-light a.uk-link-text:hover,.uk-offcanvas-bar .uk-link-text a:hover,.uk-offcanvas-bar a.uk-link-text:hover,.uk-overlay-primary .uk-link-text a:hover,.uk-overlay-primary a.uk-link-text:hover,.uk-section-primary:not(.uk-preserve-color) .uk-link-text a:hover,.uk-section-primary:not(.uk-preserve-color) a.uk-link-text:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-link-text a:hover,.uk-section-secondary:not(.uk-preserve-color) a.uk-link-text:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-link-text a:hover,.uk-tile-primary:not(.uk-preserve-color) a.uk-link-text:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-link-text a:hover,.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-text:hover{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-heading-divider,.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-divider,.uk-card-secondary.uk-card-body .uk-heading-divider,.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-divider,.uk-light .uk-heading-divider,.uk-offcanvas-bar .uk-heading-divider,.uk-overlay-primary .uk-heading-divider,.uk-section-primary:not(.uk-preserve-color) .uk-heading-divider,.uk-section-secondary:not(.uk-preserve-color) .uk-heading-divider,.uk-tile-primary:not(.uk-preserve-color) .uk-heading-divider,.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-divider{border-bottom-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-heading-bullet::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-bullet::before,.uk-card-secondary.uk-card-body .uk-heading-bullet::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-bullet::before,.uk-light .uk-heading-bullet::before,.uk-offcanvas-bar .uk-heading-bullet::before,.uk-overlay-primary .uk-heading-bullet::before,.uk-section-primary:not(.uk-preserve-color) .uk-heading-bullet::before,.uk-section-secondary:not(.uk-preserve-color) .uk-heading-bullet::before,.uk-tile-primary:not(.uk-preserve-color) .uk-heading-bullet::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-bullet::before{border-left-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-heading-line>::after,.uk-card-primary.uk-card-body .uk-heading-line>::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-line>::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-line>::before,.uk-card-secondary.uk-card-body .uk-heading-line>::after,.uk-card-secondary.uk-card-body .uk-heading-line>::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-line>::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-line>::before,.uk-light .uk-heading-line>::after,.uk-light .uk-heading-line>::before,.uk-offcanvas-bar .uk-heading-line>::after,.uk-offcanvas-bar .uk-heading-line>::before,.uk-overlay-primary .uk-heading-line>::after,.uk-overlay-primary .uk-heading-line>::before,.uk-section-primary:not(.uk-preserve-color) .uk-heading-line>::after,.uk-section-primary:not(.uk-preserve-color) .uk-heading-line>::before,.uk-section-secondary:not(.uk-preserve-color) .uk-heading-line>::after,.uk-section-secondary:not(.uk-preserve-color) .uk-heading-line>::before,.uk-tile-primary:not(.uk-preserve-color) .uk-heading-line>::after,.uk-tile-primary:not(.uk-preserve-color) .uk-heading-line>::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-line>::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-line>::before{border-bottom-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-divider-icon,.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon,.uk-card-secondary.uk-card-body .uk-divider-icon,.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon,.uk-light .uk-divider-icon,.uk-offcanvas-bar .uk-divider-icon,.uk-overlay-primary .uk-divider-icon,.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon,.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon,.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon,.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.2%29%22%20stroke-width%3D%222%22%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-card-primary.uk-card-body .uk-divider-icon::after,.uk-card-primary.uk-card-body .uk-divider-icon::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon::before,.uk-card-secondary.uk-card-body .uk-divider-icon::after,.uk-card-secondary.uk-card-body .uk-divider-icon::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon::before,.uk-light .uk-divider-icon::after,.uk-light .uk-divider-icon::before,.uk-offcanvas-bar .uk-divider-icon::after,.uk-offcanvas-bar .uk-divider-icon::before,.uk-overlay-primary .uk-divider-icon::after,.uk-overlay-primary .uk-divider-icon::before,.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon::after,.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon::before,.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon::after,.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon::before,.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon::after,.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon::before{border-bottom-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-divider-small::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-small::after,.uk-card-secondary.uk-card-body .uk-divider-small::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-small::after,.uk-light .uk-divider-small::after,.uk-offcanvas-bar .uk-divider-small::after,.uk-overlay-primary .uk-divider-small::after,.uk-section-primary:not(.uk-preserve-color) .uk-divider-small::after,.uk-section-secondary:not(.uk-preserve-color) .uk-divider-small::after,.uk-tile-primary:not(.uk-preserve-color) .uk-divider-small::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-small::after{border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-list-divider>li:nth-child(n+2),.uk-card-primary>:not([class*=uk-card-media]) .uk-list-divider>li:nth-child(n+2),.uk-card-secondary.uk-card-body .uk-list-divider>li:nth-child(n+2),.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-divider>li:nth-child(n+2),.uk-light .uk-list-divider>li:nth-child(n+2),.uk-offcanvas-bar .uk-list-divider>li:nth-child(n+2),.uk-overlay-primary .uk-list-divider>li:nth-child(n+2),.uk-section-primary:not(.uk-preserve-color) .uk-list-divider>li:nth-child(n+2),.uk-section-secondary:not(.uk-preserve-color) .uk-list-divider>li:nth-child(n+2),.uk-tile-primary:not(.uk-preserve-color) .uk-list-divider>li:nth-child(n+2),.uk-tile-secondary:not(.uk-preserve-color) .uk-list-divider>li:nth-child(n+2){border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-list-striped>li:nth-of-type(odd),.uk-card-primary>:not([class*=uk-card-media]) .uk-list-striped>li:nth-of-type(odd),.uk-card-secondary.uk-card-body .uk-list-striped>li:nth-of-type(odd),.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-striped>li:nth-of-type(odd),.uk-light .uk-list-striped>li:nth-of-type(odd),.uk-offcanvas-bar .uk-list-striped>li:nth-of-type(odd),.uk-overlay-primary .uk-list-striped>li:nth-of-type(odd),.uk-section-primary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-section-secondary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-tile-primary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-tile-secondary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd){border-top-color:rgba(255,255,255,.2);border-bottom-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-list-striped>li:nth-of-type(odd),.uk-card-primary>:not([class*=uk-card-media]) .uk-list-striped>li:nth-of-type(odd),.uk-card-secondary.uk-card-body .uk-list-striped>li:nth-of-type(odd),.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-striped>li:nth-of-type(odd),.uk-light .uk-list-striped>li:nth-of-type(odd),.uk-offcanvas-bar .uk-list-striped>li:nth-of-type(odd),.uk-overlay-primary .uk-list-striped>li:nth-of-type(odd),.uk-section-primary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-section-secondary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-tile-primary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd),.uk-tile-secondary:not(.uk-preserve-color) .uk-list-striped>li:nth-of-type(odd){background-color:rgba(255,255,255,.1)}.uk-card-primary.uk-card-body .uk-list-bullet>li::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-list-bullet>li::before,.uk-card-secondary.uk-card-body .uk-list-bullet>li::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-bullet>li::before,.uk-light .uk-list-bullet>li::before,.uk-offcanvas-bar .uk-list-bullet>li::before,.uk-overlay-primary .uk-list-bullet>li::before,.uk-section-primary:not(.uk-preserve-color) .uk-list-bullet>li::before,.uk-section-secondary:not(.uk-preserve-color) .uk-list-bullet>li::before,.uk-tile-primary:not(.uk-preserve-color) .uk-list-bullet>li::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-list-bullet>li::before{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-table th,.uk-card-primary>:not([class*=uk-card-media]) .uk-table th,.uk-card-secondary.uk-card-body .uk-table th,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table th,.uk-light .uk-table th,.uk-offcanvas-bar .uk-table th,.uk-overlay-primary .uk-table th,.uk-section-primary:not(.uk-preserve-color) .uk-table th,.uk-section-secondary:not(.uk-preserve-color) .uk-table th,.uk-tile-primary:not(.uk-preserve-color) .uk-table th,.uk-tile-secondary:not(.uk-preserve-color) .uk-table th{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-table caption,.uk-card-primary>:not([class*=uk-card-media]) .uk-table caption,.uk-card-secondary.uk-card-body .uk-table caption,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table caption,.uk-light .uk-table caption,.uk-offcanvas-bar .uk-table caption,.uk-overlay-primary .uk-table caption,.uk-section-primary:not(.uk-preserve-color) .uk-table caption,.uk-section-secondary:not(.uk-preserve-color) .uk-table caption,.uk-tile-primary:not(.uk-preserve-color) .uk-table caption,.uk-tile-secondary:not(.uk-preserve-color) .uk-table caption{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-table tbody tr.uk-active,.uk-card-primary.uk-card-body .uk-table>tr.uk-active,.uk-card-primary>:not([class*=uk-card-media]) .uk-table tbody tr.uk-active,.uk-card-primary>:not([class*=uk-card-media]) .uk-table>tr.uk-active,.uk-card-secondary.uk-card-body .uk-table tbody tr.uk-active,.uk-card-secondary.uk-card-body .uk-table>tr.uk-active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table tbody tr.uk-active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table>tr.uk-active,.uk-light .uk-table tbody tr.uk-active,.uk-light .uk-table>tr.uk-active,.uk-offcanvas-bar .uk-table tbody tr.uk-active,.uk-offcanvas-bar .uk-table>tr.uk-active,.uk-overlay-primary .uk-table tbody tr.uk-active,.uk-overlay-primary .uk-table>tr.uk-active,.uk-section-primary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,.uk-section-primary:not(.uk-preserve-color) .uk-table>tr.uk-active,.uk-section-secondary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,.uk-section-secondary:not(.uk-preserve-color) .uk-table>tr.uk-active,.uk-tile-primary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,.uk-tile-primary:not(.uk-preserve-color) .uk-table>tr.uk-active,.uk-tile-secondary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,.uk-tile-secondary:not(.uk-preserve-color) .uk-table>tr.uk-active{background:rgba(255,255,255,.08)}.uk-card-primary.uk-card-body .uk-table-divider>:first-child>tr:not(:first-child),.uk-card-primary.uk-card-body .uk-table-divider>:not(:first-child)>tr,.uk-card-primary.uk-card-body .uk-table-divider>tr:not(:first-child),.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>:first-child>tr:not(:first-child),.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>:not(:first-child)>tr,.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>tr:not(:first-child),.uk-card-secondary.uk-card-body .uk-table-divider>:first-child>tr:not(:first-child),.uk-card-secondary.uk-card-body .uk-table-divider>:not(:first-child)>tr,.uk-card-secondary.uk-card-body .uk-table-divider>tr:not(:first-child),.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>:first-child>tr:not(:first-child),.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>:not(:first-child)>tr,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>tr:not(:first-child),.uk-light .uk-table-divider>:first-child>tr:not(:first-child),.uk-light .uk-table-divider>:not(:first-child)>tr,.uk-light .uk-table-divider>tr:not(:first-child),.uk-offcanvas-bar .uk-table-divider>:first-child>tr:not(:first-child),.uk-offcanvas-bar .uk-table-divider>:not(:first-child)>tr,.uk-offcanvas-bar .uk-table-divider>tr:not(:first-child),.uk-overlay-primary .uk-table-divider>:first-child>tr:not(:first-child),.uk-overlay-primary .uk-table-divider>:not(:first-child)>tr,.uk-overlay-primary .uk-table-divider>tr:not(:first-child),.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child){border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-table-striped tbody tr:nth-of-type(odd),.uk-card-primary.uk-card-body .uk-table-striped>tr:nth-of-type(odd),.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(odd),.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(odd),.uk-card-secondary.uk-card-body .uk-table-striped tbody tr:nth-of-type(odd),.uk-card-secondary.uk-card-body .uk-table-striped>tr:nth-of-type(odd),.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(odd),.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(odd),.uk-light .uk-table-striped tbody tr:nth-of-type(odd),.uk-light .uk-table-striped>tr:nth-of-type(odd),.uk-offcanvas-bar .uk-table-striped tbody tr:nth-of-type(odd),.uk-offcanvas-bar .uk-table-striped>tr:nth-of-type(odd),.uk-overlay-primary .uk-table-striped tbody tr:nth-of-type(odd),.uk-overlay-primary .uk-table-striped>tr:nth-of-type(odd),.uk-section-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),.uk-section-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd){background:rgba(255,255,255,.1);border-top-color:rgba(255,255,255,.2);border-bottom-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-table-hover tbody tr:hover,.uk-card-primary.uk-card-body .uk-table-hover>tr:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-table-hover tbody tr:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-table-hover>tr:hover,.uk-card-secondary.uk-card-body .uk-table-hover tbody tr:hover,.uk-card-secondary.uk-card-body .uk-table-hover>tr:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-hover tbody tr:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-hover>tr:hover,.uk-light .uk-table-hover tbody tr:hover,.uk-light .uk-table-hover>tr:hover,.uk-offcanvas-bar .uk-table-hover tbody tr:hover,.uk-offcanvas-bar .uk-table-hover>tr:hover,.uk-overlay-primary .uk-table-hover tbody tr:hover,.uk-overlay-primary .uk-table-hover>tr:hover,.uk-section-primary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,.uk-section-primary:not(.uk-preserve-color) .uk-table-hover>tr:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-table-hover>tr:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-table-hover>tr:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-table-hover>tr:hover{background:rgba(255,255,255,.08)}.uk-card-primary.uk-card-body .uk-icon-link,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link,.uk-card-secondary.uk-card-body .uk-icon-link,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link,.uk-light .uk-icon-link,.uk-offcanvas-bar .uk-icon-link,.uk-overlay-primary .uk-icon-link,.uk-section-primary:not(.uk-preserve-color) .uk-icon-link,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-icon-link:focus,.uk-card-primary.uk-card-body .uk-icon-link:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link:hover,.uk-card-secondary.uk-card-body .uk-icon-link:focus,.uk-card-secondary.uk-card-body .uk-icon-link:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link:hover,.uk-light .uk-icon-link:focus,.uk-light .uk-icon-link:hover,.uk-offcanvas-bar .uk-icon-link:focus,.uk-offcanvas-bar .uk-icon-link:hover,.uk-overlay-primary .uk-icon-link:focus,.uk-overlay-primary .uk-icon-link:hover,.uk-section-primary:not(.uk-preserve-color) .uk-icon-link:focus,.uk-section-primary:not(.uk-preserve-color) .uk-icon-link:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-active>.uk-icon-link,.uk-card-primary.uk-card-body .uk-icon-link:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-active>.uk-icon-link,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link:active,.uk-card-secondary.uk-card-body .uk-active>.uk-icon-link,.uk-card-secondary.uk-card-body .uk-icon-link:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-active>.uk-icon-link,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link:active,.uk-light .uk-active>.uk-icon-link,.uk-light .uk-icon-link:active,.uk-offcanvas-bar .uk-active>.uk-icon-link,.uk-offcanvas-bar .uk-icon-link:active,.uk-overlay-primary .uk-active>.uk-icon-link,.uk-overlay-primary .uk-icon-link:active,.uk-section-primary:not(.uk-preserve-color) .uk-active>.uk-icon-link,.uk-section-primary:not(.uk-preserve-color) .uk-icon-link:active,.uk-section-secondary:not(.uk-preserve-color) .uk-active>.uk-icon-link,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link:active,.uk-tile-primary:not(.uk-preserve-color) .uk-active>.uk-icon-link,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-active>.uk-icon-link,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link:active{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-icon-button,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button,.uk-card-secondary.uk-card-body .uk-icon-button,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button,.uk-light .uk-icon-button,.uk-offcanvas-bar .uk-icon-button,.uk-overlay-primary .uk-icon-button,.uk-section-primary:not(.uk-preserve-color) .uk-icon-button,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button{background-color:rgba(255,255,255,.1);color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-icon-button:focus,.uk-card-primary.uk-card-body .uk-icon-button:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button:hover,.uk-card-secondary.uk-card-body .uk-icon-button:focus,.uk-card-secondary.uk-card-body .uk-icon-button:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button:hover,.uk-light .uk-icon-button:focus,.uk-light .uk-icon-button:hover,.uk-offcanvas-bar .uk-icon-button:focus,.uk-offcanvas-bar .uk-icon-button:hover,.uk-overlay-primary .uk-icon-button:focus,.uk-overlay-primary .uk-icon-button:hover,.uk-section-primary:not(.uk-preserve-color) .uk-icon-button:focus,.uk-section-primary:not(.uk-preserve-color) .uk-icon-button:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button:hover{background-color:rgba(242,242,242,.1);color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-icon-button:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button:active,.uk-card-secondary.uk-card-body .uk-icon-button:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button:active,.uk-light .uk-icon-button:active,.uk-offcanvas-bar .uk-icon-button:active,.uk-overlay-primary .uk-icon-button:active,.uk-section-primary:not(.uk-preserve-color) .uk-icon-button:active,.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button:active,.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button:active{background-color:rgba(230,230,230,.1);color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-input,.uk-card-primary.uk-card-body .uk-select,.uk-card-primary.uk-card-body .uk-textarea,.uk-card-primary>:not([class*=uk-card-media]) .uk-input,.uk-card-primary>:not([class*=uk-card-media]) .uk-select,.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea,.uk-card-secondary.uk-card-body .uk-input,.uk-card-secondary.uk-card-body .uk-select,.uk-card-secondary.uk-card-body .uk-textarea,.uk-card-secondary>:not([class*=uk-card-media]) .uk-input,.uk-card-secondary>:not([class*=uk-card-media]) .uk-select,.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea,.uk-light .uk-input,.uk-light .uk-select,.uk-light .uk-textarea,.uk-offcanvas-bar .uk-input,.uk-offcanvas-bar .uk-select,.uk-offcanvas-bar .uk-textarea,.uk-overlay-primary .uk-input,.uk-overlay-primary .uk-select,.uk-overlay-primary .uk-textarea,.uk-section-primary:not(.uk-preserve-color) .uk-input,.uk-section-primary:not(.uk-preserve-color) .uk-select,.uk-section-primary:not(.uk-preserve-color) .uk-textarea,.uk-section-secondary:not(.uk-preserve-color) .uk-input,.uk-section-secondary:not(.uk-preserve-color) .uk-select,.uk-section-secondary:not(.uk-preserve-color) .uk-textarea,.uk-tile-primary:not(.uk-preserve-color) .uk-input,.uk-tile-primary:not(.uk-preserve-color) .uk-select,.uk-tile-primary:not(.uk-preserve-color) .uk-textarea,.uk-tile-secondary:not(.uk-preserve-color) .uk-input,.uk-tile-secondary:not(.uk-preserve-color) .uk-select,.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea{background-color:rgba(255,255,255,.1);color:rgba(255,255,255,.7);background-clip:padding-box;border-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-input:focus,.uk-card-primary.uk-card-body .uk-select:focus,.uk-card-primary.uk-card-body .uk-textarea:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-input:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-select:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea:focus,.uk-card-secondary.uk-card-body .uk-input:focus,.uk-card-secondary.uk-card-body .uk-select:focus,.uk-card-secondary.uk-card-body .uk-textarea:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-input:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-select:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea:focus,.uk-light .uk-input:focus,.uk-light .uk-select:focus,.uk-light .uk-textarea:focus,.uk-offcanvas-bar .uk-input:focus,.uk-offcanvas-bar .uk-select:focus,.uk-offcanvas-bar .uk-textarea:focus,.uk-overlay-primary .uk-input:focus,.uk-overlay-primary .uk-select:focus,.uk-overlay-primary .uk-textarea:focus,.uk-section-primary:not(.uk-preserve-color) .uk-input:focus,.uk-section-primary:not(.uk-preserve-color) .uk-select:focus,.uk-section-primary:not(.uk-preserve-color) .uk-textarea:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-input:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-select:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-textarea:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-input:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-select:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-textarea:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-input:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-select:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea:focus{background-color:rgba(255,255,255,.1);color:rgba(255,255,255,.7);border-color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-input:-ms-input-placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-input:-ms-input-placeholder,.uk-card-secondary.uk-card-body .uk-input:-ms-input-placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-input:-ms-input-placeholder,.uk-light .uk-input:-ms-input-placeholder,.uk-offcanvas-bar .uk-input:-ms-input-placeholder,.uk-overlay-primary .uk-input:-ms-input-placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-input:-ms-input-placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-input:-ms-input-placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-input:-ms-input-placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-input:-ms-input-placeholder{color:rgba(255,255,255,.5)!important}.uk-card-primary.uk-card-body .uk-input::placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-input::placeholder,.uk-card-secondary.uk-card-body .uk-input::placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-input::placeholder,.uk-light .uk-input::placeholder,.uk-offcanvas-bar .uk-input::placeholder,.uk-overlay-primary .uk-input::placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-input::placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-input::placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-input::placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-input::placeholder{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-textarea:-ms-input-placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea:-ms-input-placeholder,.uk-card-secondary.uk-card-body .uk-textarea:-ms-input-placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea:-ms-input-placeholder,.uk-light .uk-textarea:-ms-input-placeholder,.uk-offcanvas-bar .uk-textarea:-ms-input-placeholder,.uk-overlay-primary .uk-textarea:-ms-input-placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-textarea:-ms-input-placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-textarea:-ms-input-placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-textarea:-ms-input-placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea:-ms-input-placeholder{color:rgba(255,255,255,.5)!important}.uk-card-primary.uk-card-body .uk-textarea::placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea::placeholder,.uk-card-secondary.uk-card-body .uk-textarea::placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea::placeholder,.uk-light .uk-textarea::placeholder,.uk-offcanvas-bar .uk-textarea::placeholder,.uk-overlay-primary .uk-textarea::placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-textarea::placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-textarea::placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-textarea::placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea::placeholder{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-select:not([multiple]):not([size]),.uk-card-primary>:not([class*=uk-card-media]) .uk-select:not([multiple]):not([size]),.uk-card-secondary.uk-card-body .uk-select:not([multiple]):not([size]),.uk-card-secondary>:not([class*=uk-card-media]) .uk-select:not([multiple]):not([size]),.uk-light .uk-select:not([multiple]):not([size]),.uk-offcanvas-bar .uk-select:not([multiple]):not([size]),.uk-overlay-primary .uk-select:not([multiple]):not([size]),.uk-section-primary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),.uk-section-secondary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),.uk-tile-primary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),.uk-tile-secondary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]){background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-card-primary.uk-card-body .uk-checkbox,.uk-card-primary.uk-card-body .uk-radio,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox,.uk-card-primary>:not([class*=uk-card-media]) .uk-radio,.uk-card-secondary.uk-card-body .uk-checkbox,.uk-card-secondary.uk-card-body .uk-radio,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox,.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio,.uk-light .uk-checkbox,.uk-light .uk-radio,.uk-offcanvas-bar .uk-checkbox,.uk-offcanvas-bar .uk-radio,.uk-overlay-primary .uk-checkbox,.uk-overlay-primary .uk-radio,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox,.uk-section-primary:not(.uk-preserve-color) .uk-radio,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox,.uk-section-secondary:not(.uk-preserve-color) .uk-radio,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox,.uk-tile-primary:not(.uk-preserve-color) .uk-radio,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox,.uk-tile-secondary:not(.uk-preserve-color) .uk-radio{background-color:rgba(242,242,242,.1);border-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-checkbox:focus,.uk-card-primary.uk-card-body .uk-radio:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:focus,.uk-card-secondary.uk-card-body .uk-checkbox:focus,.uk-card-secondary.uk-card-body .uk-radio:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:focus,.uk-light .uk-checkbox:focus,.uk-light .uk-radio:focus,.uk-offcanvas-bar .uk-checkbox:focus,.uk-offcanvas-bar .uk-radio:focus,.uk-overlay-primary .uk-checkbox:focus,.uk-overlay-primary .uk-radio:focus,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:focus,.uk-section-primary:not(.uk-preserve-color) .uk-radio:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-radio:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-radio:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:focus{border-color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-checkbox:checked,.uk-card-primary.uk-card-body .uk-checkbox:indeterminate,.uk-card-primary.uk-card-body .uk-radio:checked,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked,.uk-card-secondary.uk-card-body .uk-checkbox:checked,.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate,.uk-card-secondary.uk-card-body .uk-radio:checked,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked,.uk-light .uk-checkbox:checked,.uk-light .uk-checkbox:indeterminate,.uk-light .uk-radio:checked,.uk-offcanvas-bar .uk-checkbox:checked,.uk-offcanvas-bar .uk-checkbox:indeterminate,.uk-offcanvas-bar .uk-radio:checked,.uk-overlay-primary .uk-checkbox:checked,.uk-overlay-primary .uk-checkbox:indeterminate,.uk-overlay-primary .uk-radio:checked,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked{background-color:#fff;border-color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-checkbox:checked:focus,.uk-card-primary.uk-card-body .uk-checkbox:indeterminate:focus,.uk-card-primary.uk-card-body .uk-radio:checked:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked:focus,.uk-card-secondary.uk-card-body .uk-checkbox:checked:focus,.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate:focus,.uk-card-secondary.uk-card-body .uk-radio:checked:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked:focus,.uk-light .uk-checkbox:checked:focus,.uk-light .uk-checkbox:indeterminate:focus,.uk-light .uk-radio:checked:focus,.uk-offcanvas-bar .uk-checkbox:checked:focus,.uk-offcanvas-bar .uk-checkbox:indeterminate:focus,.uk-offcanvas-bar .uk-radio:checked:focus,.uk-overlay-primary .uk-checkbox:checked:focus,.uk-overlay-primary .uk-checkbox:indeterminate:focus,.uk-overlay-primary .uk-radio:checked:focus,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked:focus,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked:focus{background-color:#e6e6e6}.uk-card-primary.uk-card-body .uk-radio:checked,.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked,.uk-card-secondary.uk-card-body .uk-radio:checked,.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked,.uk-light .uk-radio:checked,.uk-offcanvas-bar .uk-radio:checked,.uk-overlay-primary .uk-radio:checked,.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked,.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked,.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked,.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23666%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-checkbox:checked,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked,.uk-card-secondary.uk-card-body .uk-checkbox:checked,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked,.uk-light .uk-checkbox:checked,.uk-offcanvas-bar .uk-checkbox:checked,.uk-overlay-primary .uk-checkbox:checked,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A\")}.uk-card-primary.uk-card-body .uk-checkbox:indeterminate,.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate,.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,.uk-light .uk-checkbox:indeterminate,.uk-offcanvas-bar .uk-checkbox:indeterminate,.uk-overlay-primary .uk-checkbox:indeterminate,.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-form-label,.uk-card-primary>:not([class*=uk-card-media]) .uk-form-label,.uk-card-secondary.uk-card-body .uk-form-label,.uk-card-secondary>:not([class*=uk-card-media]) .uk-form-label,.uk-light .uk-form-label,.uk-offcanvas-bar .uk-form-label,.uk-overlay-primary .uk-form-label,.uk-section-primary:not(.uk-preserve-color) .uk-form-label,.uk-section-secondary:not(.uk-preserve-color) .uk-form-label,.uk-tile-primary:not(.uk-preserve-color) .uk-form-label,.uk-tile-secondary:not(.uk-preserve-color) .uk-form-label{color:#fff}.uk-card-primary.uk-card-body .uk-button-default,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default,.uk-card-secondary.uk-card-body .uk-button-default,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default,.uk-light .uk-button-default,.uk-offcanvas-bar .uk-button-default,.uk-overlay-primary .uk-button-default,.uk-section-primary:not(.uk-preserve-color) .uk-button-default,.uk-section-secondary:not(.uk-preserve-color) .uk-button-default,.uk-tile-primary:not(.uk-preserve-color) .uk-button-default,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default{background-color:transparent;color:#fff;border-color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-button-default:focus,.uk-card-primary.uk-card-body .uk-button-default:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default:hover,.uk-card-secondary.uk-card-body .uk-button-default:focus,.uk-card-secondary.uk-card-body .uk-button-default:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default:hover,.uk-light .uk-button-default:focus,.uk-light .uk-button-default:hover,.uk-offcanvas-bar .uk-button-default:focus,.uk-offcanvas-bar .uk-button-default:hover,.uk-overlay-primary .uk-button-default:focus,.uk-overlay-primary .uk-button-default:hover,.uk-section-primary:not(.uk-preserve-color) .uk-button-default:focus,.uk-section-primary:not(.uk-preserve-color) .uk-button-default:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-button-default:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-button-default:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-button-default:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-button-default:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default:hover{background-color:transparent;color:#fff;border-color:#fff}.uk-card-primary.uk-card-body .uk-button-default.uk-active,.uk-card-primary.uk-card-body .uk-button-default:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default.uk-active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default:active,.uk-card-secondary.uk-card-body .uk-button-default.uk-active,.uk-card-secondary.uk-card-body .uk-button-default:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default.uk-active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default:active,.uk-light .uk-button-default.uk-active,.uk-light .uk-button-default:active,.uk-offcanvas-bar .uk-button-default.uk-active,.uk-offcanvas-bar .uk-button-default:active,.uk-overlay-primary .uk-button-default.uk-active,.uk-overlay-primary .uk-button-default:active,.uk-section-primary:not(.uk-preserve-color) .uk-button-default.uk-active,.uk-section-primary:not(.uk-preserve-color) .uk-button-default:active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-default.uk-active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-default:active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-default.uk-active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-default:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default.uk-active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default:active{background-color:transparent;color:#fff;border-color:#fff}.uk-card-primary.uk-card-body .uk-button-primary,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary,.uk-card-secondary.uk-card-body .uk-button-primary,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary,.uk-light .uk-button-primary,.uk-offcanvas-bar .uk-button-primary,.uk-overlay-primary .uk-button-primary,.uk-section-primary:not(.uk-preserve-color) .uk-button-primary,.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary,.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary{background-color:#fff;color:#666}.uk-card-primary.uk-card-body .uk-button-primary:focus,.uk-card-primary.uk-card-body .uk-button-primary:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary:hover,.uk-card-secondary.uk-card-body .uk-button-primary:focus,.uk-card-secondary.uk-card-body .uk-button-primary:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary:hover,.uk-light .uk-button-primary:focus,.uk-light .uk-button-primary:hover,.uk-offcanvas-bar .uk-button-primary:focus,.uk-offcanvas-bar .uk-button-primary:hover,.uk-overlay-primary .uk-button-primary:focus,.uk-overlay-primary .uk-button-primary:hover,.uk-section-primary:not(.uk-preserve-color) .uk-button-primary:focus,.uk-section-primary:not(.uk-preserve-color) .uk-button-primary:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary:hover{background-color:#f2f2f2;color:#666}.uk-card-primary.uk-card-body .uk-button-primary.uk-active,.uk-card-primary.uk-card-body .uk-button-primary:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary.uk-active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary:active,.uk-card-secondary.uk-card-body .uk-button-primary.uk-active,.uk-card-secondary.uk-card-body .uk-button-primary:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary.uk-active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary:active,.uk-light .uk-button-primary.uk-active,.uk-light .uk-button-primary:active,.uk-offcanvas-bar .uk-button-primary.uk-active,.uk-offcanvas-bar .uk-button-primary:active,.uk-overlay-primary .uk-button-primary.uk-active,.uk-overlay-primary .uk-button-primary:active,.uk-section-primary:not(.uk-preserve-color) .uk-button-primary.uk-active,.uk-section-primary:not(.uk-preserve-color) .uk-button-primary:active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary.uk-active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary:active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary.uk-active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary.uk-active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary:active{background-color:#e6e6e6;color:#666}.uk-card-primary.uk-card-body .uk-button-secondary,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary,.uk-card-secondary.uk-card-body .uk-button-secondary,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary,.uk-light .uk-button-secondary,.uk-offcanvas-bar .uk-button-secondary,.uk-overlay-primary .uk-button-secondary,.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary,.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary,.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary{background-color:#fff;color:#666}.uk-card-primary.uk-card-body .uk-button-secondary:focus,.uk-card-primary.uk-card-body .uk-button-secondary:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary:hover,.uk-card-secondary.uk-card-body .uk-button-secondary:focus,.uk-card-secondary.uk-card-body .uk-button-secondary:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary:hover,.uk-light .uk-button-secondary:focus,.uk-light .uk-button-secondary:hover,.uk-offcanvas-bar .uk-button-secondary:focus,.uk-offcanvas-bar .uk-button-secondary:hover,.uk-overlay-primary .uk-button-secondary:focus,.uk-overlay-primary .uk-button-secondary:hover,.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary:focus,.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary:hover{background-color:#f2f2f2;color:#666}.uk-card-primary.uk-card-body .uk-button-secondary.uk-active,.uk-card-primary.uk-card-body .uk-button-secondary:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary.uk-active,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary:active,.uk-card-secondary.uk-card-body .uk-button-secondary.uk-active,.uk-card-secondary.uk-card-body .uk-button-secondary:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary.uk-active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary:active,.uk-light .uk-button-secondary.uk-active,.uk-light .uk-button-secondary:active,.uk-offcanvas-bar .uk-button-secondary.uk-active,.uk-offcanvas-bar .uk-button-secondary:active,.uk-overlay-primary .uk-button-secondary.uk-active,.uk-overlay-primary .uk-button-secondary:active,.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary.uk-active,.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary:active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary.uk-active,.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary:active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary.uk-active,.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary.uk-active,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary:active{background-color:#e6e6e6;color:#666}.uk-card-primary.uk-card-body .uk-button-text,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text,.uk-card-secondary.uk-card-body .uk-button-text,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text,.uk-light .uk-button-text,.uk-offcanvas-bar .uk-button-text,.uk-overlay-primary .uk-button-text,.uk-section-primary:not(.uk-preserve-color) .uk-button-text,.uk-section-secondary:not(.uk-preserve-color) .uk-button-text,.uk-tile-primary:not(.uk-preserve-color) .uk-button-text,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text{color:#fff}.uk-card-primary.uk-card-body .uk-button-text::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text::before,.uk-card-secondary.uk-card-body .uk-button-text::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text::before,.uk-light .uk-button-text::before,.uk-offcanvas-bar .uk-button-text::before,.uk-overlay-primary .uk-button-text::before,.uk-section-primary:not(.uk-preserve-color) .uk-button-text::before,.uk-section-secondary:not(.uk-preserve-color) .uk-button-text::before,.uk-tile-primary:not(.uk-preserve-color) .uk-button-text::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text::before{border-bottom-color:#fff}.uk-card-primary.uk-card-body .uk-button-text:focus,.uk-card-primary.uk-card-body .uk-button-text:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text:hover,.uk-card-secondary.uk-card-body .uk-button-text:focus,.uk-card-secondary.uk-card-body .uk-button-text:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text:hover,.uk-light .uk-button-text:focus,.uk-light .uk-button-text:hover,.uk-offcanvas-bar .uk-button-text:focus,.uk-offcanvas-bar .uk-button-text:hover,.uk-overlay-primary .uk-button-text:focus,.uk-overlay-primary .uk-button-text:hover,.uk-section-primary:not(.uk-preserve-color) .uk-button-text:focus,.uk-section-primary:not(.uk-preserve-color) .uk-button-text:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-button-text:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-button-text:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-button-text:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-button-text:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text:hover{color:#fff}.uk-card-primary.uk-card-body .uk-button-text:disabled,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text:disabled,.uk-card-secondary.uk-card-body .uk-button-text:disabled,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text:disabled,.uk-light .uk-button-text:disabled,.uk-offcanvas-bar .uk-button-text:disabled,.uk-overlay-primary .uk-button-text:disabled,.uk-section-primary:not(.uk-preserve-color) .uk-button-text:disabled,.uk-section-secondary:not(.uk-preserve-color) .uk-button-text:disabled,.uk-tile-primary:not(.uk-preserve-color) .uk-button-text:disabled,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text:disabled{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-button-link,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-link,.uk-card-secondary.uk-card-body .uk-button-link,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-link,.uk-light .uk-button-link,.uk-offcanvas-bar .uk-button-link,.uk-overlay-primary .uk-button-link,.uk-section-primary:not(.uk-preserve-color) .uk-button-link,.uk-section-secondary:not(.uk-preserve-color) .uk-button-link,.uk-tile-primary:not(.uk-preserve-color) .uk-button-link,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-link{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-button-link:focus,.uk-card-primary.uk-card-body .uk-button-link:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-link:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-button-link:hover,.uk-card-secondary.uk-card-body .uk-button-link:focus,.uk-card-secondary.uk-card-body .uk-button-link:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-link:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-link:hover,.uk-light .uk-button-link:focus,.uk-light .uk-button-link:hover,.uk-offcanvas-bar .uk-button-link:focus,.uk-offcanvas-bar .uk-button-link:hover,.uk-overlay-primary .uk-button-link:focus,.uk-overlay-primary .uk-button-link:hover,.uk-section-primary:not(.uk-preserve-color) .uk-button-link:focus,.uk-section-primary:not(.uk-preserve-color) .uk-button-link:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-button-link:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-button-link:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-button-link:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-button-link:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-link:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-button-link:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-grid-divider>:not(.uk-first-column)::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-grid-divider>:not(.uk-first-column)::before,.uk-card-secondary.uk-card-body .uk-grid-divider>:not(.uk-first-column)::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-grid-divider>:not(.uk-first-column)::before,.uk-light .uk-grid-divider>:not(.uk-first-column)::before,.uk-offcanvas-bar .uk-grid-divider>:not(.uk-first-column)::before,.uk-overlay-primary .uk-grid-divider>:not(.uk-first-column)::before,.uk-section-primary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,.uk-section-secondary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,.uk-tile-primary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before{border-left-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-card-secondary.uk-card-body .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-light .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-offcanvas-bar .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-overlay-primary .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-section-primary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-section-secondary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-tile-primary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before{border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-close,.uk-card-primary>:not([class*=uk-card-media]) .uk-close,.uk-card-secondary.uk-card-body .uk-close,.uk-card-secondary>:not([class*=uk-card-media]) .uk-close,.uk-light .uk-close,.uk-offcanvas-bar .uk-close,.uk-overlay-primary .uk-close,.uk-section-primary:not(.uk-preserve-color) .uk-close,.uk-section-secondary:not(.uk-preserve-color) .uk-close,.uk-tile-primary:not(.uk-preserve-color) .uk-close,.uk-tile-secondary:not(.uk-preserve-color) .uk-close{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-close:focus,.uk-card-primary.uk-card-body .uk-close:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-close:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-close:hover,.uk-card-secondary.uk-card-body .uk-close:focus,.uk-card-secondary.uk-card-body .uk-close:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-close:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-close:hover,.uk-light .uk-close:focus,.uk-light .uk-close:hover,.uk-offcanvas-bar .uk-close:focus,.uk-offcanvas-bar .uk-close:hover,.uk-overlay-primary .uk-close:focus,.uk-overlay-primary .uk-close:hover,.uk-section-primary:not(.uk-preserve-color) .uk-close:focus,.uk-section-primary:not(.uk-preserve-color) .uk-close:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-close:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-close:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-close:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-close:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-close:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-close:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-totop,.uk-card-primary>:not([class*=uk-card-media]) .uk-totop,.uk-card-secondary.uk-card-body .uk-totop,.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop,.uk-light .uk-totop,.uk-offcanvas-bar .uk-totop,.uk-overlay-primary .uk-totop,.uk-section-primary:not(.uk-preserve-color) .uk-totop,.uk-section-secondary:not(.uk-preserve-color) .uk-totop,.uk-tile-primary:not(.uk-preserve-color) .uk-totop,.uk-tile-secondary:not(.uk-preserve-color) .uk-totop{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-totop:focus,.uk-card-primary.uk-card-body .uk-totop:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-totop:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-totop:hover,.uk-card-secondary.uk-card-body .uk-totop:focus,.uk-card-secondary.uk-card-body .uk-totop:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop:hover,.uk-light .uk-totop:focus,.uk-light .uk-totop:hover,.uk-offcanvas-bar .uk-totop:focus,.uk-offcanvas-bar .uk-totop:hover,.uk-overlay-primary .uk-totop:focus,.uk-overlay-primary .uk-totop:hover,.uk-section-primary:not(.uk-preserve-color) .uk-totop:focus,.uk-section-primary:not(.uk-preserve-color) .uk-totop:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-totop:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-totop:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-totop:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-totop:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-totop:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-totop:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-totop:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-totop:active,.uk-card-secondary.uk-card-body .uk-totop:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop:active,.uk-light .uk-totop:active,.uk-offcanvas-bar .uk-totop:active,.uk-overlay-primary .uk-totop:active,.uk-section-primary:not(.uk-preserve-color) .uk-totop:active,.uk-section-secondary:not(.uk-preserve-color) .uk-totop:active,.uk-tile-primary:not(.uk-preserve-color) .uk-totop:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-totop:active{color:#fff}.uk-card-primary.uk-card-body .uk-marker,.uk-card-primary>:not([class*=uk-card-media]) .uk-marker,.uk-card-secondary.uk-card-body .uk-marker,.uk-card-secondary>:not([class*=uk-card-media]) .uk-marker,.uk-light .uk-marker,.uk-offcanvas-bar .uk-marker,.uk-overlay-primary .uk-marker,.uk-section-primary:not(.uk-preserve-color) .uk-marker,.uk-section-secondary:not(.uk-preserve-color) .uk-marker,.uk-tile-primary:not(.uk-preserve-color) .uk-marker,.uk-tile-secondary:not(.uk-preserve-color) .uk-marker{background:#f8f8f8;color:#666}.uk-card-primary.uk-card-body .uk-marker:focus,.uk-card-primary.uk-card-body .uk-marker:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-marker:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-marker:hover,.uk-card-secondary.uk-card-body .uk-marker:focus,.uk-card-secondary.uk-card-body .uk-marker:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-marker:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-marker:hover,.uk-light .uk-marker:focus,.uk-light .uk-marker:hover,.uk-offcanvas-bar .uk-marker:focus,.uk-offcanvas-bar .uk-marker:hover,.uk-overlay-primary .uk-marker:focus,.uk-overlay-primary .uk-marker:hover,.uk-section-primary:not(.uk-preserve-color) .uk-marker:focus,.uk-section-primary:not(.uk-preserve-color) .uk-marker:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-marker:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-marker:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-marker:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-marker:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-marker:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-marker:hover{color:#666}.uk-card-primary.uk-card-body .uk-badge,.uk-card-primary>:not([class*=uk-card-media]) .uk-badge,.uk-card-secondary.uk-card-body .uk-badge,.uk-card-secondary>:not([class*=uk-card-media]) .uk-badge,.uk-light .uk-badge,.uk-offcanvas-bar .uk-badge,.uk-overlay-primary .uk-badge,.uk-section-primary:not(.uk-preserve-color) .uk-badge,.uk-section-secondary:not(.uk-preserve-color) .uk-badge,.uk-tile-primary:not(.uk-preserve-color) .uk-badge,.uk-tile-secondary:not(.uk-preserve-color) .uk-badge{background-color:#fff;color:#666}.uk-card-primary.uk-card-body .uk-badge:focus,.uk-card-primary.uk-card-body .uk-badge:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-badge:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-badge:hover,.uk-card-secondary.uk-card-body .uk-badge:focus,.uk-card-secondary.uk-card-body .uk-badge:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-badge:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-badge:hover,.uk-light .uk-badge:focus,.uk-light .uk-badge:hover,.uk-offcanvas-bar .uk-badge:focus,.uk-offcanvas-bar .uk-badge:hover,.uk-overlay-primary .uk-badge:focus,.uk-overlay-primary .uk-badge:hover,.uk-section-primary:not(.uk-preserve-color) .uk-badge:focus,.uk-section-primary:not(.uk-preserve-color) .uk-badge:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-badge:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-badge:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-badge:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-badge:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-badge:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-badge:hover{color:#666}.uk-card-primary.uk-card-body .uk-label,.uk-card-primary>:not([class*=uk-card-media]) .uk-label,.uk-card-secondary.uk-card-body .uk-label,.uk-card-secondary>:not([class*=uk-card-media]) .uk-label,.uk-light .uk-label,.uk-offcanvas-bar .uk-label,.uk-overlay-primary .uk-label,.uk-section-primary:not(.uk-preserve-color) .uk-label,.uk-section-secondary:not(.uk-preserve-color) .uk-label,.uk-tile-primary:not(.uk-preserve-color) .uk-label,.uk-tile-secondary:not(.uk-preserve-color) .uk-label{background-color:#fff;color:#666}.uk-card-primary.uk-card-body .uk-article-meta,.uk-card-primary>:not([class*=uk-card-media]) .uk-article-meta,.uk-card-secondary.uk-card-body .uk-article-meta,.uk-card-secondary>:not([class*=uk-card-media]) .uk-article-meta,.uk-light .uk-article-meta,.uk-offcanvas-bar .uk-article-meta,.uk-overlay-primary .uk-article-meta,.uk-section-primary:not(.uk-preserve-color) .uk-article-meta,.uk-section-secondary:not(.uk-preserve-color) .uk-article-meta,.uk-tile-primary:not(.uk-preserve-color) .uk-article-meta,.uk-tile-secondary:not(.uk-preserve-color) .uk-article-meta{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-search-input,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-input,.uk-card-secondary.uk-card-body .uk-search-input,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-input,.uk-light .uk-search-input,.uk-offcanvas-bar .uk-search-input,.uk-overlay-primary .uk-search-input,.uk-section-primary:not(.uk-preserve-color) .uk-search-input,.uk-section-secondary:not(.uk-preserve-color) .uk-search-input,.uk-tile-primary:not(.uk-preserve-color) .uk-search-input,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-input{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-search-input:-ms-input-placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-input:-ms-input-placeholder,.uk-card-secondary.uk-card-body .uk-search-input:-ms-input-placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-input:-ms-input-placeholder,.uk-light .uk-search-input:-ms-input-placeholder,.uk-offcanvas-bar .uk-search-input:-ms-input-placeholder,.uk-overlay-primary .uk-search-input:-ms-input-placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-search-input:-ms-input-placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-search-input:-ms-input-placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-search-input:-ms-input-placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-input:-ms-input-placeholder{color:rgba(255,255,255,.5)!important}.uk-card-primary.uk-card-body .uk-search-input::placeholder,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-input::placeholder,.uk-card-secondary.uk-card-body .uk-search-input::placeholder,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-input::placeholder,.uk-light .uk-search-input::placeholder,.uk-offcanvas-bar .uk-search-input::placeholder,.uk-overlay-primary .uk-search-input::placeholder,.uk-section-primary:not(.uk-preserve-color) .uk-search-input::placeholder,.uk-section-secondary:not(.uk-preserve-color) .uk-search-input::placeholder,.uk-tile-primary:not(.uk-preserve-color) .uk-search-input::placeholder,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-input::placeholder{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-search .uk-search-icon,.uk-card-primary>:not([class*=uk-card-media]) .uk-search .uk-search-icon,.uk-card-secondary.uk-card-body .uk-search .uk-search-icon,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search .uk-search-icon,.uk-light .uk-search .uk-search-icon,.uk-offcanvas-bar .uk-search .uk-search-icon,.uk-overlay-primary .uk-search .uk-search-icon,.uk-section-primary:not(.uk-preserve-color) .uk-search .uk-search-icon,.uk-section-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon,.uk-tile-primary:not(.uk-preserve-color) .uk-search .uk-search-icon,.uk-tile-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-search .uk-search-icon:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-search .uk-search-icon:hover,.uk-card-secondary.uk-card-body .uk-search .uk-search-icon:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search .uk-search-icon:hover,.uk-light .uk-search .uk-search-icon:hover,.uk-offcanvas-bar .uk-search .uk-search-icon:hover,.uk-overlay-primary .uk-search .uk-search-icon:hover,.uk-section-primary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-search-default .uk-search-input,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input,.uk-card-secondary.uk-card-body .uk-search-default .uk-search-input,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input,.uk-light .uk-search-default .uk-search-input,.uk-offcanvas-bar .uk-search-default .uk-search-input,.uk-overlay-primary .uk-search-default .uk-search-input,.uk-section-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input,.uk-section-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input,.uk-tile-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input{background-color:transparent;border-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-search-default .uk-search-input:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input:focus,.uk-card-secondary.uk-card-body .uk-search-default .uk-search-input:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input:focus,.uk-light .uk-search-default .uk-search-input:focus,.uk-offcanvas-bar .uk-search-default .uk-search-input:focus,.uk-overlay-primary .uk-search-default .uk-search-input:focus,.uk-section-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus{background-color:transparent}.uk-card-primary.uk-card-body .uk-search-navbar .uk-search-input,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-navbar .uk-search-input,.uk-card-secondary.uk-card-body .uk-search-navbar .uk-search-input,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-navbar .uk-search-input,.uk-light .uk-search-navbar .uk-search-input,.uk-offcanvas-bar .uk-search-navbar .uk-search-input,.uk-overlay-primary .uk-search-navbar .uk-search-input,.uk-section-primary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,.uk-section-secondary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,.uk-tile-primary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input{background-color:transparent}.uk-card-primary.uk-card-body .uk-search-large .uk-search-input,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-large .uk-search-input,.uk-card-secondary.uk-card-body .uk-search-large .uk-search-input,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-large .uk-search-input,.uk-light .uk-search-large .uk-search-input,.uk-offcanvas-bar .uk-search-large .uk-search-input,.uk-overlay-primary .uk-search-large .uk-search-input,.uk-section-primary:not(.uk-preserve-color) .uk-search-large .uk-search-input,.uk-section-secondary:not(.uk-preserve-color) .uk-search-large .uk-search-input,.uk-tile-primary:not(.uk-preserve-color) .uk-search-large .uk-search-input,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-large .uk-search-input{background-color:transparent}.uk-card-primary.uk-card-body .uk-search-toggle,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-toggle,.uk-card-secondary.uk-card-body .uk-search-toggle,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-toggle,.uk-light .uk-search-toggle,.uk-offcanvas-bar .uk-search-toggle,.uk-overlay-primary .uk-search-toggle,.uk-section-primary:not(.uk-preserve-color) .uk-search-toggle,.uk-section-secondary:not(.uk-preserve-color) .uk-search-toggle,.uk-tile-primary:not(.uk-preserve-color) .uk-search-toggle,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-toggle{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-search-toggle:focus,.uk-card-primary.uk-card-body .uk-search-toggle:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-toggle:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-search-toggle:hover,.uk-card-secondary.uk-card-body .uk-search-toggle:focus,.uk-card-secondary.uk-card-body .uk-search-toggle:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-toggle:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-toggle:hover,.uk-light .uk-search-toggle:focus,.uk-light .uk-search-toggle:hover,.uk-offcanvas-bar .uk-search-toggle:focus,.uk-offcanvas-bar .uk-search-toggle:hover,.uk-overlay-primary .uk-search-toggle:focus,.uk-overlay-primary .uk-search-toggle:hover,.uk-section-primary:not(.uk-preserve-color) .uk-search-toggle:focus,.uk-section-primary:not(.uk-preserve-color) .uk-search-toggle:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-search-toggle:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-search-toggle:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-search-toggle:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-search-toggle:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-toggle:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-search-toggle:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-nav-parent-icon>.uk-parent>a::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent>a::after,.uk-card-secondary.uk-card-body .uk-nav-parent-icon>.uk-parent>a::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent>a::after,.uk-light .uk-nav-parent-icon>.uk-parent>a::after,.uk-offcanvas-bar .uk-nav-parent-icon>.uk-parent>a::after,.uk-overlay-primary .uk-nav-parent-icon>.uk-parent>a::after,.uk-section-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20stroke-width%3D%221.1%22%20points%3D%2210%201%204%207%2010%2013%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-card-secondary.uk-card-body .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-light .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-offcanvas-bar .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-overlay-primary .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-section-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20stroke-width%3D%221.1%22%20points%3D%221%204%207%2010%2013%204%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-nav-default>li>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li>a,.uk-card-secondary.uk-card-body .uk-nav-default>li>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li>a,.uk-light .uk-nav-default>li>a,.uk-offcanvas-bar .uk-nav-default>li>a,.uk-overlay-primary .uk-nav-default>li>a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li>a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li>a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-nav-default>li>a:focus,.uk-card-primary.uk-card-body .uk-nav-default>li>a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li>a:hover,.uk-card-secondary.uk-card-body .uk-nav-default>li>a:focus,.uk-card-secondary.uk-card-body .uk-nav-default>li>a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li>a:hover,.uk-light .uk-nav-default>li>a:focus,.uk-light .uk-nav-default>li>a:hover,.uk-offcanvas-bar .uk-nav-default>li>a:focus,.uk-offcanvas-bar .uk-nav-default>li>a:hover,.uk-overlay-primary .uk-nav-default>li>a:focus,.uk-overlay-primary .uk-nav-default>li>a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-nav-default>li.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li.uk-active>a,.uk-card-secondary.uk-card-body .uk-nav-default>li.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li.uk-active>a,.uk-light .uk-nav-default>li.uk-active>a,.uk-offcanvas-bar .uk-nav-default>li.uk-active>a,.uk-overlay-primary .uk-nav-default>li.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a{color:#fff}.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-header,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-header,.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-header,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-header,.uk-light .uk-nav-default .uk-nav-header,.uk-offcanvas-bar .uk-nav-default .uk-nav-header,.uk-overlay-primary .uk-nav-default .uk-nav-header,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header{color:#fff}.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-divider,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-divider,.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-divider,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-divider,.uk-light .uk-nav-default .uk-nav-divider,.uk-offcanvas-bar .uk-nav-default .uk-nav-divider,.uk-overlay-primary .uk-nav-default .uk-nav-divider,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider{border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a,.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a,.uk-light .uk-nav-default .uk-nav-sub a,.uk-offcanvas-bar .uk-nav-default .uk-nav-sub a,.uk-overlay-primary .uk-nav-default .uk-nav-sub a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub a:focus,.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:hover,.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub a:focus,.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:hover,.uk-light .uk-nav-default .uk-nav-sub a:focus,.uk-light .uk-nav-default .uk-nav-sub a:hover,.uk-offcanvas-bar .uk-nav-default .uk-nav-sub a:focus,.uk-offcanvas-bar .uk-nav-default .uk-nav-sub a:hover,.uk-overlay-primary .uk-nav-default .uk-nav-sub a:focus,.uk-overlay-primary .uk-nav-default .uk-nav-sub a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-nav-primary>li>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li>a,.uk-card-secondary.uk-card-body .uk-nav-primary>li>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li>a,.uk-light .uk-nav-primary>li>a,.uk-offcanvas-bar .uk-nav-primary>li>a,.uk-overlay-primary .uk-nav-primary>li>a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li>a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-nav-primary>li>a:focus,.uk-card-primary.uk-card-body .uk-nav-primary>li>a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:hover,.uk-card-secondary.uk-card-body .uk-nav-primary>li>a:focus,.uk-card-secondary.uk-card-body .uk-nav-primary>li>a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:hover,.uk-light .uk-nav-primary>li>a:focus,.uk-light .uk-nav-primary>li>a:hover,.uk-offcanvas-bar .uk-nav-primary>li>a:focus,.uk-offcanvas-bar .uk-nav-primary>li>a:hover,.uk-overlay-primary .uk-nav-primary>li>a:focus,.uk-overlay-primary .uk-nav-primary>li>a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-nav-primary>li.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li.uk-active>a,.uk-card-secondary.uk-card-body .uk-nav-primary>li.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li.uk-active>a,.uk-light .uk-nav-primary>li.uk-active>a,.uk-offcanvas-bar .uk-nav-primary>li.uk-active>a,.uk-overlay-primary .uk-nav-primary>li.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a{color:#fff}.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-header,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-header,.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-header,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-header,.uk-light .uk-nav-primary .uk-nav-header,.uk-offcanvas-bar .uk-nav-primary .uk-nav-header,.uk-overlay-primary .uk-nav-primary .uk-nav-header,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header{color:#fff}.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-divider,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-divider,.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-divider,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-divider,.uk-light .uk-nav-primary .uk-nav-divider,.uk-offcanvas-bar .uk-nav-primary .uk-nav-divider,.uk-overlay-primary .uk-nav-primary .uk-nav-divider,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider{border-top-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub a,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a,.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a,.uk-light .uk-nav-primary .uk-nav-sub a,.uk-offcanvas-bar .uk-nav-primary .uk-nav-sub a,.uk-overlay-primary .uk-nav-primary .uk-nav-sub a,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub a:focus,.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:hover,.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub a:focus,.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:hover,.uk-light .uk-nav-primary .uk-nav-sub a:focus,.uk-light .uk-nav-primary .uk-nav-sub a:hover,.uk-offcanvas-bar .uk-nav-primary .uk-nav-sub a:focus,.uk-offcanvas-bar .uk-nav-primary .uk-nav-sub a:hover,.uk-overlay-primary .uk-nav-primary .uk-nav-sub a:focus,.uk-overlay-primary .uk-nav-primary .uk-nav-sub a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-navbar-nav>li>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a,.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a,.uk-light .uk-navbar-nav>li>a,.uk-offcanvas-bar .uk-navbar-nav>li>a,.uk-overlay-primary .uk-navbar-nav>li>a,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-navbar-nav>li:hover>a,.uk-card-primary.uk-card-body .uk-navbar-nav>li>a.uk-open,.uk-card-primary.uk-card-body .uk-navbar-nav>li>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li:hover>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a.uk-open,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:focus,.uk-card-secondary.uk-card-body .uk-navbar-nav>li:hover>a,.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a.uk-open,.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li:hover>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a.uk-open,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:focus,.uk-light .uk-navbar-nav>li:hover>a,.uk-light .uk-navbar-nav>li>a.uk-open,.uk-light .uk-navbar-nav>li>a:focus,.uk-offcanvas-bar .uk-navbar-nav>li:hover>a,.uk-offcanvas-bar .uk-navbar-nav>li>a.uk-open,.uk-offcanvas-bar .uk-navbar-nav>li>a:focus,.uk-overlay-primary .uk-navbar-nav>li:hover>a,.uk-overlay-primary .uk-navbar-nav>li>a.uk-open,.uk-overlay-primary .uk-navbar-nav>li>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a.uk-open,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a.uk-open,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a.uk-open,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a.uk-open,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:focus{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-navbar-nav>li>a:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:active,.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:active,.uk-light .uk-navbar-nav>li>a:active,.uk-offcanvas-bar .uk-navbar-nav>li>a:active,.uk-overlay-primary .uk-navbar-nav>li>a:active,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active{color:#fff}.uk-card-primary.uk-card-body .uk-navbar-nav>li.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li.uk-active>a,.uk-card-secondary.uk-card-body .uk-navbar-nav>li.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li.uk-active>a,.uk-light .uk-navbar-nav>li.uk-active>a,.uk-offcanvas-bar .uk-navbar-nav>li.uk-active>a,.uk-overlay-primary .uk-navbar-nav>li.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a{color:#fff}.uk-card-primary.uk-card-body .uk-navbar-item,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-item,.uk-card-secondary.uk-card-body .uk-navbar-item,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-item,.uk-light .uk-navbar-item,.uk-offcanvas-bar .uk-navbar-item,.uk-overlay-primary .uk-navbar-item,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-item,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-item,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-item,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-item{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-navbar-toggle,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle,.uk-card-secondary.uk-card-body .uk-navbar-toggle,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle,.uk-light .uk-navbar-toggle,.uk-offcanvas-bar .uk-navbar-toggle,.uk-overlay-primary .uk-navbar-toggle,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-navbar-toggle.uk-open,.uk-card-primary.uk-card-body .uk-navbar-toggle:focus,.uk-card-primary.uk-card-body .uk-navbar-toggle:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle.uk-open,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle:hover,.uk-card-secondary.uk-card-body .uk-navbar-toggle.uk-open,.uk-card-secondary.uk-card-body .uk-navbar-toggle:focus,.uk-card-secondary.uk-card-body .uk-navbar-toggle:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle.uk-open,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle:hover,.uk-light .uk-navbar-toggle.uk-open,.uk-light .uk-navbar-toggle:focus,.uk-light .uk-navbar-toggle:hover,.uk-offcanvas-bar .uk-navbar-toggle.uk-open,.uk-offcanvas-bar .uk-navbar-toggle:focus,.uk-offcanvas-bar .uk-navbar-toggle:hover,.uk-overlay-primary .uk-navbar-toggle.uk-open,.uk-overlay-primary .uk-navbar-toggle:focus,.uk-overlay-primary .uk-navbar-toggle:hover,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle.uk-open,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle:focus,.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle.uk-open,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle.uk-open,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle.uk-open,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-subnav>*>:first-child,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>*>:first-child,.uk-card-secondary.uk-card-body .uk-subnav>*>:first-child,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>*>:first-child,.uk-light .uk-subnav>*>:first-child,.uk-offcanvas-bar .uk-subnav>*>:first-child,.uk-overlay-primary .uk-subnav>*>:first-child,.uk-section-primary:not(.uk-preserve-color) .uk-subnav>*>:first-child,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>*>:first-child,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>*>:first-child,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>*>:first-child{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-subnav>*>a:focus,.uk-card-primary.uk-card-body .uk-subnav>*>a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>*>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>*>a:hover,.uk-card-secondary.uk-card-body .uk-subnav>*>a:focus,.uk-card-secondary.uk-card-body .uk-subnav>*>a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>*>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>*>a:hover,.uk-light .uk-subnav>*>a:focus,.uk-light .uk-subnav>*>a:hover,.uk-offcanvas-bar .uk-subnav>*>a:focus,.uk-offcanvas-bar .uk-subnav>*>a:hover,.uk-overlay-primary .uk-subnav>*>a:focus,.uk-overlay-primary .uk-subnav>*>a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-subnav>*>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-subnav>*>a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>*>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>*>a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>*>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>*>a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>*>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>*>a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-subnav>.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>.uk-active>a,.uk-card-secondary.uk-card-body .uk-subnav>.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>.uk-active>a,.uk-light .uk-subnav>.uk-active>a,.uk-offcanvas-bar .uk-subnav>.uk-active>a,.uk-overlay-primary .uk-subnav>.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>.uk-active>a{color:#fff}.uk-card-primary.uk-card-body .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-secondary.uk-card-body .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-light .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-offcanvas-bar .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-overlay-primary .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before{border-left-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-subnav-pill>*>:first-child,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>:first-child,.uk-card-secondary.uk-card-body .uk-subnav-pill>*>:first-child,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>:first-child,.uk-light .uk-subnav-pill>*>:first-child,.uk-offcanvas-bar .uk-subnav-pill>*>:first-child,.uk-overlay-primary .uk-subnav-pill>*>:first-child,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child{background-color:transparent;color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-subnav-pill>*>a:focus,.uk-card-primary.uk-card-body .uk-subnav-pill>*>a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:hover,.uk-card-secondary.uk-card-body .uk-subnav-pill>*>a:focus,.uk-card-secondary.uk-card-body .uk-subnav-pill>*>a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:hover,.uk-light .uk-subnav-pill>*>a:focus,.uk-light .uk-subnav-pill>*>a:hover,.uk-offcanvas-bar .uk-subnav-pill>*>a:focus,.uk-offcanvas-bar .uk-subnav-pill>*>a:hover,.uk-overlay-primary .uk-subnav-pill>*>a:focus,.uk-overlay-primary .uk-subnav-pill>*>a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover{background-color:rgba(255,255,255,.1);color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-subnav-pill>*>a:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:active,.uk-card-secondary.uk-card-body .uk-subnav-pill>*>a:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:active,.uk-light .uk-subnav-pill>*>a:active,.uk-offcanvas-bar .uk-subnav-pill>*>a:active,.uk-overlay-primary .uk-subnav-pill>*>a:active,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active{background-color:rgba(255,255,255,.1);color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-subnav-pill>.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>.uk-active>a,.uk-card-secondary.uk-card-body .uk-subnav-pill>.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>.uk-active>a,.uk-light .uk-subnav-pill>.uk-active>a,.uk-offcanvas-bar .uk-subnav-pill>.uk-active>a,.uk-overlay-primary .uk-subnav-pill>.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a{background-color:#fff;color:#666}.uk-card-primary.uk-card-body .uk-subnav>.uk-disabled>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>.uk-disabled>a,.uk-card-secondary.uk-card-body .uk-subnav>.uk-disabled>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>.uk-disabled>a,.uk-light .uk-subnav>.uk-disabled>a,.uk-offcanvas-bar .uk-subnav>.uk-disabled>a,.uk-overlay-primary .uk-subnav>.uk-disabled>a,.uk-section-primary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-breadcrumb>*>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>*>*,.uk-card-secondary.uk-card-body .uk-breadcrumb>*>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>*>*,.uk-light .uk-breadcrumb>*>*,.uk-offcanvas-bar .uk-breadcrumb>*>*,.uk-overlay-primary .uk-breadcrumb>*>*,.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>*>*,.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>*,.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>*>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>*{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-breadcrumb>*>:focus,.uk-card-primary.uk-card-body .uk-breadcrumb>*>:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:hover,.uk-card-secondary.uk-card-body .uk-breadcrumb>*>:focus,.uk-card-secondary.uk-card-body .uk-breadcrumb>*>:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:hover,.uk-light .uk-breadcrumb>*>:focus,.uk-light .uk-breadcrumb>*>:hover,.uk-offcanvas-bar .uk-breadcrumb>*>:focus,.uk-offcanvas-bar .uk-breadcrumb>*>:hover,.uk-overlay-primary .uk-breadcrumb>*>:focus,.uk-overlay-primary .uk-breadcrumb>*>:hover,.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:focus,.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-breadcrumb>:last-child>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>:last-child>*,.uk-card-secondary.uk-card-body .uk-breadcrumb>:last-child>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>:last-child>*,.uk-light .uk-breadcrumb>:last-child>*,.uk-offcanvas-bar .uk-breadcrumb>:last-child>*,.uk-overlay-primary .uk-breadcrumb>:last-child>*,.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-secondary.uk-card-body .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-light .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-offcanvas-bar .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-overlay-primary .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-pagination>*>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>*>*,.uk-card-secondary.uk-card-body .uk-pagination>*>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>*>*,.uk-light .uk-pagination>*>*,.uk-offcanvas-bar .uk-pagination>*>*,.uk-overlay-primary .uk-pagination>*>*,.uk-section-primary:not(.uk-preserve-color) .uk-pagination>*>*,.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>*>*,.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>*>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>*>*{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-pagination>*>:focus,.uk-card-primary.uk-card-body .uk-pagination>*>:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>*>:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>*>:hover,.uk-card-secondary.uk-card-body .uk-pagination>*>:focus,.uk-card-secondary.uk-card-body .uk-pagination>*>:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>*>:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>*>:hover,.uk-light .uk-pagination>*>:focus,.uk-light .uk-pagination>*>:hover,.uk-offcanvas-bar .uk-pagination>*>:focus,.uk-offcanvas-bar .uk-pagination>*>:hover,.uk-overlay-primary .uk-pagination>*>:focus,.uk-overlay-primary .uk-pagination>*>:hover,.uk-section-primary:not(.uk-preserve-color) .uk-pagination>*>:focus,.uk-section-primary:not(.uk-preserve-color) .uk-pagination>*>:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>*>:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>*>:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>*>:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>*>:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>*>:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>*>:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-pagination>.uk-active>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>.uk-active>*,.uk-card-secondary.uk-card-body .uk-pagination>.uk-active>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>.uk-active>*,.uk-light .uk-pagination>.uk-active>*,.uk-offcanvas-bar .uk-pagination>.uk-active>*,.uk-overlay-primary .uk-pagination>.uk-active>*,.uk-section-primary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>.uk-active>*{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-pagination>.uk-disabled>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>.uk-disabled>*,.uk-card-secondary.uk-card-body .uk-pagination>.uk-disabled>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>.uk-disabled>*,.uk-light .uk-pagination>.uk-disabled>*,.uk-offcanvas-bar .uk-pagination>.uk-disabled>*,.uk-overlay-primary .uk-pagination>.uk-disabled>*,.uk-section-primary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-tab::before,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab::before,.uk-card-secondary.uk-card-body .uk-tab::before,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab::before,.uk-light .uk-tab::before,.uk-offcanvas-bar .uk-tab::before,.uk-overlay-primary .uk-tab::before,.uk-section-primary:not(.uk-preserve-color) .uk-tab::before,.uk-section-secondary:not(.uk-preserve-color) .uk-tab::before,.uk-tile-primary:not(.uk-preserve-color) .uk-tab::before,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab::before{border-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-tab>*>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>*>a,.uk-card-secondary.uk-card-body .uk-tab>*>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>*>a,.uk-light .uk-tab>*>a,.uk-offcanvas-bar .uk-tab>*>a,.uk-overlay-primary .uk-tab>*>a,.uk-section-primary:not(.uk-preserve-color) .uk-tab>*>a,.uk-section-secondary:not(.uk-preserve-color) .uk-tab>*>a,.uk-tile-primary:not(.uk-preserve-color) .uk-tab>*>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>*>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-tab>*>a:focus,.uk-card-primary.uk-card-body .uk-tab>*>a:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>*>a:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>*>a:hover,.uk-card-secondary.uk-card-body .uk-tab>*>a:focus,.uk-card-secondary.uk-card-body .uk-tab>*>a:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>*>a:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>*>a:hover,.uk-light .uk-tab>*>a:focus,.uk-light .uk-tab>*>a:hover,.uk-offcanvas-bar .uk-tab>*>a:focus,.uk-offcanvas-bar .uk-tab>*>a:hover,.uk-overlay-primary .uk-tab>*>a:focus,.uk-overlay-primary .uk-tab>*>a:hover,.uk-section-primary:not(.uk-preserve-color) .uk-tab>*>a:focus,.uk-section-primary:not(.uk-preserve-color) .uk-tab>*>a:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-tab>*>a:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-tab>*>a:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-tab>*>a:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-tab>*>a:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>*>a:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>*>a:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-tab>.uk-active>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>.uk-active>a,.uk-card-secondary.uk-card-body .uk-tab>.uk-active>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>.uk-active>a,.uk-light .uk-tab>.uk-active>a,.uk-offcanvas-bar .uk-tab>.uk-active>a,.uk-overlay-primary .uk-tab>.uk-active>a,.uk-section-primary:not(.uk-preserve-color) .uk-tab>.uk-active>a,.uk-section-secondary:not(.uk-preserve-color) .uk-tab>.uk-active>a,.uk-tile-primary:not(.uk-preserve-color) .uk-tab>.uk-active>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>.uk-active>a{color:#fff;border-color:#fff}.uk-card-primary.uk-card-body .uk-tab>.uk-disabled>a,.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>.uk-disabled>a,.uk-card-secondary.uk-card-body .uk-tab>.uk-disabled>a,.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>.uk-disabled>a,.uk-light .uk-tab>.uk-disabled>a,.uk-offcanvas-bar .uk-tab>.uk-disabled>a,.uk-overlay-primary .uk-tab>.uk-disabled>a,.uk-section-primary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,.uk-section-secondary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,.uk-tile-primary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-slidenav,.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav,.uk-card-secondary.uk-card-body .uk-slidenav,.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav,.uk-light .uk-slidenav,.uk-offcanvas-bar .uk-slidenav,.uk-overlay-primary .uk-slidenav,.uk-section-primary:not(.uk-preserve-color) .uk-slidenav,.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav,.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav,.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-slidenav:focus,.uk-card-primary.uk-card-body .uk-slidenav:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav:hover,.uk-card-secondary.uk-card-body .uk-slidenav:focus,.uk-card-secondary.uk-card-body .uk-slidenav:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav:hover,.uk-light .uk-slidenav:focus,.uk-light .uk-slidenav:hover,.uk-offcanvas-bar .uk-slidenav:focus,.uk-offcanvas-bar .uk-slidenav:hover,.uk-overlay-primary .uk-slidenav:focus,.uk-overlay-primary .uk-slidenav:hover,.uk-section-primary:not(.uk-preserve-color) .uk-slidenav:focus,.uk-section-primary:not(.uk-preserve-color) .uk-slidenav:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav:hover{color:rgba(255,255,255,.95)}.uk-card-primary.uk-card-body .uk-slidenav:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav:active,.uk-card-secondary.uk-card-body .uk-slidenav:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav:active,.uk-light .uk-slidenav:active,.uk-offcanvas-bar .uk-slidenav:active,.uk-overlay-primary .uk-slidenav:active,.uk-section-primary:not(.uk-preserve-color) .uk-slidenav:active,.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav:active,.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav:active{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-dotnav>*>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>*,.uk-card-secondary.uk-card-body .uk-dotnav>*>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>*,.uk-light .uk-dotnav>*>*,.uk-offcanvas-bar .uk-dotnav>*>*,.uk-overlay-primary .uk-dotnav>*>*,.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>*,.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>*,.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>*{background-color:transparent;border-color:rgba(255,255,255,.9)}.uk-card-primary.uk-card-body .uk-dotnav>*>:focus,.uk-card-primary.uk-card-body .uk-dotnav>*>:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>:hover,.uk-card-secondary.uk-card-body .uk-dotnav>*>:focus,.uk-card-secondary.uk-card-body .uk-dotnav>*>:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>:hover,.uk-light .uk-dotnav>*>:focus,.uk-light .uk-dotnav>*>:hover,.uk-offcanvas-bar .uk-dotnav>*>:focus,.uk-offcanvas-bar .uk-dotnav>*>:hover,.uk-overlay-primary .uk-dotnav>*>:focus,.uk-overlay-primary .uk-dotnav>*>:hover,.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>:focus,.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>:hover{background-color:rgba(255,255,255,.9);border-color:transparent}.uk-card-primary.uk-card-body .uk-dotnav>*>:active,.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>:active,.uk-card-secondary.uk-card-body .uk-dotnav>*>:active,.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>:active,.uk-light .uk-dotnav>*>:active,.uk-offcanvas-bar .uk-dotnav>*>:active,.uk-overlay-primary .uk-dotnav>*>:active,.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>:active,.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>:active,.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>:active,.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>:active{background-color:rgba(255,255,255,.5);border-color:transparent}.uk-card-primary.uk-card-body .uk-dotnav>.uk-active>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>.uk-active>*,.uk-card-secondary.uk-card-body .uk-dotnav>.uk-active>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>.uk-active>*,.uk-light .uk-dotnav>.uk-active>*,.uk-offcanvas-bar .uk-dotnav>.uk-active>*,.uk-overlay-primary .uk-dotnav>.uk-active>*,.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*{background-color:rgba(255,255,255,.9);border-color:transparent}.uk-card-primary.uk-card-body .uk-accordion-title,.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title,.uk-card-secondary.uk-card-body .uk-accordion-title,.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title,.uk-light .uk-accordion-title,.uk-offcanvas-bar .uk-accordion-title,.uk-overlay-primary .uk-accordion-title,.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title,.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title,.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title,.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title{color:#fff}.uk-card-primary.uk-card-body .uk-accordion-title:focus,.uk-card-primary.uk-card-body .uk-accordion-title:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title:hover,.uk-card-secondary.uk-card-body .uk-accordion-title:focus,.uk-card-secondary.uk-card-body .uk-accordion-title:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title:hover,.uk-light .uk-accordion-title:focus,.uk-light .uk-accordion-title:hover,.uk-offcanvas-bar .uk-accordion-title:focus,.uk-offcanvas-bar .uk-accordion-title:hover,.uk-overlay-primary .uk-accordion-title:focus,.uk-overlay-primary .uk-accordion-title:hover,.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title:focus,.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title:hover{color:#666}.uk-card-primary.uk-card-body .uk-iconnav>*>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>*>*,.uk-card-secondary.uk-card-body .uk-iconnav>*>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>*>*,.uk-light .uk-iconnav>*>*,.uk-offcanvas-bar .uk-iconnav>*>*,.uk-overlay-primary .uk-iconnav>*>*,.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>*>*,.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>*>*,.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>*>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>*>*{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-iconnav>*>:focus,.uk-card-primary.uk-card-body .uk-iconnav>*>:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>*>:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>*>:hover,.uk-card-secondary.uk-card-body .uk-iconnav>*>:focus,.uk-card-secondary.uk-card-body .uk-iconnav>*>:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>*>:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>*>:hover,.uk-light .uk-iconnav>*>:focus,.uk-light .uk-iconnav>*>:hover,.uk-offcanvas-bar .uk-iconnav>*>:focus,.uk-offcanvas-bar .uk-iconnav>*>:hover,.uk-overlay-primary .uk-iconnav>*>:focus,.uk-overlay-primary .uk-iconnav>*>:hover,.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>*>:focus,.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>*>:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>*>:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>*>:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>*>:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>*>:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>*>:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>*>:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-iconnav>.uk-active>*,.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>.uk-active>*,.uk-card-secondary.uk-card-body .uk-iconnav>.uk-active>*,.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>.uk-active>*,.uk-light .uk-iconnav>.uk-active>*,.uk-offcanvas-bar .uk-iconnav>.uk-active>*,.uk-overlay-primary .uk-iconnav>.uk-active>*,.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>.uk-active>*,.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>.uk-active>*,.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>.uk-active>*,.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>.uk-active>*{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-text-lead,.uk-card-primary>:not([class*=uk-card-media]) .uk-text-lead,.uk-card-secondary.uk-card-body .uk-text-lead,.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-lead,.uk-light .uk-text-lead,.uk-offcanvas-bar .uk-text-lead,.uk-overlay-primary .uk-text-lead,.uk-section-primary:not(.uk-preserve-color) .uk-text-lead,.uk-section-secondary:not(.uk-preserve-color) .uk-text-lead,.uk-tile-primary:not(.uk-preserve-color) .uk-text-lead,.uk-tile-secondary:not(.uk-preserve-color) .uk-text-lead{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-text-meta,.uk-card-primary>:not([class*=uk-card-media]) .uk-text-meta,.uk-card-secondary.uk-card-body .uk-text-meta,.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-meta,.uk-light .uk-text-meta,.uk-offcanvas-bar .uk-text-meta,.uk-overlay-primary .uk-text-meta,.uk-section-primary:not(.uk-preserve-color) .uk-text-meta,.uk-section-secondary:not(.uk-preserve-color) .uk-text-meta,.uk-tile-primary:not(.uk-preserve-color) .uk-text-meta,.uk-tile-secondary:not(.uk-preserve-color) .uk-text-meta{color:rgba(255,255,255,.5)}.uk-card-primary.uk-card-body .uk-text-muted,.uk-card-primary>:not([class*=uk-card-media]) .uk-text-muted,.uk-card-secondary.uk-card-body .uk-text-muted,.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-muted,.uk-light .uk-text-muted,.uk-offcanvas-bar .uk-text-muted,.uk-overlay-primary .uk-text-muted,.uk-section-primary:not(.uk-preserve-color) .uk-text-muted,.uk-section-secondary:not(.uk-preserve-color) .uk-text-muted,.uk-tile-primary:not(.uk-preserve-color) .uk-text-muted,.uk-tile-secondary:not(.uk-preserve-color) .uk-text-muted{color:rgba(255,255,255,.5)!important}.uk-card-primary.uk-card-body .uk-text-primary,.uk-card-primary>:not([class*=uk-card-media]) .uk-text-primary,.uk-card-secondary.uk-card-body .uk-text-primary,.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-primary,.uk-light .uk-text-primary,.uk-offcanvas-bar .uk-text-primary,.uk-overlay-primary .uk-text-primary,.uk-section-primary:not(.uk-preserve-color) .uk-text-primary,.uk-section-secondary:not(.uk-preserve-color) .uk-text-primary,.uk-tile-primary:not(.uk-preserve-color) .uk-text-primary,.uk-tile-secondary:not(.uk-preserve-color) .uk-text-primary{color:rgba(255,255,255,.7)!important}.uk-card-primary.uk-card-body .uk-column-divider,.uk-card-primary>:not([class*=uk-card-media]) .uk-column-divider,.uk-card-secondary.uk-card-body .uk-column-divider,.uk-card-secondary>:not([class*=uk-card-media]) .uk-column-divider,.uk-light .uk-column-divider,.uk-offcanvas-bar .uk-column-divider,.uk-overlay-primary .uk-column-divider,.uk-section-primary:not(.uk-preserve-color) .uk-column-divider,.uk-section-secondary:not(.uk-preserve-color) .uk-column-divider,.uk-tile-primary:not(.uk-preserve-color) .uk-column-divider,.uk-tile-secondary:not(.uk-preserve-color) .uk-column-divider{column-rule-color:rgba(255,255,255,.2)}.uk-card-primary.uk-card-body .uk-logo,.uk-card-primary>:not([class*=uk-card-media]) .uk-logo,.uk-card-secondary.uk-card-body .uk-logo,.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo,.uk-light .uk-logo,.uk-offcanvas-bar .uk-logo,.uk-overlay-primary .uk-logo,.uk-section-primary:not(.uk-preserve-color) .uk-logo,.uk-section-secondary:not(.uk-preserve-color) .uk-logo,.uk-tile-primary:not(.uk-preserve-color) .uk-logo,.uk-tile-secondary:not(.uk-preserve-color) .uk-logo{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-logo:focus,.uk-card-primary.uk-card-body .uk-logo:hover,.uk-card-primary>:not([class*=uk-card-media]) .uk-logo:focus,.uk-card-primary>:not([class*=uk-card-media]) .uk-logo:hover,.uk-card-secondary.uk-card-body .uk-logo:focus,.uk-card-secondary.uk-card-body .uk-logo:hover,.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo:focus,.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo:hover,.uk-light .uk-logo:focus,.uk-light .uk-logo:hover,.uk-offcanvas-bar .uk-logo:focus,.uk-offcanvas-bar .uk-logo:hover,.uk-overlay-primary .uk-logo:focus,.uk-overlay-primary .uk-logo:hover,.uk-section-primary:not(.uk-preserve-color) .uk-logo:focus,.uk-section-primary:not(.uk-preserve-color) .uk-logo:hover,.uk-section-secondary:not(.uk-preserve-color) .uk-logo:focus,.uk-section-secondary:not(.uk-preserve-color) .uk-logo:hover,.uk-tile-primary:not(.uk-preserve-color) .uk-logo:focus,.uk-tile-primary:not(.uk-preserve-color) .uk-logo:hover,.uk-tile-secondary:not(.uk-preserve-color) .uk-logo:focus,.uk-tile-secondary:not(.uk-preserve-color) .uk-logo:hover{color:rgba(255,255,255,.7)}.uk-card-primary.uk-card-body .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-card-primary>:not([class*=uk-card-media]) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-card-secondary.uk-card-body .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-light .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-offcanvas-bar .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-overlay-primary .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-section-primary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-section-secondary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-tile-primary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),.uk-tile-secondary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type){display:none}.uk-card-primary.uk-card-body .uk-logo-inverse,.uk-card-primary>:not([class*=uk-card-media]) .uk-logo-inverse,.uk-card-secondary.uk-card-body .uk-logo-inverse,.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo-inverse,.uk-light .uk-logo-inverse,.uk-offcanvas-bar .uk-logo-inverse,.uk-overlay-primary .uk-logo-inverse,.uk-section-primary:not(.uk-preserve-color) .uk-logo-inverse,.uk-section-secondary:not(.uk-preserve-color) .uk-logo-inverse,.uk-tile-primary:not(.uk-preserve-color) .uk-logo-inverse,.uk-tile-secondary:not(.uk-preserve-color) .uk-logo-inverse{display:inline}.uk-card-primary.uk-card-body .uk-accordion-title::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title::after,.uk-card-secondary.uk-card-body .uk-accordion-title::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title::after,.uk-light .uk-accordion-title::after,.uk-offcanvas-bar .uk-accordion-title::after,.uk-overlay-primary .uk-accordion-title::after,.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title::after,.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title::after,.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20width%3D%221%22%20height%3D%2213%22%20x%3D%226%22%20y%3D%220%22%20%2F%3E%0A%3C%2Fsvg%3E\")}.uk-card-primary.uk-card-body .uk-open>.uk-accordion-title::after,.uk-card-primary>:not([class*=uk-card-media]) .uk-open>.uk-accordion-title::after,.uk-card-secondary.uk-card-body .uk-open>.uk-accordion-title::after,.uk-card-secondary>:not([class*=uk-card-media]) .uk-open>.uk-accordion-title::after,.uk-light .uk-open>.uk-accordion-title::after,.uk-offcanvas-bar .uk-open>.uk-accordion-title::after,.uk-overlay-primary .uk-open>.uk-accordion-title::after,.uk-section-primary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::after,.uk-section-secondary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::after,.uk-tile-primary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::after,.uk-tile-secondary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::after{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.7%29%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%3C%2Fsvg%3E\")}@media print{*,::after,::before{background:0 0!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}@page{margin:.5cm}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*! UIkit 3.0.0-beta.38 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("uikit",e):t.UIkit=e()}(this,function(){"use strict";var t=2,e="setImmediate"in window?setImmediate:setTimeout;function i(e){this.state=t,this.value=void 0,this.deferred=[];var i=this;try{e(function(t){i.resolve(t)},function(t){i.reject(t)})}catch(t){i.reject(t)}}i.reject=function(t){return new i(function(e,i){i(t)})},i.resolve=function(t){return new i(function(e,i){e(t)})},i.all=function(t){return new i(function(e,n){var o=0,r=[];0===t.length&&e(r);function s(i){return function(n){r[i]=n,(o+=1)===t.length&&e(r)}}for(var a=0;a<t.length;a+=1)i.resolve(t[a]).then(s(a),n)})},i.race=function(t){return new i(function(e,n){for(var o=0;o<t.length;o+=1)i.resolve(t[o]).then(e,n)})};var n=i.prototype;n.resolve=function(e){var i=this;if(i.state===t){if(e===i)throw new TypeError("Promise settled with itself.");var n=!1;try{var o=e&&e.then;if(null!==e&&He(e)&&Pe(o))return void o.call(e,function(t){n||i.resolve(t),n=!0},function(t){n||i.reject(t),n=!0})}catch(t){return void(n||i.reject(t))}i.state=0,i.value=e,i.notify()}},n.reject=function(e){if(this.state===t){if(e===this)throw new TypeError("Promise settled with itself.");this.state=1,this.value=e,this.notify()}},n.notify=function(){var i=this;e(function(){if(i.state!==t)for(;i.deferred.length;){var e=i.deferred.shift(),n=e[0],o=e[1],r=e[2],s=e[3];try{0===i.state?Pe(n)?r(n.call(void 0,i.value)):r(i.value):1===i.state&&(Pe(o)?r(o.call(void 0,i.value)):s(i.value))}catch(t){s(t)}}})},n.then=function(t,e){var n=this;return new i(function(i,o){n.deferred.push([t,e,i,o]),n.notify()})},n.catch=function(t){return this.then(void 0,t)};var o=window,r=document,s=r.documentElement,a=o.MutationObserver,l=o.requestAnimationFrame,h="ontouchstart"in o,u=o.PointerEvent,c="ontouchstart"in o||o.DocumentTouch&&r instanceof DocumentTouch||navigator.pointerEnabled&&navigator.maxTouchPoints,d=c?"mousedown "+(h?"touchstart":"pointerdown"):"mousedown",f=c?"mousemove "+(h?"touchmove":"pointermove"):"mousemove",p=c?"mouseup "+(h?"touchend":"pointerup"):"mouseup",m=c&&u?"pointerenter":"mouseenter",g=c&&u?"pointerleave":"mouseleave";var v={};!function(){var t=r.createElement("_").classList;t&&(t.add("a","b"),t.toggle("c",!1),v.Multiple=t.contains("b"),v.Force=!t.contains("c"),v.ClassList=!0),t=null}();function w(t,e,i){if(He(e))for(var n in e)w(t,n,e[n]);else{if(Ye(i))return(t=ie(t))&&t.getAttribute(e);ne(t).forEach(function(t){Pe(i)&&(i=i.call(t,w(t,e))),null===i?y(t,e):t.setAttribute(e,i)})}}function b(t,e){return ne(t).some(function(t){return t.hasAttribute(e)})}function y(t,e){t=ne(t),e.split(" ").forEach(function(e){return t.forEach(function(t){return t.removeAttribute(e)})})}function x(t,e,i,n){w(t,e,function(t){return t?t.replace(i,n):t})}function k(t,e){for(var i=0,n=[e,"data-"+e];i<n.length;i++)if(b(t,n[i]))return w(t,n[i])}function $(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];S(t,e,"add")}function I(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];S(t,e,"remove")}function T(t,e){x(t,"class",new RegExp("(^|\\s)"+e+"(?!\\S)","g"),"")}function C(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];e[0]&&I(t,e[0]),e[1]&&$(t,e[1])}function E(t,e){return v.ClassList&&ne(t).some(function(t){return t.classList.contains(e)})}function _(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];if(v.ClassList&&e.length){var n=Fe((e=A(e))[e.length-1])?void 0:e.pop();e=e.filter(Boolean),ne(t).forEach(function(t){for(var i=t.classList,o=0;o<e.length;o++)v.Force?i.toggle(e[o],n):i[(Ye(n)?!i.contains(e[o]):n)?"add":"remove"](e[o])})}}function S(t,e,i){e=A(e).filter(Boolean),v.ClassList&&e.length&&ne(t).forEach(function(t){var n=t.classList;v.Multiple?n[i].apply(n,e):e.forEach(function(t){return n[i](t)})})}function A(t){return t.reduce(function(t,e){return t.concat.call(t,Fe(e)&&Be(e," ")?e.trim().split(" "):e)},[])}var N={"animation-iteration-count":!0,"column-count":!0,"fill-opacity":!0,"flex-grow":!0,"flex-shrink":!0,"font-weight":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,widows:!0,"z-index":!0,zoom:!0};function D(t,e,i){return ne(t).map(function(t){if(Fe(e)){if(e=z(e),Ye(i))return B(t,e);i||0===i?t.style[e]=Re(i)&&!N[e]?i+"px":i:t.style.removeProperty(e)}else{if(Oe(e)){var n=M(t);return e.reduce(function(t,e){return t[e]=n[z(e)],t},{})}He(e)&&ii(e,function(e,i){return D(t,i,e)})}return t})[0]}function M(t,e){return(t=ie(t)).ownerDocument.defaultView.getComputedStyle(t,e)}function B(t,e,i){return M(t,i)[e]}var O={};function P(t){if(!(t in O)){var e=$t(s,r.createElement("div"));$(e,"var-"+t);try{O[t]=B(e,"content",":before").replace(/^["'](.*)["']$/,"$1"),O[t]=JSON.parse(O[t])}catch(t){}s.removeChild(e)}return O[t]}var H={};function z(t){var e=H[t];return e||(e=H[t]=function(t){if((t=xe(t))in L)return t;var e,i=W.length;for(;i--;)if((e="-"+W[i]+"-"+t)in L)return e}(t)||t),e}var W=["webkit","moz","ms"],L=r.createElement("_").style;var j={width:["x","left","right"],height:["y","top","bottom"]};function F(t,e,i,n,o,r,s,a){i=Q(i),n=Q(n);var l={element:i,target:n};if(!t||!e)return l;var h=R(t),u=R(e),c=u;return Z(c,i,h,-1),Z(c,n,u,1),o=K(o,h.width,h.height),r=K(r,u.width,u.height),o.x+=r.x,o.y+=r.y,c.left+=o.x,c.top+=o.y,a=R(a||G(t)),s&&ii(j,function(t,e){var r=t[0],d=t[1],f=t[2];if(!0===s||Be(s,r)){var p=i[r]===d?-h[e]:i[r]===f?h[e]:0,m=n[r]===d?u[e]:n[r]===f?-u[e]:0;if(c[d]<a[d]||c[d]+h[e]>a[f]){var g=h[e]/2,v="center"===n[r]?-u[e]/2:0;"center"===i[r]&&(w(g,v)||w(-g,-v))||w(p,m)}}function w(t,i){var n=c[d]+t+i-2*o[r];if(n>=a[d]&&n+h[e]<=a[f])return c[d]=n,["element","target"].forEach(function(i){l[i][r]=t?l[i][r]===j[e][1]?j[e][2]:j[e][1]:l[i][r]}),!0}}),V(t,c),l}function V(t,e){t=ie(t);{if(!e)return R(t);var i=V(t),n=D(t,"position");["left","top"].forEach(function(o){if(o in e){var r=D(t,o);t.style[o]=e[o]-i[o]+Xe("absolute"===n&&"auto"===r?Y(t)[o]:r)+"px"}})}}function R(t){var e=G(t=ie(t)),i=e.pageYOffset,n=e.pageXOffset;if(We(t)){var o=t.innerHeight,r=t.innerWidth;return{top:i,left:n,height:o,width:r,bottom:i+o,right:n+r}}var s=!1;wt(t)||(s=t.style.display,t.style.display="block");var a=t.getBoundingClientRect();return!1!==s&&(t.style.display=s),{height:a.height,width:a.width,top:a.top+i,left:a.left+n,bottom:a.bottom+i,right:a.right+n}}function Y(t){var e=function(t){var e=ie(t).offsetParent;for(;e&&"static"===D(e,"position");)e=e.offsetParent;return e||it(t)}(t=ie(t)),i=e===it(t)?{top:0,left:0}:V(e);return["top","left"].reduce(function(n,o){var r=Te(o);return n[o]-=i[o]+(Xe(D(t,"margin"+r))||0)+(Xe(D(e,"border"+r+"Width"))||0),n},V(t))}var q=X("height"),U=X("width");function X(t){var e=Te(t);return function(i,n){if(i=ie(i),Ye(n)){if(We(i))return i["inner"+e];if(Le(i)){var o=i.documentElement;return Math.max(o.offsetHeight,o.scrollHeight)}return n="auto"===(n=D(i,t))?i["offset"+e]:Xe(n)||0,J(t,i,n)}D(i,t,n||0===n?J(t,i,n)+"px":"")}}function J(t,e,i){return"border-box"===D(e,"boxSizing")?j[t].slice(1).map(Te).reduce(function(t,i){return t-Xe(D(e,"padding"+i))-Xe(D(e,"border"+i+"Width"))},i):i}function G(t){return We(t)?t:et(t).defaultView}function Z(t,e,i,n){ii(j,function(o,r){var s=o[0],a=o[1],l=o[2];e[s]===l?t[a]+=i[r]*n:"center"===e[s]&&(t[a]+=i[r]*n/2)})}function Q(t){var e=/left|center|right/,i=/top|center|bottom/;return 1===(t=(t||"").split(" ")).length&&(t=e.test(t[0])?t.concat(["center"]):i.test(t[0])?["center"].concat(t):["center","center"]),{x:e.test(t[0])?t[0]:"center",y:i.test(t[1])?t[1]:"center"}}function K(t,e,i){var n=(t||"").split(" "),o=n[0],r=n[1];return{x:o?Xe(o)*(Ae(o,"%")?e/100:1):0,y:r?Xe(r)*(Ae(r,"%")?i/100:1):0}}function tt(t){switch(t){case"left":return"right";case"right":return"left";case"top":return"bottom";case"bottom":return"top";default:return t}}function et(t){return ie(t).ownerDocument}function it(t){return et(t).documentElement}var nt="rtl"===w(s,"dir");function ot(){return"complete"===r.readyState||"loading"!==r.readyState&&!s.doScroll}function rt(t){if(ot())t();else var e=function(){i(),n(),t()},i=se(r,"DOMContentLoaded",e),n=se(o,"load",e)}function st(t,e,i,n){return void 0===i&&(i=400),void 0===n&&(n="linear"),we.all(ne(t).map(function(t){return new we(function(o,r){for(var s in e){var a=D(t,s);""===a&&D(t,s,a)}var l=setTimeout(function(){return he(t,"transitionend")},i);le(t,"transitionend transitioncanceled",function(e){var i=e.type;clearTimeout(l),I(t,"uk-transition"),D(t,{"transition-property":"","transition-duration":"","transition-timing-function":""}),"transitioncanceled"===i?r():o()},!1,function(e){var i=e.target;return t===i}),$(t,"uk-transition"),D(t,ei({"transition-property":Object.keys(e).map(z).join(","),"transition-duration":i+"ms","transition-timing-function":n},e))})}))}var at={start:st,stop:function(t){return he(t,"transitionend"),we.resolve()},cancel:function(t){he(t,"transitioncanceled")},inProgress:function(t){return E(t,"uk-transition")}},lt="uk-animation-",ht="uk-cancel-animation";function ut(t,e,i,n,o){var r=arguments;return void 0===i&&(i=200),we.all(ne(t).map(function(t){return new we(function(s,a){if(E(t,ht))requestAnimationFrame(function(){return we.resolve().then(function(){return ut.apply(null,r).then(s,a)})});else{var l=e+" "+lt+(o?"leave":"enter");_e(e,lt)&&(n&&(l+=" uk-transform-origin-"+n),o&&(l+=" "+lt+"reverse")),h(),le(t,"animationend animationcancel",function(e){var i=!1;"animationcancel"===e.type?(a(),h()):(s(),we.resolve().then(function(){i=!0,h()})),requestAnimationFrame(function(){i||($(t,ht),requestAnimationFrame(function(){return I(t,ht)}))})},!1,function(e){var i=e.target;return t===i}),D(t,"animationDuration",i+"ms"),$(t,l)}function h(){D(t,"animationDuration",""),T(t,lt+"\\S*")}})}))}var ct=new RegExp(lt+"(enter|leave)"),dt={in:function(t,e,i,n){return ut(t,e,i,n,!1)},out:function(t,e,i,n){return ut(t,e,i,n,!0)},inProgress:function(t){return ct.test(w(t,"class"))},cancel:function(t){he(t,"animationcancel")}};function ft(t,e,i){return void 0===e&&(e=0),void 0===i&&(i=0),ri(ie(t).getBoundingClientRect(),{top:e,left:i,bottom:e+q(o),right:i+U(o)})}function pt(t,e,i,n){void 0===i&&(i=0),void 0===n&&(n=!1);var o=(e=ne(e)).length;return t=Re(t)?Ue(t):"next"===t?i+1:"previous"===t?i-1:Bt(e,t),n?ni(t,0,o-1):(t%=o)<0?t+o:t}var mt={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuitem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};function gt(t){return mt[ie(t).tagName.toLowerCase()]}var vt={ratio:function(t,e,i){var n,o="width"===e?"height":"width";return(n={})[o]=Math.round(i*t[o]/t[e]),n[e]=i,n},contain:function(t,e){var i=this;return ii(t=ei({},t),function(n,o){return t=t[o]>e[o]?i.ratio(t,o,e[o]):t}),t},cover:function(t,e){var i=this;return ii(t=this.contain(t,e),function(n,o){return t=t[o]<e[o]?i.ratio(t,o,e[o]):t}),t}};function wt(t){return ne(t).some(function(t){return t.offsetHeight})}var bt="input,select,textarea,button";function yt(t){return ne(t).some(function(t){return Jt(t,bt)})}function xt(t){return(t=ie(t)).innerHTML="",t}function kt(t,e){return t=ie(t),Ye(e)?t.innerHTML:$t(t.hasChildNodes()?xt(t):t,e)}function $t(t,e){return t=ie(t),Ct(e,function(e){return t.appendChild(e)})}function It(t,e){return t=ie(t),Ct(e,function(e){return t.parentNode.insertBefore(e,t)})}function Tt(t,e){return t=ie(t),Ct(e,function(e){return t.nextSibling?It(t.nextSibling,e):$t(t.parentNode,e)})}function Ct(t,e){return(t=Fe(t)?Mt(t):t)?"length"in t?ne(t).map(e):e(t):null}function Et(t){ne(t).map(function(t){return t.parentNode&&t.parentNode.removeChild(t)})}function _t(t,e){for(e=ie(It(t,e));e.firstChild;)e=e.firstChild;return $t(e,t),e}function St(t,e){return ne(ne(t).map(function(t){return t.hasChildNodes?_t(ne(t.childNodes),e):$t(t,e)}))}function At(t){ne(t).map(function(t){return t.parentNode}).filter(function(t,e,i){return i.indexOf(t)===e}).forEach(function(t){It(t,t.childNodes),Et(t)})}var Nt=/^\s*<(\w+|!)[^>]*>/,Dt=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;function Mt(t){var e;if(e=Dt.exec(t))return r.createElement(e[1]);var i=r.createElement("div");return Nt.test(t)?i.insertAdjacentHTML("beforeend",t.trim()):i.textContent=t,i.childNodes.length>1?ne(i.childNodes):i.firstChild}function Bt(t,e){return e?ne(t).indexOf(ie(e)):ne((t=ie(t))&&t.parentNode.children).indexOf(t)}var Ot=Array.prototype;function Pt(t,e){return Fe(t)?zt(t)?ie(Mt(t)):ie(jt(t,e,"querySelector")):ie(t)}function Ht(t,e){return Fe(t)?zt(t)?ne(Mt(t)):ne(jt(t,e,"querySelectorAll")):ne(t)}function zt(t){return"<"===t[0]||t.match(/^\s*</)}function Wt(t,e){return Pt(t,qt(t)?e:r)}function Lt(t,e){return Ht(t,qt(t)?e:r)}function jt(t,e,i){if(void 0===e&&(e=r),!t||!Fe(t))return null;var n;qt(t=t.replace(Yt,"$1 *"))&&(n=[],t=t.split(",").map(function(t,i){var o=e;if("!"===(t=t.trim())[0]){var r=t.substr(1).trim().split(" ");o=Zt(e.parentNode,r[0]),t=r.slice(1).join(" ")}return o?(o.id||(o.id="uk-"+Date.now()+i,n.push(function(){return y(o,"id")})),"#"+re(o.id)+" "+t):null}).filter(Boolean).join(","),e=r);try{return e[i](t)}catch(t){return null}finally{n&&n.forEach(function(t){return t()})}}function Ft(t,e){return Ht(t).filter(function(t){return Jt(t,e)})}function Vt(t,e){return Fe(e)?Jt(t,e)||Zt(t,e):t===e||ie(e).contains(ie(t))}var Rt=/(^|,)\s*[!>+~]/,Yt=/([!>+~])(?=\s+[!>+~]|\s*$)/g;function qt(t){return Fe(t)&&t.match(Rt)}var Ut=Element.prototype,Xt=Ut.matches||Ut.msMatchesSelector;function Jt(t,e){return ne(t).some(function(t){return Xt.call(t,e)})}var Gt=Ut.closest||function(t){var e=this;do{if(Jt(e,t))return e;e=e.parentNode}while(e&&1===e.nodeType)};function Zt(t,e){return _e(e,">")&&(e=e.slice(1)),te(t)?t.parentNode&&Gt.call(t,e):ne(t).map(function(t){return t.parentNode&&Gt.call(t,e)}).filter(Boolean)}function Qt(t,e){for(var i=[],n=ie(t).parentNode;n&&1===n.nodeType;)Jt(n,e)&&i.push(n),n=n.parentNode;return i}function Kt(t){return He(t)&&!!t.jquery}function te(t){return t instanceof Node||He(t)&&1===t.nodeType}function ee(t){return t instanceof NodeList||t instanceof HTMLCollection}function ie(t){return te(t)||We(t)||Le(t)?t:ee(t)||Kt(t)?t[0]:Oe(t)?ie(t[0]):null}function ne(t){return te(t)?[t]:ee(t)?Ot.slice.call(t):Oe(t)?t.map(ie).filter(Boolean):Kt(t)?t.toArray():[]}var oe=o.CSS&&CSS.escape||function(t){return t.replace(/([^\x7f-\uFFFF\w-])/g,function(t){return"\\"+t})};function re(t){return Fe(t)?oe.call(null,t):""}function se(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i=ce(t),n=i[0],o=i[1],r=i[2],s=i[3],a=i[4];n=fe(n),r&&(s=function(t,e,i){var n=this;return function(o){var r=o.target,s=">"===e[0]?Ht(e,t).reverse().filter(function(t){return Vt(r,t)})[0]:Zt(r,e);s&&(o.delegate=t,o.current=s,i.call(n,o))}}(n,r,s)),s.length>1&&(l=s,s=function(t){return Oe(t.detail)?l.apply(l,[t].concat(t.detail)):l(t)});var l;return o.split(" ").forEach(function(t){return n&&n.addEventListener(t,s,a)}),function(){return ae(n,o,s,a)}}function ae(t,e,i,n){void 0===n&&(n=!1),(t=fe(t))&&e.split(" ").forEach(function(e){return t.removeEventListener(e,i,n)})}function le(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var i=ce(t),n=i[0],o=i[1],r=i[2],s=i[3],a=i[4],l=i[5],h=se(n,o,r,function(t){var e=!l||l(t);e&&(h(),s(t,e))},a);return h}function he(t,e,i){return pe(t).reduce(function(t,n){return t&&n.dispatchEvent(ue(e,!0,!0,i))},!0)}function ue(t,e,i,n){if(void 0===e&&(e=!0),void 0===i&&(i=!1),Fe(t)){var o=r.createEvent("CustomEvent");o.initCustomEvent(t,e,i,n),t=o}return t}function ce(t){return Fe(t[0])&&(t[0]=Pt(t[0])),Pe(t[2])&&t.splice(2,0,!1),t}function de(t){return"EventTarget"in o?t instanceof EventTarget:t&&"addEventListener"in t}function fe(t){return de(t)?t:ie(t)}function pe(t){return de(t)?[t]:Oe(t)?t.map(fe).filter(Boolean):ne(t)}function me(t,e){return function(i){var n=arguments.length;return n?n>1?t.apply(e,arguments):t.call(e,i):t.call(e)}}var ge=Object.prototype.hasOwnProperty;function ve(t,e){return ge.call(t,e)}var we="Promise"in window?window.Promise:i,be=/(?:^|[-_\/])(\w)/g;var ye=/([a-z\d])([A-Z])/g;function xe(t){return t.replace(ye,"$1-$2").toLowerCase()}var ke=/-(\w)/g;function $e(t){return t.replace(ke,Ie)}function Ie(t,e){return e?e.toUpperCase():""}function Te(t){return t.length?Ie(0,t.charAt(0))+t.slice(1):""}var Ce=String.prototype,Ee=Ce.startsWith||function(t){return 0===this.lastIndexOf(t,0)};function _e(t,e){return Ee.call(t,e)}var Se=Ce.endsWith||function(t){return this.substr(-t.length)===t};function Ae(t,e){return Se.call(t,e)}var Ne=function(t){return~this.indexOf(t)},De=Ce.includes||Ne,Me=Array.prototype.includes||Ne;function Be(t,e){return t&&(Fe(t)?De:Me).call(t,e)}var Oe=Array.isArray;function Pe(t){return"function"==typeof t}function He(t){return null!==t&&"object"==typeof t}function ze(t){return He(t)&&Object.getPrototypeOf(t)===Object.prototype}function We(t){return He(t)&&t===t.window}function Le(t){return He(t)&&9===t.nodeType}function je(t){return"boolean"==typeof t}function Fe(t){return"string"==typeof t}function Ve(t){return"number"==typeof t}function Re(t){return Ve(t)||Fe(t)&&!isNaN(t-parseFloat(t))}function Ye(t){return void 0===t}function qe(t){return je(t)?t:"true"===t||"1"===t||""===t||"false"!==t&&"0"!==t&&t}function Ue(t){var e=Number(t);return!isNaN(e)&&e}function Xe(t){return parseFloat(t)||0}function Je(t){return Oe(t)?t:Fe(t)?t.split(/,(?![^(]*\))/).map(function(t){return Re(t)?Ue(t):qe(t.trim())}):[t]}var Ge={};function Ze(t){if(Fe(t))if("@"===t[0]){var e="media-"+t.substr(1);t=Ge[e]||(Ge[e]=Xe(P(e)))}else if(isNaN(t))return t;return!(!t||isNaN(t))&&"(min-width: "+t+"px)"}function Qe(t,e,i){return t===Boolean?qe(e):t===Number?Ue(e):"query"===t?Wt(e,i):"list"===t?Je(e):"media"===t?Ze(e):t?t(e):e}function Ke(t){return t?Ae(t,"ms")?Xe(t):1e3*Xe(t):0}function ti(t,e,i){return t.replace(new RegExp(e+"|"+i,"mg"),function(t){return t===e?i:e})}var ei=Object.assign||function(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];t=Object(t);for(var n=0;n<e.length;n++){var o=e[n];if(null!==o)for(var r in o)ve(o,r)&&(t[r]=o[r])}return t};function ii(t,e){for(var i in t)if(!1===e.call(t[i],t[i],i))break}function ni(t,e,i){return void 0===e&&(e=0),void 0===i&&(i=1),Math.min(Math.max(t,e),i)}function oi(){}function ri(t,e){return t.left<=e.right&&e.left<=t.right&&t.top<=e.bottom&&e.top<=t.bottom}function si(t,e){return ri({top:t.y,bottom:t.y,left:t.x,right:t.x},e)}function ai(t,e){return new we(function(i,n){var o=ei({data:null,method:"GET",headers:{},xhr:new XMLHttpRequest,beforeSend:oi,responseType:""},e),r=o.xhr;o.beforeSend(o);for(var s in o)if(s in r)try{r[s]=o[s]}catch(t){}r.open(o.method.toUpperCase(),t);for(var a in o.headers)r.setRequestHeader(a,o.headers[a]);se(r,"load",function(){0===r.status||r.status>=200&&r.status<300||304===r.status?i(r):n(ei(Error(r.statusText),{xhr:r,status:r.status}))}),se(r,"error",function(){return n(ei(Error("Network Error"),{xhr:r}))}),se(r,"timeout",function(){return n(ei(Error("Network Timeout"),{xhr:r}))}),r.send(o.data)})}var li={reads:[],writes:[],read:function(t){return this.reads.push(t),hi(),t},write:function(t){return this.writes.push(t),hi(),t},clear:function(t){return ci(this.reads,t)||ci(this.writes,t)},flush:function(){ui(this.reads),ui(this.writes.splice(0,this.writes.length)),this.scheduled=!1,(this.reads.length||this.writes.length)&&hi()}};function hi(){li.scheduled||(li.scheduled=!0,l(li.flush.bind(li)))}function ui(t){for(var e;e=t.shift();)e()}function ci(t,e){var i=t.indexOf(e);return!!~i&&!!t.splice(i,1)}function di(){}di.prototype={positions:[],position:null,init:function(){var t=this;this.positions=[],this.position=null;var e=!1;this.unbind=se(r,"mousemove",function(i){e||(setTimeout(function(){var n=Date.now(),o=t.positions.length;o&&n-t.positions[o-1].time>100&&t.positions.splice(0,o),t.positions.push({time:n,x:i.pageX,y:i.pageY}),t.positions.length>5&&t.positions.shift(),e=!1},5),e=!0)})},cancel:function(){this.unbind&&this.unbind()},movesTo:function(t){if(this.positions.length<2)return!1;var e=V(t),i=this.positions[this.positions.length-1],n=this.positions[0];if(e.left<=i.x&&i.x<=e.right&&e.top<=i.y&&i.y<=e.bottom)return!1;var o=[[{x:e.left,y:e.top},{x:e.right,y:e.bottom}],[{x:e.right,y:e.top},{x:e.left,y:e.bottom}]];return e.right<=i.x||(e.left>=i.x?(o[0].reverse(),o[1].reverse()):e.bottom<=i.y?o[0].reverse():e.top>=i.y&&o[1].reverse()),!!o.reduce(function(t,e){return t+(fi(n,e[0])<fi(i,e[0])&&fi(n,e[1])>fi(i,e[1]))},0)}};function fi(t,e){return(e.y-t.y)/(e.x-t.x)}var pi={};pi.args=pi.events=pi.init=pi.created=pi.beforeConnect=pi.connected=pi.ready=pi.beforeDisconnect=pi.disconnected=pi.destroy=function(t,e){return t=t&&!Oe(t)?[t]:t,e?t?t.concat(e):Oe(e)?e:[e]:t},pi.update=function(t,e){return pi.args(t,Pe(e)?{read:e}:e)},pi.props=function(t,e){return Oe(e)&&(e=e.reduce(function(t,e){return t[e]=String,t},{})),pi.methods(t,e)},pi.computed=pi.defaults=pi.methods=function(t,e){return e?t?ei({},t,e):e:t};var mi=function(t,e){return Ye(e)?t:e};function gi(t,e){var i,n={};if(e.mixins)for(var o=0,r=e.mixins.length;o<r;o++)t=gi(t,e.mixins[o]);for(i in t)s(i);for(i in e)ve(t,i)||s(i);function s(i){n[i]=(pi[i]||mi)(t[i],e[i])}return n}var vi=0,wi=function(t){this.id=++vi,this.el=ie(t)};wi.prototype.isVideo=function(){return this.isYoutube()||this.isVimeo()||this.isHTML5()},wi.prototype.isHTML5=function(){return"VIDEO"===this.el.tagName},wi.prototype.isIFrame=function(){return"IFRAME"===this.el.tagName},wi.prototype.isYoutube=function(){return this.isIFrame()&&!!this.el.src.match(/\/\/.*?youtube\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/)},wi.prototype.isVimeo=function(){return this.isIFrame()&&!!this.el.src.match(/vimeo\.com\/video\/.*/)},wi.prototype.enableApi=function(){var t=this;if(this.ready)return this.ready;var e,n=this.isYoutube(),r=this.isVimeo();return n||r?this.ready=new i(function(s){le(t.el,"load",function(){if(n){var i=function(){return bi(t.el,{event:"listening",id:t.id})};e=setInterval(i,100),i()}}),(a=function(e){return n&&e.id===t.id&&"onReady"===e.event||r&&Number(e.player_id)===t.id},new i(function(t){le(o,"message",function(e,i){return t(i)},!1,function(t){var e=t.data;if(e&&Fe(e)){try{e=JSON.parse(e)}catch(t){return}return e&&a(e)}})})).then(function(){s(),e&&clearInterval(e)});var a;w(t.el,"src",t.el.src+(Be(t.el.src,"?")?"&":"?")+(n?"enablejsapi=1":"api=1&player_id="+vi))}):i.resolve()},wi.prototype.play=function(){var t=this;if(this.isVideo())if(this.isIFrame())this.enableApi().then(function(){return bi(t.el,{func:"playVideo",method:"play"})});else if(this.isHTML5())try{this.el.play()}catch(t){}},wi.prototype.pause=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return bi(t.el,{func:"pauseVideo",method:"pause"})}):this.isHTML5()&&this.el.pause())},wi.prototype.mute=function(){var t=this;this.isVideo()&&(this.isIFrame()?this.enableApi().then(function(){return bi(t.el,{func:"mute",method:"setVolume",value:0})}):this.isHTML5()&&(this.el.muted=!0,w(this.el,"muted","")))};function bi(t,e){try{t.contentWindow.postMessage(JSON.stringify(ei({event:"command"},e)),"*")}catch(t){}}var yi,xi,ki,$i,Ii={};function Ti(){yi&&clearTimeout(yi),xi&&clearTimeout(xi),ki&&clearTimeout(ki),yi=xi=ki=null,Ii={}}rt(function(){se(r,"click",function(){return $i=!0},!0),se(r,d,function(t){var e=t.target,i=_i(t),n=i.x,o=i.y,r=Date.now();Ii.el="tagName"in e?e:e.parentNode,yi&&clearTimeout(yi),Ii.x1=n,Ii.y1=o,Ii.last&&r-Ii.last<=250&&(Ii={}),Ii.last=r,$i=t.button>0}),se(r,f,function(t){var e=_i(t),i=e.x,n=e.y;Ii.x2=i,Ii.y2=n}),se(r,p,function(t){var e=t.type,i=t.target;Ii.x2&&Math.abs(Ii.x1-Ii.x2)>30||Ii.y2&&Math.abs(Ii.y1-Ii.y2)>30?xi=setTimeout(function(){Ii.el&&(he(Ii.el,"swipe"),he(Ii.el,"swipe"+function(t){var e=t.x1,i=t.x2,n=t.y1,o=t.y2;return Math.abs(e-i)>=Math.abs(n-o)?e-i>0?"Left":"Right":n-o>0?"Up":"Down"}(Ii))),Ii={}}):"last"in Ii?(ki=setTimeout(function(){return Ii.el&&he(Ii.el,"tap")}),Ii.el&&"mouseup"!==e&&Vt(i,Ii.el)&&(yi=setTimeout(function(){yi=null,Ii.el&&!$i&&he(Ii.el,"click"),Ii={}},350))):Ii={}}),se(r,"touchcancel",Ti),se(o,"scroll",Ti)});var Ci=!1;se(r,"touchstart",function(){return Ci=!0},!0),se(r,"click",function(){Ci=!1}),se(r,"touchcancel",function(){return Ci=!1},!0);function Ei(t){return Ci||"touch"===t.pointerType}function _i(t){var e=t.touches,i=t.changedTouches,n=e&&e[0]||i&&i[0]||t;return{x:n.pageX,y:n.pageY}}var Si=Object.freeze({bind:me,hasOwn:ve,Promise:we,Deferred:function(){var t=this;this.promise=new we(function(e,i){t.reject=i,t.resolve=e})},classify:function(t){return t.replace(be,function(t,e){return e?e.toUpperCase():""})},hyphenate:xe,camelize:$e,ucfirst:Te,startsWith:_e,endsWith:Ae,includes:Be,isArray:Oe,isFunction:Pe,isObject:He,isPlainObject:ze,isWindow:We,isDocument:Le,isBoolean:je,isString:Fe,isNumber:Ve,isNumeric:Re,isUndefined:Ye,toBoolean:qe,toNumber:Ue,toFloat:Xe,toList:Je,toMedia:Ze,coerce:Qe,toMs:Ke,swap:ti,assign:ei,each:ii,clamp:ni,noop:oi,intersectRect:ri,pointInRect:si,ajax:ai,$:Pt,$$:Ht,query:Wt,queryAll:Lt,filter:Ft,within:Vt,matches:Jt,closest:Zt,parents:Qt,isJQuery:Kt,toNode:ie,toNodes:ne,escape:re,attr:w,hasAttr:b,removeAttr:y,filterAttr:x,data:k,isRtl:nt,isReady:ot,ready:rt,transition:st,Transition:at,animate:ut,Animation:dt,isInView:ft,scrolledOver:function(t){var e=(t=ie(t)).offsetHeight,i=function(t){var e=0;do{e+=t.offsetTop}while(t=t.offsetParent);return e}(t),n=q(o),s=n+Math.min(0,i-n),a=Math.max(0,n-(q(r)-(i+e)));return ni((s+o.pageYOffset-i)/((s+(e-(a<n?a:0)))/100)/100)},getIndex:pt,isVoidElement:gt,Dimensions:vt,preventClick:function(){var t=setTimeout(function(){return he(r,"click")},0);le(r,"click",function(e){e.preventDefault(),e.stopImmediatePropagation(),clearTimeout(t)},!0)},isVisible:wt,selInput:bt,isInput:yt,empty:xt,html:kt,prepend:function(t,e){return(t=ie(t)).hasChildNodes()?Ct(e,function(e){return t.insertBefore(e,t.firstChild)}):$t(t,e)},append:$t,before:It,after:Tt,remove:Et,wrapAll:_t,wrapInner:St,unwrap:At,fragment:Mt,index:Bt,css:D,getStyles:M,getStyle:B,getCssVar:P,propName:z,addClass:$,removeClass:I,removeClasses:T,replaceClass:C,hasClass:E,toggleClass:_,win:o,doc:r,docEl:s,Observer:a,requestAnimationFrame:l,hasTouch:c,pointerDown:d,pointerMove:f,pointerUp:p,pointerEnter:m,pointerLeave:g,getImage:function(t){return new i(function(e,i){var n=new Image;n.onerror=i,n.onload=function(){return e(n)},n.src=t})},supports:v,on:se,off:ae,once:le,trigger:he,createEvent:ue,toEventTargets:pe,fastdom:li,MouseTracker:di,mergeOptions:gi,Player:wi,positionAt:F,offset:V,position:Y,height:q,width:U,flipPosition:tt,isTouch:Ei,getPos:_i});function Ai(t){return!(!_e(t,"uk-")&&!_e(t,"data-uk-"))&&$e(t.replace("data-uk-","").replace("uk-",""))}var Ni=function(t){this._init(t)};Ni.util=Si,Ni.data="__uikit__",Ni.prefix="uk-",Ni.options={},Ni.instances={},Ni.elements=[],function(t){var e=t.data;t.use=function(t){if(!t.installed)return t.call(null,this),t.installed=!0,this},t.mixin=function(e,i){i=(Fe(i)?t.components[i]:i)||this,(e=gi({},e)).mixins=i.options.mixins,delete i.options.mixins,i.options=gi(e,i.options)},t.extend=function(t){t=t||{};var e=function(t){this._init(t)};return(e.prototype=Object.create(this.prototype)).constructor=e,e.options=gi(this.options,t),e.super=this,e.extend=this.extend,e},t.update=function(i,o,r){if(void 0===r&&(r=!1),i=ue(i||"update"),o)if(o=ie(o),r)do{n(o[e],i),o=o.parentNode}while(o);else!function t(e,i){if(1===e.nodeType)for(i(e),e=e.firstElementChild;e;)t(e,i),e=e.nextElementSibling}(o,function(t){return n(t[e],i)});else n(t.instances,i)};var i;Object.defineProperty(t,"container",{get:function(){return i||r.body},set:function(t){i=Pt(t)}});function n(t,e){if(t)for(var i in t)t[i]._isReady&&t[i]._callUpdate(e)}}(Ni),(Di=Ni).prototype._callHook=function(t){var e=this,i=this.$options[t];i&&i.forEach(function(t){return t.call(e)})},Di.prototype._callConnected=function(){var t=this;this._connected||(Be(Di.elements,this.$options.el)||Di.elements.push(this.$options.el),Di.instances[this._uid]=this,this._data={},this._callHook("beforeConnect"),this._connected=!0,this._initEvents(),this._initObserver(),this._callHook("connected"),this._isReady||rt(function(){return t._callReady()}),this._callUpdate())},Di.prototype._callDisconnected=function(){if(this._connected){this._callHook("beforeDisconnect"),this._observer&&(this._observer.disconnect(),this._observer=null);var t=Di.elements.indexOf(this.$options.el);~t&&Di.elements.splice(t,1),delete Di.instances[this._uid],this._unbindEvents(),this._callHook("disconnected"),this._connected=!1}},Di.prototype._callReady=function(){this._isReady||(this._isReady=!0,this._callHook("ready"),this._resetComputeds(),this._callUpdate())},Di.prototype._callUpdate=function(t){var e=this,i=(t=ue(t||"update")).type,n=t.detail;"update"===i&&n&&n.mutation&&this._resetComputeds();var o=this.$options.update,r=this._frames,s=r.reads,a=r.writes;o&&o.forEach(function(n,o){var r=n.read,l=n.write,h=n.events;("update"===i||Be(h,i))&&(r&&!Be(li.reads,s[o])&&(s[o]=li.read(function(){var i=r.call(e,e._data,t);!1===i&&l?(li.clear(a[o]),delete a[o]):ze(i)&&ei(e._data,i),delete s[o]})),l&&!Be(li.writes,a[o])&&(a[o]=li.write(function(){l.call(e,e._data,t),delete a[o]})))})};var Di;!function(t){var e=0;t.prototype.props={},t.prototype._init=function(i){i=i||{},i=this.$options=gi(this.constructor.options,i),this.$el=null,this.$name=t.prefix+xe(this.$options.name),this.$props={},this._frames={reads:{},writes:{}},this._events=[],this._uid=e++,this._initData(),this._initMethods(),this._initComputeds(),this._callHook("created"),i.el&&this.$mount(i.el)},t.prototype._initData=function(){var t=this.$options,e=t.defaults,i=t.data;void 0===i&&(i={});var n=t.args;void 0===n&&(n=[]);var o=t.props;void 0===o&&(o={});var r=t.el;n.length&&Oe(i)&&(i=i.slice(0,n.length).reduce(function(t,e,i){return ze(e)?ei(t,e):t[n[i]]=e,t},{}));for(var s in ei({},e,o))this.$props[s]=this[s]=ve(i,s)&&!Ye(i[s])?Qe(o[s],i[s],r):e?e[s]&&Oe(e[s])?e[s].concat():e[s]:null},t.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=me(t[e],this)},t.prototype._initComputeds=function(){var t=this.$options.computed;if(this._resetComputeds(),t)for(var e in t)n(this,e,t[e])},t.prototype._resetComputeds=function(){this._computeds={}},t.prototype._initProps=function(t){var e;this._resetComputeds(),t=t||i(this.$options,this.$name);for(e in t)Ye(t[e])||(this.$props[e]=t[e]);var n=[this.$options.computed,this.$options.methods];for(e in this.$props)e in t&&r(n,e)&&(this[e]=this.$props[e])},t.prototype._initEvents=function(){var t=this,e=this.$options.events;e&&e.forEach(function(e){if(ve(e,"handler"))o(t,e);else for(var i in e)o(t,e[i],i)})},t.prototype._unbindEvents=function(){this._events.forEach(function(t){return t()}),this._events=[]},t.prototype._initObserver=function(){var t=this,e=this.$options,n=e.attrs,o=e.props,r=e.el;!this._observer&&o&&n&&a&&(n=Oe(n)?n:Object.keys(o).map(function(t){return xe(t)}),this._observer=new a(function(){var e=i(t.$options,t.$name);n.some(function(i){return!Ye(e[i])&&e[i]!==t.$props[i]})&&t.$reset(e)}),this._observer.observe(r,{attributes:!0,attributeFilter:n.concat([this.$name,"data-"+this.$name])}))};function i(t,e){var i={},n=t.args;void 0===n&&(n=[]);var o=t.props;void 0===o&&(o={});var r,s,a=t.el;if(!o)return i;for(r in o)if(b(a,s=xe(r))){var l=Qe(o[r],w(a,s),a);if("target"===s&&(!l||_e(l,"_")))continue;i[r]=l}var h=function(t,e){var i;void 0===e&&(e=[]);try{return t?_e(t,"{")?JSON.parse(t):e.length&&!Be(t,":")?((i={})[e[0]]=t,i):t.split(";").reduce(function(t,e){var i=e.split(/:(.+)/),n=i[0],o=i[1];return n&&o&&(t[n.trim()]=o.trim()),t},{}):{}}catch(t){return{}}}(k(a,e),n);for(r in h)void 0!==o[s=$e(r)]&&(i[s]=Qe(o[s],h[r],a));return i}function n(t,e,i){Object.defineProperty(t,e,{enumerable:!0,get:function(){var n=t._computeds,o=t.$props,r=t.$el;return ve(n,e)||(n[e]=i.call(t,o,r)),n[e]},set:function(i){t._computeds[e]=i}})}function o(t,e,i){ze(e)||(e={name:i,handler:e});var n=e.name,r=e.el,s=e.handler,a=e.capture,l=e.delegate,h=e.filter,u=e.self;if(r=Pe(r)?r.call(t):r||t.$el,Oe(r))r.forEach(function(n){return o(t,ei({},e,{el:n}),i)});else if(r&&(!h||h.call(t))){c=Fe(s)?t[s]:me(s,t),s=function(t){return Oe(t.detail)?c.apply(c,[t].concat(t.detail)):c(t)};var c;u&&(d=s,s=function(t){if(t.target===t.currentTarget||t.target===t.current)return d.call(null,t)});var d;t._events.push(se(r,n,l?Fe(l)?l:l.call(t):null,s,a))}}function r(t,e){return t.every(function(t){return!t||!ve(t,e)})}}(Ni),function(t){var e=t.data;t.prototype.$mount=function(t){var i=this.$options.name;t[e]||(t[e]={}),t[e][i]||(t[e][i]=this,this.$el=this.$options.el=this.$options.el||t,this._initProps(),this._callHook("init"),Vt(t,s)&&this._callConnected())},t.prototype.$emit=function(t){this._callUpdate(t)},t.prototype.$update=function(e,i){t.update(e,this.$options.el,i)},t.prototype.$reset=function(t){this._callDisconnected(),this._initProps(t),this._callConnected()},t.prototype.$destroy=function(t){void 0===t&&(t=!1);var i=this.$options,n=i.el,o=i.name;n&&this._callDisconnected(),this._callHook("destroy"),n&&n[e]&&(delete n[e][o],Object.keys(n[e]).length||delete n[e],t&&Et(this.$el))}}(Ni),function(t){var e=t.data;t.components={},t.component=function(e,i){var n=$e(e);if(ze(i))i.name=n,i=t.extend(i);else{if(Ye(i))return t.components[n];i.options.name=n}return t.components[n]=i,t[n]=function(e,i){for(var o=arguments.length,r=Array(o);o--;)r[o]=arguments[o];return ze(e)?new t.components[n]({data:e}):t.components[n].options.functional?new t.components[n]({data:[].concat(r)}):e&&e.nodeType?s(e):Ht(e).map(s)[0];function s(e){var o=t.getComponent(e,n);return o&&i&&o.$reset(i),o||new t.components[n]({el:e,data:i||{}})}},t._initialized&&!i.options.functional&&li.read(function(){return t[n]("[uk-"+e+"],[data-uk-"+e+"]")}),t.components[n]},t.getComponents=function(t){return t&&(t=Kt(t)?t[0]:t)&&t[e]||{}},t.getComponent=function(e,i){return t.getComponents(e)[i]},t.connect=function(i){var n;if(i[e])for(n in i[e])i[e][n]._callConnected();for(var o=0;o<i.attributes.length;o++)(n=Ai(i.attributes[o].name))&&n in t.components&&t[n](i)},t.disconnect=function(t){for(var i in t[e])t[e][i]._callDisconnected()}}(Ni);var Mi,Bi,Oi={init:function(){$(this.$el,this.$name)}},Pi={props:{container:Boolean},defaults:{container:!0},computed:{container:function(t){var e=t.container;return!0===e&&Ni.container||e&&Pt(e)}}},Hi={props:{cls:Boolean,animation:"list",duration:Number,origin:String,transition:String,queued:Boolean},defaults:{cls:!1,animation:[!1],duration:200,origin:!1,transition:"linear",queued:!1,initProps:{overflow:"",height:"",paddingTop:"",paddingBottom:"",marginTop:"",marginBottom:""},hideProps:{overflow:"hidden",height:0,paddingTop:0,paddingBottom:0,marginTop:0,marginBottom:0}},computed:{hasAnimation:function(t){return!!t.animation[0]},hasTransition:function(t){var e=t.animation;return this.hasAnimation&&!0===e[0]}},methods:{toggleElement:function(t,e,i){var n=this;return new we(function(o){var s,a=function(t){return we.all(t.map(function(t){return n._toggleElement(t,e,i)}))},l=(t=ne(t)).filter(function(t){return n.isToggled(t)}),h=t.filter(function(t){return!Be(l,t)});if(n.queued&&Ye(i)&&Ye(e)&&n.hasAnimation&&!(t.length<2)){var u=r.body,c=u.scrollTop,d=l[0],f=dt.inProgress(d)&&E(d,"uk-animation-leave")||at.inProgress(d)&&"0px"===d.style.height;s=a(l),f||(s=s.then(function(){var t=a(h);return u.scrollTop=c,t}))}else s=a(h.concat(l));s.then(o,oi)})},toggleNow:function(t,e){var i=this;return new we(function(n){return we.all(ne(t).map(function(t){return i._toggleElement(t,e,!1)})).then(n,oi)})},isToggled:function(t){var e=ne(t||this.$el);return this.cls?E(e,this.cls.split(" ")[0]):!b(e,"hidden")},updateAria:function(t){!1===this.cls&&w(t,"aria-hidden",!this.isToggled(t))},_toggleElement:function(t,e,i){var n=this;if(e=je(e)?e:dt.inProgress(t)?E(t,"uk-animation-leave"):at.inProgress(t)?"0px"===t.style.height:!this.isToggled(t),!he(t,"before"+(e?"show":"hide"),[this]))return we.reject();var o=(!1!==i&&this.hasAnimation?this.hasTransition?this._toggleHeight:this._toggleAnimation:this._toggleImmediate)(t,e);return he(t,e?"show":"hide",[this]),o.then(function(){he(t,e?"shown":"hidden",[n]),Ni.update(null,t)})},_toggle:function(t,e){t&&(this.cls?_(t,this.cls,Be(this.cls," ")?void 0:e):w(t,"hidden",e?null:""),Ht("[autofocus]",t).some(function(t){return wt(t)&&(t.focus()||!0)}),this.updateAria(t),Ni.update(null,t))},_toggleImmediate:function(t,e){return this._toggle(t,e),we.resolve()},_toggleHeight:function(t,e){var i,n=this,o=at.inProgress(t),r=t.hasChildNodes?Xe(D(t.firstElementChild,"marginTop"))+Xe(D(t.lastElementChild,"marginBottom")):0,s=wt(t)?q(t)+(o?0:r):0;return at.cancel(t),this.isToggled(t)||this._toggle(t,!0),q(t,""),li.flush(),i=q(t)+(o?0:r),q(t,s),(e?at.start(t,ei({},this.initProps,{overflow:"hidden",height:i}),Math.round(this.duration*(1-s/i)),this.transition):at.start(t,this.hideProps,Math.round(this.duration*(s/i)),this.transition).then(function(){return n._toggle(t,!1)})).then(function(){return D(t,n.initProps)})},_toggleAnimation:function(t,e){var i=this;return dt.cancel(t),e?(this._toggle(t,!0),dt.in(t,this.animation[0],this.duration,this.origin)):dt.out(t,this.animation[1]||this.animation[0],this.duration,this.origin).then(function(){return i._toggle(t,!1)})}}},zi={mixins:[Oi,Pi,Hi],props:{clsPanel:String,selClose:String,escClose:Boolean,bgClose:Boolean,stack:Boolean},defaults:{cls:"uk-open",escClose:!0,bgClose:!0,overlay:!0,stack:!1},computed:{panel:function(t,e){return Pt("."+t.clsPanel,e)},transitionElement:function(){return this.panel},transitionDuration:function(){return Ke(D(this.transitionElement,"transitionDuration"))}},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.hide()}},{name:"toggle",self:!0,handler:function(t){t.defaultPrevented||(t.preventDefault(),this.toggle())}},{name:"beforeshow",self:!0,handler:function(t){var e=Mi&&Mi!==this&&Mi;if(Mi=this,e){if(!this.stack)return e.hide().then(this.show),void t.preventDefault();this.prev=e}!function(){if(Bi)return;Bi=[se(s,"click",function(t){var e=t.target,i=t.defaultPrevented;Mi&&Mi.bgClose&&!i&&!Vt(e,Mi.panel||Mi.$el)&&Mi.hide()}),se(r,"keydown",function(t){27===t.keyCode&&Mi&&Mi.escClose&&(t.preventDefault(),Mi.hide())})]}()}},{name:"beforehide",self:!0,handler:function(){(Mi=Mi&&Mi!==this&&Mi||this.prev)||(Bi&&Bi.forEach(function(t){return t()}),Bi=null)}},{name:"show",self:!0,handler:function(){E(s,this.clsPage)||(this.scrollbarWidth=U(o)-s.offsetWidth,D(r.body,"overflowY",this.scrollbarWidth&&this.overlay?"scroll":"")),$(s,this.clsPage)}},{name:"hidden",self:!0,handler:function(){for(var t,e=this.prev;e;){if(e.clsPage===this.clsPage){t=!0;break}e=e.prev}t||I(s,this.clsPage),!this.prev&&D(r.body,"overflowY","")}}],methods:{toggle:function(){return this.isToggled()?this.hide():this.show()},show:function(){if(!this.isToggled())return this.container&&this.$el.parentNode!==this.container&&($t(this.container,this.$el),this._callConnected()),this.toggleNow(this.$el,!0)},hide:function(){if(this.isToggled())return this.toggleNow(this.$el,!1)},getActive:function(){return Mi},_toggleImmediate:function(t,e){var i=this;return new we(function(n){return l(function(){i._toggle(t,e),i.transitionDuration?le(i.transitionElement,"transitionend",n,!1,function(t){return t.target===i.transitionElement}):n()})})}}};var Wi={props:{pos:String,offset:null,flip:Boolean,clsPos:String},defaults:{pos:"bottom-"+(nt?"right":"left"),flip:!0,offset:!1,clsPos:""},computed:{pos:function(t){var e=t.pos;return(e+(Be(e,"-")?"":"-center")).split("-")},dir:function(){return this.pos[0]},align:function(){return this.pos[1]}},methods:{positionAt:function(t,e,i){this._resetComputeds(),T(t,this.clsPos+"-(top|bottom|left|right)(-[a-z]+)?"),D(t,{top:"",left:""});var n,o=this.offset,r=this.getAxis();o=Re(o)?o:(n=Pt(o))?V(n)["x"===r?"left":"top"]-V(e)["x"===r?"right":"bottom"]:0;var s=F(t,e,"x"===r?tt(this.dir)+" "+this.align:this.align+" "+tt(this.dir),"x"===r?this.dir+" "+this.align:this.align+" "+this.dir,"x"===r?""+("left"===this.dir?-o:o):" "+("top"===this.dir?-o:o),null,this.flip,i).target,a=s.x,l=s.y;this.dir="x"===r?a:l,this.align="x"===r?l:a,_(t,this.clsPos+"-"+this.dir+"-"+this.align,!1===this.offset)},getAxis:function(){return"top"===this.dir||"bottom"===this.dir?"y":"x"}}};function Li(t){t.component("accordion",{mixins:[Oi,Hi],props:{targets:String,active:null,collapsible:Boolean,multiple:Boolean,toggle:String,content:String,transition:String},defaults:{targets:"> *",active:!1,animation:[!0],collapsible:!0,multiple:!1,clsOpen:"uk-open",toggle:"> .uk-accordion-title",content:"> .uk-accordion-content",transition:"ease"},computed:{items:function(t,e){return Ht(t.targets,e)}},events:[{name:"click",delegate:function(){return this.targets+" "+this.$props.toggle},handler:function(t){t.preventDefault(),this.toggle(Bt(Ht(this.targets+" "+this.$props.toggle,this.$el),t.current))}}],connected:function(){if(!1!==this.active){var t=this.items[Number(this.active)];t&&!E(t,this.clsOpen)&&this.toggle(t,!1)}},update:function(){var t=this;this.items.forEach(function(e){return t._toggleImmediate(Pt(t.content,e),E(e,t.clsOpen))});var e=!this.collapsible&&!E(this.items,this.clsOpen)&&this.items[0];e&&this.toggle(e,!1)},methods:{toggle:function(t,e){var i=this,n=pt(t,this.items),o=Ft(this.items,"."+this.clsOpen);(t=this.items[n])&&[t].concat(!this.multiple&&!Be(o,t)&&o||[]).forEach(function(n){var r=n===t,s=r&&!E(n,i.clsOpen);if(s||!r||i.collapsible||!(o.length<2)){_(n,i.clsOpen,s);var a=n._wrapper?n._wrapper.firstElementChild:Pt(i.content,n);n._wrapper||(n._wrapper=_t(a,"<div>"),w(n._wrapper,"hidden",s?"":null)),i._toggleImmediate(a,!0),i.toggleElement(n._wrapper,s,e).then(function(){E(n,i.clsOpen)===s&&(s||i._toggleImmediate(a,!1),n._wrapper=null,At(a))})}})}}})}function ji(t){t.component("alert",{attrs:!0,mixins:[Oi,Hi],args:"animation",props:{close:String},defaults:{animation:[!0],selClose:".uk-alert-close",duration:150,hideProps:ei({opacity:0},Hi.defaults.hideProps)},events:[{name:"click",delegate:function(){return this.selClose},handler:function(t){t.preventDefault(),this.close()}}],methods:{close:function(){var t=this;this.toggleElement(this.$el).then(function(){return t.$destroy(!0)})}}})}function Fi(t){rt(function(){var e=0,i=0;if(se(o,"load resize",t.update),se(o,"scroll",function(i){i.dir=e<=o.pageYOffset?"down":"up",i.scrollY=e=o.pageYOffset,t.update(i)}),se(r,"animationstart",function(t){var e=t.target;(D(e,"animationName")||"").match(/^uk-.*(left|right)/)&&(i++,r.body.style.overflowX="hidden",setTimeout(function(){--i||(r.body.style.overflowX="")},Ke(D(e,"animationDuration"))+100))},!0),c){se(r,"tap",function(t){var e=t.target;return Ht(".uk-hover").forEach(function(t,i){return!Vt(e,i)&&I(i,"uk-hover")})}),Object.defineProperty(t,"hoverSelector",{set:function(t){se(r,"tap",t,function(t){return $(t.current,"uk-hover")})}}),t.hoverSelector=".uk-animation-toggle, .uk-transition-toggle, [uk-hover]"}})}function Vi(t){t.component("cover",{mixins:[Oi,t.components.video.options],props:{width:Number,height:Number},defaults:{automute:!0},update:{write:function(){var t=this.$el;if(wt(t)){var e=t.parentNode,i=e.offsetHeight,n=e.offsetWidth;D(D(t,{width:"",height:""}),vt.cover({width:this.width||t.clientWidth,height:this.height||t.clientHeight},{width:n+(n%2?1:0),height:i+(i%2?1:0)}))}},events:["load","resize"]},events:{loadedmetadata:function(){this.$emit()}}})}function Ri(t){var e;t.component("drop",{mixins:[Wi,Hi],args:"pos",props:{mode:"list",toggle:Boolean,boundary:"query",boundaryAlign:Boolean,delayShow:Number,delayHide:Number,clsDrop:String},defaults:{mode:["click","hover"],toggle:!0,boundary:o,boundaryAlign:!1,delayShow:0,delayHide:800,clsDrop:!1,hoverIdle:200,animation:["uk-animation-fade"],cls:"uk-open"},computed:{clsDrop:function(t){var e=t.clsDrop;return e||"uk-"+this.$options.name},clsPos:function(){return this.clsDrop}},init:function(){this.tracker=new di,$(this.$el,this.clsDrop)},connected:function(){var e=this.$props.toggle;this.toggle=e&&t.toggle(Fe(e)?Wt(e,this.$el):this.$el.previousElementSibling,{target:this.$el,mode:this.mode}),this.updateAria(this.$el)},events:[{name:"click",delegate:function(){return"."+this.clsDrop+"-close"},handler:function(t){t.preventDefault(),this.hide(!1)}},{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){if(!t.defaultPrevented){var e=t.target.hash;e||t.preventDefault(),e&&Vt(e,this.$el)||this.hide(!1)}}},{name:"beforescroll",handler:function(){this.hide(!1)}},{name:"toggle",self:!0,handler:function(t,e){t.preventDefault(),this.isToggled()?this.hide(!1):this.show(e,!1)}},{name:m,filter:function(){return Be(this.mode,"hover")},handler:function(t){Ei(t)||(e&&e!==this&&e.toggle&&Be(e.toggle.mode,"hover")&&!Vt(t.target,e.toggle.$el)&&!si({x:t.pageX,y:t.pageY},V(e.$el))&&e.hide(!1),t.preventDefault(),this.show(this.toggle))}},{name:"toggleshow",handler:function(t,e){e&&!Be(e.target,this.$el)||(t.preventDefault(),this.show(e||this.toggle))}},{name:"togglehide "+g,handler:function(t,e){Ei(t)||e&&!Be(e.target,this.$el)||(t.preventDefault(),this.toggle&&Be(this.toggle.mode,"hover")&&this.hide())}},{name:"beforeshow",self:!0,handler:function(){this.clearTimers()}},{name:"show",self:!0,handler:function(){this.position(),this.tracker.init(),$(this.toggle.$el,this.cls),w(this.toggle.$el,"aria-expanded","true"),function(){if(i)return;i=!0,se(s,"click",function(t){var i,n=t.target,o=t.defaultPrevented;if(!o)for(;e&&e!==i&&!Vt(n,e.$el)&&(!e.toggle||!Vt(n,e.toggle.$el));)i=e,e.hide(!1)})}()}},{name:"beforehide",self:!0,handler:function(){this.clearTimers()}},{name:"hide",handler:function(t){var i=t.target;this.$el===i?(e=this.isActive()?null:e,I(this.toggle.$el,this.cls),w(this.toggle.$el,"aria-expanded","false"),this.toggle.$el.blur(),Ht("a, button",this.toggle.$el).forEach(function(t){return t.blur()}),this.tracker.cancel()):e=null===e&&Vt(i,this.$el)&&this.isToggled()?this:e}}],update:{write:function(){this.isToggled()&&!dt.inProgress(this.$el)&&this.position()},events:["resize"]},methods:{show:function(t,i){var n=this;void 0===i&&(i=!0);var o=function(){return!n.isToggled()&&n.toggleElement(n.$el,!0)},r=function(){if(n.toggle=t||n.toggle,n.clearTimers(),!n.isActive())if(i&&e&&e!==n&&e.isDelaying)n.showTimer=setTimeout(n.show,10);else{if(n.isParentOf(e)){if(!e.hideTimer)return;e.hide(!1)}else if(e&&!n.isChildOf(e)&&!n.isParentOf(e))for(var r;e&&e!==r&&!n.isChildOf(e);)r=e,e.hide(!1);i&&n.delayShow?n.showTimer=setTimeout(o,n.delayShow):o(),e=n}};t&&this.toggle&&t.$el!==this.toggle.$el?(le(this.$el,"hide",r),this.hide(!1)):r()},hide:function(t){var e=this;void 0===t&&(t=!0);var i=function(){return e.toggleNow(e.$el,!1)};this.clearTimers(),this.isDelaying=this.tracker.movesTo(this.$el),t&&this.isDelaying?this.hideTimer=setTimeout(this.hide,this.hoverIdle):t&&this.delayHide?this.hideTimer=setTimeout(i,this.delayHide):i()},clearTimers:function(){clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.showTimer=null,this.hideTimer=null,this.isDelaying=!1},isActive:function(){return e===this},isChildOf:function(t){return t&&t!==this&&Vt(this.$el,t.$el)},isParentOf:function(t){return t&&t!==this&&Vt(t.$el,this.$el)},position:function(){T(this.$el,this.clsDrop+"-(stack|boundary)"),D(this.$el,{top:"",left:"",display:"block"}),_(this.$el,this.clsDrop+"-boundary",this.boundaryAlign);var t=V(this.boundary),e=this.boundaryAlign?t:V(this.toggle.$el);if("justify"===this.align){var i="y"===this.getAxis()?"width":"height";D(this.$el,i,e[i])}else this.$el.offsetWidth>Math.max(t.right-e.left,e.right-t.left)&&$(this.$el,this.clsDrop+"-stack");this.positionAt(this.$el,this.boundaryAlign?this.boundary:this.toggle.$el,this.boundary),D(this.$el,"display","")}}}),t.drop.getActive=function(){return e};var i}function Yi(t){t.component("dropdown",t.components.drop.extend({name:"dropdown"}))}function qi(t){t.component("form-custom",{mixins:[Oi],args:"target",props:{target:Boolean},defaults:{target:!1},computed:{input:function(t,e){return Pt(bt,e)},state:function(){return this.input.nextElementSibling},target:function(t,e){var i=t.target;return i&&(!0===i&&this.input.parentNode===e&&this.input.nextElementSibling||Wt(i,e))}},connected:function(){he(this.input,"change")},events:[{name:"focusin focusout mouseenter mouseleave",delegate:bt,handler:function(t){var e=t.type;t.current===this.input&&_(this.state,"uk-"+(Be(e,"focus")?"focus":"hover"),Be(["focusin","mouseenter"],e))}},{name:"change",handler:function(){var t,e=this.target,i=this.input;e&&(e[yt(e)?"value":"textContent"]=i.files&&i.files[0]?i.files[0].name:Jt(i,"select")&&(t=Ht("option",i).filter(function(t){return t.selected})[0])?t.textContent:i.value)}}]})}function Ui(t){t.component("gif",{update:{read:function(t){var e=ft(this.$el);if(!e||t.isInView===e)return!1;t.isInView=e},write:function(){this.$el.src=this.$el.src},events:["scroll","load","resize"]}})}function Xi(t){t.component("grid",t.components.margin.extend({mixins:[Oi],name:"grid",defaults:{margin:"uk-grid-margin",clsStack:"uk-grid-stack"},update:{write:function(t){var e=t.stacks;_(this.$el,this.clsStack,e)},events:["load","resize"]}}))}function Ji(t){t.component("height-match",{args:"target",props:{target:String,row:Boolean},defaults:{target:"> *",row:!0},computed:{elements:function(t,e){return Ht(t.target,e)}},update:{read:function(){var t=this,e=!1;return D(this.elements,"minHeight",""),{rows:this.row?this.elements.reduce(function(t,i){return e!==i.offsetTop?t.push([i]):t[t.length-1].push(i),e=i.offsetTop,t},[]).map(function(e){return t.match(e)}):[this.match(this.elements)]}},write:function(t){t.rows.forEach(function(t){var e=t.height;return D(t.elements,"minHeight",e)})},events:["load","resize"]},methods:{match:function(t){if(t.length<2)return{};var e=0,i=[];return t.forEach(function(t){var n,o;wt(t)||(n=w(t,"style"),o=w(t,"hidden"),w(t,{style:(n||"")+";display:block !important;",hidden:null})),e=Math.max(e,t.offsetHeight),i.push(t.offsetHeight),Ye(n)||w(t,{style:n,hidden:o})}),t=t.filter(function(t,n){return i[n]<e}),{height:e,elements:t}}}})}function Gi(t){t.component("height-viewport",{props:{expand:Boolean,offsetTop:Boolean,offsetBottom:Boolean,minHeight:Number},defaults:{expand:!1,offsetTop:!1,offsetBottom:!1,minHeight:0},update:{write:function(){D(this.$el,"boxSizing","border-box");var t,i=q(o),n=0;if(this.expand){D(this.$el,{height:"",minHeight:""});var r=i-e(s);r>0&&(t=e(this.$el)+r)}else{var a=V(this.$el).top;a<i/2&&this.offsetTop&&(n+=a),!0===this.offsetBottom?n+=e(this.$el.nextElementSibling):Re(this.offsetBottom)?n+=i/100*this.offsetBottom:this.offsetBottom&&Ae(this.offsetBottom,"px")?n+=Xe(this.offsetBottom):Fe(this.offsetBottom)&&(n+=e(Wt(this.offsetBottom,this.$el))),t=n?"calc(100vh - "+n+"px)":"100vh"}if(t){D(this.$el,{height:"",minHeight:t});var l=this.$el.offsetHeight;this.minHeight&&this.minHeight>l&&D(this.$el,"minHeight",this.minHeight),i-n>=l&&D(this.$el,"height",t)}},events:["load","resize"]}});function e(t){return t&&t.offsetHeight||0}}var Zi='<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>',Qi='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>',Ki='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>',tn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>',en='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>',nn='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>',on='<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>',rn='<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>',sn='<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>',an='<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>',ln='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>',hn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>',un='<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>',cn='<svg width="25px" height="40px" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>',dn='<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>',fn='<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';function pn(t){var e={},i={spinner:dn,totop:fn,marker:Ki,"close-icon":Zi,"close-large":Qi,"navbar-toggle-icon":tn,"overlay-icon":en,"pagination-next":nn,"pagination-previous":on,"search-icon":rn,"search-large":sn,"search-navbar":an,"slidenav-next":ln,"slidenav-next-large":hn,"slidenav-previous":un,"slidenav-previous-large":cn};t.component("icon",t.components.svg.extend({attrs:["icon","ratio"],mixins:[Oi],name:"icon",args:"icon",props:["icon"],defaults:{exclude:["id","style","class","src","icon"]},init:function(){$(this.$el,"uk-icon"),nt&&(this.icon=ti(ti(this.icon,"left","right"),"previous","next"))},methods:{getSvg:function(){var t=function(t){if(!i[t])return null;e[t]||(e[t]=Pt(i[t].trim()));return e[t]}(this.icon);return t?we.resolve(t):we.reject("Icon not found.")}}})),["marker","navbar-toggle-icon","overlay-icon","pagination-previous","pagination-next","totop"].forEach(function(t){return n(t)}),["slidenav-previous","slidenav-next"].forEach(function(t){return n(t,{init:function(){$(this.$el,"uk-slidenav"),E(this.$el,"uk-slidenav-large")&&(this.icon+="-large")}})}),n("search-icon",{init:function(){E(this.$el,"uk-search-icon")&&Qt(this.$el,".uk-search-large").length?this.icon="search-large":Qt(this.$el,".uk-search-navbar").length&&(this.icon="search-navbar")}}),n("close",{init:function(){this.icon="close-"+(E(this.$el,"uk-close-large")?"large":"icon")}}),n("spinner",{connected:function(){var t=this;this.svg.then(function(e){return 1!==t.ratio&&D(Pt("circle",e),"stroke-width",1/t.ratio)},oi)}}),t.icon.add=function(n){Object.keys(n).forEach(function(t){i[t]=n[t],delete e[t]}),t._initialized&&ii(t.instances,function(t){"icon"===t.$options.name&&t.$reset()})};function n(e,i){t.component(e,t.components.icon.extend({name:e,mixins:i?[i]:[],defaults:{icon:e}}))}}function mn(t){t.component("leader",{mixins:[Oi],props:{fill:String,media:"media"},defaults:{fill:"",media:!1,clsWrapper:"uk-leader-fill",clsHide:"uk-leader-hide",attrFill:"data-fill"},computed:{fill:function(t){var e=t.fill;return e||P("leader-fill")}},connected:function(){this.wrapper=St(this.$el,'<span class="'+this.clsWrapper+'">')[0]},disconnected:function(){At(this.wrapper.childNodes)},update:[{read:function(t){var e=t.changed,i=t.width,n=i;return{width:i=Math.floor(this.$el.offsetWidth/2),changed:e||n!==i,hide:this.media&&!o.matchMedia(this.media).matches}},write:function(t){_(this.wrapper,this.clsHide,t.hide),t.changed&&(t.changed=!1,w(this.wrapper,this.attrFill,new Array(t.width).join(this.fill)))},events:["load","resize"]}]})}function gn(t){t.component("margin",{props:{margin:String,firstColumn:Boolean},defaults:{margin:"uk-margin-small-top",firstColumn:"uk-first-column"},update:{read:function(t){var e=this.$el.children;if(!e.length||!wt(this.$el))return t.rows=!1;t.stacks=!0;for(var i=[[]],n=0;n<e.length;n++){var o=e[n],r=o.getBoundingClientRect();if(r.height)for(var s=i.length-1;s>=0;s--){var a=i[s];if(!a[0]){a.push(o);break}var l=a[0].getBoundingClientRect();if(r.top>=Math.floor(l.bottom)){i.push([o]);break}if(Math.floor(r.bottom)>l.top){if(t.stacks=!1,r.left<l.left&&!nt){a.unshift(o);break}a.push(o);break}if(0===s){i.unshift([o]);break}}}t.rows=i},write:function(t){var e=this;t.rows.forEach(function(t,i){return t.forEach(function(t,n){_(t,e.margin,0!==i),_(t,e.firstColumn,0===n)})})},events:["load","resize"]}})}function vn(t){t.component("modal",{mixins:[zi],defaults:{clsPage:"uk-modal-page",clsPanel:"uk-modal-dialog",selClose:".uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"},events:[{name:"show",self:!0,handler:function(){E(this.panel,"uk-margin-auto-vertical")?$(this.$el,"uk-flex"):D(this.$el,"display","block"),q(this.$el)}},{name:"hidden",self:!0,handler:function(){D(this.$el,"display",""),I(this.$el,"uk-flex")}}]}),t.component("overflow-auto",{mixins:[Oi],computed:{modal:function(t,e){return Zt(e,".uk-modal")},panel:function(t,e){return Zt(e,".uk-modal-dialog")}},connected:function(){D(this.$el,"minHeight",150)},update:{write:function(){if(this.panel&&this.modal){var t=D(this.$el,"maxHeight");D(D(this.$el,"maxHeight",150),"maxHeight",Math.max(150,150+q(this.modal)-this.panel.offsetHeight)),t!==D(this.$el,"maxHeight")&&he(this.$el,"resize")}},events:["load","resize"]}}),t.modal.dialog=function(e,i){var n=t.modal(' <div class="uk-modal"> <div class="uk-modal-dialog">'+e+"</div> </div> ",i);return n.show(),se(n.$el,"hidden",function(t){t.target===t.currentTarget&&n.$destroy(!0)}),n},t.modal.alert=function(e,i){return i=ei({bgClose:!1,escClose:!1,labels:t.modal.labels},i),new we(function(n){return se(t.modal.dialog(' <div class="uk-modal-body">'+(Fe(e)?e:kt(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+i.labels.ok+"</button> </div> ",i).$el,"hide",n)})},t.modal.confirm=function(e,i){return i=ei({bgClose:!1,escClose:!1,labels:t.modal.labels},i),new we(function(n,o){return se(t.modal.dialog(' <div class="uk-modal-body">'+(Fe(e)?e:kt(e))+'</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close">'+i.labels.cancel+'</button> <button class="uk-button uk-button-primary uk-modal-close" autofocus>'+i.labels.ok+"</button> </div> ",i).$el,"click",".uk-modal-footer button",function(t){return 0===Bt(t.target)?o():n()})})},t.modal.prompt=function(e,i,n){return n=ei({bgClose:!1,escClose:!1,labels:t.modal.labels},n),new we(function(o){var r=!1,s=t.modal.dialog(' <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>'+(Fe(e)?e:kt(e))+'</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">'+n.labels.cancel+'</button> <button class="uk-button uk-button-primary">'+n.labels.ok+"</button> </div> </form> ",n),a=Pt("input",s.$el);a.value=i,se(s.$el,"submit","form",function(t){t.preventDefault(),o(a.value),r=!0,s.hide()}),se(s.$el,"hide",function(){r||o(null)})})},t.modal.labels={ok:"Ok",cancel:"Cancel"}}function wn(t){t.component("nav",t.components.accordion.extend({name:"nav",defaults:{targets:"> .uk-parent",toggle:"> a",content:"> ul"}}))}function bn(t){t.component("navbar",{mixins:[Oi],props:{dropdown:String,mode:"list",align:String,offset:Number,boundary:Boolean,boundaryAlign:Boolean,clsDrop:String,delayShow:Number,delayHide:Number,dropbar:Boolean,dropbarMode:String,dropbarAnchor:"query",duration:Number},defaults:{dropdown:".uk-navbar-nav > li",align:nt?"right":"left",clsDrop:"uk-navbar-dropdown",mode:void 0,offset:void 0,delayShow:void 0,delayHide:void 0,boundaryAlign:void 0,flip:"x",boundary:!0,dropbar:!1,dropbarMode:"slide",dropbarAnchor:!1,duration:200},computed:{boundary:function(t,e){var i=t.boundary,n=t.boundaryAlign;return!0===i||n?e:i},pos:function(t){return"bottom-"+t.align}},beforeConnect:function(){var t=this.$props.dropbar;this.dropbar=t&&(Fe(t)&&Wt(t,this.$el)||Pt("<div></div>")),this.dropbar&&($(this.dropbar,"uk-navbar-dropbar"),"slide"===this.dropbarMode&&$(this.dropbar,"uk-navbar-dropbar-slide"))},disconnected:function(){this.dropbar&&Et(this.dropbar)},update:function(){t.drop(Ht(this.dropdown+" ."+this.clsDrop,this.$el).filter(function(e){return!t.getComponent(e,"drop")&&!t.getComponent(e,"dropdown")}),ei({},this.$props,{boundary:this.boundary,pos:this.pos,offset:this.dropbar||this.offset}))},events:[{name:"mouseover",delegate:function(){return this.dropdown},handler:function(t){var e=t.current,i=this.getActive();i&&i.toggle&&!Vt(i.toggle.$el,e)&&!i.tracker.movesTo(i.$el)&&i.hide(!1)}},{name:"mouseleave",el:function(){return this.dropbar},handler:function(){var t=this.getActive();t&&!Jt(this.dropbar,":hover")&&t.hide()}},{name:"show",capture:!0,filter:function(){return this.dropbar},handler:function(t,e){this.dropbar.parentNode||Tt(this.dropbarAnchor||this.$el,this.dropbar);var i=e.$el;this.clsDrop&&$(i,this.clsDrop+"-dropbar"),this.transitionTo(i.offsetHeight+Xe(D(i,"margin-top"))+Xe(D(i,"margin-bottom")),i)}},{name:"beforehide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();Jt(this.dropbar,":hover")&&n&&n.$el===i&&t.preventDefault()}},{name:"hide",filter:function(){return this.dropbar},handler:function(t,e){var i=e.$el,n=this.getActive();(!n||n&&n.$el===i)&&this.transitionTo(0)}}],methods:{getActive:function(){var e=t.drop.getActive();return e&&Be(e.mode,"hover")&&Vt(e.toggle.$el,this.$el)&&e},transitionTo:function(t,e){var i=this.dropbar,n=wt(i)?q(i):0;return D(e=n<t&&e,{height:n,overflow:"hidden"}),q(i,n),at.cancel([e,i]),at.start([e,i],{height:t},this.duration).catch(oi).finally(function(){return D(e,{height:"",overflow:""})})}}})}var yn;function xn(t){t.component("offcanvas",{mixins:[zi],args:"mode",props:{content:String,mode:String,flip:Boolean,overlay:Boolean},defaults:{content:".uk-offcanvas-content",mode:"slide",flip:!1,overlay:!1,clsPage:"uk-offcanvas-page",clsContainer:"uk-offcanvas-container",clsPanel:"uk-offcanvas-bar",clsFlip:"uk-offcanvas-flip",clsContent:"uk-offcanvas-content",clsContentAnimation:"uk-offcanvas-content-animation",clsSidebarAnimation:"uk-offcanvas-bar-animation",clsMode:"uk-offcanvas",clsOverlay:"uk-offcanvas-overlay",selClose:".uk-offcanvas-close"},computed:{content:function(t){var e=t.content;return Pt(e)||r.body},clsFlip:function(t){var e=t.flip,i=t.clsFlip;return e?i:""},clsOverlay:function(t){var e=t.overlay,i=t.clsOverlay;return e?i:""},clsMode:function(t){var e=t.mode,i=t.clsMode;return i+"-"+e},clsSidebarAnimation:function(t){var e=t.mode,i=t.clsSidebarAnimation;return"none"===e||"reveal"===e?"":i},clsContentAnimation:function(t){var e=t.mode,i=t.clsContentAnimation;return"push"!==e&&"reveal"!==e?"":i},transitionElement:function(t){return"reveal"===t.mode?this.panel.parentNode:this.panel}},update:{write:function(){this.getActive()===this&&((this.overlay||this.clsContentAnimation)&&U(this.content,U(o)-this.scrollbarWidth),this.overlay&&(q(this.content,q(o)),yn&&(this.content.scrollTop=yn.y)))},events:["resize"]},events:[{name:"click",delegate:function(){return'a[href^="#"]'},handler:function(t){var e=t.current;e.hash&&Pt(e.hash,this.content)&&(yn=null,this.hide())}},{name:"beforescroll",filter:function(){return this.overlay},handler:function(t,e,i){e&&i&&this.isToggled()&&Pt(i,this.content)&&(le(this.$el,"hidden",function(){return e.scrollTo(i)}),t.preventDefault())}},{name:"show",self:!0,handler:function(){yn=yn||{x:o.pageXOffset,y:o.pageYOffset},"reveal"!==this.mode||E(this.panel,this.clsMode)||(_t(this.panel,"<div>"),$(this.panel.parentNode,this.clsMode)),D(s,"overflowY",(!this.clsContentAnimation||this.flip)&&this.scrollbarWidth&&this.overlay?"scroll":""),$(r.body,this.clsContainer,this.clsFlip,this.clsOverlay),q(r.body),$(this.content,this.clsContentAnimation),$(this.panel,this.clsSidebarAnimation+" "+("reveal"!==this.mode?this.clsMode:"")),$(this.$el,this.clsOverlay),D(this.$el,"display","block"),q(this.$el)}},{name:"hide",self:!0,handler:function(){I(this.content,this.clsContentAnimation);var t=this.getActive();("none"===this.mode||t&&t!==this&&t!==this.prev)&&he(this.panel,"transitionend")}},{name:"hidden",self:!0,handler:function(){if("reveal"===this.mode&&At(this.panel),this.overlay){if(!yn){var t=this.content,e=t.scrollLeft,i=t.scrollTop;yn={x:e,y:i}}}else yn={x:o.pageXOffset,y:o.pageYOffset};I(this.panel,this.clsSidebarAnimation,this.clsMode),I(this.$el,this.clsOverlay),D(this.$el,"display",""),I(r.body,this.clsContainer,this.clsFlip,this.clsOverlay),r.body.scrollTop=yn.y,D(s,"overflow-y",""),U(this.content,""),q(this.content,""),o.scrollTo(yn.x,yn.y),yn=null}},{name:"swipeLeft swipeRight",handler:function(t){this.isToggled()&&Ei(t)&&("swipeLeft"===t.type&&!this.flip||"swipeRight"===t.type&&this.flip)&&this.hide()}}]})}function kn(t){t.component("responsive",{props:["width","height"],init:function(){$(this.$el,"uk-responsive-width")},update:{read:function(){return!!(wt(this.$el)&&this.width&&this.height)&&{width:U(this.$el.parentNode),height:this.height}},write:function(t){q(this.$el,vt.contain({height:this.height,width:this.width},t).height)},events:["load","resize"]}})}function $n(t){t.component("scroll",{props:{duration:Number,offset:Number},defaults:{duration:1e3,offset:0},methods:{scrollTo:function(t){var e=this,i=V(t=t&&Pt(t)||r.body).top-this.offset,n=q(r),s=q(o);if(i+s>n&&(i=n-s),he(this.$el,"beforescroll",[this,t])){var a=Date.now(),h=o.pageYOffset,u=function(){var n,r=h+(i-h)*(n=ni((Date.now()-a)/e.duration),.5*(1-Math.cos(Math.PI*n)));o.scrollTo(o.pageXOffset,r),r!==i?l(u):he(e.$el,"scrolled",[e,t])};u()}}},events:{click:function(t){t.defaultPrevented||(t.preventDefault(),this.scrollTo(re(this.$el.hash).substr(1)))}}})}function In(t){t.component("scrollspy",{args:"cls",props:{cls:"list",target:String,hidden:Boolean,offsetTop:Number,offsetLeft:Number,repeat:Boolean,delay:Number},defaults:{cls:["uk-scrollspy-inview"],target:!1,hidden:!0,offsetTop:0,offsetLeft:0,repeat:!1,delay:0,inViewClass:"uk-scrollspy-inview"},computed:{elements:function(t,e){var i=t.target;return i?Ht(i,e):[e]}},update:[{write:function(){this.hidden&&D(Ft(this.elements,":not(."+this.inViewClass+")"),"visibility","hidden")}},{read:function(e){var i=this;if(!t._initialized)return!1;this.elements.forEach(function(t,n){var o=e[n];if(!o){var r=k(t,"uk-scrollspy-class");o={toggles:r&&r.split(",")||i.cls}}o.show=ft(t,i.offsetTop,i.offsetLeft),e[n]=o})},write:function(t){var e=this,i=1===this.elements.length?1:0;this.elements.forEach(function(n,o){var r=t[o],s=r.toggles[o]||r.toggles[0];if(r.show){if(!r.inview&&!r.timer){var a=function(){D(n,"visibility",""),$(n,e.inViewClass),_(n,s),he(n,"inview"),e.$update(),r.inview=!0,delete r.timer};e.delay&&i?r.timer=setTimeout(a,e.delay*i):a(),i++}}else r.inview&&e.repeat&&(r.timer&&(clearTimeout(r.timer),delete r.timer),D(n,"visibility",e.hidden?"hidden":""),I(n,e.inViewClass),_(n,s),he(n,"outview"),e.$update(),r.inview=!1)})},events:["scroll","load","resize"]}]})}function Tn(t){t.component("scrollspy-nav",{props:{cls:String,closest:String,scroll:Boolean,overflow:Boolean,offset:Number},defaults:{cls:"uk-active",closest:!1,scroll:!1,overflow:!0,offset:0},computed:{links:function(t,e){return Ht('a[href^="#"]',e).filter(function(t){return t.hash})},elements:function(){return this.closest?Zt(this.links,this.closest):this.links},targets:function(){return Ht(this.links.map(function(t){return t.hash}).join(","))}},update:[{read:function(){this.scroll&&t.scroll(this.links,{offset:this.offset||0})}},{read:function(t){var e=this,i=o.pageYOffset+this.offset+1,n=q(r)-q(o)+this.offset;t.active=!1,this.targets.every(function(o,r){var s=V(o).top,a=r+1===e.targets.length;if(!e.overflow&&(0===r&&s>i||a&&s+o.offsetTop<i))return!1;if(!a&&V(e.targets[r+1]).top<=i)return!0;if(i>=n)for(var l=e.targets.length-1;l>r;l--)if(ft(e.targets[l])){o=e.targets[l];break}return!(t.active=Pt(Ft(e.links,'[href="#'+o.id+'"]')))})},write:function(t){var e=t.active;this.links.forEach(function(t){return t.blur()}),I(this.elements,this.cls),e&&he(this.$el,"active",[e,$(this.closest?Zt(e,this.closest):e,this.cls)])},events:["scroll","load","resize"]}]})}function Cn(t){t.component("sticky",{mixins:[Oi],attrs:!0,props:{top:null,bottom:Boolean,offset:Number,animation:String,clsActive:String,clsInactive:String,clsFixed:String,clsBelow:String,selTarget:String,widthElement:"query",showOnUp:Boolean,media:"media",target:Number},defaults:{top:0,bottom:!1,offset:0,animation:"",clsActive:"uk-active",clsInactive:"",clsFixed:"uk-sticky-fixed",clsBelow:"uk-sticky-below",selTarget:"",widthElement:!1,showOnUp:!1,media:!1,target:!1},computed:{selTarget:function(t,e){var i=t.selTarget;return i&&Pt(i,e)||e}},connected:function(){this.placeholder=Pt('<div class="uk-sticky-placeholder"></div>'),this.widthElement=this.$props.widthElement||this.placeholder,this.isActive||this.hide()},disconnected:function(){this.isActive&&(this.isActive=!1,this.hide(),I(this.selTarget,this.clsInactive)),Et(this.placeholder),this.placeholder=null,this.widthElement=null},ready:function(){var t=this;if(this.target&&location.hash&&o.pageYOffset>0){var e=Pt(location.hash);e&&li.read(function(){var i=V(e).top,n=V(t.$el).top,r=t.$el.offsetHeight;n+r>=i&&n<=i+e.offsetHeight&&o.scrollTo(0,i-r-t.target-t.offset)})}},events:[{name:"active",self:!0,handler:function(){C(this.selTarget,this.clsInactive,this.clsActive)}},{name:"inactive",self:!0,handler:function(){C(this.selTarget,this.clsActive,this.clsInactive)}}],update:[{write:function(){var t,e=this,i=this.placeholder,n=(this.isActive?i:this.$el).offsetHeight;D(i,ei({height:"absolute"!==D(this.$el,"position")?n:""},D(this.$el,["marginTop","marginBottom","marginLeft","marginRight"]))),Vt(i,s)||(Tt(this.$el,i),w(i,"hidden","")),w(this.widthElement,"hidden",null),this.width=this.widthElement.offsetWidth,w(this.widthElement,"hidden",this.isActive?null:""),this.topOffset=V(this.isActive?i:this.$el).top,this.bottomOffset=this.topOffset+n,["top","bottom"].forEach(function(i){e[i]=e.$props[i],e[i]&&(Re(e[i])?e[i]=e[i+"Offset"]+Xe(e[i]):Fe(e[i])&&e[i].match(/^-?\d+vh$/)?e[i]=q(o)*Xe(e[i])/100:(t=!0===e[i]?e.$el.parentNode:Wt(e[i],e.$el))&&(e[i]=V(t).top+t.offsetHeight))}),this.top=Math.max(Xe(this.top),this.topOffset)-this.offset,this.bottom=this.bottom&&this.bottom-n,this.inactive=this.media&&!o.matchMedia(this.media).matches,this.isActive&&this.update()},events:["load","resize"]},{read:function(t,e){var i=e.scrollY;return void 0===i&&(i=o.pageYOffset),{scroll:this.scroll=i,visible:wt(this.$el)}},write:function(t,e){var i=this,n=t.visible,o=t.scroll;void 0===e&&(e={});var r=e.dir;if(!(o<0||!n||this.disabled||this.showOnUp&&!r))if(this.inactive||o<this.top||this.showOnUp&&(o<=this.top||"down"===r||"up"===r&&!this.isActive&&o<=this.bottomOffset)){if(!this.isActive)return;this.isActive=!1,this.animation&&o>this.topOffset?(dt.cancel(this.$el),dt.out(this.$el,this.animation).then(function(){return i.hide()},oi)):this.hide()}else this.isActive?this.update():this.animation?(dt.cancel(this.$el),this.show(),dt.in(this.$el,this.animation).catch(oi)):this.show()},events:["scroll"]}],methods:{show:function(){this.isActive=!0,this.update(),w(this.placeholder,"hidden",null)},hide:function(){this.isActive&&!E(this.selTarget,this.clsActive)||he(this.$el,"inactive"),I(this.$el,this.clsFixed,this.clsBelow),D(this.$el,{position:"",top:"",width:""}),w(this.placeholder,"hidden","")},update:function(){var t=Math.max(0,this.offset),e=this.scroll>this.top;this.bottom&&this.scroll>this.bottom-this.offset&&(t=this.bottom-this.scroll),D(this.$el,{position:"fixed",top:t+"px",width:this.width}),E(this.selTarget,this.clsActive)?e||he(this.$el,"inactive"):e&&he(this.$el,"active"),_(this.$el,this.clsBelow,this.scroll>this.bottomOffset),$(this.$el,this.clsFixed)}}})}var En={};function _n(t){t.component("svg",{attrs:!0,props:{id:String,icon:String,src:String,style:String,width:Number,height:Number,ratio:Number,class:String},defaults:{ratio:1,id:!1,exclude:["src"],class:""},init:function(){this.class+=" uk-svg"},connected:function(){var t=this;if(!this.icon&&Be(this.src,"#")){var n=this.src.split("#");n.length>1&&(this.src=n[0],this.icon=n[1])}this.svg=this.getSvg().then(function(n){var o;if(Fe(n)?(t.icon&&Be(n,"<symbol")&&(n=function(t,n){if(!i[t]){i[t]={};for(var o;o=e.exec(t);)i[t][o[3]]='<svg xmlns="http://www.w3.org/2000/svg"'+o[1]+"svg>"}return i[t][n]}(n,t.icon)||n),o=Pt(n.substr(n.indexOf("<svg")))):o=n.cloneNode(!0),!o)return we.reject("SVG not found.");var r=w(o,"viewBox");r&&(r=r.split(" "),t.width=t.$props.width||r[2],t.height=t.$props.height||r[3]),t.width*=t.ratio,t.height*=t.ratio;for(var s in t.$options.props)t[s]&&!Be(t.exclude,s)&&w(o,s,t[s]);t.id||y(o,"id"),t.width&&!t.height&&y(o,"height"),t.height&&!t.width&&y(o,"width");var a=t.$el;if(gt(a)||"CANVAS"===a.tagName){w(a,{hidden:!0,id:null});var l=a.nextElementSibling;l&&o.isEqualNode(l)?o=l:Tt(a,o)}else{var h=a.lastElementChild;h&&o.isEqualNode(h)?o=h:$t(a,o)}return t.svgEl=o,o},oi)},disconnected:function(){var t=this;gt(this.$el)&&w(this.$el,{hidden:null,id:this.id||null}),this.svg&&this.svg.then(function(e){return(!t._connected||e!==t.svgEl)&&Et(e)},oi),this.svg=this.svgEl=null},methods:{getSvg:function(){var t=this;return this.src?En[this.src]?En[this.src]:(En[this.src]=new we(function(e,i){_e(t.src,"data:")?e(decodeURIComponent(t.src.split(",")[1])):ai(t.src).then(function(t){return e(t.response)},function(){return i("SVG not found.")})}),En[this.src]):we.reject()}}});var e=/<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,i={}}function Sn(t){t.component("switcher",{mixins:[Hi],args:"connect",props:{connect:String,toggle:String,active:Number,swiping:Boolean},defaults:{connect:"~.uk-switcher",toggle:"> *",active:0,swiping:!0,cls:"uk-active",clsContainer:"uk-switcher",attrItem:"uk-switcher-item",queued:!0},computed:{connects:function(t,e){return Lt(t.connect,e)},toggles:function(t,e){return Ht(t.toggle,e)}},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),this.show(t.current)}},{name:"click",el:function(){return this.connects},delegate:function(){return"["+this.attrItem+"],[data-"+this.attrItem+"]"},handler:function(t){t.preventDefault(),this.show(k(t.current,this.attrItem))}},{name:"swipeRight swipeLeft",filter:function(){return this.swiping},el:function(){return this.connects},handler:function(t){Ei(t)&&(t.preventDefault(),o.getSelection().toString()||this.show("swipeLeft"===t.type?"next":"previous"))}}],update:function(){var t=this;this.connects.forEach(function(e){return t.updateAria(e.children)}),this.show(Ft(this.toggles,"."+this.cls)[0]||this.toggles[this.active]||this.toggles[0])},methods:{show:function(t){for(var e,i=this,n=this.toggles.length,o=!!this.connects.length&&Bt(Ft(this.connects[0].children,"."+this.cls)[0]),r=o>=0,s=pt(t,this.toggles,o),a="previous"===t?-1:1,l=0;l<n;l++,s=(s+a+n)%n)if(!Jt(i.toggles[s],".uk-disabled, [disabled]")){e=i.toggles[s];break}!e||o>=0&&E(e,this.cls)||o===s||(I(this.toggles,this.cls),w(this.toggles,"aria-expanded",!1),$(e,this.cls),w(e,"aria-expanded",!0),this.connects.forEach(function(t){r?i.toggleElement([t.children[o],t.children[s]]):i.toggleNow(t.children[s])}))}}})}function An(t){t.component("tab",t.components.switcher.extend({mixins:[Oi],name:"tab",props:{media:"media"},defaults:{media:960,attrItem:"uk-tab-item"},init:function(){var e=E(this.$el,"uk-tab-left")?"uk-tab-left":!!E(this.$el,"uk-tab-right")&&"uk-tab-right";e&&t.toggle(this.$el,{cls:e,mode:"media",media:this.media})}}))}function Nn(t){t.component("toggle",{mixins:[t.mixin.togglable],args:"target",props:{href:String,target:null,mode:"list",media:"media"},defaults:{href:!1,target:!1,mode:"click",queued:!0,media:!1},computed:{target:function(t,e){var i=t.href,n=t.target;return n=Lt(n||i,e),n.length&&n||[e]}},events:[{name:m+" "+g,filter:function(){return Be(this.mode,"hover")},handler:function(t){Ei(t)||this.toggle("toggle"+(t.type===m?"show":"hide"))}},{name:"click",filter:function(){return Be(this.mode,"click")||c},handler:function(t){if(Ei(t)||Be(this.mode,"click")){var e;(Zt(t.target,'a[href="#"], button')||(e=Zt(t.target,"a[href]"))&&(this.cls||!wt(this.target)||e.hash&&Jt(this.target,e.hash)))&&le(r,"click",function(t){return t.preventDefault()}),this.toggle()}}}],update:{write:function(){if(Be(this.mode,"media")&&this.media){var t=this.isToggled(this.target);(o.matchMedia(this.media).matches?!t:t)&&this.toggle()}},events:["load","resize"]},methods:{toggle:function(t){he(this.target,t||"toggle",[this])&&this.toggleElement(this.target)}}})}function Dn(t){t.component("video",{props:{automute:Boolean,autoplay:Boolean},defaults:{automute:!1,autoplay:!0},computed:{inView:function(t){return"inview"===t.autoplay}},ready:function(){this.player=new wi(this.$el),this.automute&&this.player.mute()},update:[{read:function(t,e){var i=e.type;return!(!this.player||!("scroll"!==i&&"resize"!==i||this.inView))&&{visible:wt(this.$el)&&"hidden"!==D(this.$el,"visibility"),inView:this.inView&&ft(this.$el)}},write:function(t){var e=t.visible,i=t.inView;!e||this.inView&&!i?this.player.pause():(!0===this.autoplay||this.inView&&i)&&this.player.play()},events:["load","resize","scroll"]}]})}Ni.version="3.0.0-beta.38",(Mn=Ni).mixin.class=Oi,Mn.mixin.container=Pi,Mn.mixin.modal=zi,Mn.mixin.position=Wi,Mn.mixin.togglable=Hi;var Mn;(Bn=Ni).use(Nn),Bn.use(Li),Bn.use(ji),Bn.use(Dn),Bn.use(Vi),Bn.use(Ri),Bn.use(Yi),Bn.use(qi),Bn.use(Ji),Bn.use(Gi),Bn.use(gn),Bn.use(Ui),Bn.use(Xi),Bn.use(mn),Bn.use(vn),Bn.use(wn),Bn.use(bn),Bn.use(xn),Bn.use(kn),Bn.use($n),Bn.use(In),Bn.use(Tn),Bn.use(Cn),Bn.use(_n),Bn.use(pn),Bn.use(Sn),Bn.use(An),Bn.use(Fi);var Bn;function On(t,e){return void 0===t&&(t=0),void 0===e&&(e="%"),"translate("+t+(t?e:"")+", 0)"}function Pn(t){return"scale3d("+t+", "+t+", 1)"}function Hn(t){if(!Hn.installed){var e=t.util,i=e.$,n=e.addClass,o=e.assign,r=e.clamp,s=e.fastdom,a=e.getIndex,l=e.hasClass,h=e.isNumber,u=e.isRtl,c=e.Promise,d=e.removeClass,f=e.toNodes,p=e.trigger;t.mixin.slider={attrs:!0,mixins:[function(t){var e=t.util,i=e.doc,n=e.pointerDown;return{props:{autoplay:Boolean,autoplayInterval:Number,pauseOnHover:Boolean},defaults:{autoplay:!1,autoplayInterval:7e3,pauseOnHover:!0},connected:function(){this.startAutoplay()},disconnected:function(){this.stopAutoplay()},events:[{name:"visibilitychange",el:i,handler:function(){i.hidden?this.stopAutoplay():this.startAutoplay()}},{name:n,handler:"stopAutoplay"},{name:"mouseenter",filter:function(){return this.autoplay},handler:function(){this.isHovering=!0}},{name:"mouseleave",filter:function(){return this.autoplay},handler:function(){this.isHovering=!1}}],methods:{startAutoplay:function(){var t=this;this.stopAutoplay(),this.autoplay&&(this.interval=setInterval(function(){return!(t.isHovering&&t.pauseOnHover)&&!t.stack.length&&t.show("next")},this.autoplayInterval))},stopAutoplay:function(){this.interval&&clearInterval(this.interval)}}}}(t),function(t){var e=t.util,i=e.doc,n=e.getPos,o=e.includes,r=e.isRtl,s=e.isTouch,a=e.off,l=e.on,h=e.pointerDown,u=e.pointerMove,c=e.pointerUp,d=e.preventClick,f=e.trigger,p=e.win;return{defaults:{threshold:10,preventCatch:!1},init:function(){var t=this;["start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){var o=n(e).x*(r?-1:1);t.prevPos=o!==t.pos?t.pos:t.prevPos,t.pos=o,i(e)}})},events:[{name:h,delegate:function(){return this.slidesSelector},handler:function(t){(s(t)||(e=t.target,e.children.length||!e.childNodes.length))&&this.start(t);var e}},{name:"dragstart",handler:function(t){t.preventDefault()}}],methods:{start:function(t){t.button>0||this.length<2||this.preventCatch||(this.drag=this.pos,this._transitioner?(this.percent=this._transitioner.percent(),this.drag+=this._transitioner.getDistance()*this.percent*this.dir,this._transitioner.translate(this.percent),this._transitioner.cancel(),this.dragging=!0,this.stack=[]):this.prevIndex=this.index,this.unbindMove=l(i,u,this.move,{capture:!0,passive:!1}),l(p,"scroll",this.unbindMove),l(i,c,this.end,!0))},move:function(t){var e=this,i=this.pos-this.drag;if(!(0===i||this.prevPos===this.pos||!this.dragging&&Math.abs(i)<this.threshold)){t.cancelable&&t.preventDefault(),this.dragging=!0,this.dir=i<0?1:-1;for(var n=this.slides,r=this.prevIndex,s=Math.abs(i),a=this.getIndex(r+this.dir,r),l=this._getDistance(r,a)||n[r].offsetWidth;a!==r&&s>l;)e.drag-=l*e.dir,r=a,s-=l,a=e.getIndex(r+e.dir,r),l=e._getDistance(r,a)||n[r].offsetWidth;this.percent=s/l;var h=n[r],u=n[a],c=this.index!==a,d=r===a;[this.index,this.prevIndex].filter(function(t){return!o([a,r],t)}).forEach(function(t){f(n[t],"itemhidden",[e]),e._transitioner&&e._transitioner.reset(),d&&(e.prevIndex=r)}),this.index===r&&this.prevIndex!==r&&f(n[this.index],"itemshown",[this]),c&&(this.prevIndex=r,this.index=a,!d&&f(h,"beforeitemhide",[this]),f(u,"beforeitemshow",[this])),this._transitioner=this._translate(Math.abs(this.percent),h,!d&&u),c&&(!d&&f(h,"itemhide",[this]),f(u,"itemshow",[this]))}},end:function(){if(a(p,"scroll",this.unbindMove),this.unbindMove(),a(i,c,this.end,!0),this.dragging){if(this.dragging=null,this.index===this.prevIndex)this.percent=1-this.percent,this.dir*=-1,this._show(!1,this.index,!0),this._transitioner=null;else{var t=(r?this.dir*(r?1:-1):this.dir)<0==this.prevPos>this.pos;this.index=t?this.index:this.prevIndex,t&&(this.percent=1-this.percent),this.show(this.dir>0&&!t||this.dir<0&&t?"next":"previous",!0)}d()}this.drag=this.percent=null}}}}(t),function(t){var e=t.util,i=e.$,n=e.$$,o=e.data,r=e.html,s=e.index,a=e.toggleClass;return{defaults:{selNav:!1},computed:{nav:function(t,e){var n=t.selNav;return i(n,e)},navItemSelector:function(t){var e=t.attrItem;return"["+e+"],[data-"+e+"]"},navItems:function(t,e){return n(this.navItemSelector,e)}},update:[{write:function(){var t=this;this.nav&&this.length!==this.nav.children.length&&r(this.nav,this.slides.map(function(e,i){return"<li "+t.attrItem+'="'+i+'"><a href="#"></a></li>'}).join("")),a(n(this.navItemSelector,this.$el).concat(this.nav),"uk-hidden",!this.maxIndex)},events:["load","resize"]}],events:[{name:"click",delegate:function(){return this.navItemSelector},handler:function(t){t.preventDefault(),t.current.blur(),this.show(o(t.current,this.attrItem))}},{name:"itemshow",handler:function(){var t=this,e=this.getValidIndex();this.navItems.forEach(function(i){return a(i,t.clsActive,s(i)===e)})}}]}}(t)],props:{easing:String,index:Number,finite:Boolean,velocity:Number},defaults:{easing:"ease",finite:!1,velocity:1,index:0,stack:[],percent:0,clsActive:"uk-active",clsActivated:"uk-transition-active",Transitioner:!1,transitionOptions:{}},computed:{duration:function(t,e){var i=t.velocity;return zn(e.offsetWidth/i)},length:function(){return this.slides.length},list:function(t,e){var n=t.selList;return i(n,e)},maxIndex:function(){return this.length-1},slidesSelector:function(t){return t.selList+" > *"},slides:function(){return f(this.list.children)}},update:[{read:function(){this._resetComputeds()},events:["load","resize"]}],events:{beforeitemshow:function(t){var e=t.target;n(e,this.clsActive)},itemshown:function(t){var e=t.target;n(e,this.clsActivated)},itemhidden:function(t){var e=t.target;d(e,this.clsActive,this.clsActivated)}},methods:{show:function(t,e){var i=this;if(void 0===e&&(e=!1),!this.dragging&&this.length){var n=this.stack,o=e?0:n.length,r=function(){n.splice(o,1),n.length&&i.show(n.shift(),!0)};if(n[e?"unshift":"push"](t),!e&&n.length>1)2===n.length&&this._transitioner.forward(Math.min(this.duration,200));else{var a=this.index,h=l(this.slides,this.clsActive)&&this.slides[a],u=this.getIndex(t,this.index),d=this.slides[u];if(h!==d){this.dir=(f=t,m=a,"next"===f?1:"previous"===f?-1:f<m?-1:1);var f,m;if(this.prevIndex=a,this.index=u,h&&p(h,"beforeitemhide",[this]),!p(d,"beforeitemshow",[this,h]))return this.index=this.prevIndex,void r();var g=this._show(h,d,e).then(function(){return h&&p(h,"itemhidden",[i]),p(d,"itemshown",[i]),new c(function(t){s.write(function(){n.shift(),n.length?i.show(n.shift(),!0):i._transitioner=null,t()})})});return h&&p(h,"itemhide",[this]),p(d,"itemshow",[this]),g}r()}}},getIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.index),r(a(t,this.slides,e,this.finite),0,this.maxIndex)},getValidIndex:function(t,e){return void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),this.getIndex(t,e)},_show:function(t,e,i){if(this._transitioner=this._getTransitioner(t,e,this.dir,o({easing:i?e.offsetWidth<600?"cubic-bezier(0.25, 0.46, 0.45, 0.94)":"cubic-bezier(0.165, 0.84, 0.44, 1)":this.easing},this.transitionOptions)),!i&&!t)return this._transitioner.translate(1),c.resolve();var n=this.stack.length;return this._transitioner[n>1?"forward":"show"](n>1?Math.min(this.duration,75+75/(n-1)):this.duration,this.percent)},_getDistance:function(t,e){return new this._getTransitioner(t,t!==e&&e).getDistance()},_translate:function(t,e,i){void 0===e&&(e=this.prevIndex),void 0===i&&(i=this.index);var n=this._getTransitioner(e!==i&&e,i);return n.translate(t),n},_getTransitioner:function(t,e,i,n){return void 0===i&&(i=this.dir||1),void 0===n&&(n=this.transitionOptions),new this.Transitioner(h(t)?this.slides[t]:t,h(e)?this.slides[e]:e,i*(u?-1:1),n)}}}}}function zn(t){return.5*t+300}function Wn(t){if(!Wn.installed){t.use(Hn);var e=t.mixin,i=t.util,n=i.assign,o=i.fastdom,r=i.isNumber,s=function(t){var e=t.util.css,i={slide:{show:function(t){return[{transform:On(-100*t)},{transform:On()}]},percent:function(t){return i.translated(t)},translate:function(t,e){return[{transform:On(-100*e*t)},{transform:On(100*e*(1-t))}]}},translated:function(t){return Math.abs(e(t,"transform").split(",")[4]/t.offsetWidth)||0}};return i}(t),a=function(t){var e=t.util,i=e.createEvent,n=e.clamp,o=e.css,r=e.Deferred,s=e.noop,a=e.Promise,l=e.Transition,h=e.trigger;function u(t,e,n){h(t,i(e,!1,!1,n))}return function(t,e,i,h){var c=h.animation,d=h.easing,f=c.percent,p=c.translate,m=c.show;void 0===m&&(m=s);var g=m(i),v=new r;return{dir:i,show:function(o,r,h){var c=this;void 0===r&&(r=0);var f=h?"linear":d;return o-=Math.round(o*n(r,-1,1)),this.translate(r),u(e,"itemin",{percent:r,duration:o,timing:f,dir:i}),u(t,"itemout",{percent:1-r,duration:o,timing:f,dir:i}),a.all([l.start(e,g[1],o,f),l.start(t,g[0],o,f)]).then(function(){c.reset(),v.resolve()},s),v.promise},stop:function(){return l.stop([e,t])},cancel:function(){l.cancel([e,t])},reset:function(){for(var i in g[0])o([e,t],i,"")},forward:function(i,n){return void 0===n&&(n=this.percent()),l.cancel([e,t]),this.show(i,n,!0)},translate:function(n){var r=p(n,i);o(e,r[1]),o(t,r[0]),u(e,"itemtranslatein",{percent:n,dir:i}),u(t,"itemtranslateout",{percent:1-n,dir:i})},percent:function(){return f(t||e,e,i)},getDistance:function(){return t.offsetWidth}}}}(t);t.mixin.slideshow={mixins:[e.slider],props:{animation:String},defaults:{animation:"slide",Animations:s,Transitioner:a},computed:{animation:function(t){var e=t.animation,i=t.Animations;return n(e in i?i[e]:i.slide,{name:e})},transitionOptions:function(){return{animation:this.animation}}},events:{"itemshow itemhide itemshown itemhidden":function(e){var i=e.target;t.update(null,i)},itemshow:function(){r(this.prevIndex)&&o.flush()}}}}}function Ln(t){if(!Ln.installed){t.use(Wn);var e=t.mixin,i=t.util,n=i.$,o=i.addClass,r=i.ajax,s=i.append,a=i.assign,l=i.attr,h=i.css,u=i.doc,c=i.getImage,d=i.html,f=i.index,p=i.on,m=i.pointerDown,g=i.pointerMove,v=i.removeClass,w=i.Transition,b=i.trigger,y=function(t){var e=t.mixin,i=t.util,n=i.assign,o=i.css;return n({},e.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0},{opacity:1}]},percent:function(t){return 1-o(t,"opacity")},translate:function(t){return[{opacity:1-t},{opacity:t}]}},scale:{show:function(){return[{opacity:0,transform:Pn(.8)},{opacity:1,transform:Pn(1)}]},percent:function(t){return 1-o(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pn(1-.2*t)},{opacity:t,transform:Pn(.8+.2*t)}]}}})}(t);t.component("lightbox-panel",{mixins:[e.container,e.modal,e.togglable,e.slideshow],functional:!0,defaults:{preload:1,videoAutoplay:!1,delayControls:3e3,items:[],cls:"uk-open",clsPage:"uk-lightbox-page",selList:".uk-lightbox-items",attrItem:"uk-lightbox-item",selClose:".uk-close-large",pauseOnHover:!1,velocity:2,Animations:y,template:'<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href="#" uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href="#" uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>'},created:function(){var t=this;this.$mount(s(this.container,this.template)),this.caption=n(".uk-lightbox-caption",this.$el),this.items.forEach(function(){return s(t.list,"<li></li>")})},events:[{name:g+" "+m+" keydown",handler:"showControls"},{name:"click",self:!0,delegate:function(){return this.slidesSelector},handler:function(t){t.preventDefault(),this.hide()}},{name:"shown",self:!0,handler:"showControls"},{name:"hide",self:!0,handler:function(){this.hideControls(),v(this.slides,this.clsActive),w.stop(this.slides),delete this.index,delete this.percent,delete this._transitioner}},{name:"keyup",el:function(){return u},handler:function(t){if(this.isToggled(this.$el))switch(t.keyCode){case 37:this.show("previous");break;case 39:this.show("next")}}},{name:"beforeitemshow",handler:function(t){this.isToggled()||(this.preventCatch=!0,t.preventDefault(),this.animation=y.scale,v(t.target,this.clsActive),this.stack.splice(1,0,this.index),this.toggleNow(this.$el,!0))}},{name:"itemshow",handler:function(t){var e=t.target,i=f(e),n=this.getItem(i).caption;h(this.caption,"display",n?"":"none"),d(this.caption,n);for(var o=0;o<=this.preload;o++)this.loadItem(this.getIndex(i+o)),this.loadItem(this.getIndex(i-o));delete this._computeds.animation}},{name:"itemshown",handler:function(){this.preventCatch=!1}},{name:"itemload",handler:function(t,e){var i,o=this,s=e.source,a=e.type,h=e.alt;if(this.setItem(e,"<span uk-spinner></span>"),s)if("image"===a||s.match(/\.(jp(e)?g|png|gif|svg)$/i))c(s).then(function(t){return o.setItem(e,'<img width="'+t.width+'" height="'+t.height+'" src="'+s+'" alt="'+(h||"")+'">')},function(){return o.setError(e)});else if("video"===a||s.match(/\.(mp4|webm|ogv)$/i)){var u=n("<video controls playsinline"+(e.poster?' poster="'+e.poster+'"':"")+' uk-video="autoplay: '+this.videoAutoplay+'"></video>');l(u,"src",s),p(u,"error",function(){return o.setError(e)}),p(u,"loadedmetadata",function(){l(u,{width:u.videoWidth,height:u.videoHeight}),o.setItem(e,u)})}else if("iframe"===a)this.setItem(e,'<iframe class="uk-lightbox-iframe" src="'+s+'" frameborder="0" allowfullscreen></iframe>');else if(i=s.match(/\/\/.*?youtube\.[a-z]+\/watch\?v=([^&\s]+)/)||s.match(/youtu\.be\/(.*)/)){var d=i[1],f=function(t,i){return void 0===t&&(t=640),void 0===i&&(i=450),o.setItem(e,x("//www.youtube.com/embed/"+d,t,i,o.videoAutoplay))};c("//img.youtube.com/vi/"+d+"/maxresdefault.jpg").then(function(t){var e=t.width,i=t.height;120===e&&90===i?c("//img.youtube.com/vi/"+d+"/0.jpg").then(function(t){var e=t.width,i=t.height;return f(e,i)},f):f(e,i)},f)}else(i=s.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))&&r("//vimeo.com/api/oembed.json?maxwidth=1920&url="+encodeURI(s),{responseType:"json"}).then(function(t){var n=t.response,r=n.height,s=n.width;return o.setItem(e,x("//player.vimeo.com/video/"+i[2],s,r,o.videoAutoplay))})}}],methods:{loadItem:function(t){void 0===t&&(t=this.index);var e=this.getItem(t);e.content||b(this.$el,"itemload",[e])},getItem:function(t){return void 0===t&&(t=this.index),this.items[t]||{}},setItem:function(e,i){a(e,{content:i});var n=d(this.slides[this.items.indexOf(e)],i);b(this.$el,"itemloaded",[this,n]),t.update(null,n)},setError:function(t){this.setItem(t,'<span uk-icon="icon: bolt; ratio: 2"></span>')},showControls:function(){clearTimeout(this.controlsTimer),this.controlsTimer=setTimeout(this.hideControls,this.delayControls),o(this.$el,"uk-active","uk-transition-active")},hideControls:function(){v(this.$el,"uk-active","uk-transition-active")}}})}function x(t,e,i,n){return'<iframe src="'+t+'" width="'+e+'" height="'+i+'" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: '+n+'" uk-responsive></iframe>'}}function jn(t){if(!jn.installed){var e=t.mixin,i=t.util,n=i.css,o=i.Dimensions,r=i.each,s=i.getImage,a=i.includes,l=i.isNumber,h=i.isUndefined,u=i.toFloat,c=i.win,d=["x","y","bgx","bgy","rotate","scale","color","backgroundColor","borderColor","opacity","blur","hue","grayscale","invert","saturate","sepia","fopacity"];e.parallax={props:d.reduce(function(t,e){return t[e]="list",t},{media:"media"}),defaults:d.reduce(function(t,e){return t[e]=void 0,t},{media:!1}),computed:{props:function(t,e){var i=this;return d.reduce(function(o,r){if(h(t[r]))return o;var s,l,c,d=r.match(/color/i),f=d||"opacity"===r,p=t[r].slice(0);f&&n(e,r,""),p.length<2&&p.unshift(("scale"===r?1:f?n(e,r):0)||0);var m=a(p.join(""),"%")?"%":"px";if(d){var g=e.style.color;p=p.map(function(t){return n(n(e,"color",t),"color").split(/[(),]/g).slice(1,-1).concat(1).slice(0,4).map(function(t){return u(t)})}),e.style.color=g}else p=p.map(u);if(r.match(/^bg/))if(n(e,"background-position-"+r[2],""),l=n(e,"backgroundPosition").split(" ")["x"===r[2]?0:1],i.covers){var v=Math.min.apply(Math,p),w=Math.max.apply(Math,p),b=p.indexOf(v)<p.indexOf(w);c=w-v,p=p.map(function(t){return t-(b?v:w)}),s=(b?-c:0)+"px"}else s=l;return o[r]={steps:p,unit:m,pos:s,bgPos:l,diff:c},o},{})},bgProps:function(){var t=this;return["bgx","bgy"].filter(function(e){return e in t.props})},covers:function(t,e){return"cover"===n(""!==e.style.backgroundSize?n(e,"backgroundSize",""):e,"backgroundSize")}},disconnected:function(){delete this._image},update:[{read:function(t){var e=this;if(this._resetComputeds(),t.active=!this.media||c.matchMedia(this.media).matches,t.image&&(t.image.dimEl={width:this.$el.offsetWidth,height:this.$el.offsetHeight}),!("image"in t)&&this.covers&&this.bgProps.length){var i=n(this.$el,"backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/,"$1");i&&(t.image=!1,s(i).then(function(i){t.image={width:i.naturalWidth,height:i.naturalHeight},e.$emit()}))}},write:function(t){var e=this,i=t.image,r=t.active;if(i)if(r){var s=i.dimEl,a=o.cover(i,s);this.bgProps.forEach(function(t){var n=e.props[t],r=n.diff,l=n.bgPos,h=n.steps,u="bgy"===t?"height":"width",c=a[u]-s[u];l.match(/%$|0px/)&&(c<r?s[u]=a[u]+r-c:c>r&&(l=parseFloat(l))&&(e.props[t].steps=h.map(function(t){return t-(c-r)/(100/l)})),a=o.cover(i,s))}),n(this.$el,{backgroundSize:a.width+"px "+a.height+"px",backgroundRepeat:"no-repeat"})}else n(this.$el,{backgroundSize:"",backgroundRepeat:""})},events:["load","resize"]}],methods:{reset:function(){var t=this;r(this.getCss(0),function(e,i){return n(t.$el,i,"")})},getCss:function(t){var e=!1,i=this.props;return Object.keys(i).reduce(function(n,o){var r=i[o],s=r.steps,a=r.unit,l=r.pos,h=p(s,t);switch(o){case"x":case"y":if(e)break;var c=["x","y"].map(function(e){return o===e?h+a:i[e]?p(i[e].steps,t)+i[e].unit:0}),d=c[0],m=c[1];e=n.transform+=" translate3d("+d+", "+m+", 0)";break;case"rotate":n.transform+=" rotate("+h+"deg)";break;case"scale":n.transform+=" scale("+h+")";break;case"bgy":case"bgx":n["background-position-"+o[2]]="calc("+l+" + "+(h+a)+")";break;case"color":case"backgroundColor":case"borderColor":var g=f(s,t),v=g[0],w=g[1],b=g[2];n[o]="rgba("+v.map(function(t,e){return t+=b*(w[e]-t),3===e?u(t):parseInt(t,10)}).join(",")+")";break;case"blur":n.filter+=" blur("+h+"px)";break;case"hue":n.filter+=" hue-rotate("+h+"deg)";break;case"fopacity":n.filter+=" opacity("+h+"%)";break;case"grayscale":case"invert":case"saturate":case"sepia":n.filter+=" "+o+"("+h+"%)";break;default:n[o]=h}return n},{transform:"",filter:""})}}}}function f(t,e){var i=t.length-1,n=Math.min(Math.floor(i*e),i-1),o=t.slice(n,n+2);return o.push(1===e?1:e%(1/i)*i),o}function p(t,e){var i=f(t,e),n=i[0],o=i[1],r=i[2];return(l(n)?n+Math.abs(n-o)*r*(n<o?1:-1):+o).toFixed(2)}}function Fn(t){var e=t.util,i=e.fastdom,n=e.removeClass;return{ready:function(){var t=this;i.write(function(){return t.show(t.getValidIndex())})},update:[{read:function(){this._resetComputeds()},write:function(){if(!this.stack.length){var t=this.getValidIndex();delete this.index,n(this.slides,this.clsActive,this.clsActivated),this.show(t)}},events:["load","resize"]}]}}function Vn(t){if(!Vn.installed){t.use(jn);var e=t.mixin,i=t.util,n=i.closest,o=i.css,r=i.endsWith,s=i.noop,a=i.Transition;t.component("slideshow-parallax",{mixins:[e.parallax],computed:{item:function(){var e=t.getComponent(n(this.$el,".uk-slideshow"),"slideshow");return e&&n(this.$el,e.slidesSelector)}},events:[{name:"itemshown",self:!0,el:function(){return this.item},handler:function(){o(this.$el,this.getCss(.5))}},{name:"itemin itemout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,r=i.duration,u=i.timing,c=i.dir;a.cancel(this.$el),o(this.$el,this.getCss(h(e,c,n))),a.start(this.$el,this.getCss(l(e)?.5:c>0?1:0),r,u).catch(s)}},{name:"transitioncanceled transitionend",self:!0,el:function(){return this.item},handler:function(){a.cancel(this.$el)}},{name:"itemtranslatein itemtranslateout",self:!0,el:function(){return this.item},handler:function(t){var e=t.type,i=t.detail,n=i.percent,r=i.dir;a.cancel(this.$el),o(this.$el,this.getCss(h(e,r,n)))}}]})}function l(t){return r(t,"in")}function h(t,e,i){return i/=2,l(t)?e<0?1-i:i:e<0?i:1-i}}return Ni.use(function t(e){if(!t.installed){var i=e.util,n=i.$,o=i.doc,r=i.empty,s=i.html;e.component("countdown",{mixins:[e.mixin.class],attrs:!0,props:{date:String,clsWrapper:String},defaults:{date:"",clsWrapper:".uk-countdown-%unit%"},computed:{date:function(t){var e=t.date;return Date.parse(e)},days:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","days"),e)},hours:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","hours"),e)},minutes:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","minutes"),e)},seconds:function(t,e){var i=t.clsWrapper;return n(i.replace("%unit%","seconds"),e)},units:function(){var t=this;return["days","hours","minutes","seconds"].filter(function(e){return t[e]})}},connected:function(){this.start()},disconnected:function(){var t=this;this.stop(),this.units.forEach(function(e){return r(t[e])})},events:[{name:"visibilitychange",el:o,handler:function(){o.hidden?this.stop():this.start()}}],update:{write:function(){var t=this,e=function(t){var e=t-Date.now();return{total:e,seconds:e/1e3%60,minutes:e/1e3/60%60,hours:e/1e3/60/60%24,days:e/1e3/60/60/24}}(this.date);e.total<=0&&(this.stop(),e.days=e.hours=e.minutes=e.seconds=0),this.units.forEach(function(i){var n=String(Math.floor(e[i]));n=n.length<2?"0"+n:n;var o=t[i];o.textContent!==n&&((n=n.split("")).length!==o.children.length&&s(o,n.map(function(){return"<span></span>"}).join("")),n.forEach(function(t,e){return o.children[e].textContent=t}))})}},methods:{start:function(){var t=this;this.stop(),this.date&&this.units.length&&(this.$emit(),this.timer=setInterval(function(){return t.$emit()},1e3))},stop:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}}})}}),Ni.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.css,r=i.scrolledOver,s=i.toFloat;e.component("grid-parallax",e.components.grid.extend({props:{target:String,translate:Number},defaults:{target:!1,translate:150},computed:{translate:function(t){var e=t.translate;return Math.abs(e)}},init:function(){n(this.$el,"uk-grid")},disconnected:function(){this.reset(),o(this.$el,"marginBottom","")},update:[{read:function(t){var e=t.rows;return{columns:e&&e[0]&&e[0].length||0,rows:e&&e.map(function(t){return e="offsetLeft",t.sort(function(t,i){return t[e]>i[e]?1:i[e]>t[e]?-1:0});var e})}},write:function(t){var e=t.columns;o(this.$el,"marginBottom",e>1?this.translate+s(o(o(this.$el,"marginBottom",""),"marginBottom")):"")},events:["load","resize"]},{read:function(){return{scrolled:r(this.$el)*this.translate}},write:function(t){var e=t.rows,i=t.columns,n=t.scrolled;if(!e||1===i||!n)return this.reset();e.forEach(function(t){return t.forEach(function(t,e){return o(t,"transform","translateY("+(e%2?n:n/8)+"px)")})})},events:["scroll","load","resize"]}],methods:{reset:function(){o(this.$el.children,"transform","")}}})),e.components.gridParallax.options.update.unshift({read:function(){this.reset()},events:["load","resize"]})}}),Ni.use(function t(e){if(!t.installed){e.use(Ln);var i=e.util,n=i.$$,o=i.assign,r=i.data,s=i.index;e.component("lightbox",{attrs:!0,props:{animation:String,container:Boolean,toggle:String,autoplay:Boolean,autoplayInterval:Number,videoAutoplay:Boolean},defaults:{animation:void 0,container:!0,toggle:"a",autoplay:0,videoAutoplay:!1},computed:{toggles:function(t,e){var i=t.toggle;return n(i,e)}},disconnected:function(){this._destroy()},events:[{name:"click",delegate:function(){return this.toggle+":not(.uk-disabled)"},handler:function(t){t.preventDefault(),t.current.blur(),this.show(s(this.toggles,t.current))}}],update:function(t){if(this.panel&&this.animation&&(this.panel.$props.animation=this.animation,this.panel.$emit()),!(!this.panel||t.toggles&&(e=t.toggles,i=this.toggles,e.length===i.length&&e.every(function(t,e){return t!==i[e]})))){var e,i;t.toggles=this.toggles,this._destroy(),this._init()}},methods:{_init:function(){return this.panel=this.panel||e.lightboxPanel(o({},this.$props,{items:this.toggles.reduce(function(t,e){return t.push(["href","caption","type","poster","alt"].reduce(function(t,i){return t["href"===i?"source":i]=r(e,i),t},{})),t},[])}))},_destroy:function(){this.panel&&(this.panel.$destroy(!0),this.panel=null)},show:function(t){return this.panel||this._init(),this.panel.show(t)},hide:function(){return this.panel&&this.panel.hide()}}})}}),Ni.use(function t(e){var i;if(!t.installed){var n=e.util,o=n.append,r=n.closest,s=n.css,a=n.each,l=n.pointerEnter,h=n.pointerLeave,u=n.remove,c=n.toFloat,d=n.Transition,f=n.trigger,p={};e.component("notification",{functional:!0,args:["message","status"],defaults:{message:"",status:"",timeout:5e3,group:null,pos:"top-center",clsClose:"uk-notification-close",clsMsg:"uk-notification-message"},created:function(){p[this.pos]||(p[this.pos]=o(e.container,'<div class="uk-notification uk-notification-'+this.pos+'"></div>'));var t=s(p[this.pos],"display","block");this.$mount(o(t,'<div class="'+this.clsMsg+(this.status?" "+this.clsMsg+"-"+this.status:"")+'"> <a href="#" class="'+this.clsClose+'" data-uk-close></a> <div>'+this.message+"</div> </div>"))},ready:function(){var t=this,e=c(s(this.$el,"marginBottom"));d.start(s(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}),{opacity:1,marginTop:0,marginBottom:e}).then(function(){t.timeout&&(t.timer=setTimeout(t.close,t.timeout))})},events:(i={click:function(t){r(t.target,'a[href="#"]')&&t.preventDefault(),this.close()}},i[l]=function(){this.timer&&clearTimeout(this.timer)},i[h]=function(){this.timeout&&(this.timer=setTimeout(this.close,this.timeout))},i),methods:{close:function(t){var e=this,i=function(){f(e.$el,"close",[e]),u(e.$el),p[e.pos].children.length||s(p[e.pos],"display","none")};this.timer&&clearTimeout(this.timer),t?i():d.start(this.$el,{opacity:0,marginTop:-this.$el.offsetHeight,marginBottom:0}).then(i)}}}),e.notification.closeAll=function(t,i){a(e.instances,function(e){"notification"!==e.$options.name||t&&t!==e.group||e.close(i)})}}}),Ni.use(function t(e){if(!t.installed){e.use(jn);var i=e.mixin,n=e.util,o=n.clamp,r=n.css,s=n.scrolledOver,a=n.query;e.component("parallax",{mixins:[i.parallax],props:{target:String,viewport:Number,easing:Number},defaults:{target:!1,viewport:1,easing:1},computed:{target:function(t,e){var i=t.target;return i&&a(i,e)||e}},update:[{read:function(t){return{prev:t.percent,percent:(e=s(this.target)/(this.viewport||1),i=this.easing,o(e*(1-(i-i*e))))};var e,i},write:function(t,e){var i=t.prev,n=t.percent,o=t.active;"scroll"!==e.type&&(i=!1),o?i!==n&&r(this.$el,this.getCss(n)):this.reset()},events:["scroll","load","resize"]}]})}}),Ni.use(function t(e){if(!t.installed){e.use(Hn);var i=e.mixin,n=e.util,o=n.$,r=n.$$,s=n.css,a=n.data,l=n.includes,h=n.isNumeric,u=n.toggleClass,c=n.toFloat,d=function(t){var e=t.util,i=e.clamp,n=e.css,o=e.Deferred,r=e.isRtl,s=e.noop,a=e.toNodes,l=e.Transition;function h(t,e,a,u){var c=u.center,d=u.easing,f=u.list,p=new o,m=t?h.getLeft(t,f,c):h.getLeft(e,f,c)+e.offsetWidth*a,g=e?h.getLeft(e,f,c):m+t.offsetWidth*a*(r?-1:1);return{dir:a,show:function(t,e,n){return void 0===e&&(e=0),t-=Math.round(t*i(e,-1,1)),this.translate(e),l.start(f,{transform:On(-g*(r?-1:1),"px")},t,n?"linear":d).then(p.resolve,s),p.promise},stop:function(){return l.stop(f)},cancel:function(){l.cancel(f)},reset:function(){n(f,"transform","")},forward:function(t,e){return void 0===e&&(e=this.percent()),l.cancel(f),this.show(t,e,!0)},translate:function(t){var e=this.getDistance()*a*(r?-1:1);n(f,"transform",On(i(e-e*t-g,-h.getWidth(f),f.offsetWidth)*(r?-1:1),"px"))},percent:function(){return Math.abs((n(f,"transform").split(",")[4]*(r?-1:1)+m)/(g-m))},getDistance:function(){return Math.abs(g-m)}}}return h.getLeft=function(t,e,i){var n=h.getElLeft(t,e);return i?n-h.center(t,e):Math.min(n,h.getMax(e))},h.getMax=function(t){return Math.max(0,h.getWidth(t)-t.offsetWidth)},h.getWidth=function(t){return a(t.children).reduce(function(t,e){return e.offsetWidth+t},0)},h.getMaxWidth=function(t){return a(t.children).reduce(function(t,e){return Math.max(t,e.offsetWidth)},0)},h.center=function(t,e){return e.offsetWidth/2-t.offsetWidth/2},h.getElLeft=function(t,e){return(t.offsetLeft+(r?t.offsetWidth-e.offsetWidth:0))*(r?-1:1)},h}(e);e.component("slider",{mixins:[i.class,i.slider,Fn(e)],props:{center:Boolean,sets:Boolean},defaults:{center:!1,sets:!1,attrItem:"uk-slider-item",selList:".uk-slider-items",selNav:".uk-slider-nav",clsContainer:"uk-slider-container",Transitioner:d},computed:{avgWidth:function(){return d.getWidth(this.list)/this.length},finite:function(t){var e=t.finite;return e||d.getWidth(this.list)<this.list.offsetWidth+d.getMaxWidth(this.list)+this.center},maxIndex:function(){if(!this.finite||this.center&&!this.sets)return this.length-1;if(this.center)return this.sets[this.sets.length-1];s(this.slides,"order","");for(var t=d.getMax(this.list),e=this.length;e--;)if(d.getElLeft(this.list.children[e],this.list)<t)return Math.min(e+1,this.length-1);return 0},sets:function(t){var e=this,i=t.sets,n=this.list.offsetWidth/(this.center?2:1),o=0,r=n;return s(this.slides,"order",""),i=i&&this.slides.reduce(function(t,i,s){var a=i.offsetWidth,h=d.getElLeft(i,e.list);if(h+a>o&&(!e.center&&s>e.maxIndex&&(s=e.maxIndex),!l(t,s))){var u=e.slides[s+1];e.center&&u&&a<r-u.offsetWidth/2?r-=a:(r=n,t.push(s),o=h+n+(e.center?a/2:0))}return t},[]),i&&i.length&&i},transitionOptions:function(){return{center:this.center,list:this.list}}},connected:function(){u(this.$el,this.clsContainer,!o("."+this.clsContainer,this.$el))},update:{write:function(){var t=this;r("["+this.attrItem+"],[data-"+this.attrItem+"]",this.$el).forEach(function(e){var i=a(e,t.attrItem);t.maxIndex&&u(e,"uk-hidden",h(i)&&(t.sets&&!l(t.sets,c(i))||i>t.maxIndex))})},events:["load","resize"]},events:{beforeitemshow:function(t){!this.dragging&&this.sets&&this.stack.length<2&&!l(this.sets,this.index)&&(this.index=this.getValidIndex());var e=Math.abs(this.index+(this.dir>0?this.index<this.prevIndex?this.maxIndex+1:0:this.index>this.prevIndex?-this.maxIndex:0)-this.prevIndex);if(!this.dragging&&e>1){for(var i=0;i<e;i++)this.stack.splice(1,0,this.dir>0?"next":"previous");t.preventDefault()}else this.duration=zn(this.avgWidth/this.velocity)*((this.dir<0||!this.slides[this.prevIndex]?this.slides[this.index]:this.slides[this.prevIndex]).offsetWidth/this.avgWidth),this.reorder()}},methods:{reorder:function(){var t=this;if(s(this.slides,"order",""),!this.finite&&(this.slides.forEach(function(e,i){return s(e,"order",t.dir>0&&i<t.prevIndex?1:t.dir<0&&i>=t.index?-1:"")}),this.center))for(var e=this.dir>0&&this.slides[this.prevIndex]?this.prevIndex:this.index,i=this.slides[e],n=this.list.offsetWidth/2-i.offsetWidth/2,o=0;n>=0;){var r=t.getIndex(--o+e,e),a=t.slides[r];s(a,"order",r>e?-2:-1),n-=a.offsetWidth}},getValidIndex:function(t,e){if(void 0===t&&(t=this.index),void 0===e&&(e=this.prevIndex),t=this.getIndex(t,e),!this.sets)return t;var i;do{if(l(this.sets,t))return t;i=t,t=this.getIndex(t+this.dir,e)}while(t!==i);return t}}})}}),Ni.use(function t(e){if(!t.installed){e.use(Vn),e.use(Wn);var i=e.mixin,n=e.util.height,o=function(t){var e=t.mixin,i=t.util,n=i.assign,o=i.css,r=n({},e.slideshow.defaults.Animations,{fade:{show:function(){return[{opacity:0,zIndex:0},{zIndex:-1}]},percent:function(t){return 1-o(t,"opacity")},translate:function(t){return[{opacity:1-t,zIndex:0},{zIndex:-1}]}},scale:{show:function(){return[{opacity:0,transform:Pn(1.5),zIndex:0},{zIndex:-1}]},percent:function(t){return 1-o(t,"opacity")},translate:function(t){return[{opacity:1-t,transform:Pn(1+.5*t),zIndex:0},{zIndex:-1}]}},pull:{show:function(t){return t<0?[{transform:On(30),zIndex:-1},{transform:On(),zIndex:0}]:[{transform:On(-100),zIndex:0},{transform:On(),zIndex:-1}]},percent:function(t,e,i){return i<0?1-r.translated(e):r.translated(t)},translate:function(t,e){return e<0?[{transform:On(30*t),zIndex:-1},{transform:On(-100*(1-t)),zIndex:0}]:[{transform:On(100*-t),zIndex:0},{transform:On(30*(1-t)),zIndex:-1}]}},push:{show:function(t){return t<0?[{transform:On(100),zIndex:0},{transform:On(),zIndex:-1}]:[{transform:On(-30),zIndex:-1},{transform:On(),zIndex:0}]},percent:function(t,e,i){return i>0?1-r.translated(e):r.translated(t)},translate:function(t,e){return e<0?[{transform:On(100*t),zIndex:0},{transform:On(-30*(1-t)),zIndex:-1}]:[{transform:On(-30*t),zIndex:-1},{transform:On(100*(1-t)),zIndex:0}]}}});return r}(e);e.component("slideshow",{mixins:[i.class,i.slideshow,Fn(e)],props:{ratio:String,minHeight:Boolean,maxHeight:Boolean},defaults:{ratio:"16:9",minHeight:!1,maxHeight:!1,selList:".uk-slideshow-items",attrItem:"uk-slideshow-item",selNav:".uk-slideshow-nav",Animations:o},update:{read:function(){var t=this.ratio.split(":").map(Number),e=t[0],i=t[1];return i=i*this.$el.offsetWidth/e,this.minHeight&&(i=Math.max(this.minHeight,i)),this.maxHeight&&(i=Math.min(this.maxHeight,i)),{height:i}},write:function(t){var e=t.height;n(this.list,Math.floor(e))},events:["load","resize"]}})}}),Ni.use(function t(e){var i;if(!t.installed){var n=e.mixin,o=e.util,r=o.addClass,s=o.after,a=o.assign,l=o.append,h=o.attr,u=o.before,c=o.closest,d=o.css,f=o.doc,p=o.docEl,m=o.height,g=o.fastdom,v=o.getPos,w=o.includes,b=o.index,y=o.isInput,x=o.noop,k=o.offset,$=o.off,I=o.on,T=o.pointerDown,C=o.pointerMove,E=o.pointerUp,_=o.position,S=o.preventClick,A=o.Promise,N=o.remove,D=o.removeClass,M=o.toggleClass,B=o.toNodes,O=o.Transition,P=o.trigger,H=o.win,z=o.within;e.component("sortable",{mixins:[n.class],props:{group:String,animation:Number,threshold:Number,clsItem:String,clsPlaceholder:String,clsDrag:String,clsDragState:String,clsBase:String,clsNoDrag:String,clsEmpty:String,clsCustom:String,handle:String},defaults:{group:!1,animation:150,threshold:5,clsItem:"uk-sortable-item",clsPlaceholder:"uk-sortable-placeholder",clsDrag:"uk-sortable-drag",clsDragState:"uk-drag",clsBase:"uk-sortable",clsNoDrag:"uk-sortable-nodrag",clsEmpty:"uk-sortable-empty",clsCustom:"",handle:!1},init:function(){var t=this;["init","start","move","end"].forEach(function(e){var i=t[e];t[e]=function(e){t.scrollY=H.scrollY;var n=v(e),o=n.x,r=n.y;t.pos={x:o,y:r},i(e)}})},events:(i={},i[T]="init",i),update:{write:function(){if(this.clsEmpty&&M(this.$el,this.clsEmpty,!this.$el.children.length),this.drag){k(this.drag,{top:this.pos.y+this.origin.top,left:this.pos.x+this.origin.left});var t,e=k(this.drag).top,i=e+this.drag.offsetHeight;e>0&&e<this.scrollY?t=this.scrollY-5:i<m(f)&&i>m(H)+this.scrollY&&(t=this.scrollY+5),t&&setTimeout(function(){return H.scrollTo(H.scrollX,t)},5)}}},methods:{init:function(t){var e=t.target,i=t.button,n=t.defaultPrevented,o=B(this.$el.children).filter(function(t){return z(e,t)})[0];!o||y(t.target)||this.handle&&!z(e,this.handle)||i>0||z(e,"."+this.clsNoDrag)||n||(t.preventDefault(),this.touched=[this],this.placeholder=o,this.origin=a({target:e,index:b(o)},this.pos),I(p,C,this.move),I(p,E,this.end),I(H,"scroll",this.scroll),this.threshold||this.start(t))},start:function(t){this.drag=l(e.container,this.placeholder.outerHTML.replace(/^<li/i,"<div").replace(/li>$/i,"div>")),d(this.drag,a({boxSizing:"border-box",width:this.placeholder.offsetWidth,height:this.placeholder.offsetHeight},d(this.placeholder,["paddingLeft","paddingRight","paddingTop","paddingBottom"]))),h(this.drag,"uk-no-boot",""),r(this.drag,this.clsDrag,this.clsCustom),m(this.drag.firstElementChild,m(this.placeholder.firstElementChild));var i=k(this.placeholder),n=i.left,o=i.top;a(this.origin,{left:n-this.pos.x,top:o-this.pos.y}),r(this.placeholder,this.clsPlaceholder),r(this.$el.children,this.clsItem),r(p,this.clsDragState),P(this.$el,"start",[this,this.placeholder,this.drag]),this.move(t)},move:function(t){if(this.drag){this.$emit();var e="mousemove"===t.type?t.target:f.elementFromPoint(this.pos.x-f.body.scrollLeft,this.pos.y-f.body.scrollTop),i=W(e),n=W(this.placeholder),o=i!==n;if(i&&!z(e,this.placeholder)&&(!o||i.group&&i.group===n.group)){if(e=i.$el===e.parentNode&&e||B(i.$el.children).filter(function(t){return z(e,t)})[0],o)n.remove(this.placeholder);else if(!e)return;i.insert(this.placeholder,e),w(this.touched,i)||this.touched.push(i)}}else(Math.abs(this.pos.x-this.origin.x)>this.threshold||Math.abs(this.pos.y-this.origin.y)>this.threshold)&&this.start(t)},scroll:function(){var t=H.scrollY;t!==this.scrollY&&(this.pos.y+=t-this.scrollY,this.scrollY=t,this.$emit())},end:function(t){if($(p,C,this.move),$(p,E,this.end),$(H,"scroll",this.scroll),this.drag){S();var e=W(this.placeholder);this===e?this.origin.index!==b(this.placeholder)&&P(this.$el,"moved",[this,this.placeholder]):(P(e.$el,"added",[e,this.placeholder]),P(this.$el,"removed",[this,this.placeholder])),P(this.$el,"stop",[this]),N(this.drag),this.drag=null;var i=this.touched.map(function(t){return t.clsPlaceholder+" "+t.clsItem}).join(" ");this.touched.forEach(function(t){return D(t.$el.children,i)}),D(p,this.clsDragState)}else"mouseup"!==t.type&&z(t.target,"a[href]")&&(location.href=c(t.target,"a[href]").href)},insert:function(t,e){var i=this;r(this.$el.children,this.clsItem);var n=function(){e?!z(t,i.$el)||(n=t,o=e,n.parentNode===o.parentNode&&b(n)>b(o))?u(e,t):s(e,t):l(i.$el,t);var n,o};this.animation?this.animate(n):n()},remove:function(t){z(t,this.$el)&&(this.animation?this.animate(function(){return N(t)}):N(t))},animate:function(t){var e=this,i=[],n=B(this.$el.children),o={position:"",width:"",height:"",pointerEvents:"",top:"",left:"",bottom:"",right:""};n.forEach(function(t){i.push(a({position:"absolute",pointerEvents:"none",width:t.offsetWidth,height:t.offsetHeight},_(t)))}),t(),n.forEach(O.cancel),d(this.$el.children,o),this.$update("update",!0),g.flush(),d(this.$el,"minHeight",m(this.$el));var r=n.map(function(t){return _(t)});A.all(n.map(function(t,n){return O.start(d(t,i[n]),r[n],e.animation)})).then(function(){d(e.$el,"minHeight",""),d(n,o),e.$update("update",!0),g.flush()},x)}}})}function W(t){return t&&(e.getComponent(t,"sortable")||W(t.parentNode))}}),Ni.use(function t(e){var i;if(!t.installed){var n=e.util,o=e.mixin,r=n.append,s=n.attr,a=n.doc,l=n.flipPosition,h=n.hasAttr,u=n.includes,c=n.isTouch,d=n.isVisible,f=n.matches,p=n.on,m=n.pointerDown,g=n.pointerEnter,v=n.pointerLeave,w=n.remove,b=n.within,y=[];e.component("tooltip",{attrs:!0,mixins:[o.container,o.togglable,o.position],props:{delay:Number,title:String},defaults:{pos:"top",title:"",delay:0,animation:["uk-animation-scale-up"],duration:100,cls:"uk-active",clsPos:"uk-tooltip"},beforeConnect:function(){this._hasTitle=h(this.$el,"title"),s(this.$el,{title:"","aria-expanded":!1})},disconnected:function(){this.hide(),s(this.$el,{title:this._hasTitle?this.title:null,"aria-expanded":null})},methods:{show:function(){var t=this;u(y,this)||(y.forEach(function(t){return t.hide()}),y.push(this),this._unbind=p(a,"click",function(e){return!b(e.target,t.$el)&&t.hide()}),clearTimeout(this.showTimer),this.tooltip=r(this.container,'<div class="'+this.clsPos+'" aria-hidden><div class="'+this.clsPos+'-inner">'+this.title+"</div></div>"),s(this.$el,"aria-expanded",!0),this.positionAt(this.tooltip,this.$el),this.origin="y"===this.getAxis()?l(this.dir)+"-"+this.align:this.align+"-"+l(this.dir),this.showTimer=setTimeout(function(){t.toggleElement(t.tooltip,!0),t.hideTimer=setInterval(function(){d(t.$el)||t.hide()},150)},this.delay))},hide:function(){var t=y.indexOf(this);!~t||f(this.$el,"input")&&this.$el===a.activeElement||(y.splice(t,1),clearTimeout(this.showTimer),clearInterval(this.hideTimer),s(this.$el,"aria-expanded",!1),this.toggleElement(this.tooltip,!1),this.tooltip&&w(this.tooltip),this.tooltip=!1,this._unbind())}},events:(i={},i["focus "+g+" "+m]=function(t){t.type===m&&c(t)||this.show()},i.blur="hide",i[v]=function(t){c(t)||this.hide()},i)})}}),Ni.use(function t(e){if(!t.installed){var i=e.util,n=i.addClass,o=i.ajax,r=i.matches,s=i.noop,a=i.on,l=i.removeClass,h=i.trigger;e.component("upload",{props:{allow:String,clsDragover:String,concurrent:Number,maxSize:Number,mime:String,msgInvalidMime:String,msgInvalidName:String,msgInvalidSize:String,multiple:Boolean,name:String,params:Object,type:String,url:String},defaults:{allow:!1,clsDragover:"uk-dragover",concurrent:1,maxSize:0,mime:!1,msgInvalidMime:"Invalid File Type: %s",msgInvalidName:"Invalid File Name: %s",msgInvalidSize:"Invalid File Size: %s Bytes Max",multiple:!1,name:"files[]",params:{},type:"POST",url:"",abort:s,beforeAll:s,beforeSend:s,complete:s,completeAll:s,error:s,fail:s,load:s,loadEnd:s,loadStart:s,progress:s},events:{change:function(t){r(t.target,'input[type="file"]')&&(t.preventDefault(),t.target.files&&this.upload(t.target.files),t.target.value="")},drop:function(t){c(t);var e=t.dataTransfer;e&&e.files&&(l(this.$el,this.clsDragover),this.upload(e.files))},dragenter:function(t){c(t)},dragover:function(t){c(t),n(this.$el,this.clsDragover)},dragleave:function(t){c(t),l(this.$el,this.clsDragover)}},methods:{upload:function(t){var e=this;if(t.length){h(this.$el,"upload",[t]);for(var i=0;i<t.length;i++){if(e.maxSize&&1e3*e.maxSize<t[i].size)return void e.fail(e.msgInvalidSize.replace("%s",e.allow));if(e.allow&&!u(e.allow,t[i].name))return void e.fail(e.msgInvalidName.replace("%s",e.allow));if(e.mime&&!u(e.mime,t[i].type))return void e.fail(e.msgInvalidMime.replace("%s",e.mime))}this.multiple||(t=[t[0]]),this.beforeAll(this,t);var n=function(t,e){for(var i=[],n=0;n<t.length;n+=e){for(var o=[],r=0;r<e;r++)o.push(t[n+r]);i.push(o)}return i}(t,this.concurrent),r=function(t){var i=new FormData;t.forEach(function(t){return i.append(e.name,t)});for(var s in e.params)i.append(s,e.params[s]);o(e.url,{data:i,method:e.type,beforeSend:function(t){var i=t.xhr;i.upload&&a(i.upload,"progress",e.progress),["loadStart","load","loadEnd","abort"].forEach(function(t){return a(i,t.toLowerCase(),e[t])}),e.beforeSend(t)}}).then(function(t){e.complete(t),n.length?r(n.shift()):e.completeAll(t)},function(t){return e.error(t.message)})};r(n.shift())}}}})}function u(t,e){return e.match(new RegExp("^"+t.replace(/\//g,"\\/").replace(/\*\*/g,"(\\/[^\\/]+)*").replace(/\*/g,"[^\\/]+").replace(/((?!\\))\?/g,"$1.")+"$","i"))}function c(t){t.preventDefault(),t.stopPropagation()}}),function(t){var e=t.connect,i=t.disconnect;a&&(r.body?n():new a(function(){r.body&&(this.disconnect(),n())}).observe(s,{childList:!0,subtree:!0}));function n(){l(r.body,e),li.flush(),new a(function(t){return t.forEach(o)}).observe(s,{childList:!0,subtree:!0,characterData:!0,attributes:!0}),t._initialized=!0}function o(n){var o=n.target;("attributes"!==n.type?function(t){var n,o=t.addedNodes,r=t.removedNodes;for(n=0;n<o.length;n++)l(o[n],e);for(n=0;n<r.length;n++)l(r[n],i);return!0}(n):function(e){var i=e.target,n=e.attributeName;if("href"===n)return!0;var o=Ai(n);if(o&&o in t.components){if(b(i,n))return t[o](i),!0;var r=t.getComponent(i,o);return r?(r.$destroy(),!0):void 0}}(n))&&t.update(ue("update",!0,!1,{mutation:!0}),o,!0)}function l(t,e){if(1===t.nodeType&&!b(t,"uk-no-boot"))for(e(t),t=t.firstElementChild;t;){var i=t.nextElementSibling;l(t,e),t=i}}}(Ni),Ni});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*! UIkit 3.0.0-beta.38 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

!function(t,i){ true?module.exports=i():"function"==typeof define&&define.amd?define("uikiticons",i):t.UIkitIcons=i()}(this,function(){"use strict";var t={album:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="5" y="2" width="10" height="1" /> <rect x="3" y="4" width="14" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11" /></svg>',ban:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <line fill="none" stroke="#000" stroke-width="1.1" x1="4" y1="3.5" x2="16" y2="16.5" /></svg>',behance:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M9.5,10.6c-0.4-0.5-0.9-0.9-1.6-1.1c1.7-1,2.2-3.2,0.7-4.7C7.8,4,6.3,4,5.2,4C3.5,4,1.7,4,0,4v12c1.7,0,3.4,0,5.2,0 c1,0,2.1,0,3.1-0.5C10.2,14.6,10.5,12.3,9.5,10.6L9.5,10.6z M5.6,6.1c1.8,0,1.8,2.7-0.1,2.7c-1,0-2,0-2.9,0V6.1H5.6z M2.6,13.8v-3.1 c1.1,0,2.1,0,3.2,0c2.1,0,2.1,3.2,0.1,3.2L2.6,13.8z" /> <path d="M19.9,10.9C19.7,9.2,18.7,7.6,17,7c-4.2-1.3-7.3,3.4-5.3,7.1c0.9,1.7,2.8,2.3,4.7,2.1c1.7-0.2,2.9-1.3,3.4-2.9h-2.2 c-0.4,1.3-2.4,1.5-3.5,0.6c-0.4-0.4-0.6-1.1-0.6-1.7H20C20,11.7,19.9,10.9,19.9,10.9z M13.5,10.6c0-1.6,2.3-2.7,3.5-1.4 c0.4,0.4,0.5,0.9,0.6,1.4H13.5L13.5,10.6z" /> <rect x="13" y="4" width="5" height="1.4" /></svg>',bell:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17,15.5 L3,15.5 C2.99,14.61 3.79,13.34 4.1,12.51 C4.58,11.3 4.72,10.35 5.19,7.01 C5.54,4.53 5.89,3.2 7.28,2.16 C8.13,1.56 9.37,1.5 9.81,1.5 L9.96,1.5 C9.96,1.5 11.62,1.41 12.67,2.17 C14.08,3.2 14.42,4.54 14.77,7.02 C15.26,10.35 15.4,11.31 15.87,12.52 C16.2,13.34 17.01,14.61 17,15.5 L17,15.5 Z" /> <path fill="none" stroke="#000" d="M12.39,16 C12.39,17.37 11.35,18.43 9.91,18.43 C8.48,18.43 7.42,17.37 7.42,16" /></svg>',bold:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M5,15.3 C5.66,15.3 5.9,15 5.9,14.53 L5.9,5.5 C5.9,4.92 5.56,4.7 5,4.7 L5,4 L8.95,4 C12.6,4 13.7,5.37 13.7,6.9 C13.7,7.87 13.14,9.17 10.86,9.59 L10.86,9.7 C13.25,9.86 14.29,11.28 14.3,12.54 C14.3,14.47 12.94,16 9,16 L5,16 L5,15.3 Z M9,9.3 C11.19,9.3 11.8,8.5 11.85,7 C11.85,5.65 11.3,4.8 9,4.8 L7.67,4.8 L7.67,9.3 L9,9.3 Z M9.185,15.22 C11.97,15 12.39,14 12.4,12.58 C12.4,11.15 11.39,10 9,10 L7.67,10 L7.67,15 L9.18,15 Z" /></svg>',bolt:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M4.74,20 L7.73,12 L3,12 L15.43,1 L12.32,9 L17.02,9 L4.74,20 L4.74,20 L4.74,20 Z M9.18,11 L7.1,16.39 L14.47,10 L10.86,10 L12.99,4.67 L5.61,11 L9.18,11 L9.18,11 L9.18,11 Z" /></svg>',bookmark:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="5.5 1.5 15.5 1.5 15.5 17.5 10.5 12.5 5.5 17.5" /></svg>',calendar:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M 2,3 2,17 18,17 18,3 2,3 Z M 17,16 3,16 3,8 17,8 17,16 Z M 17,7 3,7 3,4 17,4 17,7 Z" /> <rect width="1" height="3" x="6" y="2" /> <rect width="1" height="3" x="13" y="2" /></svg>',camera:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10.8" r="3.8" /> <path fill="none" stroke="#000" d="M1,4.5 C0.7,4.5 0.5,4.7 0.5,5 L0.5,17 C0.5,17.3 0.7,17.5 1,17.5 L19,17.5 C19.3,17.5 19.5,17.3 19.5,17 L19.5,5 C19.5,4.7 19.3,4.5 19,4.5 L13.5,4.5 L13.5,2.9 C13.5,2.6 13.3,2.5 13,2.5 L7,2.5 C6.7,2.5 6.5,2.6 6.5,2.9 L6.5,4.5 L1,4.5 L1,4.5 Z" /></svg>',cart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="7.3" cy="17.3" r="1.4" /> <circle cx="13.3" cy="17.3" r="1.4" /> <polyline fill="none" stroke="#000" points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5" /></svg>',check:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4" /></svg>',clock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <rect x="9" y="4" width="1" height="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" /></svg>',close:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /> <path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" /></svg>',code:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16" /></svg>',cog:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" cx="9.997" cy="10" r="3.31" /> <path fill="none" stroke="#000" d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z" /></svg>',comment:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6,18.71 L6,14 L1,14 L1,1 L19,1 L19,14 L10.71,14 L6,18.71 L6,18.71 Z M2,13 L7,13 L7,16.29 L10.29,13 L18,13 L18,2 L2,2 L2,13 L2,13 Z" /></svg>',commenting:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="1.5,1.5 18.5,1.5 18.5,13.5 10.5,13.5 6.5,17.5 6.5,13.5 1.5,13.5" /> <circle cx="10" cy="8" r="1" /> <circle cx="6" cy="8" r="1" /> <circle cx="14" cy="8" r="1" /></svg>',comments:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="2 0.5 19.5 0.5 19.5 13" /> <path d="M5,19.71 L5,15 L0,15 L0,2 L18,2 L18,15 L9.71,15 L5,19.71 L5,19.71 L5,19.71 Z M1,14 L6,14 L6,17.29 L9.29,14 L17,14 L17,3 L1,3 L1,14 L1,14 L1,14 Z" /></svg>',copy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16" /> <polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17" /></svg>',database:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <ellipse fill="none" stroke="#000" cx="10" cy="4.64" rx="7.5" ry="3.14" /> <path fill="none" stroke="#000" d="M17.5,8.11 C17.5,9.85 14.14,11.25 10,11.25 C5.86,11.25 2.5,9.84 2.5,8.11" /> <path fill="none" stroke="#000" d="M17.5,11.25 C17.5,12.99 14.14,14.39 10,14.39 C5.86,14.39 2.5,12.98 2.5,11.25" /> <path fill="none" stroke="#000" d="M17.49,4.64 L17.5,14.36 C17.5,16.1 14.14,17.5 10,17.5 C5.86,17.5 2.5,16.09 2.5,14.36 L2.5,4.64" /></svg>',desktop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="8" y="15" width="1" height="2" /> <rect x="11" y="15" width="1" height="2" /> <rect x="5" y="16" width="10" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11" /></svg>',download:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10" /> <rect x="3" y="17" width="13" height="1" /> <line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3" /></svg>',dribbble:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.4" d="M1.3,8.9c0,0,5,0.1,8.6-1c1.4-0.4,2.6-0.9,4-1.9 c1.4-1.1,2.5-2.5,2.5-2.5" /> <path fill="none" stroke="#000" stroke-width="1.4" d="M3.9,16.6c0,0,1.7-2.8,3.5-4.2 c1.8-1.3,4-2,5.7-2.2C16,10,19,10.6,19,10.6" /> <path fill="none" stroke="#000" stroke-width="1.4" d="M6.9,1.6c0,0,3.3,4.6,4.2,6.8 c0.4,0.9,1.3,3.1,1.9,5.2c0.6,2,0.9,4.4,0.9,4.4" /> <circle fill="none" stroke="#000" stroke-width="1.4" cx="10" cy="10" r="9" /></svg>',expand:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="13 2 18 2 18 7 17 7 17 3 13 3" /> <polygon points="2 13 3 13 3 17 7 17 7 18 2 18" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11" /></svg>',facebook:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z" /></svg>',file:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="1.5" width="13" height="17" /></svg>',flickr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="5.5" cy="9.5" r="3.5" /> <circle cx="14.5" cy="9.5" r="3.5" /></svg>',folder:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="9.5 5.5 8.5 3.5 1.5 3.5 1.5 16.5 18.5 16.5 18.5 5.5" /></svg>',forward:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.47,13.11 C4.02,10.02 6.27,7.85 9.04,6.61 C9.48,6.41 10.27,6.13 11,5.91 L11,2 L18.89,9 L11,16 L11,12.13 C9.25,12.47 7.58,13.19 6.02,14.25 C3.03,16.28 1.63,18.54 1.63,18.54 C1.63,18.54 1.38,15.28 2.47,13.11 L2.47,13.11 Z M5.3,13.53 C6.92,12.4 9.04,11.4 12,10.92 L12,13.63 L17.36,9 L12,4.25 L12,6.8 C11.71,6.86 10.86,7.02 9.67,7.49 C6.79,8.65 4.58,10.96 3.49,13.08 C3.18,13.7 2.68,14.87 2.49,16 C3.28,15.05 4.4,14.15 5.3,13.53 L5.3,13.53 Z" /></svg>',foursquare:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15.23,2 C15.96,2 16.4,2.41 16.5,2.86 C16.57,3.15 16.56,3.44 16.51,3.73 C16.46,4.04 14.86,11.72 14.75,12.03 C14.56,12.56 14.16,12.82 13.61,12.83 C13.03,12.84 11.09,12.51 10.69,13 C10.38,13.38 7.79,16.39 6.81,17.53 C6.61,17.76 6.4,17.96 6.08,17.99 C5.68,18.04 5.29,17.87 5.17,17.45 C5.12,17.28 5.1,17.09 5.1,16.91 C5.1,12.4 4.86,7.81 5.11,3.31 C5.17,2.5 5.81,2.12 6.53,2 L15.23,2 L15.23,2 Z M9.76,11.42 C9.94,11.19 10.17,11.1 10.45,11.1 L12.86,11.1 C13.12,11.1 13.31,10.94 13.36,10.69 C13.37,10.64 13.62,9.41 13.74,8.83 C13.81,8.52 13.53,8.28 13.27,8.28 C12.35,8.29 11.42,8.28 10.5,8.28 C9.84,8.28 9.83,7.69 9.82,7.21 C9.8,6.85 10.13,6.55 10.5,6.55 C11.59,6.56 12.67,6.55 13.76,6.55 C14.03,6.55 14.23,6.4 14.28,6.14 C14.34,5.87 14.67,4.29 14.67,4.29 C14.67,4.29 14.82,3.74 14.19,3.74 L7.34,3.74 C7,3.75 6.84,4.02 6.84,4.33 C6.84,7.58 6.85,14.95 6.85,14.99 C6.87,15 8.89,12.51 9.76,11.42 L9.76,11.42 Z" /></svg>',future:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10" /> <rect x="9" y="4" width="1" height="7" /> <path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" stroke-width="1.1" /></svg>',github:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,1 C5.03,1 1,5.03 1,10 C1,13.98 3.58,17.35 7.16,18.54 C7.61,18.62 7.77,18.34 7.77,18.11 C7.77,17.9 7.76,17.33 7.76,16.58 C5.26,17.12 4.73,15.37 4.73,15.37 C4.32,14.33 3.73,14.05 3.73,14.05 C2.91,13.5 3.79,13.5 3.79,13.5 C4.69,13.56 5.17,14.43 5.17,14.43 C5.97,15.8 7.28,15.41 7.79,15.18 C7.87,14.6 8.1,14.2 8.36,13.98 C6.36,13.75 4.26,12.98 4.26,9.53 C4.26,8.55 4.61,7.74 5.19,7.11 C5.1,6.88 4.79,5.97 5.28,4.73 C5.28,4.73 6.04,4.49 7.75,5.65 C8.47,5.45 9.24,5.35 10,5.35 C10.76,5.35 11.53,5.45 12.25,5.65 C13.97,4.48 14.72,4.73 14.72,4.73 C15.21,5.97 14.9,6.88 14.81,7.11 C15.39,7.74 15.73,8.54 15.73,9.53 C15.73,12.99 13.63,13.75 11.62,13.97 C11.94,14.25 12.23,14.8 12.23,15.64 C12.23,16.84 12.22,17.81 12.22,18.11 C12.22,18.35 12.38,18.63 12.84,18.54 C16.42,17.35 19,13.98 19,10 C19,5.03 14.97,1 10,1 L10,1 Z" /></svg>',gitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="3.5" y="1" width="1.531" height="11.471" /> <rect x="7.324" y="4.059" width="1.529" height="15.294" /> <rect x="11.148" y="4.059" width="1.527" height="15.294" /> <rect x="14.971" y="4.059" width="1.529" height="8.412" /></svg>',google:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.86,9.09 C18.46,12.12 17.14,16.05 13.81,17.56 C9.45,19.53 4.13,17.68 2.47,12.87 C0.68,7.68 4.22,2.42 9.5,2.03 C11.57,1.88 13.42,2.37 15.05,3.65 C15.22,3.78 15.37,3.93 15.61,4.14 C14.9,4.81 14.23,5.45 13.5,6.14 C12.27,5.08 10.84,4.72 9.28,4.98 C8.12,5.17 7.16,5.76 6.37,6.63 C4.88,8.27 4.62,10.86 5.76,12.82 C6.95,14.87 9.17,15.8 11.57,15.25 C13.27,14.87 14.76,13.33 14.89,11.75 L10.51,11.75 L10.51,9.09 L17.86,9.09 L17.86,9.09 Z" /></svg>',grid:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="2" width="3" height="3" /> <rect x="8" y="2" width="3" height="3" /> <rect x="14" y="2" width="3" height="3" /> <rect x="2" y="8" width="3" height="3" /> <rect x="8" y="8" width="3" height="3" /> <rect x="14" y="8" width="3" height="3" /> <rect x="2" y="14" width="3" height="3" /> <rect x="8" y="14" width="3" height="3" /> <rect x="14" y="14" width="3" height="3" /></svg>',happy:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="13" cy="7" r="1" /> <circle cx="7" cy="7" r="1" /> <circle fill="none" stroke="#000" cx="10" cy="10" r="8.5" /> <path fill="none" stroke="#000" d="M14.6,11.4 C13.9,13.3 12.1,14.5 10,14.5 C7.9,14.5 6.1,13.3 5.4,11.4" /></svg>',hashtag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15.431,8 L15.661,7 L12.911,7 L13.831,3 L12.901,3 L11.98,7 L9.29,7 L10.21,3 L9.281,3 L8.361,7 L5.23,7 L5,8 L8.13,8 L7.21,12 L4.23,12 L4,13 L6.98,13 L6.061,17 L6.991,17 L7.911,13 L10.601,13 L9.681,17 L10.611,17 L11.531,13 L14.431,13 L14.661,12 L11.76,12 L12.681,8 L15.431,8 Z M10.831,12 L8.141,12 L9.061,8 L11.75,8 L10.831,12 Z" /></svg>',heart:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.03" d="M10,4 C10,4 8.1,2 5.74,2 C3.38,2 1,3.55 1,6.73 C1,8.84 2.67,10.44 2.67,10.44 L10,18 L17.33,10.44 C17.33,10.44 19,8.84 19,6.73 C19,3.55 16.62,2 14.26,2 C11.9,2 10,4 10,4 L10,4 Z" /></svg>',history:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="#000" points="1 2 2 2 2 6 6 6 6 7 1 7 1 2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M2.1,6.548 C3.391,3.29 6.746,1 10.5,1 C15.5,1 19.5,5 19.5,10 C19.5,15 15.5,19 10.5,19 C5.5,19 1.5,15 1.5,10" /> <rect x="9" y="4" width="1" height="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" id="Shape" /></svg>',home:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65" /> <polygon points="15 4 18 4 18 7 17 7 17 5 15 5" /> <polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19" /></svg>',image:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="16.1" cy="6.1" r="1.1" /> <rect fill="none" stroke="#000" x="0.5" y="2.5" width="19" height="15" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14" /> <polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14" /></svg>',info:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.13,11.59 C11.97,12.84 10.35,14.12 9.1,14.16 C6.17,14.2 9.89,9.46 8.74,8.37 C9.3,8.16 10.62,7.83 10.62,8.81 C10.62,9.63 10.12,10.55 9.88,11.32 C8.66,15.16 12.13,11.15 12.14,11.18 C12.16,11.21 12.16,11.35 12.13,11.59 C12.08,11.95 12.16,11.35 12.13,11.59 L12.13,11.59 Z M11.56,5.67 C11.56,6.67 9.36,7.15 9.36,6.03 C9.36,5 11.56,4.54 11.56,5.67 L11.56,5.67 Z" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /></svg>',instagram:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z" /> <circle cx="14.87" cy="5.26" r="1.09" /> <path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z" /></svg>',italic:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.63,5.48 L10.15,14.52 C10,15.08 10.37,15.25 11.92,15.3 L11.72,16 L6,16 L6.2,15.31 C7.78,15.26 8.19,15.09 8.34,14.53 L10.82,5.49 C10.97,4.92 10.63,4.76 9.09,4.71 L9.28,4 L15,4 L14.81,4.69 C13.23,4.75 12.78,4.91 12.63,5.48 L12.63,5.48 Z" /></svg>',joomla:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M7.8,13.4l1.7-1.7L5.9,8c-0.6-0.5-0.6-1.5,0-2c0.6-0.6,1.4-0.6,2,0l1.7-1.7c-1-1-2.3-1.3-3.6-1C5.8,2.2,4.8,1.4,3.7,1.4 c-1.3,0-2.3,1-2.3,2.3c0,1.1,0.8,2,1.8,2.3c-0.4,1.3-0.1,2.8,1,3.8L7.8,13.4L7.8,13.4z" /> <path d="M10.2,4.3c1-1,2.5-1.4,3.8-1c0.2-1.1,1.1-2,2.3-2c1.3,0,2.3,1,2.3,2.3c0,1.2-0.9,2.2-2,2.3c0.4,1.3,0,2.8-1,3.8L13.9,8 c0.6-0.5,0.6-1.5,0-2c-0.5-0.6-1.5-0.6-2,0L8.2,9.7L6.5,8" /> <path d="M14.1,16.8c-1.3,0.4-2.8,0.1-3.8-1l1.7-1.7c0.6,0.6,1.5,0.6,2,0c0.5-0.6,0.6-1.5,0-2l-3.7-3.7L12,6.7l3.7,3.7 c1,1,1.3,2.4,1,3.6c1.1,0.2,2,1.1,2,2.3c0,1.3-1,2.3-2.3,2.3C15.2,18.6,14.3,17.8,14.1,16.8" /> <path d="M13.2,12.2l-3.7,3.7c-1,1-2.4,1.3-3.6,1c-0.2,1-1.2,1.8-2.2,1.8c-1.3,0-2.3-1-2.3-2.3c0-1.1,0.8-2,1.8-2.3 c-0.3-1.3,0-2.7,1-3.7l1.7,1.7c-0.6,0.6-0.6,1.5,0,2c0.6,0.6,1.4,0.6,2,0l3.7-3.7" /></svg>',laptop:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect y="16" width="20" height="1" /> <rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10" /></svg>',lifesaver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5 C4.76,0.5 0.5,4.76 0.5,10 C0.5,15.24 4.76,19.5 10,19.5 C15.24,19.5 19.5,15.24 19.5,10 C19.5,4.76 15.24,0.5 10,0.5 L10,0.5 Z M10,1.5 C11.49,1.5 12.89,1.88 14.11,2.56 L11.85,4.82 C11.27,4.61 10.65,4.5 10,4.5 C9.21,4.5 8.47,4.67 7.79,4.96 L5.58,2.75 C6.87,1.95 8.38,1.5 10,1.5 L10,1.5 Z M4.96,7.8 C4.67,8.48 4.5,9.21 4.5,10 C4.5,10.65 4.61,11.27 4.83,11.85 L2.56,14.11 C1.88,12.89 1.5,11.49 1.5,10 C1.5,8.38 1.95,6.87 2.75,5.58 L4.96,7.79 L4.96,7.8 L4.96,7.8 Z M10,18.5 C8.25,18.5 6.62,17.97 5.27,17.06 L7.46,14.87 C8.22,15.27 9.08,15.5 10,15.5 C10.79,15.5 11.53,15.33 12.21,15.04 L14.42,17.25 C13.13,18.05 11.62,18.5 10,18.5 L10,18.5 Z M10,14.5 C7.52,14.5 5.5,12.48 5.5,10 C5.5,7.52 7.52,5.5 10,5.5 C12.48,5.5 14.5,7.52 14.5,10 C14.5,12.48 12.48,14.5 10,14.5 L10,14.5 Z M15.04,12.21 C15.33,11.53 15.5,10.79 15.5,10 C15.5,9.08 15.27,8.22 14.87,7.46 L17.06,5.27 C17.97,6.62 18.5,8.25 18.5,10 C18.5,11.62 18.05,13.13 17.25,14.42 L15.04,12.21 L15.04,12.21 Z" /></svg>',link:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M7.925,11.875 L11.925,7.975" /></svg>',linkedin:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z" /> <path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z" /></svg>',list:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="6" y="4" width="12" height="1" /> <rect x="6" y="9" width="12" height="1" /> <rect x="6" y="14" width="12" height="1" /> <rect x="2" y="4" width="2" height="1" /> <rect x="2" y="9" width="2" height="1" /> <rect x="2" y="14" width="2" height="1" /></svg>',location:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.01" d="M10,0.5 C6.41,0.5 3.5,3.39 3.5,6.98 C3.5,11.83 10,19 10,19 C10,19 16.5,11.83 16.5,6.98 C16.5,3.39 13.59,0.5 10,0.5 L10,0.5 Z" /> <circle fill="none" stroke="#000" cx="10" cy="6.8" r="2.3" /></svg>',lock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" height="10" width="13" y="8.5" x="3.5" /> <path fill="none" stroke="#000" d="M6.5,8 L6.5,4.88 C6.5,3.01 8.07,1.5 10,1.5 C11.93,1.5 13.5,3.01 13.5,4.88 L13.5,8" /></svg>',mail:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="1.4,6.5 10,11 18.6,6.5" /> <path d="M 1,4 1,16 19,16 19,4 1,4 Z M 18,15 2,15 2,5 18,5 18,15 Z" /></svg>',menu:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="4" width="16" height="1" /> <rect x="2" y="9" width="16" height="1" /> <rect x="2" y="14" width="16" height="1" /></svg>',minus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect height="1" width="18" y="9" x="1" /></svg>',more:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="3" cy="10" r="2" /> <circle cx="10" cy="10" r="2" /> <circle cx="17" cy="10" r="2" /></svg>',move:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="4,5 1,5 1,9 2,9 2,6 4,6 " /> <polygon points="1,16 2,16 2,18 4,18 4,19 1,19 " /> <polygon points="14,16 14,19 11,19 11,18 13,18 13,16 " /> <rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13" /> <rect x="1" y="11" width="1" height="3" /> <rect x="6" y="18" width="3" height="1" /></svg>',nut:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="2.5,5.7 10,1.3 17.5,5.7 17.5,14.3 10,18.7 2.5,14.3" /> <circle fill="none" stroke="#000" cx="10" cy="10" r="3.5" /></svg>',pagekit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="3,1 17,1 17,16 10,16 10,13 14,13 14,4 6,4 6,16 10,16 10,19 3,19 " /></svg>',pencil:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M17.25,6.01 L7.12,16.1 L3.82,17.2 L5.02,13.9 L15.12,3.88 C15.71,3.29 16.66,3.29 17.25,3.88 C17.83,4.47 17.83,5.42 17.25,6.01 L17.25,6.01 Z" /> <path fill="none" stroke="#000" d="M15.98,7.268 L13.851,5.148" /></svg>',phone:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M15.5,17 C15.5,17.8 14.8,18.5 14,18.5 L7,18.5 C6.2,18.5 5.5,17.8 5.5,17 L5.5,3 C5.5,2.2 6.2,1.5 7,1.5 L14,1.5 C14.8,1.5 15.5,2.2 15.5,3 L15.5,17 L15.5,17 L15.5,17 Z" /> <circle cx="10.5" cy="16.5" r="0.8" /></svg>',pinterest:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10.21,1 C5.5,1 3,4.16 3,7.61 C3,9.21 3.85,11.2 5.22,11.84 C5.43,11.94 5.54,11.89 5.58,11.69 C5.62,11.54 5.8,10.8 5.88,10.45 C5.91,10.34 5.89,10.24 5.8,10.14 C5.36,9.59 5,8.58 5,7.65 C5,5.24 6.82,2.91 9.93,2.91 C12.61,2.91 14.49,4.74 14.49,7.35 C14.49,10.3 13,12.35 11.06,12.35 C9.99,12.35 9.19,11.47 9.44,10.38 C9.75,9.08 10.35,7.68 10.35,6.75 C10.35,5.91 9.9,5.21 8.97,5.21 C7.87,5.21 6.99,6.34 6.99,7.86 C6.99,8.83 7.32,9.48 7.32,9.48 C7.32,9.48 6.24,14.06 6.04,14.91 C5.7,16.35 6.08,18.7 6.12,18.9 C6.14,19.01 6.26,19.05 6.33,18.95 C6.44,18.81 7.74,16.85 8.11,15.44 C8.24,14.93 8.79,12.84 8.79,12.84 C9.15,13.52 10.19,14.09 11.29,14.09 C14.58,14.09 16.96,11.06 16.96,7.3 C16.94,3.7 14,1 10.21,1" /></svg>',play:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" points="6.5,5 14.5,10 6.5,15" /></svg>',plus:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="9" y="1" width="1" height="17" /> <rect x="1" y="9" width="17" height="1" /></svg>',pull:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="6.85,8 9.5,10.6 12.15,8 12.85,8.7 9.5,12 6.15,8.7" /> <line fill="none" stroke="#000" x1="9.5" y1="11" x2="9.5" y2="2" /> <polyline fill="none" stroke="#000" points="6,5.5 3.5,5.5 3.5,18.5 15.5,18.5 15.5,5.5 13,5.5" /></svg>',push:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="12.15,4 9.5,1.4 6.85,4 6.15,3.3 9.5,0 12.85,3.3" /> <line fill="none" stroke="#000" x1="9.5" y1="10" x2="9.5" y2="1" /> <polyline fill="none" stroke="#000" points="6 5.5 3.5 5.5 3.5 18.5 15.5 18.5 15.5 5.5 13 5.5" /></svg>',question:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <circle cx="10.44" cy="14.42" r="1.05" /> <path fill="none" stroke="#000" stroke-width="1.2" d="M8.17,7.79 C8.17,4.75 12.72,4.73 12.72,7.72 C12.72,8.67 11.81,9.15 11.23,9.75 C10.75,10.24 10.51,10.73 10.45,11.4 C10.44,11.53 10.43,11.64 10.43,11.75" /></svg>',receiver:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.01" d="M6.189,13.611C8.134,15.525 11.097,18.239 13.867,18.257C16.47,18.275 18.2,16.241 18.2,16.241L14.509,12.551L11.539,13.639L6.189,8.29L7.313,5.355L3.76,1.8C3.76,1.8 1.732,3.537 1.7,6.092C1.667,8.809 4.347,11.738 6.189,13.611" /></svg>',refresh:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17.08,11.15 C17.09,11.31 17.1,11.47 17.1,11.64 C17.1,15.53 13.94,18.69 10.05,18.69 C6.16,18.68 3,15.53 3,11.63 C3,7.74 6.16,4.58 10.05,4.58 C10.9,4.58 11.71,4.73 12.46,5" /> <polyline fill="none" stroke="#000" points="9.9 2 12.79 4.89 9.79 7.9" /></svg>',reply:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.7,13.11 C16.12,10.02 13.84,7.85 11.02,6.61 C10.57,6.41 9.75,6.13 9,5.91 L9,2 L1,9 L9,16 L9,12.13 C10.78,12.47 12.5,13.19 14.09,14.25 C17.13,16.28 18.56,18.54 18.56,18.54 C18.56,18.54 18.81,15.28 17.7,13.11 L17.7,13.11 Z M14.82,13.53 C13.17,12.4 11.01,11.4 8,10.92 L8,13.63 L2.55,9 L8,4.25 L8,6.8 C8.3,6.86 9.16,7.02 10.37,7.49 C13.3,8.65 15.54,10.96 16.65,13.08 C16.97,13.7 17.48,14.86 17.68,16 C16.87,15.05 15.73,14.15 14.82,13.53 L14.82,13.53 Z" /></svg>',rss:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="3.12" cy="16.8" r="1.85" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,8.2 C1.78,8.18 2.06,8.16 2.35,8.16 C7.57,8.16 11.81,12.37 11.81,17.57 C11.81,17.89 11.79,18.19 11.76,18.5" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,2.52 C1.78,2.51 2.06,2.5 2.35,2.5 C10.72,2.5 17.5,9.24 17.5,17.57 C17.5,17.89 17.49,18.19 17.47,18.5" /></svg>',search:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z" /></svg>',server:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="3" width="1" height="2" /> <rect x="5" y="3" width="1" height="2" /> <rect x="7" y="3" width="1" height="2" /> <rect x="16" y="3" width="1" height="1" /> <rect x="16" y="10" width="1" height="1" /> <circle fill="none" stroke="#000" cx="9.9" cy="17.4" r="1.4" /> <rect x="3" y="10" width="1" height="2" /> <rect x="5" y="10" width="1" height="2" /> <rect x="9.5" y="14" width="1" height="2" /> <rect x="3" y="17" width="6" height="1" /> <rect x="11" y="17" width="6" height="1" /> <rect fill="none" stroke="#000" x="1.5" y="1.5" width="17" height="5" /> <rect fill="none" stroke="#000" x="1.5" y="8.5" width="17" height="5" /></svg>',settings:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15" /> <ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15" /> <circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15" /> <rect x="1" y="3" width="3" height="1" /> <rect x="10" y="3" width="8" height="1" /> <rect x="1" y="9" width="8" height="1" /> <rect x="15" y="9" width="3" height="1" /> <rect x="1" y="15" width="3" height="1" /> <rect x="10" y="15" width="8" height="1" /></svg>',shrink:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /> <polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" /></svg>',social:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <line fill="none" stroke="#000" stroke-width="1.1" x1="13.4" y1="14" x2="6.3" y2="10.7" /> <line fill="none" stroke="#000" stroke-width="1.1" x1="13.5" y1="5.5" x2="6.5" y2="8.8" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="4.6" r="2.3" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="15.5" cy="14.8" r="2.3" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="4.5" cy="9.8" r="2.3" /></svg>',soundcloud:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.2,9.4c-0.4,0-0.8,0.1-1.101,0.2c-0.199-2.5-2.399-4.5-5-4.5c-0.6,0-1.2,0.1-1.7,0.3C9.2,5.5,9.1,5.6,9.1,5.6V15h8 c1.601,0,2.801-1.2,2.801-2.8C20,10.7,18.7,9.4,17.2,9.4L17.2,9.4z" /> <rect x="6" y="6.5" width="1.5" height="8.5" /> <rect x="3" y="8" width="1.5" height="7" /> <rect y="10" width="1.5" height="5" /></svg>',star:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" stroke-width="1.01" points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27" /></svg>',strikethrough:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6,13.02 L6.65,13.02 C7.64,15.16 8.86,16.12 10.41,16.12 C12.22,16.12 12.92,14.93 12.92,13.89 C12.92,12.55 11.99,12.03 9.74,11.23 C8.05,10.64 6.23,10.11 6.23,7.83 C6.23,5.5 8.09,4.09 10.4,4.09 C11.44,4.09 12.13,4.31 12.72,4.54 L13.33,4 L13.81,4 L13.81,7.59 L13.16,7.59 C12.55,5.88 11.52,4.89 10.07,4.89 C8.84,4.89 7.89,5.69 7.89,7.03 C7.89,8.29 8.89,8.78 10.88,9.45 C12.57,10.03 14.38,10.6 14.38,12.91 C14.38,14.75 13.27,16.93 10.18,16.93 C9.18,16.93 8.17,16.69 7.46,16.39 L6.52,17 L6,17 L6,13.02 L6,13.02 Z" /> <rect x="3" y="10" width="15" height="1" /></svg>',table:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="1" y="3" width="18" height="1" /> <rect x="1" y="7" width="18" height="1" /> <rect x="1" y="11" width="18" height="1" /> <rect x="1" y="15" width="18" height="1" /></svg>',tablet:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M5,18.5 C4.2,18.5 3.5,17.8 3.5,17 L3.5,3 C3.5,2.2 4.2,1.5 5,1.5 L16,1.5 C16.8,1.5 17.5,2.2 17.5,3 L17.5,17 C17.5,17.8 16.8,18.5 16,18.5 L5,18.5 L5,18.5 L5,18.5 Z" /> <circle cx="10.5" cy="16.3" r="0.8" /></svg>',tag:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M17.5,3.71 L17.5,7.72 C17.5,7.96 17.4,8.2 17.21,8.39 L8.39,17.2 C7.99,17.6 7.33,17.6 6.93,17.2 L2.8,13.07 C2.4,12.67 2.4,12.01 2.8,11.61 L11.61,2.8 C11.81,2.6 12.08,2.5 12.34,2.5 L16.19,2.5 C16.52,2.5 16.86,2.63 17.11,2.88 C17.35,3.11 17.48,3.4 17.5,3.71 L17.5,3.71 Z" /> <circle cx="14" cy="6" r="1" /></svg>',thumbnails:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5" /> <rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5" /></svg>',trash:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3" /> <polyline fill="none" stroke="#000" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4" /> <rect x="8" y="7" width="1" height="9" /> <rect x="11" y="7" width="1" height="9" /> <rect x="2" y="3" width="16" height="1" /></svg>',tripadvisor:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M19.021,7.866C19.256,6.862,20,5.854,20,5.854h-3.346C14.781,4.641,12.504,4,9.98,4C7.363,4,4.999,4.651,3.135,5.876H0\tc0,0,0.738,0.987,0.976,1.988c-0.611,0.837-0.973,1.852-0.973,2.964c0,2.763,2.249,5.009,5.011,5.009\tc1.576,0,2.976-0.737,3.901-1.879l1.063,1.599l1.075-1.615c0.475,0.611,1.1,1.111,1.838,1.451c1.213,0.547,2.574,0.612,3.825,0.15\tc2.589-0.963,3.913-3.852,2.964-6.439c-0.175-0.463-0.4-0.876-0.675-1.238H19.021z M16.38,14.594\tc-1.002,0.371-2.088,0.328-3.06-0.119c-0.688-0.317-1.252-0.817-1.657-1.438c-0.164-0.25-0.313-0.52-0.417-0.811\tc-0.124-0.328-0.186-0.668-0.217-1.014c-0.063-0.689,0.037-1.396,0.339-2.043c0.448-0.971,1.251-1.71,2.25-2.079\tc2.075-0.765,4.375,0.3,5.14,2.366c0.762,2.066-0.301,4.37-2.363,5.134L16.38,14.594L16.38,14.594z M8.322,13.066\tc-0.72,1.059-1.935,1.76-3.309,1.76c-2.207,0-4.001-1.797-4.001-3.996c0-2.203,1.795-4.002,4.001-4.002\tc2.204,0,3.999,1.8,3.999,4.002c0,0.137-0.024,0.261-0.04,0.396c-0.067,0.678-0.284,1.313-0.648,1.853v-0.013H8.322z M2.472,10.775\tc0,1.367,1.112,2.479,2.476,2.479c1.363,0,2.472-1.11,2.472-2.479c0-1.359-1.11-2.468-2.472-2.468\tC3.584,8.306,2.473,9.416,2.472,10.775L2.472,10.775z M12.514,10.775c0,1.367,1.104,2.479,2.471,2.479\tc1.363,0,2.474-1.108,2.474-2.479c0-1.359-1.11-2.468-2.474-2.468c-1.364,0-2.477,1.109-2.477,2.468H12.514z M3.324,10.775\tc0-0.893,0.726-1.618,1.614-1.618c0.889,0,1.625,0.727,1.625,1.618c0,0.898-0.725,1.627-1.625,1.627\tc-0.901,0-1.625-0.729-1.625-1.627H3.324z M13.354,10.775c0-0.893,0.726-1.618,1.627-1.618c0.886,0,1.61,0.727,1.61,1.618\tc0,0.898-0.726,1.627-1.626,1.627s-1.625-0.729-1.625-1.627H13.354z M9.977,4.875c1.798,0,3.425,0.324,4.849,0.968\tc-0.535,0.015-1.061,0.108-1.586,0.3c-1.264,0.463-2.264,1.388-2.815,2.604c-0.262,0.551-0.398,1.133-0.448,1.72\tC9.79,7.905,7.677,5.873,5.076,5.82C6.501,5.208,8.153,4.875,9.94,4.875H9.977z" /></svg>',tumblr:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M6.885,8.598c0,0,0,3.393,0,4.996c0,0.282,0,0.66,0.094,0.942c0.377,1.509,1.131,2.545,2.545,3.11 c1.319,0.472,2.356,0.472,3.676,0c0.565-0.188,1.132-0.659,1.132-0.659l-0.849-2.263c0,0-1.036,0.378-1.603,0.283 c-0.565-0.094-1.226-0.66-1.226-1.508c0-1.603,0-4.902,0-4.902h2.828V5.771h-2.828V2H8.205c0,0-0.094,0.66-0.188,0.942 C7.828,3.791,7.262,4.733,6.603,5.394C5.848,6.147,5,6.43,5,6.43v2.168H6.885z" /></svg>',tv:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect x="7" y="16" width="6" height="1" /> <rect fill="none" stroke="#000" x="0.5" y="3.5" width="19" height="11" /></svg>',twitter:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74" /></svg>',uikit:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="14.4,3.1 11.3,5.1 15,7.3 15,12.9 10,15.7 5,12.9 5,8.5 2,6.8 2,14.8 9.9,19.5 18,14.8 18,5.3" /> <polygon points="9.8,4.2 6.7,2.4 9.8,0.4 12.9,2.3" /></svg>',unlock:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="3.5" y="8.5" width="13" height="10" /> <path fill="none" stroke="#000" d="M6.5,8.5 L6.5,4.9 C6.5,3 8.1,1.5 10,1.5 C11.9,1.5 13.5,3 13.5,4.9" /></svg>',upload:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="5 8 9.5 3.5 14 8 " /> <rect x="3" y="17" width="13" height="1" /> <line fill="none" stroke="#000" x1="9.5" y1="15" x2="9.5" y2="4" /></svg>',user:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.9" cy="6.4" r="4.4" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1.5,19 C2.3,14.5 5.8,11.2 10,11.2 C14.2,11.2 17.7,14.6 18.5,19.2" /></svg>',users:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="7.7" cy="8.6" r="3.5" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1" /></svg>',vimeo:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M2.065,7.59C1.84,7.367,1.654,7.082,1.468,6.838c-0.332-0.42-0.137-0.411,0.274-0.772c1.026-0.91,2.004-1.896,3.127-2.688 c1.017-0.713,2.365-1.173,3.286-0.039c0.849,1.045,0.869,2.629,1.084,3.891c0.215,1.309,0.421,2.648,0.88,3.901 c0.127,0.352,0.37,1.018,0.81,1.074c0.567,0.078,1.145-0.917,1.408-1.289c0.684-0.987,1.611-2.317,1.494-3.587 c-0.115-1.349-1.572-1.095-2.482-0.773c0.146-1.514,1.555-3.216,2.912-3.792c1.439-0.597,3.579-0.587,4.302,1.036 c0.772,1.759,0.078,3.802-0.763,5.396c-0.918,1.731-2.1,3.333-3.363,4.829c-1.114,1.329-2.432,2.787-4.093,3.422 c-1.897,0.723-3.021-0.686-3.667-2.318c-0.705-1.777-1.056-3.771-1.565-5.621C4.898,8.726,4.644,7.836,4.136,7.191 C3.473,6.358,2.72,7.141,2.065,7.59C1.977,7.502,2.115,7.551,2.065,7.59L2.065,7.59z" /></svg>',warning:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="14" r="1" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /> <path d="M10.97,7.72 C10.85,9.54 10.56,11.29 10.56,11.29 C10.51,11.87 10.27,12 9.99,12 C9.69,12 9.49,11.87 9.43,11.29 C9.43,11.29 9.16,9.54 9.03,7.72 C8.96,6.54 9.03,6 9.03,6 C9.03,5.45 9.46,5.02 9.99,5 C10.53,5.01 10.97,5.44 10.97,6 C10.97,6 11.04,6.54 10.97,7.72 L10.97,7.72 Z" /></svg>',whatsapp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M16.7,3.3c-1.8-1.8-4.1-2.8-6.7-2.8c-5.2,0-9.4,4.2-9.4,9.4c0,1.7,0.4,3.3,1.3,4.7l-1.3,4.9l5-1.3c1.4,0.8,2.9,1.2,4.5,1.2 l0,0l0,0c5.2,0,9.4-4.2,9.4-9.4C19.5,7.4,18.5,5,16.7,3.3 M10.1,17.7L10.1,17.7c-1.4,0-2.8-0.4-4-1.1l-0.3-0.2l-3,0.8l0.8-2.9 l-0.2-0.3c-0.8-1.2-1.2-2.7-1.2-4.2c0-4.3,3.5-7.8,7.8-7.8c2.1,0,4.1,0.8,5.5,2.3c1.5,1.5,2.3,3.4,2.3,5.5 C17.9,14.2,14.4,17.7,10.1,17.7 M14.4,11.9c-0.2-0.1-1.4-0.7-1.6-0.8c-0.2-0.1-0.4-0.1-0.5,0.1c-0.2,0.2-0.6,0.8-0.8,0.9 c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5C8,8.8,8.1,8.7,8.2,8.5 c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4C8.4,7.6,7.9,6.5,7.7,6C7.5,5.5,7.3,5.6,7.2,5.6c-0.1,0-0.3,0-0.4,0 c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.8,0.8-0.8,2c0,1.2,0.8,2.3,1,2.4c0.1,0.2,1.7,2.5,4,3.5c0.6,0.2,1,0.4,1.3,0.5 c0.6,0.2,1.1,0.2,1.5,0.1c0.5-0.1,1.4-0.6,1.6-1.1c0.2-0.5,0.2-1,0.1-1.1C14.8,12.1,14.6,12,14.4,11.9" /></svg>',wordpress:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5c-5.2,0-9.5,4.3-9.5,9.5s4.3,9.5,9.5,9.5c5.2,0,9.5-4.3,9.5-9.5S15.2,0.5,10,0.5L10,0.5L10,0.5z M15.6,3.9h-0.1 c-0.8,0-1.4,0.7-1.4,1.5c0,0.7,0.4,1.3,0.8,1.9c0.3,0.6,0.7,1.3,0.7,2.3c0,0.7-0.3,1.5-0.6,2.7L14.1,15l-3-8.9 c0.5,0,0.9-0.1,0.9-0.1C12.5,6,12.5,5.3,12,5.4c0,0-1.3,0.1-2.2,0.1C9,5.5,7.7,5.4,7.7,5.4C7.2,5.3,7.2,6,7.6,6c0,0,0.4,0.1,0.9,0.1 l1.3,3.5L8,15L5,6.1C5.5,6.1,5.9,6,5.9,6C6.4,6,6.3,5.3,5.9,5.4c0,0-1.3,0.1-2.2,0.1c-0.2,0-0.3,0-0.5,0c1.5-2.2,4-3.7,6.9-3.7 C12.2,1.7,14.1,2.6,15.6,3.9L15.6,3.9L15.6,3.9z M2.5,6.6l3.9,10.8c-2.7-1.3-4.6-4.2-4.6-7.4C1.8,8.8,2,7.6,2.5,6.6L2.5,6.6L2.5,6.6 z M10.2,10.7l2.5,6.9c0,0,0,0.1,0.1,0.1C11.9,18,11,18.2,10,18.2c-0.8,0-1.6-0.1-2.3-0.3L10.2,10.7L10.2,10.7L10.2,10.7z M14.2,17.1 l2.5-7.3c0.5-1.2,0.6-2.1,0.6-2.9c0-0.3,0-0.6-0.1-0.8c0.6,1.2,1,2.5,1,4C18.3,13,16.6,15.7,14.2,17.1L14.2,17.1L14.2,17.1z" /></svg>',world:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M1,10.5 L19,10.5" /> <path fill="none" stroke="#000" d="M2.35,15.5 L17.65,15.5" /> <path fill="none" stroke="#000" d="M2.35,5.5 L17.523,5.5" /> <path fill="none" stroke="#000" d="M10,19.46 L9.98,19.46 C7.31,17.33 5.61,14.141 5.61,10.58 C5.61,7.02 7.33,3.83 10,1.7 C10.01,1.7 9.99,1.7 10,1.7 L10,1.7 C12.67,3.83 14.4,7.02 14.4,10.58 C14.4,14.141 12.67,17.33 10,19.46 L10,19.46 L10,19.46 L10,19.46 Z" /> <circle fill="none" stroke="#000" cx="10" cy="10.5" r="9" /></svg>',xing:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M4.4,4.56 C4.24,4.56 4.11,4.61 4.05,4.72 C3.98,4.83 3.99,4.97 4.07,5.12 L5.82,8.16 L5.82,8.17 L3.06,13.04 C2.99,13.18 2.99,13.33 3.06,13.44 C3.12,13.55 3.24,13.62 3.4,13.62 L6,13.62 C6.39,13.62 6.57,13.36 6.71,13.12 C6.71,13.12 9.41,8.35 9.51,8.16 C9.49,8.14 7.72,5.04 7.72,5.04 C7.58,4.81 7.39,4.56 6.99,4.56 L4.4,4.56 L4.4,4.56 Z" /> <path d="M15.3,1 C14.91,1 14.74,1.25 14.6,1.5 C14.6,1.5 9.01,11.42 8.82,11.74 C8.83,11.76 12.51,18.51 12.51,18.51 C12.64,18.74 12.84,19 13.23,19 L15.82,19 C15.98,19 16.1,18.94 16.16,18.83 C16.23,18.72 16.23,18.57 16.16,18.43 L12.5,11.74 L12.5,11.72 L18.25,1.56 C18.32,1.42 18.32,1.27 18.25,1.16 C18.21,1.06 18.08,1 17.93,1 L15.3,1 L15.3,1 Z" /></svg>',yelp:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.175,14.971c-0.112,0.77-1.686,2.767-2.406,3.054c-0.246,0.1-0.487,0.076-0.675-0.069\tc-0.122-0.096-2.446-3.859-2.446-3.859c-0.194-0.293-0.157-0.682,0.083-0.978c0.234-0.284,0.581-0.393,0.881-0.276\tc0.016,0.01,4.21,1.394,4.332,1.482c0.178,0.148,0.263,0.379,0.225,0.646L17.175,14.971L17.175,14.971z M11.464,10.789\tc-0.203-0.307-0.199-0.666,0.009-0.916c0,0,2.625-3.574,2.745-3.657c0.203-0.135,0.452-0.141,0.69-0.025\tc0.691,0.335,2.085,2.405,2.167,3.199v0.027c0.024,0.271-0.082,0.491-0.273,0.623c-0.132,0.083-4.43,1.155-4.43,1.155\tc-0.322,0.096-0.68-0.06-0.882-0.381L11.464,10.789z M9.475,9.563C9.32,9.609,8.848,9.757,8.269,8.817c0,0-3.916-6.16-4.007-6.351\tc-0.057-0.212,0.011-0.455,0.202-0.65C5.047,1.211,8.21,0.327,9.037,0.529c0.27,0.069,0.457,0.238,0.522,0.479\tc0.047,0.266,0.433,5.982,0.488,7.264C10.098,9.368,9.629,9.517,9.475,9.563z M9.927,19.066c-0.083,0.225-0.273,0.373-0.54,0.421\tc-0.762,0.13-3.15-0.751-3.647-1.342c-0.096-0.131-0.155-0.262-0.167-0.394c-0.011-0.095,0-0.189,0.036-0.272\tc0.061-0.155,2.917-3.538,2.917-3.538c0.214-0.272,0.595-0.355,0.952-0.213c0.345,0.13,0.56,0.428,0.536,0.749\tC10.014,14.479,9.977,18.923,9.927,19.066z M3.495,13.912c-0.235-0.009-0.444-0.148-0.568-0.382c-0.089-0.17-0.151-0.453-0.19-0.794\tC2.63,11.701,2.761,10.144,3.07,9.648c0.145-0.226,0.357-0.345,0.592-0.336c0.154,0,4.255,1.667,4.255,1.667\tc0.321,0.118,0.521,0.453,0.5,0.833c-0.023,0.37-0.236,0.655-0.551,0.738L3.495,13.912z" /></svg>',youtube:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z" /></svg>',"500px":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M9.624,11.866c-0.141,0.132,0.479,0.658,0.662,0.418c0.051-0.046,0.607-0.61,0.662-0.664c0,0,0.738,0.719,0.814,0.719\t\tc0.1,0,0.207-0.055,0.322-0.17c0.27-0.269,0.135-0.416,0.066-0.495l-0.631-0.616l0.658-0.668c0.146-0.156,0.021-0.314-0.1-0.449\t\tc-0.182-0.18-0.359-0.226-0.471-0.125l-0.656,0.654l-0.654-0.654c-0.033-0.034-0.08-0.045-0.124-0.045\t\tc-0.079,0-0.191,0.068-0.307,0.181c-0.202,0.202-0.247,0.351-0.133,0.462l0.665,0.665L9.624,11.866z" /> <path d="M11.066,2.884c-1.061,0-2.185,0.248-3.011,0.604c-0.087,0.034-0.141,0.106-0.15,0.205C7.893,3.784,7.919,3.909,7.982,4.066\t\tc0.05,0.136,0.187,0.474,0.452,0.372c0.844-0.326,1.779-0.507,2.633-0.507c0.963,0,1.9,0.191,2.781,0.564\t\tc0.695,0.292,1.357,0.719,2.078,1.34c0.051,0.044,0.105,0.068,0.164,0.068c0.143,0,0.273-0.137,0.389-0.271\t\tc0.191-0.214,0.324-0.395,0.135-0.575c-0.686-0.654-1.436-1.138-2.363-1.533C13.24,3.097,12.168,2.884,11.066,2.884z" /> <path d="M16.43,15.747c-0.092-0.028-0.242,0.05-0.309,0.119l0,0c-0.652,0.652-1.42,1.169-2.268,1.521\t\tc-0.877,0.371-1.814,0.551-2.779,0.551c-0.961,0-1.896-0.189-2.775-0.564c-0.848-0.36-1.612-0.879-2.268-1.53\t\tc-0.682-0.688-1.196-1.455-1.529-2.268c-0.325-0.799-0.471-1.643-0.471-1.643c-0.045-0.24-0.258-0.249-0.567-0.203\t\tc-0.128,0.021-0.519,0.079-0.483,0.36v0.01c0.105,0.644,0.289,1.284,0.545,1.895c0.417,0.969,1.002,1.849,1.756,2.604\t\tc0.757,0.754,1.636,1.34,2.604,1.757C8.901,18.785,9.97,19,11.088,19c1.104,0,2.186-0.215,3.188-0.645\t\tc1.838-0.896,2.604-1.757,2.604-1.757c0.182-0.204,0.227-0.317-0.1-0.643C16.779,15.956,16.525,15.774,16.43,15.747z" /> <path d="M5.633,13.287c0.293,0.71,0.723,1.341,1.262,1.882c0.54,0.54,1.172,0.971,1.882,1.264c0.731,0.303,1.509,0.461,2.298,0.461\t\tc0.801,0,1.578-0.158,2.297-0.461c0.711-0.293,1.344-0.724,1.883-1.264c0.543-0.541,0.971-1.172,1.264-1.882\t\tc0.314-0.721,0.463-1.5,0.463-2.298c0-0.79-0.148-1.569-0.463-2.289c-0.293-0.699-0.721-1.329-1.264-1.881\t\tc-0.539-0.541-1.172-0.959-1.867-1.263c-0.721-0.303-1.5-0.461-2.299-0.461c-0.802,0-1.613,0.159-2.322,0.461\t\tc-0.577,0.25-1.544,0.867-2.119,1.454v0.012V2.108h8.16C15.1,2.104,15.1,1.69,15.1,1.552C15.1,1.417,15.1,1,14.809,1H5.915\t\tC5.676,1,5.527,1.192,5.527,1.384v6.84c0,0.214,0.273,0.372,0.529,0.428c0.5,0.105,0.614-0.056,0.737-0.224l0,0\t\tc0.18-0.273,0.776-0.884,0.787-0.894c0.901-0.905,2.117-1.408,3.416-1.408c1.285,0,2.5,0.501,3.412,1.408\t\tc0.914,0.914,1.408,2.122,1.408,3.405c0,1.288-0.508,2.496-1.408,3.405c-0.9,0.896-2.152,1.406-3.438,1.406\t\tc-0.877,0-1.711-0.229-2.433-0.671v-4.158c0-0.553,0.237-1.151,0.643-1.614c0.462-0.519,1.094-0.799,1.782-0.799\t\tc0.664,0,1.293,0.253,1.758,0.715c0.459,0.459,0.709,1.071,0.709,1.723c0,1.385-1.094,2.468-2.488,2.468\t\tc-0.273,0-0.769-0.121-0.781-0.125c-0.281-0.087-0.405,0.306-0.438,0.436c-0.159,0.496,0.079,0.585,0.123,0.607\t\tc0.452,0.137,0.743,0.157,1.129,0.157c1.973,0,3.572-1.6,3.572-3.57c0-1.964-1.6-3.552-3.572-3.552c-0.97,0-1.872,0.36-2.546,1.038\t\tc-0.656,0.631-1.027,1.487-1.027,2.322v3.438v-0.011c-0.372-0.42-0.732-1.041-0.981-1.682c-0.102-0.248-0.315-0.202-0.607-0.113\t\tc-0.135,0.035-0.519,0.157-0.44,0.439C5.372,12.799,5.577,13.164,5.633,13.287z" /></svg>',"arrow-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="10.5,16.08 5.63,10.66 6.37,10 10.5,14.58 14.63,10 15.37,10.66" /> <line fill="none" stroke="#000" x1="10.5" y1="4" x2="10.5" y2="15" /></svg>',"arrow-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /> <line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" /></svg>',"arrow-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" points="10 5 15 9.5 10 14" /> <line fill="none" stroke="#000" x1="4" y1="9.5" x2="15" y2="9.5" /></svg>',"arrow-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="10.5,4 15.37,9.4 14.63,10.08 10.5,5.49 6.37,10.08 5.63,9.4" /> <line fill="none" stroke="#000" x1="10.5" y1="16" x2="10.5" y2="5" /></svg>',"chevron-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7" /></svg>',"chevron-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="13 16 7 10 13 4" /></svg>',"chevron-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16" /></svg>',"chevron-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13" /></svg>',"cloud-download":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.3,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6" /> <polyline fill="none" stroke="#000" points="11.75 16 9.5 18.25 7.25 16" /> <path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5" /></svg>',"cloud-upload":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.5,14.61 L3.75,14.61 C1.96,14.61 0.5,13.17 0.5,11.39 C0.5,9.76 1.72,8.41 3.31,8.2 C3.38,5.31 5.75,3 8.68,3 C11.19,3 13.31,4.71 13.89,7.02 C14.39,6.8 14.93,6.68 15.5,6.68 C17.71,6.68 19.5,8.45 19.5,10.64 C19.5,12.83 17.71,14.6 15.5,14.6 L12.5,14.6" /> <polyline fill="none" stroke="#000" points="7.25 11.75 9.5 9.5 11.75 11.75" /> <path fill="none" stroke="#000" d="M9.5,18 L9.5,9.5" /></svg>',"credit-card":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <rect fill="none" stroke="#000" x="1.5" y="4.5" width="17" height="12" /> <rect x="1" y="7" width="18" height="3" /></svg>',"file-edit":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z" /> <polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5" /></svg>',"git-branch":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="3" r="2" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="14" cy="6" r="2" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="7" cy="17" r="2" /> <path fill="none" stroke="#000" stroke-width="2" d="M14,8 C14,10.41 12.43,10.87 10.56,11.25 C9.09,11.54 7,12.06 7,15 L7,5" /></svg>',"git-fork":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.2" cx="5.79" cy="2.79" r="1.79" /> <circle fill="none" stroke="#000" stroke-width="1.2" cx="14.19" cy="2.79" r="1.79" /> <ellipse fill="none" stroke="#000" stroke-width="1.2" cx="10.03" cy="16.79" rx="1.79" ry="1.79" /> <path fill="none" stroke="#000" stroke-width="2" d="M5.79,4.57 L5.79,6.56 C5.79,9.19 10.03,10.22 10.03,13.31 C10.03,14.86 10.04,14.55 10.04,14.55 C10.04,14.37 10.04,14.86 10.04,13.31 C10.04,10.22 14.2,9.19 14.2,6.56 L14.2,4.57" /></svg>',"github-alt":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10,0.5 C4.75,0.5 0.5,4.76 0.5,10.01 C0.5,15.26 4.75,19.51 10,19.51 C15.24,19.51 19.5,15.26 19.5,10.01 C19.5,4.76 15.25,0.5 10,0.5 L10,0.5 Z M12.81,17.69 C12.81,17.69 12.81,17.7 12.79,17.69 C12.47,17.75 12.35,17.59 12.35,17.36 L12.35,16.17 C12.35,15.45 12.09,14.92 11.58,14.56 C12.2,14.51 12.77,14.39 13.26,14.21 C13.87,13.98 14.36,13.69 14.74,13.29 C15.42,12.59 15.76,11.55 15.76,10.17 C15.76,9.25 15.45,8.46 14.83,7.8 C15.1,7.08 15.07,6.29 14.75,5.44 L14.51,5.42 C14.34,5.4 14.06,5.46 13.67,5.61 C13.25,5.78 12.79,6.03 12.31,6.35 C11.55,6.16 10.81,6.05 10.09,6.05 C9.36,6.05 8.61,6.15 7.88,6.35 C7.28,5.96 6.75,5.68 6.26,5.54 C6.07,5.47 5.9,5.44 5.78,5.44 L5.42,5.44 C5.06,6.29 5.04,7.08 5.32,7.8 C4.7,8.46 4.4,9.25 4.4,10.17 C4.4,11.94 4.96,13.16 6.08,13.84 C6.53,14.13 7.05,14.32 7.69,14.43 C8.03,14.5 8.32,14.54 8.55,14.55 C8.07,14.89 7.82,15.42 7.82,16.16 L7.82,17.51 C7.8,17.69 7.7,17.8 7.51,17.8 C4.21,16.74 1.82,13.65 1.82,10.01 C1.82,5.5 5.49,1.83 10,1.83 C14.5,1.83 18.17,5.5 18.17,10.01 C18.18,13.53 15.94,16.54 12.81,17.69 L12.81,17.69 Z" /></svg>',"google-plus":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M12.9,9c0,2.7-0.6,5-3.2,6.3c-3.7,1.8-8.1,0.2-9.4-3.6C-1.1,7.6,1.9,3.3,6.1,3c1.7-0.1,3.2,0.3,4.6,1.3 c0.1,0.1,0.3,0.2,0.4,0.4c-0.5,0.5-1.2,1-1.7,1.6c-1-0.8-2.1-1.1-3.5-0.9C5,5.6,4.2,6,3.6,6.7c-1.3,1.3-1.5,3.4-0.5,5 c1,1.7,2.6,2.3,4.6,1.9c1.4-0.3,2.4-1.2,2.6-2.6H6.9V9H12.9z" /> <polygon points="20,9 20,11 18,11 18,13 16,13 16,11 14,11 14,9 16,9 16,7 18,7 18,9 " /></svg>',"minus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /> <line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" /></svg>',"more-vertical":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="3" r="2" /> <circle cx="10" cy="10" r="2" /> <circle cx="10" cy="17" r="2" /></svg>',"paint-bucket":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M10.21,1 L0,11.21 L8.1,19.31 L18.31,9.1 L10.21,1 L10.21,1 Z M16.89,9.1 L15,11 L1.7,11 L10.21,2.42 L16.89,9.1 Z" /> <path fill="none" stroke="#000" stroke-width="1.1" d="M6.42,2.33 L11.7,7.61" /> <path d="M18.49,12 C18.49,12 20,14.06 20,15.36 C20,16.28 19.24,17 18.49,17 L18.49,17 C17.74,17 17,16.28 17,15.36 C17,14.06 18.49,12 18.49,12 L18.49,12 Z" /></svg>',"phone-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M17,5.5 C17.8,5.5 18.5,6.2 18.5,7 L18.5,14 C18.5,14.8 17.8,15.5 17,15.5 L3,15.5 C2.2,15.5 1.5,14.8 1.5,14 L1.5,7 C1.5,6.2 2.2,5.5 3,5.5 L17,5.5 L17,5.5 L17,5.5 Z" /> <circle cx="3.8" cy="10.5" r="0.8" /></svg>',"play-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#000" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13" /> <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /></svg>',"plus-circle":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /> <line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14" /> <line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" /></svg>',"quote-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M17.27,7.79 C17.27,9.45 16.97,10.43 15.99,12.02 C14.98,13.64 13,15.23 11.56,15.97 L11.1,15.08 C12.34,14.2 13.14,13.51 14.02,11.82 C14.27,11.34 14.41,10.92 14.49,10.54 C14.3,10.58 14.09,10.6 13.88,10.6 C12.06,10.6 10.59,9.12 10.59,7.3 C10.59,5.48 12.06,4 13.88,4 C15.39,4 16.67,5.02 17.05,6.42 C17.19,6.82 17.27,7.27 17.27,7.79 L17.27,7.79 Z" /> <path d="M8.68,7.79 C8.68,9.45 8.38,10.43 7.4,12.02 C6.39,13.64 4.41,15.23 2.97,15.97 L2.51,15.08 C3.75,14.2 4.55,13.51 5.43,11.82 C5.68,11.34 5.82,10.92 5.9,10.54 C5.71,10.58 5.5,10.6 5.29,10.6 C3.47,10.6 2,9.12 2,7.3 C2,5.48 3.47,4 5.29,4 C6.8,4 8.08,5.02 8.46,6.42 C8.6,6.82 8.68,7.27 8.68,7.79 L8.68,7.79 Z" /></svg>',"sign-in":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="7 2 17 2 17 17 7 17 7 16 16 16 16 3 7 3" /> <polygon points="9.1 13.4 8.5 12.8 11.28 10 4 10 4 9 11.28 9 8.5 6.2 9.1 5.62 13 9.5" /></svg>',"sign-out":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5" /> <polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3" /></svg>',"tablet-landscape":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fill="none" stroke="#000" d="M1.5,5 C1.5,4.2 2.2,3.5 3,3.5 L17,3.5 C17.8,3.5 18.5,4.2 18.5,5 L18.5,16 C18.5,16.8 17.8,17.5 17,17.5 L3,17.5 C2.2,17.5 1.5,16.8 1.5,16 L1.5,5 L1.5,5 L1.5,5 Z" /> <circle cx="3.7" cy="10.5" r="0.8" /></svg>',"triangle-down":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="5 7 15 7 10 12" /></svg>',"triangle-left":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="12 5 7 10 12 15" /></svg>',"triangle-right":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="8 5 13 10 8 15" /></svg>',"triangle-up":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="5 13 10 8 15 13" /></svg>',"video-camera":'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon points="18,6 18,14 12,10 " /> <rect x="2" y="5" width="12" height="10" /></svg>'};function i(e){i.installed||e.icon.add(t)}return"undefined"!=typeof window&&window.UIkit&&window.UIkit.use(i),i});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3), __webpack_require__(1), __webpack_require__(2).setImmediate))

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit_dist_css_uikit_min_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit_dist_css_uikit_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uikit_dist_css_uikit_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uikit_dist_js_uikit_min_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uikit_dist_js_uikit_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uikit_dist_js_uikit_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uikit_dist_js_uikit_icons_min_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uikit_dist_js_uikit_icons_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_uikit_dist_js_uikit_icons_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Config_vue__ = __webpack_require__(33);






let root = document.createElement('div');

root.id = 'config';
document.body.appendChild(root);

new __WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */]({
    el: "#config",
    render: h => h(__WEBPACK_IMPORTED_MODULE_4__Config_vue__["a" /* default */])
})


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_Config_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2413ef44_node_modules_vue_loader_lib_selector_type_template_index_0_Config_vue__ = __webpack_require__(38);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_Config_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2413ef44_node_modules_vue_loader_lib_selector_type_template_index_0_Config_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/Config.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Config.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2413ef44", Component.options)
  } else {
    hotAPI.reload("data-v-2413ef44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_configure_navigation_vue__ = __webpack_require__(35);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    methods: {
        saveConfig: function () {
            console.log('------------------------\n','Save config','\n------------------------');
        }
    },
    components: {
        ConfigNav: __WEBPACK_IMPORTED_MODULE_0__components_configure_navigation_vue__["a" /* default */]   
    }
});


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17bc66c4_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__ = __webpack_require__(37);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_navigation_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17bc66c4_node_modules_vue_loader_lib_selector_type_template_index_0_navigation_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/configure/navigation.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navigation.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17bc66c4", Component.options)
  } else {
    hotAPI.reload("data-v-17bc66c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            items: [
                {
                    id: 0,
                    title: 'Global'
                },
                {
                    id: 1,
                    title: 'Folders'
                }
            ]
        }
    }
});


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "uk-tab-right",
    attrs: {
      "uk-tab": "connect: #configTabsContent"
    }
  }, _vm._l((_vm.items), function(item) {
    return _c('li', {
      key: item.id
    }, [_c('a', {
      attrs: {
        "href": "#"
      }
    }, [_vm._v(_vm._s(item.title))])])
  }))
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-17bc66c4", esExports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "uk-container uk-margin-large-bottom"
  }, [_c('div', {
    staticClass: "uk-grid",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-1-4@m"
  }, [_c('config-nav')], 1), _vm._v(" "), _c('div', {
    staticClass: "uk-width-3-4"
  }, [_c('button', {
    staticClass: "uk-button uk-button-primary uk-margin-top",
    on: {
      "click": _vm.saveConfig
    }
  }, [_vm._v("Save")])])])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-background-secondary uk-light uk-padding-small uk-margin-large-bottom"
  }, [_c('div', {
    staticClass: "uk-container"
  }, [_c('h1', {
    staticClass: "uk-margin-remove-bottom uk-h4"
  }, [_vm._v("Bookmarks Configuration")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2413ef44", esExports)
  }
}

/***/ })
/******/ ]);