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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@fabalous/core/FabaCore.js":
/*!*************************************************!*\
  !*** ./node_modules/@fabalous/core/FabaCore.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var FabaEvent_1 = __webpack_require__(/*! ./FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/**
 * Dismissed module comment.
 * This is the longer comment but will be dismissed in favor of the preferred comment.
 */
var FabaCore = /** @class */ (function () {
    /**
     * Core class
     * @param store accepts one single Store "The source of true". If the store is already set the new one would not be used.
     */
    function FabaCore(store) {
        if (!FabaCore.store)
            FabaCore.store = store;
        else
            console.log("Store already set");
    }
    FabaCore.setTestStore = function (store) {
        //if (TEST) {
        FabaCore.store = store;
        // } else {
        //   throw "Use this method only for Tests";
        // }
    };
    /**
     * Reset mediators / Events and Vo's dictornary (usefull for HMR)
     */
    FabaCore.reset = function () {
        FabaCore.mediators = [];
        FabaCore.events = [];
        FabaCore.vos = [];
    };
    /**
     * Add Mediator if the Mediator not already exist in the Dictornary
     * @param cls MediatorClass
     */
    FabaCore.addMediator = function (cls, idt) {
        if (idt === void 0) { idt = ""; }
        for (var i = 0; i < FabaCore.mediators.length; i++) {
            var obj = FabaCore.mediators[i].cls;
            if (obj == cls) {
                return false;
            }
        }
        var mediator = new cls;
        for (var item in mediator.cmdList) {
            if (FabaCore.events[item]) {
                FabaCore.events[item].commands = FabaCore.events[item].commands.concat(mediator.cmdList[item].commands);
            }
            else {
                FabaCore.events[item] = {
                    event: mediator.cmdList[item].event,
                    commands: mediator.cmdList[item].commands
                };
            }
        }
        FabaCore.mediators.push({ cls: cls, mediator: mediator, idt: idt });
        return true;
    };
    /**
     * Go through the routes and create the command and execute SYNC
     * @param event FabaEvents
     * @param resu FabaEventResultType
     */
    FabaCore.syncDispatchEvent = function (event, resu) {
        for (var a = 0; a < this.mediators.length; a++) {
            var routeItem = this.mediators[a].mediator.cmdList;
            if (routeItem && routeItem[event.eventIdentifyer]) {
                for (var _i = 0, _a = routeItem[event.eventIdentifyer].commands; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    var store = this.mediators[a].mediator.store || FabaCore.store;
                    var t = new obj.cmd(store).execute(event);
                    return t || event;
                }
            }
        }
    };
    /**
     * Go through the routes and create the command and execute ASYNC
     * @param event FabaEvents
     * @param resu FabaEventResultType
     */
    FabaCore.dispatchEvent = function (event, resu) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var a, routeItem, _i, _a, obj, store, _b, t;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        a = 0;
                        _c.label = 1;
                    case 1:
                        if (!(a < this.mediators.length)) return [3 /*break*/, 11];
                        routeItem = this.mediators[a].mediator.cmdList;
                        if (!(routeItem && routeItem[event.eventIdentifyer])) return [3 /*break*/, 10];
                        _i = 0, _a = routeItem[event.eventIdentifyer].commands;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        obj = _a[_i];
                        store = this.mediators[a].mediator.store || FabaCore.store;
                        _b = resu;
                        switch (_b) {
                            case FabaEvent_1.FabaEventResultType.EXECUTE: return [3 /*break*/, 3];
                            case FabaEvent_1.FabaEventResultType.RESULT: return [3 /*break*/, 5];
                            case FabaEvent_1.FabaEventResultType.ERROR: return [3 /*break*/, 6];
                            case FabaEvent_1.FabaEventResultType.TIMEOUT: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 8];
                    case 3:
                        if (obj.permission && !obj.permission(store, event)) {
                            return [2 /*return*/, event];
                        }
                        return [4 /*yield*/, new obj.cmd(store).execute(event)];
                    case 4:
                        t = _c.sent();
                        return [2 /*return*/, t || event];
                    case 5: return [2 /*return*/, new obj.cmd(store).result(event)];
                    case 6: return [2 /*return*/, new obj.cmd(store).error(event)];
                    case 7: return [2 /*return*/, new obj.cmd(store).timeout(event)];
                    case 8: return [2 /*return*/, new obj.cmd(store).execute(event)];
                    case 9:
                        _i++;
                        return [3 /*break*/, 2];
                    case 10:
                        a++;
                        return [3 /*break*/, 1];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /*
    List of Mediators
     */
    FabaCore.mediators = [];
    /*
     * @param events List of Events (Obsulete?)
     */
    FabaCore.events = {};
    /*
     * List of Vo's (Obsulete?)
     */
    FabaCore.vos = {};
    return FabaCore;
}());
exports.default = FabaCore;
//# sourceMappingURL=FabaCore.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaCoreCommand.js":
/*!********************************************************!*\
  !*** ./node_modules/@fabalous/core/FabaCoreCommand.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * FabaCoreCommand used in every Runtime
 * Set the store
 */
var FabaCoreCommand = /** @class */ (function () {
    /**
     * Set the store
     * @param store
     */
    function FabaCoreCommand(store) {
        this.store = store;
    }
    Object.defineProperty(FabaCoreCommand.prototype, "data", {
        /**
         * Get access to the store Data
         * @returns {TStore}
         */
        get: function () {
            return this.store.data;
        },
        enumerable: true,
        configurable: true
    });
    return FabaCoreCommand;
}());
exports.default = FabaCoreCommand;
//# sourceMappingURL=FabaCoreCommand.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaCoreMediator.js":
/*!*********************************************************!*\
  !*** ./node_modules/@fabalous/core/FabaCoreMediator.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * FabaCoreMediator should be extended by any Runtime
 *
 * Add / Remove and Update all commands
 *
 */
var FabaCoreMediator = /** @class */ (function () {
    /**
     * Call the "registerCommands" function after create
     * Set module store
     */
    function FabaCoreMediator(store) {
        this.cmdList = {};
        this.store = store;
        this.registerCommands();
    }
    /**
     * Function need to be overwrite by Mediator
     */
    FabaCoreMediator.prototype.registerCommands = function () {
        throw ("Please override register Commands");
    };
    /**
     * Add command and event to the Mediator
     *
     * @param event {FabaEvent}
     * @param command {FabaCoreCommand}
     */
    FabaCoreMediator.prototype.addCommand = function (event, command, permission) {
        var h = new event();
        if (!this.cmdList[event.name]) {
            this.cmdList[h.eventIdentifyer] = { event: event, commands: [] };
        }
        this.cmdList[h.eventIdentifyer].commands.push({ cmd: command, permission: permission, options: {} });
    };
    /**
     * Method can be used to update Event and Command and overwrite the prevoise registration
     *
     * @param event
     * @param oldCommand
     * @param newCommand
     */
    FabaCoreMediator.prototype.updateCommand = function (event, oldCommand, newCommand) {
        var h = new event();
        this.cmdList[h.eventIdentifyer].commands.map(function (item) {
            if (item.cmd === oldCommand) {
                item.cmd = newCommand;
            }
        });
    };
    /**
     * Remove all registration form event // command
     *
     * @param event
     * @param command
     */
    FabaCoreMediator.prototype.removeCommand = function (event, command) {
        var h = new event();
        for (var i = 0; i < this.cmdList[h.eventIdentifyer].commands.length; i++) {
            var obj = this.cmdList[h.eventIdentifyer].commands[i];
            if (obj.cmd === command) {
                this.cmdList[h.eventIdentifyer].commands.splice(i, 1);
            }
        }
        if (this.cmdList[h.eventIdentifyer].commands.length === 0) {
            delete this.cmdList[h.eventIdentifyer];
        }
    };
    return FabaCoreMediator;
}());
exports.default = FabaCoreMediator;
//# sourceMappingURL=FabaCoreMediator.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaEvent.js":
/*!**************************************************!*\
  !*** ./node_modules/@fabalous/core/FabaEvent.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var FabaCore_1 = __webpack_require__(/*! ./FabaCore */ "./node_modules/@fabalous/core/FabaCore.js");
/**
 * FabaEvent which is used to communicate with the Commands
 */
var FabaEvent = /** @class */ (function () {
    /**
     *
     * @param identifyer
     */
    function FabaEvent(eventIdentifyer) {
        this.eventIdentifyer = eventIdentifyer;
    }
    /**
     *
     * @param delay
     * @param calb
     * @param result
     */
    FabaEvent.prototype.delayDispatch = function (delay, calb, result) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, FabaCore_1.default.dispatchEvent(this, result)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, delay)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param calb
     * @param result
     * @returns {Promise<any>}
     */
    FabaEvent.prototype.dispatch = function (e, result) {
        if (result === void 0) { result = FabaEventResultType.EXECUTE; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(result === FabaEventResultType.EXECUTE)) return [3 /*break*/, 2];
                        return [4 /*yield*/, FabaCore_1.default.dispatchEvent(this, result)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        FabaCore_1.default.dispatchEvent(this, result);
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    FabaEvent.prototype.syncDispatch = function () {
        return FabaCore_1.default.syncDispatchEvent(this);
    };
    return FabaEvent;
}());
exports.default = FabaEvent;
/**
 *
 */
var FabaEventResultType;
(function (FabaEventResultType) {
    FabaEventResultType[FabaEventResultType["EXECUTE"] = 0] = "EXECUTE";
    FabaEventResultType[FabaEventResultType["RESULT"] = 1] = "RESULT";
    FabaEventResultType[FabaEventResultType["ERROR"] = 2] = "ERROR";
    FabaEventResultType[FabaEventResultType["TIMEOUT"] = 3] = "TIMEOUT";
    FabaEventResultType[FabaEventResultType["OFFLINE"] = 4] = "OFFLINE";
    FabaEventResultType[FabaEventResultType["SYNC"] = 5] = "SYNC";
})(FabaEventResultType = exports.FabaEventResultType || (exports.FabaEventResultType = {}));
//# sourceMappingURL=FabaEvent.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/package.json":
/*!**************************************************!*\
  !*** ./node_modules/@fabalous/core/package.json ***!
  \**************************************************/
/*! exports provided: _args, _development, _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _spec, _where, author, bugs, dependencies, description, devDependencies, homepage, jest, keywords, license, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_args":[["@fabalous/core@2.0.3","/Users/faba/Projekte/@fabalous/fabalous"]],"_development":true,"_from":"@fabalous/core@2.0.3","_id":"@fabalous/core@2.0.3","_inBundle":false,"_integrity":"sha512-I1cS99Z4jTkzw9bFlFtU39JI85PK0LHr5+CilbQWcRmvLMkVu216CSZTr55mXzgvXry/bZevi6AaE9jhproHmg==","_location":"/@fabalous/core","_phantomChildren":{"archy":"1.0.0","brace-expansion":"1.1.8","clone-stats":"0.0.1","core-util-is":"1.0.2","defaults":"1.0.3","deprecated":"0.0.1","es6-object-assign":"1.1.0","escape-string-regexp":"1.0.5","first-chunk-stream":"1.0.0","fs.realpath":"1.0.0","gaze":"0.5.2","glob2base":"0.0.12","gulp-util":"3.0.8","has-ansi":"2.0.0","inflight":"1.0.6","inherits":"2.0.3","interpret":"1.1.0","is-utf8":"0.2.1","liftoff":"2.5.0","minimist":"1.2.0","mkdirp":"0.5.1","natives":"1.1.4","once":"1.3.3","orchestrator":"0.3.8","path-is-absolute":"1.0.1","pretty-hrtime":"1.0.3","rechoir":"0.6.2","strip-ansi":"3.0.1","tildify":"1.2.0","user-home":"1.1.1","xtend":"4.0.1"},"_requested":{"type":"version","registry":true,"raw":"@fabalous/core@2.0.3","name":"@fabalous/core","escapedName":"@fabalous%2fcore","scope":"@fabalous","rawSpec":"2.0.3","saveSpec":null,"fetchSpec":"2.0.3"},"_requiredBy":["#DEV:/"],"_resolved":"https://registry.npmjs.org/@fabalous/core/-/core-2.0.3.tgz","_spec":"2.0.3","_where":"/Users/faba/Projekte/@fabalous/fabalous","author":{"name":"Jörg Wasmeier"},"bugs":{"url":"https://github.com/Faba-network/fabalous-core/issues"},"dependencies":{"@types/node":"^10.7.1","@types/systemjs":"^0.20.6","deep-freeze":"0.0.1","gulp":"^3.9.1","gulp-clean":"^0.4.0","gulp-util":"^3.0.8","nodemon":"^1.18.3","shx":"^0.3.2","tslib":"^1.9.3","typescript":"^3.0.1"},"description":"The Fabulous Faba MVC framework","devDependencies":{"@types/jest":"^23.3.1","gulp-typedoc":"^2.2.0","jest":"^23.5.0","jest-cli":"^23.5.0","ts-jest":"^23.1.3","tslint":"^5.11.0","typedoc":"^0.12.0"},"homepage":"https://github.com/Faba-network/fabalous-core#readme","jest":{"globals":{"__TS_CONFIG__":"tsconfig.json"},"transform":{".(ts|tsx)":"<rootDir>/node_modules/ts-jest/preprocessor.js"},"testRegex":"test/.*\\Spec.(ts|tsx)$","moduleFileExtensions":["ts","tsx","js"],"collectCoverageFrom":["src/**/*.ts","src/**/*.tsx","!src/**/*.d.ts"],"coverageReporters":["lcov"],"testResultsProcessor":"<rootDir>/node_modules/ts-jest/coverageprocessor.js"},"keywords":["MVC","Framework"],"license":"MIT","name":"@fabalous/core","repository":{"type":"git","url":"git+https://github.com/Faba-network/fabalous-core.git"},"scripts":{"build":"gulp clean && tsc && gulp copy_src_to_lib && gulp remove_src_folder && gulp remove_node_modules_folder","cleanSrc":"find . -name '*.js' -type f -delete","coverage":"jest --no-cache --coverage","develop":"tsc -w","doc":"gulp typedoc","install":"shx cp -Rf ./lib/* ./ && shx rm -r ./lib","localDebug":"npm run build && cp -Rf ./lib/* /Users/creativecode/Projekte/fabalous-runtime-node/node_modules/@fabalous/core/ ","postversion":"npm run build && git push && git push --tags && npm publish","tdd":"jest --watch","test":"jest --no-cache"},"version":"2.0.3"};

/***/ }),

/***/ "./node_modules/@fabalous/core/store/FabaStore.js":
/*!********************************************************!*\
  !*** ./node_modules/@fabalous/core/store/FabaStore.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FabaStore = /** @class */ (function () {
    function FabaStore(data) {
        this._data = data;
    }
    Object.defineProperty(FabaStore.prototype, "tree", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FabaStore.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    FabaStore.prototype.update = function (obj, immediately) {
        //this._data = obj;
    };
    /**
     *
     */
    FabaStore.prototype.duplicate = function () {
        return JSON.parse(JSON.stringify(this._data));
    };
    return FabaStore;
}());
exports.default = FabaStore;
//# sourceMappingURL=FabaStore.js.map

/***/ }),

/***/ "./src/A_CLI.ts":
/*!**********************!*\
  !*** ./src/A_CLI.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCore */ "./node_modules/@fabalous/core/FabaCore.js");
/* harmony import */ var _fabalous_core_FabaCore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FabalousStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FabalousStore */ "./src/FabalousStore.ts");
/* harmony import */ var _event_InitFabalousEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event/InitFabalousEvent */ "./src/event/InitFabalousEvent.ts");
/* harmony import */ var _FabalousMediator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FabalousMediator */ "./src/FabalousMediator.ts");
/* harmony import */ var _fabalous_core_store_FabaStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fabalous/core/store/FabaStore */ "./node_modules/@fabalous/core/store/FabaStore.js");
/* harmony import */ var _fabalous_core_store_FabaStore__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_store_FabaStore__WEBPACK_IMPORTED_MODULE_5__);






var A_CLI = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](A_CLI, _super);
    function A_CLI(store) {
        var _this = this;
        console.log("wot");
        process.on('uncaughtException', function (err) {
            throw err;
        });
        _this = _super.call(this, store) || this;
        _fabalous_core_FabaCore__WEBPACK_IMPORTED_MODULE_1___default.a.addMediator(_FabalousMediator__WEBPACK_IMPORTED_MODULE_4__["default"]);
        new _event_InitFabalousEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
        return _this;
    }
    return A_CLI;
}(_fabalous_core_FabaCore__WEBPACK_IMPORTED_MODULE_1___default.a));
var appStore = new _fabalous_core_store_FabaStore__WEBPACK_IMPORTED_MODULE_5___default.a(new _FabalousStore__WEBPACK_IMPORTED_MODULE_2__["default"]());
new A_CLI(appStore);


/***/ }),

/***/ "./src/FabalousMediator.ts":
/*!*********************************!*\
  !*** ./src/FabalousMediator.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreMediator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreMediator */ "./node_modules/@fabalous/core/FabaCoreMediator.js");
/* harmony import */ var _fabalous_core_FabaCoreMediator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreMediator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _event_InitFabalousEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event/InitFabalousEvent */ "./src/event/InitFabalousEvent.ts");
/* harmony import */ var _command_InitFabalousCommand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./command/InitFabalousCommand */ "./src/command/InitFabalousCommand.ts");
/* harmony import */ var _event_GetPackageJsonEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./event/GetPackageJsonEvent */ "./src/event/GetPackageJsonEvent.ts");
/* harmony import */ var _command_GetPackageJsonCommand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./command/GetPackageJsonCommand */ "./src/command/GetPackageJsonCommand.ts");
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var _event_CreatePackageJsonEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event/CreatePackageJsonEvent */ "./src/event/CreatePackageJsonEvent.ts");
/* harmony import */ var _command_CreatePackageJsonCommand__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./command/CreatePackageJsonCommand */ "./src/command/CreatePackageJsonCommand.ts");
/* harmony import */ var _event_CreateModuleEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event/CreateModuleEvent */ "./src/event/CreateModuleEvent.ts");
/* harmony import */ var _command_CreateModuleCommand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./command/CreateModuleCommand */ "./src/command/CreateModuleCommand.ts");
/* harmony import */ var _event_CreateAppEvent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./event/CreateAppEvent */ "./src/event/CreateAppEvent.ts");
/* harmony import */ var _command_CreateAppCommand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./command/CreateAppCommand */ "./src/command/CreateAppCommand.ts");
/* harmony import */ var _event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./event/CreateAppStep1DialogEvent */ "./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var _event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./event/CreateAppStep2DialogEvent */ "./src/event/CreateAppStep2DialogEvent.ts");
/* harmony import */ var _event_CreateAppStep3DialogEvent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./event/CreateAppStep3DialogEvent */ "./src/event/CreateAppStep3DialogEvent.ts");
/* harmony import */ var _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./command/UiCommand */ "./src/command/UiCommand.ts");
/* harmony import */ var _event_HandleMainMenuEvent__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./event/HandleMainMenuEvent */ "./src/event/HandleMainMenuEvent.ts");
/* harmony import */ var _event_InstallNPMDepsEvent__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./event/InstallNPMDepsEvent */ "./src/event/InstallNPMDepsEvent.ts");
/* harmony import */ var _command_InstallNPMDepsCommand__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./command/InstallNPMDepsCommand */ "./src/command/InstallNPMDepsCommand.ts");
/* harmony import */ var _event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./event/ShowCreateModuleDialogEvent */ "./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var _event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./event/ShowCreateEveCmdEvent */ "./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var _event_CreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./event/CreateEveCmdEvent */ "./src/event/CreateEveCmdEvent.ts");
/* harmony import */ var _command_CreateEveCmdCommand__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./command/CreateEveCmdCommand */ "./src/command/CreateEveCmdCommand.ts");
/* harmony import */ var _command_GetModulesCommand__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./command/GetModulesCommand */ "./src/command/GetModulesCommand.ts");
/* harmony import */ var _event_GetModulesEvent__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./event/GetModulesEvent */ "./src/event/GetModulesEvent.ts");
/* harmony import */ var _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./event/CreateHbsFileEvent */ "./src/event/CreateHbsFileEvent.ts");
/* harmony import */ var _command_CreateHbsFileCommand__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./command/CreateHbsFileCommand */ "./src/command/CreateHbsFileCommand.ts");
/* harmony import */ var _event_AddToMediatorEvent__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./event/AddToMediatorEvent */ "./src/event/AddToMediatorEvent.ts");
/* harmony import */ var _command_AddToMediatorCommand__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./command/AddToMediatorCommand */ "./src/command/AddToMediatorCommand.ts");






























var FabalousMediator = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FabalousMediator, _super);
    function FabalousMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabalousMediator.prototype.addCommand = function (event, command) {
        _super.prototype.addCommand.call(this, event, command);
    };
    FabalousMediator.prototype.registerCommands = function () {
        this.addCommand(_event_AddToMediatorEvent__WEBPACK_IMPORTED_MODULE_28__["default"], _command_AddToMediatorCommand__WEBPACK_IMPORTED_MODULE_29__["default"]);
        this.addCommand(_event_InitFabalousEvent__WEBPACK_IMPORTED_MODULE_2__["default"], _command_InitFabalousCommand__WEBPACK_IMPORTED_MODULE_3__["default"]);
        this.addCommand(_event_GetPackageJsonEvent__WEBPACK_IMPORTED_MODULE_4__["default"], _command_GetPackageJsonCommand__WEBPACK_IMPORTED_MODULE_5__["default"]);
        this.addCommand(_event_CreatePackageJsonEvent__WEBPACK_IMPORTED_MODULE_7__["default"], _command_CreatePackageJsonCommand__WEBPACK_IMPORTED_MODULE_8__["default"]);
        this.addCommand(_event_InstallNPMDepsEvent__WEBPACK_IMPORTED_MODULE_18__["default"], _command_InstallNPMDepsCommand__WEBPACK_IMPORTED_MODULE_19__["default"]);
        this.addCommand(_event_GetModulesEvent__WEBPACK_IMPORTED_MODULE_25__["default"], _command_GetModulesCommand__WEBPACK_IMPORTED_MODULE_24__["default"]);
        this.addCommand(_event_CreateModuleEvent__WEBPACK_IMPORTED_MODULE_9__["default"], _command_CreateModuleCommand__WEBPACK_IMPORTED_MODULE_10__["default"]);
        this.addCommand(_event_CreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_22__["default"], _command_CreateEveCmdCommand__WEBPACK_IMPORTED_MODULE_23__["default"]);
        this.addCommand(_event_CreateAppEvent__WEBPACK_IMPORTED_MODULE_11__["default"], _command_CreateAppCommand__WEBPACK_IMPORTED_MODULE_12__["default"]);
        this.addCommand(_event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_13__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_14__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_CreateAppStep3DialogEvent__WEBPACK_IMPORTED_MODULE_15__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_6__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_HandleMainMenuEvent__WEBPACK_IMPORTED_MODULE_17__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_20__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_21__["default"], _command_UiCommand__WEBPACK_IMPORTED_MODULE_16__["default"]);
        this.addCommand(_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_26__["default"], _command_CreateHbsFileCommand__WEBPACK_IMPORTED_MODULE_27__["default"]);
    };
    return FabalousMediator;
}(_fabalous_core_FabaCoreMediator__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (FabalousMediator);


/***/ }),

/***/ "./src/FabalousStore.ts":
/*!******************************!*\
  !*** ./src/FabalousStore.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var FabalousStore = (function () {
    function FabalousStore() {
        this.projectPath = "./";
        this.json = false;
        this.runtimes = [];
        this.modules = [];
    }
    return FabalousStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (FabalousStore);


/***/ }),

/***/ "./src/command/AddToMediatorCommand.ts":
/*!*********************************************!*\
  !*** ./src/command/AddToMediatorCommand.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);


var AddToMediatorCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AddToMediatorCommand, _super);
    function AddToMediatorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddToMediatorCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fs, baseName, upperBaseName, moduleName, upperModuleName, filePath, runtime, mediatorPath, imports, appendimports, replaceCommand, file;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                fs = __webpack_require__(/*! fs-extra */ "fs-extra");
                console.log(event);
                baseName = event.data.baseName;
                upperBaseName = event.data.upperBaseName;
                moduleName = event.data.moduleName.toLowerCase();
                upperModuleName = event.data.upperModuleName;
                filePath = event.data.filePath;
                runtime = (event.data.runtime) ? event.data.runtime : "";
                mediatorPath = this.data.projectPath + "src/" + moduleName + "/mediator/" + upperModuleName + runtime + "Mediator.ts";
                imports = [
                    "import " + baseName + " from \"../event/" + baseName + "\";\n",
                    "import " + baseName + "Command from \"../command/" + baseName + "Command\";\n"
                ];
                appendimports = imports[0] + imports[1];
                replaceCommand = "registerCommands():void {";
                file = fs.readFileSync(mediatorPath, 'utf8');
                file = appendimports + file;
                file = file.replace(replaceCommand, replaceCommand + ("\n        this.addCommand(" + baseName + ", " + baseName + "Command);"));
                fs.outputFileSync(mediatorPath, file, "utf8");
                return [2];
            });
        });
    };
    return AddToMediatorCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (AddToMediatorCommand);


/***/ }),

/***/ "./src/command/CreateAppCommand.ts":
/*!*****************************************!*\
  !*** ./src/command/CreateAppCommand.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_CreatePackageJsonEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event/CreatePackageJsonEvent */ "./src/event/CreatePackageJsonEvent.ts");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _event_InstallNPMDepsEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event/InstallNPMDepsEvent */ "./src/event/InstallNPMDepsEvent.ts");
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var _event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event/CreateAppStep1DialogEvent */ "./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var _event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../event/CreateAppStep2DialogEvent */ "./src/event/CreateAppStep2DialogEvent.ts");







var chalk = __webpack_require__(/*! chalk */ "chalk");
var CreateAppCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateAppCommand, _super);
    function CreateAppCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fs = __webpack_require__(/*! fs-extra */ "fs-extra");
        _this.path = __webpack_require__(/*! path */ "path");
        return _this;
    }
    CreateAppCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var step1, step2, e_1, inquirer, loader, i, ui, yarnExist, interval;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new _event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_5__["default"]().dispatch()];
                    case 1:
                        step1 = _a.sent();
                        this.data.step1Data = step1.data;
                        return [4, new _event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_6__["default"]().dispatch()];
                    case 2:
                        step2 = _a.sent();
                        this.data.step2Data = step2.data;
                        console.log(chalk.bold(chalk.blue('-') + ' Create App Structure...'));
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, new _event_CreatePackageJsonEvent__WEBPACK_IMPORTED_MODULE_1__["default"]().dispatch()];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3, 6];
                    case 6:
                        console.log(chalk.bold(chalk.blue('-') + ' Execute NPM install please wait!'));
                        inquirer = __webpack_require__(/*! inquirer */ "inquirer");
                        loader = [
                            '/ ' + chalk.bold("Installing"),
                            '| ' + chalk.bold("Installing"),
                            '\\ ' + chalk.bold("Installing"),
                            '- ' + chalk.bold("Installing")
                        ];
                        i = 4;
                        ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % 4] });
                        return [4, this.commandExist()];
                    case 7:
                        yarnExist = _a.sent();
                        yarnExist = false;
                        if (!yarnExist) {
                            interval = setInterval(function () {
                                ui.updateBottomBar(loader[i++ % 4]);
                            }, 100);
                        }
                        return [4, new _event_InstallNPMDepsEvent__WEBPACK_IMPORTED_MODULE_3__["default"](yarnExist).dispatch()];
                    case 8:
                        _a.sent();
                        if (!yarnExist)
                            clearInterval(interval);
                        console.log();
                        ui.updateBottomBar(chalk.bold(chalk.cyan('Installation done!\n')));
                        console.log();
                        new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_4__["default"]().dispatch();
                        return [2, event];
                }
            });
        });
    };
    CreateAppCommand.prototype.commandExist = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var commandExists = __webpack_require__(/*! command-exists */ "command-exists");
                        commandExists('yarn', function (err, commandExists) {
                            if (commandExists) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    })];
            });
        });
    };
    return CreateAppCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateAppCommand);


/***/ }),

/***/ "./src/command/CreateEveCmdCommand.ts":
/*!********************************************!*\
  !*** ./src/command/CreateEveCmdCommand.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event/ShowCreateEveCmdEvent */ "./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var _event_GetModulesEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event/GetModulesEvent */ "./src/event/GetModulesEvent.ts");
/* harmony import */ var _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event/CreateHbsFileEvent */ "./src/event/CreateHbsFileEvent.ts");
/* harmony import */ var _event_AddToMediatorEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../event/AddToMediatorEvent */ "./src/event/AddToMediatorEvent.ts");







var chalk = __webpack_require__(/*! chalk */ "chalk");
var CreateEveCmdCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateEveCmdCommand, _super);
    function CreateEveCmdCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateEveCmdCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fs, ev, toAbsolutePath, test, filePath, modulePath, templateData, _i, _a, runtime, runtObj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fs = __webpack_require__(/*! fs-extra */ "fs-extra");
                        return [4, new _event_GetModulesEvent__WEBPACK_IMPORTED_MODULE_4__["default"]().dispatch()];
                    case 1:
                        _b.sent();
                        if (this.data.modules.length == 0) {
                            console.log(chalk.bold(chalk.red('NO MODULES AVAILABLE')));
                            new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
                            return [2];
                        }
                        return [4, new _event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_2__["default"]().dispatch()];
                    case 2:
                        ev = _b.sent();
                        toAbsolutePath = __webpack_require__(/*! to-absolute-path */ "to-absolute-path");
                        test = /*require.resolve*/(/*! @fabalous/core/package.json */ "./node_modules/@fabalous/core/package.json");
                        filePath = toAbsolutePath(test + "../../../../../../../files/") + "/";
                        modulePath = this.data.projectPath + "src/" + ev.data.moduleName + "/";
                        templateData = {
                            filePath: filePath,
                            modulePath: modulePath,
                            moduleName: ev.data.moduleName,
                            baseName: ev.data.eventBaseName
                        };
                        new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].EVENT, templateData, false).dispatch();
                        for (_i = 0, _a = this.data.runtimes; _i < _a.length; _i++) {
                            runtime = _a[_i];
                            runtObj = Object.assign({ runtime: runtime }, templateData);
                            new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].COMMAND, runtObj, false).dispatch();
                            new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].SPEC, runtObj, false).dispatch();
                            new _event_AddToMediatorEvent__WEBPACK_IMPORTED_MODULE_6__["default"](runtObj).dispatch();
                        }
                        new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
                        return [2];
                }
            });
        });
    };
    return CreateEveCmdCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateEveCmdCommand);


/***/ }),

/***/ "./src/command/CreateHbsFileCommand.ts":
/*!*********************************************!*\
  !*** ./src/command/CreateHbsFileCommand.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event/CreateHbsFileEvent */ "./src/event/CreateHbsFileEvent.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);




var CreateHbsFileCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateHbsFileCommand, _super);
    function CreateHbsFileCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateHbsFileCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fs, baseName, upperBaseName, moduleName, upperModuleName, filePath, runtime, hbsVars;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                fs = __webpack_require__(/*! fs-extra */ "fs-extra");
                baseName = event.data.baseName;
                upperBaseName = event.data.upperBaseName;
                moduleName = event.data.moduleName.toLowerCase();
                upperModuleName = event.data.upperModuleName;
                filePath = event.data.filePath;
                runtime = (event.data.runtime) ? event.data.runtime : "";
                hbsVars = {
                    MODULE_EVENT: "" + baseName,
                    MODULE_MEDIATOR: "" + upperModuleName + runtime + "Mediator",
                    MODULE_COMMAND: baseName + "Command",
                    MODULE_SERVICE: baseName + "Service",
                    BASE_NAME: "" + baseName,
                    UPPER_MODULE_NAME: "" + upperModuleName,
                    RUNTIME_NODE: (runtime == "Node"),
                    RUNTIME_WEB: (runtime == "Web"),
                    RUNTIME_CORDOVA: (runtime == "Cordova"),
                    RUNTIME: "" + runtime,
                    INIT_EVENT: event.init
                };
                switch (event.type) {
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].COMMAND:
                        if (runtime == "Node") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/service/" + baseName + "Service.ts", this.compileFile(filePath + "module/service/ModuleService.ts.hbs", hbsVars), "utf8");
                        }
                        else if (runtime == "Web") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/command/" + baseName + "Command.tsx", this.compileFile(filePath + "module/command/ModuleCommand.ts.hbs", hbsVars), "utf8");
                        }
                        else {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/command/" + baseName + runtime + "Command.tsx", this.compileFile(filePath + "module/command/ModuleCommand.ts.hbs", hbsVars), "utf8");
                        }
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].EVENT:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/event/" + baseName + ".ts", this.compileFile(filePath + "module/event/ModuleEvent.ts.hbs", hbsVars), "utf8");
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].INDEX:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/index.ts", this.compileFile(filePath + "module/index.ts.hbs", hbsVars), "utf8");
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].MEDIATOR:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/mediator/" + upperModuleName + runtime + "Mediator.ts", this.compileFile(filePath + "module/ModuleMediator.ts.hbs", hbsVars), "utf8");
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].SPEC:
                        if (runtime == "Node") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/service/spec/" + baseName + "Service.spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        else if (runtime == "Web") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/command/spec/" + baseName + "Command.spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        else {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/" + upperModuleName + runtime + ".spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].STORE:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/" + upperModuleName + runtime + "Store.ts", this.compileFile(filePath + "module/view/Module.tsx.hbs", hbsVars), "utf8");
                        break;
                    case _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_2__["CreateHbsFileEventTypes"].VIEW:
                        if (runtime == "Node")
                            return [2];
                        if (runtime == "Web") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/view/" + upperModuleName + ".tsx", this.compileFile(filePath + "module/view/Module.tsx.hbs", hbsVars), "utf8");
                        }
                        else {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/view/" + upperModuleName + runtime + ".tsx", this.compileFile(filePath + "module/view/Module.tsx.hbs", hbsVars), "utf8");
                        }
                        break;
                }
                return [2];
            });
        });
    };
    CreateHbsFileCommand.prototype.compileFile = function (path, data) {
        try {
            var handlebar = __webpack_require__(/*! handlebars */ "handlebars");
            var source = Object(fs__WEBPACK_IMPORTED_MODULE_3__["readFileSync"])(path, "utf8");
            var template = handlebar.compile(source);
            return template(data);
        }
        catch (e) {
            console.log(e);
        }
    };
    return CreateHbsFileCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateHbsFileCommand);


/***/ }),

/***/ "./src/command/CreateModuleCommand.ts":
/*!********************************************!*\
  !*** ./src/command/CreateModuleCommand.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event/ShowCreateModuleDialogEvent */ "./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event/CreateHbsFileEvent */ "./src/event/CreateHbsFileEvent.ts");







var CreateModuleCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateModuleCommand, _super);
    function CreateModuleCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateModuleCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var ev, fsn, toAbsolutePath, test, filePath, modulePath, upperModuleName, baseName, templateData, _i, _a, runtime, runtObj;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, new _event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_1__["default"]().dispatch()];
                    case 1:
                        ev = _b.sent();
                        fsn = __webpack_require__(/*! fs */ "fs");
                        toAbsolutePath = __webpack_require__(/*! to-absolute-path */ "to-absolute-path");
                        test = /*require.resolve*/(/*! @fabalous/core/package.json */ "./node_modules/@fabalous/core/package.json");
                        filePath = toAbsolutePath(test + "../../../../../../../files/") + "/";
                        modulePath = this.data.projectPath + "src/" + ev.data.moduleName + "/";
                        upperModuleName = "" + ev.data.moduleName.substr(0, 1).toUpperCase() + ev.data.moduleName.substr(1);
                        baseName = "Init" + upperModuleName;
                        try {
                            fsn.lstatSync(modulePath);
                            console.log("Module already exsist");
                            new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
                            return [2];
                        }
                        catch (e) {
                        }
                        templateData = {
                            filePath: filePath,
                            modulePath: modulePath,
                            moduleName: ev.data.moduleName,
                            baseName: baseName
                        };
                        new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].INDEX, templateData, true).dispatch();
                        for (_i = 0, _a = this.data.runtimes; _i < _a.length; _i++) {
                            runtime = _a[_i];
                            runtObj = Object.assign({ runtime: runtime }, templateData);
                            new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].MEDIATOR, runtObj, true).dispatch();
                            if (runtime != "Node") {
                                new _event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["default"](_event_CreateHbsFileEvent__WEBPACK_IMPORTED_MODULE_5__["CreateHbsFileEventTypes"].VIEW, runtObj, true).dispatch();
                            }
                        }
                        console.log("Module " + ev.data.moduleName + " created!");
                        new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
                        return [2];
                }
            });
        });
    };
    CreateModuleCommand.prototype.compileFile = function (path, data) {
        try {
            var handlebar = __webpack_require__(/*! handlebars */ "handlebars");
            var source = Object(fs__WEBPACK_IMPORTED_MODULE_4__["readFileSync"])(path, "utf8");
            var template = handlebar.compile(source);
            return template(data);
        }
        catch (e) {
            console.log(e);
        }
    };
    return CreateModuleCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_2___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateModuleCommand);


/***/ }),

/***/ "./src/command/CreatePackageJsonCommand.ts":
/*!*************************************************!*\
  !*** ./src/command/CreatePackageJsonCommand.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UiCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UiCommand */ "./src/command/UiCommand.ts");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);




var CreatePackageJsonCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreatePackageJsonCommand, _super);
    function CreatePackageJsonCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fs = __webpack_require__(/*! fs-extra */ "fs-extra");
        _this.json = {
            "name": "fabalous",
            "version": "0.0.1",
            "scripts": {},
            "dependencies": {},
            "devDependencies": {
                "git-rev-sync": "^1.9.1",
                "@fabalous/core": "*"
            },
            "fabalous": {
                "codeStructure": {
                    "event": "${moduleName}/event/${fileName}Event.ts",
                    "mediator": "${moduleName}/mediator/${fileName}Mediator.ts"
                }
            }
        };
        _this.jest = {
            "globals": {
                "__TS_CONFIG__": "tsconfig.json"
            },
            "transform": {
                ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
            },
            "testRegex": ".*\\Spec.(ts|tsx|js)$",
            "moduleFileExtensions": [
                "ts",
                "tsx",
                "js"
            ],
            "collectCoverageFrom": [
                "src/**/*.ts",
                "src/**/*.tsx",
                "!src/**/*.d.ts"
            ],
            "coverageReporters": [
                "lcov"
            ],
            "testResultsProcessor": "<rootDir>/node_modules/ts-jest/coverageprocessor.js"
        };
        return _this;
    }
    CreatePackageJsonCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toAbsolutePath, test, fs;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                toAbsolutePath = __webpack_require__(/*! to-absolute-path */ "to-absolute-path");
                test = /*require.resolve*/(/*! @fabalous/core/package.json */ "./node_modules/@fabalous/core/package.json");
                this.filePath = toAbsolutePath(test + "../../../../../../../files/") + "/";
                this.setProjectName(this.data.step1Data.projectName);
                this.setDevDependencies(this.data.step1Data.libs);
                this.createDirs(this.data.step1Data.libs);
                this.copyStarterFiles(this.data.step1Data.libs);
                fs = __webpack_require__(/*! fs-extra */ "fs-extra");
                fs.writeJson(this.data.projectPath + "package.json", this.json, function (err) {
                    return event;
                });
                return [2];
            });
        });
    };
    CreatePackageJsonCommand.prototype.setProjectName = function (name) {
        this.json.name = name;
    };
    CreatePackageJsonCommand.prototype.setDevDependencies = function (deps) {
        for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
            var dep = deps_1[_i];
            switch (dep) {
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_NODE:
                    this.json.devDependencies["@fabalous/runtime-node"] = "*";
                    this.json.scripts["node-watch"] = "gulp runtime-node-watch";
                    this.json.scripts["node-build"] = "gulp runtime-node-build";
                    this.json.fabalous.codeStructure["nodeCommand"] = "${moduleName}/command/node/${fileName}NodeCommand.ts";
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_WEB:
                    this.json.devDependencies["@fabalous/runtime-web"] = "*";
                    this.json.scripts["web-watch"] = "gulp runtime-web-watch";
                    this.json.scripts["web-build"] = "gulp runtime-web-build";
                    this.json.fabalous.codeStructure["webCommand"] = "${moduleName}/command/web/${fileName}WebCommand.ts";
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_APP:
                    this.json.devDependencies["@fabalous/runtime-cordova"] = "*";
                    this.json.fabalous.codeStructure["cordovaCommand"] = "${moduleName}/command/web/${fileName}CordovaCommand.ts";
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].TEST_JEST:
                    this.json.devDependencies["@fabalous/test-jest"] = "*";
                    this.json.scripts["test"] = "jest --no-cache --watch";
                    this.json["jest"] = this.jest;
                    break;
            }
        }
        for (var _a = 0, _b = this.data.step2Data.externalLibs; _a < _b.length; _a++) {
            var externalDep = _b[_a];
            for (var _c = 0, externalDep_1 = externalDep; _c < externalDep_1.length; _c++) {
                var externalDepSingle = externalDep_1[_c];
                this.json.devDependencies[externalDepSingle] = "*";
            }
        }
        this.json.devDependencies["tslib"] = "*";
    };
    CreatePackageJsonCommand.prototype.createDirs = function (deps) {
        var fs = __webpack_require__(/*! fs-extra */ "fs-extra");
        fs.mkdirsSync(this.data.projectPath + "src");
        fs.mkdirsSync(this.data.projectPath + "src/common");
        for (var _i = 0, deps_2 = deps; _i < deps_2.length; _i++) {
            var dep = deps_2[_i];
            switch (dep) {
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_NODE:
                    fs.mkdirsSync(this.data.projectPath + "src/common/node");
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_WEB:
                    fs.mkdirsSync(this.data.projectPath + "src/common/web");
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_APP:
                    fs.mkdirsSync(this.data.projectPath + "src/common/cordova");
                    break;
            }
        }
    };
    CreatePackageJsonCommand.prototype.copyStarterFiles = function (deps) {
        var fs = __webpack_require__(/*! fs-extra */ "fs-extra");
        fs.copySync(this.filePath + "/src/Routes.ts", this.data.projectPath + "src/Routes.ts");
        fs.copySync(this.filePath + "/tsconfig.json", this.data.projectPath + "tsconfig.json");
        fs.copySync(this.filePath + "/tsconfig_jest.json", this.data.projectPath + "tsconfig_jest.json");
        fs.copySync(this.filePath + "/tslint.json", this.data.projectPath + "tslint.json");
        fs.copySync(this.filePath + "/gitignore", this.data.projectPath + ".gitignore");
        fs.copySync(this.filePath + "/npmignore", this.data.projectPath + ".npmignore");
        fs.outputFileSync(this.data.projectPath + "gulpfile.js", this.compileGulpFile(), "utf8");
        for (var _i = 0, deps_3 = deps; _i < deps_3.length; _i++) {
            var dep = deps_3[_i];
            switch (dep) {
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_NODE:
                    fs.copySync(this.filePath + "/src/node/AppNode.ts", this.data.projectPath + "src/AppNode.ts");
                    fs.copySync(this.filePath + "/src/node/NodeStore.ts", this.data.projectPath + "src/common/NodeStore.ts");
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_WEB:
                    fs.copySync(this.filePath + "/src/web/index.ejs", this.data.projectPath + "src/common/web/index.ejs");
                    fs.copySync(this.filePath + "/src/web/AppWeb.ts", this.data.projectPath + "src/AppWeb.ts");
                    fs.copySync(this.filePath + "/src/web/WebLayout.tsx", this.data.projectPath + "src/common/web/WebLayout.tsx");
                    fs.copySync(this.filePath + "/src/web/AppState.ts", this.data.projectPath + "src/AppState.ts");
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_APP:
                    fs.copySync(this.filePath + "/src/cordova/index.ejs", this.data.projectPath + "src/common/cordova/index.ejs");
                    fs.copySync(this.filePath + "/src/cordova/A_Cordova.ts", this.data.projectPath + "src/A_Cordova.ts");
                    fs.copySync(this.filePath + "/src/cordova/CordovaStore.ts", this.data.projectPath + "src/common/cordova/CordovaStore.ts");
                    break;
            }
        }
    };
    CreatePackageJsonCommand.prototype.compileGulpFile = function () {
        var data = {};
        for (var _i = 0, _a = this.data.step1Data.libs; _i < _a.length; _i++) {
            var obj = _a[_i];
            switch (obj) {
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_WEB:
                    data.web = true;
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_APP:
                    data.cordova = true;
                    break;
                case _UiCommand__WEBPACK_IMPORTED_MODULE_2__["UiCommandMenuTyes"].RUNTIMES_NODE:
                    data.node = true;
                    break;
            }
        }
        return this.compileFile(this.filePath + "gulpfile.js.hbs", data);
    };
    CreatePackageJsonCommand.prototype.compileFile = function (path, data) {
        var handlebar = __webpack_require__(/*! handlebars */ "handlebars");
        var source = Object(fs__WEBPACK_IMPORTED_MODULE_3__["readFileSync"])(path, "utf8");
        var template = handlebar.compile(source);
        return template(data);
    };
    return CreatePackageJsonCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreatePackageJsonCommand);


/***/ }),

/***/ "./src/command/GetModulesCommand.ts":
/*!******************************************!*\
  !*** ./src/command/GetModulesCommand.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);


var GetModulesCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GetModulesCommand, _super);
    function GetModulesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetModulesCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var fs, dirContent, _i, dirContent_1, obj, isDir;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                fs = __webpack_require__(/*! fs */ "fs");
                dirContent = fs.readdirSync(this.data.projectPath + "/src/");
                this.data.modules = [];
                for (_i = 0, dirContent_1 = dirContent; _i < dirContent_1.length; _i++) {
                    obj = dirContent_1[_i];
                    if (obj == "common")
                        continue;
                    isDir = (fs.lstatSync(this.data.projectPath + "/src/" + obj).nlink > 1);
                    if (isDir) {
                        this.data.modules.push(obj);
                    }
                }
                return [2, event];
            });
        });
    };
    return GetModulesCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (GetModulesCommand);


/***/ }),

/***/ "./src/command/GetPackageJsonCommand.ts":
/*!**********************************************!*\
  !*** ./src/command/GetPackageJsonCommand.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);



var GetPackageJsonCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GetPackageJsonCommand, _super);
    function GetPackageJsonCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetPackageJsonCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var path, packJson;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                path = __webpack_require__(/*! path */ "path");
                try {
                    packJson = Object(fs__WEBPACK_IMPORTED_MODULE_2__["readFileSync"])(this.data.projectPath + "package.json", "utf8");
                    this.data.json = JSON.parse(packJson);
                    console.log(this.data.json);
                    if (this.data.json.devDependencies['@fabalous/runtime-node']) {
                        this.data.runtimes.push("Node");
                    }
                    if (this.data.json.devDependencies['@fabalous/runtime-web']) {
                        this.data.runtimes.push("Web");
                    }
                    if (this.data.json.devDependencies['@fabalous/runtime-cordova']) {
                        this.data.runtimes.push("Cordova");
                    }
                }
                catch (e) {
                    this.data.json = false;
                }
                return [2, event];
            });
        });
    };
    return GetPackageJsonCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (GetPackageJsonCommand);


/***/ }),

/***/ "./src/command/InitFabalousCommand.ts":
/*!********************************************!*\
  !*** ./src/command/InitFabalousCommand.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_GetPackageJsonEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event/GetPackageJsonEvent */ "./src/event/GetPackageJsonEvent.ts");
/* harmony import */ var _event_CreateAppEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event/CreateAppEvent */ "./src/event/CreateAppEvent.ts");
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_4__);





var InitFabalousCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InitFabalousCommand, _super);
    function InitFabalousCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitFabalousCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new _event_GetPackageJsonEvent__WEBPACK_IMPORTED_MODULE_1__["default"]().dispatch()];
                    case 1:
                        _a.sent();
                        if (this.data.json) {
                            new _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_3__["default"]().dispatch();
                        }
                        else {
                            new _event_CreateAppEvent__WEBPACK_IMPORTED_MODULE_2__["default"]().dispatch();
                        }
                        return [2];
                }
            });
        });
    };
    return InitFabalousCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_4___default.a));
/* harmony default export */ __webpack_exports__["default"] = (InitFabalousCommand);


/***/ }),

/***/ "./src/command/InstallNPMDepsCommand.ts":
/*!**********************************************!*\
  !*** ./src/command/InstallNPMDepsCommand.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1__);


var InstallNPMDepsCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InstallNPMDepsCommand, _super);
    function InstallNPMDepsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstallNPMDepsCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.executeShell(event)];
                    case 1:
                        _a.sent();
                        return [2, event];
                }
            });
        });
    };
    InstallNPMDepsCommand.prototype.executeShell = function (event) {
        var _this = this;
        return new Promise(function (resolve) {
            var cmdify = __webpack_require__(/*! cmdify */ "cmdify");
            var spawn = __webpack_require__(/*! child_process */ "child_process").exec;
            var cmd;
            if (event.yarnExist) {
                cmd = spawn(cmdify("cd " + _this.data.projectPath + " && yarn install"), { shell: true, stdio: 'pipe' });
            }
            else {
                cmd = spawn(cmdify("cd " + _this.data.projectPath + " && npm install"), { shell: true, stdio: 'pipe' });
            }
            cmd.stdout.on('data', function (data) {
                if (event.yarnExist) {
                    console.log("" + data);
                }
            });
            cmd.stderr.on('data', function (data) {
            });
            cmd.on('close', function () {
                resolve();
            });
        });
    };
    return InstallNPMDepsCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (InstallNPMDepsCommand);


/***/ }),

/***/ "./src/command/UiCommand.ts":
/*!**********************************!*\
  !*** ./src/command/UiCommand.ts ***!
  \**********************************/
/*! exports provided: default, UiCommandMenuTyes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiCommandMenuTyes", function() { return UiCommandMenuTyes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event/ShowMainMenuEvent */ "./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var _event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../event/CreateAppStep1DialogEvent */ "./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var _event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event/CreateAppStep2DialogEvent */ "./src/event/CreateAppStep2DialogEvent.ts");
/* harmony import */ var _event_CreateAppStep3DialogEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event/CreateAppStep3DialogEvent */ "./src/event/CreateAppStep3DialogEvent.ts");
/* harmony import */ var _event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../event/ShowCreateModuleDialogEvent */ "./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fabalous/core/FabaCoreCommand */ "./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var _fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _event_CreateModuleEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../event/CreateModuleEvent */ "./src/event/CreateModuleEvent.ts");
/* harmony import */ var _event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../event/ShowCreateEveCmdEvent */ "./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var _event_CreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../event/CreateEveCmdEvent */ "./src/event/CreateEveCmdEvent.ts");










var chalk = __webpack_require__(/*! chalk */ "chalk");
var UiCommand = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UiCommand, _super);
    function UiCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inquirer = __webpack_require__(/*! inquirer */ "inquirer");
        return _this;
    }
    UiCommand.prototype.execute = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, choice, ev, _b, ev_1, _c, ev_2, _d, ev_3, _e;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = event.eventIdentifyer;
                        switch (_a) {
                            case _event_ShowMainMenuEvent__WEBPACK_IMPORTED_MODULE_1__["default"].name: return [3, 1];
                            case _event_ShowCreateModuleDialogEvent__WEBPACK_IMPORTED_MODULE_5__["default"].name: return [3, 3];
                            case _event_ShowCreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_8__["default"].name: return [3, 5];
                            case _event_CreateAppStep1DialogEvent__WEBPACK_IMPORTED_MODULE_2__["default"].name: return [3, 7];
                            case _event_CreateAppStep2DialogEvent__WEBPACK_IMPORTED_MODULE_3__["default"].name: return [3, 9];
                            case _event_CreateAppStep3DialogEvent__WEBPACK_IMPORTED_MODULE_4__["default"].name: return [3, 11];
                        }
                        return [3, 12];
                    case 1: return [4, this.showMainMenu()];
                    case 2:
                        choice = _f.sent();
                        switch (choice.menu) {
                            case "Create new Module":
                                new _event_CreateModuleEvent__WEBPACK_IMPORTED_MODULE_7__["default"]().dispatch();
                                break;
                            case "Create Event / Command / Service":
                                new _event_CreateEveCmdEvent__WEBPACK_IMPORTED_MODULE_9__["default"]().dispatch();
                                break;
                        }
                        return [3, 12];
                    case 3:
                        ev = event;
                        _b = ev;
                        return [4, this.showCreateModule()];
                    case 4:
                        _b.data = _f.sent();
                        return [2, ev];
                    case 5:
                        ev_1 = event;
                        _c = ev_1;
                        return [4, this.showCreateECSModule()];
                    case 6:
                        _c.data = _f.sent();
                        return [2, ev_1];
                    case 7:
                        ev_2 = event;
                        _d = ev_2;
                        return [4, this.showAppDialogStep1()];
                    case 8:
                        _d.data = _f.sent();
                        return [2, ev_2];
                    case 9:
                        ev_3 = event;
                        _e = ev_3;
                        return [4, this.showAppDialogStep2()];
                    case 10:
                        _e.data = _f.sent();
                        return [2, ev_3];
                    case 11:
                        {
                        }
                        _f.label = 12;
                    case 12: return [2];
                }
            });
        });
    };
    UiCommand.prototype.showCreateModule = function () {
        return this.inquirer.prompt([
            {
                type: 'text',
                message: 'Whats the name of your new Module?',
                name: 'moduleName'
            }
        ]);
    };
    UiCommand.prototype.showCreateECSModule = function () {
        return this.inquirer.prompt([
            {
                type: 'list',
                name: 'moduleName',
                choices: this.data.modules,
                message: 'Please choice the module'
            },
            {
                type: 'text',
                message: 'Please enter the Event-base name?',
                name: 'eventBaseName'
            },
        ]);
    };
    UiCommand.prototype.showMainMenu = function () {
        console.log();
        console.log(chalk.bold(chalk.magenta('FABALOUS - Main Menu')));
        console.log(new this.inquirer.Separator().line);
        return this.inquirer.prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What do you want to do?',
                choices: [
                    'Create new Module',
                    'Create Event / Command / Service',
                    'Create View',
                    new this.inquirer.Separator(),
                    'Add Runtime',
                    'Add External Libs',
                    'Show Help'
                ]
            }
        ]);
    };
    UiCommand.prototype.showAppDialogStep1 = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2, this.inquirer.prompt([
                        {
                            type: 'text',
                            message: '(1 / 4) Whats the name of your new Fabalous Project?',
                            name: 'projectName'
                        },
                        {
                            type: 'checkbox',
                            message: '(2 / 4) Libraries and Runtimes',
                            name: 'libs',
                            pageSize: 10,
                            choices: [
                                new this.inquirer.Separator(' = Runtimes = '),
                                { name: 'Node (Server)', value: UiCommandMenuTyes.RUNTIMES_NODE, checked: true },
                                { name: 'Web (React)', value: UiCommandMenuTyes.RUNTIMES_WEB },
                                { name: 'Web Mobile App (Cordova)', value: UiCommandMenuTyes.RUNTIMES_APP },
                                new this.inquirer.Separator(' = Testing = '),
                                { name: 'TDD / Specs (Jest)', value: UiCommandMenuTyes.TEST_JEST, checked: true },
                                { name: 'E2E (Karma / Nightwatch)', value: UiCommandMenuTyes.TEST_E2E },
                            ]
                        }
                    ])];
            });
        });
    };
    UiCommand.prototype.showAppDialogStep2 = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var choices, _i, _a, lib;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                choices = [];
                choices.push(new this.inquirer.Separator(' = Webpack = '));
                choices.push({ name: 'Webpack Stats', value: ["webpack-bundle-analyzer"] });
                for (_i = 0, _a = this.data.step1Data.libs; _i < _a.length; _i++) {
                    lib = _a[_i];
                    switch (lib) {
                        case UiCommandMenuTyes.RUNTIMES_WEB:
                            choices.push(new this.inquirer.Separator(' = Web UI = '));
                            choices.push({ name: 'Typestyle', value: ["typestyle"] });
                            choices.push({ name: 'Material UI', value: ["material-ui", "@types/material-ui", "react-tap-event-plugin"] });
                            choices.push(new this.inquirer.Separator(' = Web Database = '));
                            choices.push({ name: 'PouchDB', value: ["pouchdb", "@types/pouchdb"] });
                            break;
                        case UiCommandMenuTyes.RUNTIMES_NODE:
                            choices.push(new this.inquirer.Separator(' = Node Transport = '));
                            choices.push({ name: 'Websocket (socket.io)', value: ["socket.io", "@types/socket.io"] });
                            choices.push(new this.inquirer.Separator(' = Node Databases = '));
                            choices.push({ name: 'MongoDB', value: ["mongodb", "@types/mongodb"] });
                            choices.push({ name: 'RethinkDB', value: ["rethinkdb", "@types/rethinkdb"] });
                            choices.push({ name: 'PouchDB', value: ["pouchdb", "@types/pouchdb"] });
                            break;
                        default:
                            break;
                    }
                }
                return [2, this.inquirer.prompt([
                        {
                            type: 'checkbox',
                            message: '(3 / 5) Here is a list of recommend external Libs based on your selection!',
                            name: 'externalLibs',
                            pageSize: 10,
                            choices: choices
                        }
                    ])];
            });
        });
    };
    return UiCommand;
}(_fabalous_core_FabaCoreCommand__WEBPACK_IMPORTED_MODULE_6___default.a));
/* harmony default export */ __webpack_exports__["default"] = (UiCommand);
var UiCommandMenuTyes;
(function (UiCommandMenuTyes) {
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_NODE"] = 0] = "RUNTIMES_NODE";
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_WEB"] = 1] = "RUNTIMES_WEB";
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_NATIVE"] = 2] = "RUNTIMES_NATIVE";
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_VR"] = 3] = "RUNTIMES_VR";
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_APP"] = 4] = "RUNTIMES_APP";
    UiCommandMenuTyes[UiCommandMenuTyes["RUNTIMES_DESKTOP"] = 5] = "RUNTIMES_DESKTOP";
    UiCommandMenuTyes[UiCommandMenuTyes["TEST_JEST"] = 6] = "TEST_JEST";
    UiCommandMenuTyes[UiCommandMenuTyes["TEST_E2E"] = 7] = "TEST_E2E";
    UiCommandMenuTyes[UiCommandMenuTyes["TEST_VISUAL"] = 8] = "TEST_VISUAL";
})(UiCommandMenuTyes || (UiCommandMenuTyes = {}));


/***/ }),

/***/ "./src/event/AddToMediatorEvent.ts":
/*!*****************************************!*\
  !*** ./src/event/AddToMediatorEvent.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var AddToMediatorEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AddToMediatorEvent, _super);
    function AddToMediatorEvent(data) {
        var _this = _super.call(this, "AddToMediatorEvent") || this;
        _this.data = data;
        return _this;
    }
    return AddToMediatorEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (AddToMediatorEvent);


/***/ }),

/***/ "./src/event/CreateAppEvent.ts":
/*!*************************************!*\
  !*** ./src/event/CreateAppEvent.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateAppEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateAppEvent, _super);
    function CreateAppEvent() {
        return _super.call(this, "CreateAppEvent") || this;
    }
    return CreateAppEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateAppEvent);


/***/ }),

/***/ "./src/event/CreateAppStep1DialogEvent.ts":
/*!************************************************!*\
  !*** ./src/event/CreateAppStep1DialogEvent.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateAppStep1DialogEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateAppStep1DialogEvent, _super);
    function CreateAppStep1DialogEvent() {
        return _super.call(this, "CreateAppStep1DialogEvent") || this;
    }
    return CreateAppStep1DialogEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateAppStep1DialogEvent);


/***/ }),

/***/ "./src/event/CreateAppStep2DialogEvent.ts":
/*!************************************************!*\
  !*** ./src/event/CreateAppStep2DialogEvent.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateAppStep2DialogEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateAppStep2DialogEvent, _super);
    function CreateAppStep2DialogEvent() {
        return _super.call(this, "CreateAppStep2DialogEvent") || this;
    }
    return CreateAppStep2DialogEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateAppStep2DialogEvent);


/***/ }),

/***/ "./src/event/CreateAppStep3DialogEvent.ts":
/*!************************************************!*\
  !*** ./src/event/CreateAppStep3DialogEvent.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateAppStep3DialogEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateAppStep3DialogEvent, _super);
    function CreateAppStep3DialogEvent() {
        return _super.call(this, "CreateAppStep3DialogEvent") || this;
    }
    return CreateAppStep3DialogEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateAppStep3DialogEvent);


/***/ }),

/***/ "./src/event/CreateEveCmdEvent.ts":
/*!****************************************!*\
  !*** ./src/event/CreateEveCmdEvent.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateEveCmdEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateEveCmdEvent, _super);
    function CreateEveCmdEvent() {
        return _super.call(this, "CreateEveCmdEvent") || this;
    }
    return CreateEveCmdEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateEveCmdEvent);


/***/ }),

/***/ "./src/event/CreateHbsFileEvent.ts":
/*!*****************************************!*\
  !*** ./src/event/CreateHbsFileEvent.ts ***!
  \*****************************************/
/*! exports provided: default, CreateHbsFileEventTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateHbsFileEventTypes", function() { return CreateHbsFileEventTypes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateHbsFileEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateHbsFileEvent, _super);
    function CreateHbsFileEvent(type, data, init) {
        if (init === void 0) { init = false; }
        var _this = _super.call(this, "CreateHbsFileEvent") || this;
        if (data)
            data.upperModuleName = "" + data.moduleName.substr(0, 1).toUpperCase() + data.moduleName.substr(1);
        _this.type = type;
        _this.data = data;
        _this.init = init;
        return _this;
    }
    return CreateHbsFileEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateHbsFileEvent);
var CreateHbsFileEventTypes;
(function (CreateHbsFileEventTypes) {
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["COMMAND"] = 0] = "COMMAND";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["EVENT"] = 1] = "EVENT";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["SPEC"] = 2] = "SPEC";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["VIEW"] = 3] = "VIEW";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["INDEX"] = 4] = "INDEX";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["MEDIATOR"] = 5] = "MEDIATOR";
    CreateHbsFileEventTypes[CreateHbsFileEventTypes["STORE"] = 6] = "STORE";
})(CreateHbsFileEventTypes || (CreateHbsFileEventTypes = {}));


/***/ }),

/***/ "./src/event/CreateModuleEvent.ts":
/*!****************************************!*\
  !*** ./src/event/CreateModuleEvent.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreateModuleEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreateModuleEvent, _super);
    function CreateModuleEvent() {
        return _super.call(this, "CreateModuleEvent") || this;
    }
    return CreateModuleEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreateModuleEvent);


/***/ }),

/***/ "./src/event/CreatePackageJsonEvent.ts":
/*!*********************************************!*\
  !*** ./src/event/CreatePackageJsonEvent.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var CreatePackageJsonEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CreatePackageJsonEvent, _super);
    function CreatePackageJsonEvent() {
        return _super.call(this, "CreatePackageJsonEvent") || this;
    }
    return CreatePackageJsonEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (CreatePackageJsonEvent);


/***/ }),

/***/ "./src/event/GetModulesEvent.ts":
/*!**************************************!*\
  !*** ./src/event/GetModulesEvent.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var GetModulesEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GetModulesEvent, _super);
    function GetModulesEvent() {
        return _super.call(this, "GetModulesEvent") || this;
    }
    return GetModulesEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (GetModulesEvent);


/***/ }),

/***/ "./src/event/GetPackageJsonEvent.ts":
/*!******************************************!*\
  !*** ./src/event/GetPackageJsonEvent.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var GetPackageJsonEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GetPackageJsonEvent, _super);
    function GetPackageJsonEvent() {
        return _super.call(this, "GetPackageJsonEvent") || this;
    }
    return GetPackageJsonEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (GetPackageJsonEvent);


/***/ }),

/***/ "./src/event/HandleMainMenuEvent.ts":
/*!******************************************!*\
  !*** ./src/event/HandleMainMenuEvent.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var HandleMainMenuEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HandleMainMenuEvent, _super);
    function HandleMainMenuEvent(data) {
        var _this = _super.call(this, "HandleMainMenuEvent") || this;
        _this.data = data;
        return _this;
    }
    return HandleMainMenuEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (HandleMainMenuEvent);


/***/ }),

/***/ "./src/event/InitFabalousEvent.ts":
/*!****************************************!*\
  !*** ./src/event/InitFabalousEvent.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var InitFabalousEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InitFabalousEvent, _super);
    function InitFabalousEvent() {
        return _super.call(this, "InitFabalousEvent") || this;
    }
    return InitFabalousEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (InitFabalousEvent);


/***/ }),

/***/ "./src/event/InstallNPMDepsEvent.ts":
/*!******************************************!*\
  !*** ./src/event/InstallNPMDepsEvent.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var InstallNPMDepsEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](InstallNPMDepsEvent, _super);
    function InstallNPMDepsEvent(yarnExist) {
        var _this = _super.call(this, "InstallNPMDepsEvent") || this;
        _this.yarnExist = yarnExist;
        return _this;
    }
    return InstallNPMDepsEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (InstallNPMDepsEvent);


/***/ }),

/***/ "./src/event/ShowCreateEveCmdEvent.ts":
/*!********************************************!*\
  !*** ./src/event/ShowCreateEveCmdEvent.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var ShowCreateEveCmdEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ShowCreateEveCmdEvent, _super);
    function ShowCreateEveCmdEvent() {
        return _super.call(this, "ShowCreateEveCmdEvent") || this;
    }
    return ShowCreateEveCmdEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (ShowCreateEveCmdEvent);


/***/ }),

/***/ "./src/event/ShowCreateModuleDialogEvent.ts":
/*!**************************************************!*\
  !*** ./src/event/ShowCreateModuleDialogEvent.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var ShowCreateModuleDialogEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ShowCreateModuleDialogEvent, _super);
    function ShowCreateModuleDialogEvent() {
        return _super.call(this, "ShowCreateModuleDialogEvent") || this;
    }
    return ShowCreateModuleDialogEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (ShowCreateModuleDialogEvent);


/***/ }),

/***/ "./src/event/ShowMainMenuEvent.ts":
/*!****************************************!*\
  !*** ./src/event/ShowMainMenuEvent.ts ***!
  \****************************************/
/*! exports provided: default, ShowMainMenuEventTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowMainMenuEventTypes", function() { return ShowMainMenuEventTypes; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "tslib");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fabalous/core/FabaEvent */ "./node_modules/@fabalous/core/FabaEvent.js");
/* harmony import */ var _fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1__);


var ShowMainMenuEvent = (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ShowMainMenuEvent, _super);
    function ShowMainMenuEvent() {
        return _super.call(this, "ShowMainMenuEvent") || this;
    }
    return ShowMainMenuEvent;
}(_fabalous_core_FabaEvent__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (ShowMainMenuEvent);
var ShowMainMenuEventTypes;
(function (ShowMainMenuEventTypes) {
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["CREATE_MODULE"] = 0] = "CREATE_MODULE";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["CREATE_EVENT"] = 1] = "CREATE_EVENT";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["ADD_RUNTIME"] = 2] = "ADD_RUNTIME";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["SHOW_HELP"] = 3] = "SHOW_HELP";
})(ShowMainMenuEventTypes || (ShowMainMenuEventTypes = {}));


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/A_CLI.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/A_CLI.ts */"./src/A_CLI.ts");


/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "cmdify":
/*!*************************!*\
  !*** external "cmdify" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cmdify");

/***/ }),

/***/ "command-exists":
/*!*********************************!*\
  !*** external "command-exists" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("command-exists");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),

/***/ "inquirer":
/*!***************************!*\
  !*** external "inquirer" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inquirer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "to-absolute-path":
/*!***********************************!*\
  !*** external "to-absolute-path" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("to-absolute-path");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });
//# sourceMappingURL=CLI.js.map