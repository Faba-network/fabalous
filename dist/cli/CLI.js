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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@fabalous/core/FabaCore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");

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
    FabaCore.addMediator = function (cls) {
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
                FabaCore.events[item] = { event: mediator.cmdList[item].event, commands: mediator.cmdList[item].commands };
            }
        }
        FabaCore.mediators.push({ cls: cls, mediator: mediator });
        return true;
    };
    /**
    * Go through the routes and create the command and execute
    * @param event FabaEvents
    * @param resu FabaEventResultType
    */
    FabaCore.dispatchEvent = function (event, resu) {
        for (var a = 0; a < this.mediators.length; a++) {
            var routeItem = this.mediators[a].mediator.cmdList;
            if (routeItem && routeItem[event.identifyer]) {
                for (var _i = 0, _a = routeItem[event.identifyer].commands; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    if (process.env.FABA_DEBUG == "2") {
                        console.log(event);
                        console.log(FabaCore.store);
                    }
                    var store = this.mediators[a].mediator.store || FabaCore.store;
                    switch (resu) {
                        case __WEBPACK_IMPORTED_MODULE_0__FabaEvent__["a" /* FabaEventResultType */].EXECUTE:
                            if (obj.permission && !obj.permission(store, event)) {
                                return;
                            }
                            new obj.cmd(store).execute(event);
                            break;
                        case __WEBPACK_IMPORTED_MODULE_0__FabaEvent__["a" /* FabaEventResultType */].RESULT:
                            new obj.cmd(store).result(event);
                            break;
                        case __WEBPACK_IMPORTED_MODULE_0__FabaEvent__["a" /* FabaEventResultType */].ERROR:
                            new obj.cmd(store).error(event);
                            break;
                        case __WEBPACK_IMPORTED_MODULE_0__FabaEvent__["a" /* FabaEventResultType */].TIMEOUT:
                            new obj.cmd(store).timeout(event);
                            break;
                        default:
                            new obj.cmd(store).execute(event);
                    }
                }
            }
        }
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
/* harmony default export */ __webpack_exports__["a"] = (FabaCore);
//# sourceMappingURL=FabaCore.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaCoreCommand.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (FabaCoreCommand);
//# sourceMappingURL=FabaCoreCommand.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaCoreMediator.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
            this.cmdList[h.identifyer] = { event: event, commands: [] };
        }
        this.cmdList[h.identifyer].commands.push({ cmd: command, permission: permission, options: {} });
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
        this.cmdList[h.identifyer].commands.map(function (item) {
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
        for (var i = 0; i < this.cmdList[h.identifyer].commands.length; i++) {
            var obj = this.cmdList[h.identifyer].commands[i];
            if (obj.cmd === command) {
                this.cmdList[h.identifyer].commands.splice(i, 1);
            }
        }
        if (this.cmdList[h.identifyer].commands.length === 0) {
            delete this.cmdList[h.identifyer];
        }
    };
    return FabaCoreMediator;
}());
/* harmony default export */ __webpack_exports__["a"] = (FabaCoreMediator);
//# sourceMappingURL=FabaCoreMediator.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/FabaEvent.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FabaEventResultType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FabaCore__ = __webpack_require__("./node_modules/@fabalous/core/FabaCore.js");


/**
 * FabaEvent which is used to communicate with the Commands
 */
var FabaEvent = /** @class */ (function () {
    /**
     *
     * @param identifyer
     */
    function FabaEvent(identifyer) {
        this.identifyer = identifyer;
    }
    /**
     *
     */
    FabaEvent.prototype.callBack = function () {
        if (this.cbs) {
            this.cbs(this);
        }
    };
    Object.defineProperty(FabaEvent.prototype, "name", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this.identifyer;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param delay
     * @param calb
     * @param result
     */
    FabaEvent.prototype.delayDispatch = function (delay, calb, result) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                setTimeout(function () {
                    if (calb) {
                        _this.cbs = calb;
                    }
                    return __WEBPACK_IMPORTED_MODULE_1__FabaCore__["a" /* default */].dispatchEvent(_this, result);
                }, delay);
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param calb
     * @param result
     * @returns {Promise<any>}
     */
    FabaEvent.prototype.dispatch = function (calb, result) {
        if (result === void 0) { result = FabaEventResultType.EXECUTE; }
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                if (result === FabaEventResultType.EXECUTE) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.cbs = resolve;
                            __WEBPACK_IMPORTED_MODULE_1__FabaCore__["a" /* default */].dispatchEvent(_this, result);
                        })];
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_1__FabaCore__["a" /* default */].dispatchEvent(this, result);
                }
                return [2 /*return*/, null];
            });
        });
    };
    return FabaEvent;
}());
/* harmony default export */ __webpack_exports__["b"] = (FabaEvent);
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
})(FabaEventResultType || (FabaEventResultType = {}));
//# sourceMappingURL=FabaEvent.js.map

/***/ }),

/***/ "./node_modules/@fabalous/core/store/FabaStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * FabaStore used as alternative to FabaImmutableStore
 */
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
    /**
     *
     */
    FabaStore.prototype.duplicate = function (path, deppClone) {
        if (deppClone === void 0) { deppClone = false; }
        return this._data;
    };
    return FabaStore;
}());
/* harmony default export */ __webpack_exports__["a"] = (FabaStore);
//# sourceMappingURL=FabaStore.js.map

/***/ }),

/***/ "./src/A_CLI.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCore__ = __webpack_require__("./node_modules/@fabalous/core/FabaCore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FabalousStore__ = __webpack_require__("./src/FabalousStore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_InitFabalousEvent__ = __webpack_require__("./src/event/InitFabalousEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FabalousMediator__ = __webpack_require__("./src/FabalousMediator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fabalous_core_store_FabaStore__ = __webpack_require__("./node_modules/@fabalous/core/store/FabaStore.js");






var A_CLI = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](A_CLI, _super);
    function A_CLI(store) {
        var _this = this;
        process.on('uncaughtException', function (err) {
            throw err;
        });
        _this = _super.call(this, store) || this;
        __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCore__["a" /* default */].addMediator(__WEBPACK_IMPORTED_MODULE_4__FabalousMediator__["a" /* default */]);
        new __WEBPACK_IMPORTED_MODULE_3__event_InitFabalousEvent__["a" /* default */]().dispatch();
        return _this;
    }
    return A_CLI;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCore__["a" /* default */]));
var appStore = new __WEBPACK_IMPORTED_MODULE_5__fabalous_core_store_FabaStore__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_2__FabalousStore__["a" /* default */]());
new A_CLI(appStore);


/***/ }),

/***/ "./src/FabalousMediator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreMediator__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreMediator.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_InitFabalousEvent__ = __webpack_require__("./src/event/InitFabalousEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__command_InitFabalousCommand__ = __webpack_require__("./src/command/InitFabalousCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_GetPackageJsonEvent__ = __webpack_require__("./src/event/GetPackageJsonEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__command_GetPackageJsonCommand__ = __webpack_require__("./src/command/GetPackageJsonCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event_CreatePackageJsonEvent__ = __webpack_require__("./src/event/CreatePackageJsonEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__command_CreatePackageJsonCommand__ = __webpack_require__("./src/command/CreatePackageJsonCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__event_CreateModuleEvent__ = __webpack_require__("./src/event/CreateModuleEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__command_CreateModuleCommand__ = __webpack_require__("./src/command/CreateModuleCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__event_CreateAppEvent__ = __webpack_require__("./src/event/CreateAppEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__command_CreateAppCommand__ = __webpack_require__("./src/command/CreateAppCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__event_CreateAppStep1DialogEvent__ = __webpack_require__("./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__event_CreateAppStep2DialogEvent__ = __webpack_require__("./src/event/CreateAppStep2DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__event_CreateAppStep3DialogEvent__ = __webpack_require__("./src/event/CreateAppStep3DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__ = __webpack_require__("./src/command/UiCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__event_HandleMainMenuEvent__ = __webpack_require__("./src/event/HandleMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__event_InstallNPMDepsEvent__ = __webpack_require__("./src/event/InstallNPMDepsEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__command_InstallNPMDepsCommand__ = __webpack_require__("./src/command/InstallNPMDepsCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__event_ShowCreateModuleDialogEvent__ = __webpack_require__("./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__event_ShowCreateEveCmdEvent__ = __webpack_require__("./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__event_CreateEveCmdEvent__ = __webpack_require__("./src/event/CreateEveCmdEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__command_CreateEveCmdCommand__ = __webpack_require__("./src/command/CreateEveCmdCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__command_GetModulesCommand__ = __webpack_require__("./src/command/GetModulesCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__event_GetModulesEvent__ = __webpack_require__("./src/event/GetModulesEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__event_CreateHbsFileEvent__ = __webpack_require__("./src/event/CreateHbsFileEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__command_CreateHbsFileCommand__ = __webpack_require__("./src/command/CreateHbsFileCommand.ts");




























var FabalousMediator = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](FabalousMediator, _super);
    function FabalousMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabalousMediator.prototype.addCommand = function (event, command) {
        _super.prototype.addCommand.call(this, event, command);
    };
    FabalousMediator.prototype.registerCommands = function () {
        this.addCommand(__WEBPACK_IMPORTED_MODULE_2__event_InitFabalousEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__command_InitFabalousCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_4__event_GetPackageJsonEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__command_GetPackageJsonCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_7__event_CreatePackageJsonEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__command_CreatePackageJsonCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_18__event_InstallNPMDepsEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_19__command_InstallNPMDepsCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_25__event_GetModulesEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_24__command_GetModulesCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_9__event_CreateModuleEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__command_CreateModuleCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_22__event_CreateEveCmdEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_23__command_CreateEveCmdCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_11__event_CreateAppEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__command_CreateAppCommand__["a" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_13__event_CreateAppStep1DialogEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_14__event_CreateAppStep2DialogEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_15__event_CreateAppStep3DialogEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_6__event_ShowMainMenuEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_17__event_HandleMainMenuEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_20__event_ShowCreateModuleDialogEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_21__event_ShowCreateEveCmdEvent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__command_UiCommand__["b" /* default */]);
        this.addCommand(__WEBPACK_IMPORTED_MODULE_26__event_CreateHbsFileEvent__["b" /* default */], __WEBPACK_IMPORTED_MODULE_27__command_CreateHbsFileCommand__["a" /* default */]);
    };
    return FabalousMediator;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreMediator__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (FabalousMediator);


/***/ }),

/***/ "./src/FabalousStore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var FabalousStore = (function () {
    function FabalousStore() {
        this.projectPath = "./";
        this.json = false;
        this.runtimes = [];
        this.modules = [];
    }
    return FabalousStore;
}());
/* harmony default export */ __webpack_exports__["a"] = (FabalousStore);


/***/ }),

/***/ "./src/command/CreateAppCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_CreatePackageJsonEvent__ = __webpack_require__("./src/event/CreatePackageJsonEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_InstallNPMDepsEvent__ = __webpack_require__("./src/event/InstallNPMDepsEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_CreateAppStep1DialogEvent__ = __webpack_require__("./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_CreateAppStep2DialogEvent__ = __webpack_require__("./src/event/CreateAppStep2DialogEvent.ts");







var chalk = __webpack_require__("chalk");
var CreateAppCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateAppCommand, _super);
    function CreateAppCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fs = __webpack_require__("fs-extra");
        _this.path = __webpack_require__("path");
        return _this;
    }
    CreateAppCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var step1, step2, e_1, inquirer, loader, i, ui, yarnExist, interval;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new __WEBPACK_IMPORTED_MODULE_5__event_CreateAppStep1DialogEvent__["a" /* default */]().dispatch()];
                    case 1:
                        step1 = _a.sent();
                        this.data.step1Data = step1.data;
                        return [4, new __WEBPACK_IMPORTED_MODULE_6__event_CreateAppStep2DialogEvent__["a" /* default */]().dispatch()];
                    case 2:
                        step2 = _a.sent();
                        this.data.step2Data = step2.data;
                        console.log(chalk.bold(chalk.blue('-') + ' Create App Structure...'));
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, new __WEBPACK_IMPORTED_MODULE_1__event_CreatePackageJsonEvent__["a" /* default */]().dispatch()];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3, 6];
                    case 6:
                        console.log(chalk.bold(chalk.blue('-') + ' Execute NPM install please wait!'));
                        inquirer = __webpack_require__("inquirer");
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
                        return [4, new __WEBPACK_IMPORTED_MODULE_3__event_InstallNPMDepsEvent__["a" /* default */](yarnExist).dispatch()];
                    case 8:
                        _a.sent();
                        if (!yarnExist)
                            clearInterval(interval);
                        console.log();
                        ui.updateBottomBar(chalk.bold(chalk.cyan('Installation done!\n')));
                        console.log();
                        new __WEBPACK_IMPORTED_MODULE_4__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
                        event.callBack();
                        return [2];
                }
            });
        });
    };
    CreateAppCommand.prototype.commandExist = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var commandExists = __webpack_require__("command-exists");
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
}(__WEBPACK_IMPORTED_MODULE_2__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateAppCommand);


/***/ }),

/***/ "./src/command/CreateEveCmdCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_ShowCreateEveCmdEvent__ = __webpack_require__("./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_GetModulesEvent__ = __webpack_require__("./src/event/GetModulesEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__ = __webpack_require__("./src/event/CreateHbsFileEvent.ts");






var chalk = __webpack_require__("chalk");
var CreateEveCmdCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateEveCmdCommand, _super);
    function CreateEveCmdCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateEveCmdCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var fs, ev, filePath, modulePath, templateData, _i, _a, runtime, runtObj;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fs = __webpack_require__("fs-extra");
                        return [4, new __WEBPACK_IMPORTED_MODULE_4__event_GetModulesEvent__["a" /* default */]().dispatch()];
                    case 1:
                        _b.sent();
                        if (this.data.modules.length == 0) {
                            console.log(chalk.bold(chalk.red('NO MODULES AVAILABLE')));
                            new __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
                            return [2];
                        }
                        return [4, new __WEBPACK_IMPORTED_MODULE_2__event_ShowCreateEveCmdEvent__["a" /* default */]().dispatch()];
                    case 2:
                        ev = _b.sent();
                        filePath = __dirname + "/../../files/";
                        modulePath = this.data.projectPath + "src/" + ev.data.moduleName + "/";
                        templateData = {
                            filePath: filePath,
                            modulePath: modulePath,
                            moduleName: ev.data.moduleName,
                            baseName: ev.data.eventBaseName
                        };
                        new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].EVENT, templateData, false).dispatch();
                        for (_i = 0, _a = this.data.runtimes; _i < _a.length; _i++) {
                            runtime = _a[_i];
                            runtObj = Object.assign({ runtime: runtime }, templateData);
                            new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].COMMAND, runtObj, false).dispatch();
                            new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].SPEC, runtObj, false).dispatch();
                        }
                        new __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
                        return [2];
                }
            });
        });
    };
    return CreateEveCmdCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateEveCmdCommand);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src/command"))

/***/ }),

/***/ "./src/command/CreateHbsFileCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__ = __webpack_require__("./src/event/CreateHbsFileEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs__ = __webpack_require__("fs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fs__);




var CreateHbsFileCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateHbsFileCommand, _super);
    function CreateHbsFileCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateHbsFileCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var fs, baseName, upperBaseName, moduleName, upperModuleName, filePath, runtime, hbsVars;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                fs = __webpack_require__("fs-extra");
                baseName = event.data.baseName;
                upperBaseName = event.data.upperBaseName;
                moduleName = event.data.moduleName.toLowerCase();
                upperModuleName = event.data.upperModuleName;
                filePath = event.data.filePath;
                runtime = (event.data.runtime) ? event.data.runtime : "";
                hbsVars = {
                    MODULE_EVENT: baseName + "Event",
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
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].COMMAND:
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
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].EVENT:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/event/" + baseName + "Event.ts", this.compileFile(filePath + "module/event/ModuleEvent.ts.hbs", hbsVars), "utf8");
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].INDEX:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/index.ts", this.compileFile(filePath + "module/index.ts.hbs", hbsVars), "utf8");
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].MEDIATOR:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + upperModuleName + runtime + "Mediator.ts", this.compileFile(filePath + "module/ModuleMediator.ts.hbs", hbsVars), "utf8");
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].SPEC:
                        if (runtime == "Node") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/service/" + baseName + "Service.spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        else if (runtime == "Web") {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/command/" + baseName + "Command.spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        else {
                            fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/" + upperModuleName + runtime + ".spec.ts", this.compileFile(filePath + "module/spec/ModuleSpec.tsx.hbs", hbsVars), "utf8");
                        }
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].STORE:
                        fs.outputFileSync(this.data.projectPath + "src/" + moduleName + "/" + runtime.toLocaleLowerCase() + "/" + upperModuleName + runtime + "Store.ts", this.compileFile(filePath + "module/view/Module.tsx.hbs", hbsVars), "utf8");
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].VIEW:
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
            var handlebar = __webpack_require__("handlebars");
            var source = Object(__WEBPACK_IMPORTED_MODULE_3_fs__["readFileSync"])(path, "utf8");
            var template = handlebar.compile(source);
            return template(data);
        }
        catch (e) {
            console.log(e);
        }
    };
    return CreateHbsFileCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateHbsFileCommand);


/***/ }),

/***/ "./src/command/CreateModuleCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_ShowCreateModuleDialogEvent__ = __webpack_require__("./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs__ = __webpack_require__("fs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__ = __webpack_require__("./src/event/CreateHbsFileEvent.ts");







var CreateModuleCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateModuleCommand, _super);
    function CreateModuleCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateModuleCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var ev, fsn, filePath, modulePath, upperModuleName, baseName, templateData, _i, _a, runtime, runtObj;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, new __WEBPACK_IMPORTED_MODULE_1__event_ShowCreateModuleDialogEvent__["a" /* default */]().dispatch()];
                    case 1:
                        ev = _b.sent();
                        fsn = __webpack_require__("fs");
                        filePath = __dirname + "/../../files/";
                        modulePath = this.data.projectPath + "src/" + ev.data.moduleName + "/";
                        upperModuleName = "" + ev.data.moduleName.substr(0, 1).toUpperCase() + ev.data.moduleName.substr(1);
                        baseName = "Init" + upperModuleName;
                        try {
                            fsn.lstatSync(modulePath);
                            console.log("Module already exsist");
                            new __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
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
                        new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].EVENT, templateData, true).dispatch();
                        new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].INDEX, templateData, true).dispatch();
                        for (_i = 0, _a = this.data.runtimes; _i < _a.length; _i++) {
                            runtime = _a[_i];
                            runtObj = Object.assign({ runtime: runtime }, templateData);
                            new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].MEDIATOR, runtObj, true).dispatch();
                            new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].COMMAND, runtObj, true).dispatch();
                            new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].SPEC, runtObj, true).dispatch();
                            if (runtime != "Node") {
                                new __WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["b" /* default */](__WEBPACK_IMPORTED_MODULE_5__event_CreateHbsFileEvent__["a" /* CreateHbsFileEventTypes */].VIEW, runtObj, true).dispatch();
                            }
                        }
                        console.log("Module " + ev.data.moduleName + " created!");
                        new __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
                        return [2];
                }
            });
        });
    };
    CreateModuleCommand.prototype.compileFile = function (path, data) {
        try {
            var handlebar = __webpack_require__("handlebars");
            var source = Object(__WEBPACK_IMPORTED_MODULE_4_fs__["readFileSync"])(path, "utf8");
            var template = handlebar.compile(source);
            return template(data);
        }
        catch (e) {
            console.log(e);
        }
    };
    return CreateModuleCommand;
}(__WEBPACK_IMPORTED_MODULE_2__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateModuleCommand);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src/command"))

/***/ }),

/***/ "./src/command/CreatePackageJsonCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UiCommand__ = __webpack_require__("./src/command/UiCommand.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs__ = __webpack_require__("fs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_fs__);




var CreatePackageJsonCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreatePackageJsonCommand, _super);
    function CreatePackageJsonCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fs = __webpack_require__("fs-extra");
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
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var path, absolutePath, dirString, fs;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                path = __webpack_require__("path");
                absolutePath = path.resolve("./");
                dirString = path.dirname(this.fs.realpathSync("./"));
                console.log(process.cwd());
                console.log(dirString);
                console.log(__webpack_require__("path").basename(__dirname));
                console.log(absolutePath);
                this.filePath = __dirname + "/./../files/";
                console.log(__dirname);
                console.log(this.filePath);
                this.setProjectName(this.data.step1Data.projectName);
                this.setDevDependencies(this.data.step1Data.libs);
                this.createDirs(this.data.step1Data.libs);
                this.copyStarterFiles(this.data.step1Data.libs);
                fs = __webpack_require__("fs-extra");
                fs.writeJson(this.data.projectPath + "package.json", this.json, function (err) {
                    event.callBack();
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
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_NODE:
                    this.json.devDependencies["@fabalous/runtime-node"] = "*";
                    this.json.scripts["node-watch"] = "gulp runtime-node-watch";
                    this.json.scripts["node-build"] = "gulp runtime-node-build";
                    this.json.fabalous.codeStructure["nodeCommand"] = "${moduleName}/command/node/${fileName}NodeCommand.ts";
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_WEB:
                    this.json.devDependencies["@fabalous/runtime-web"] = "*";
                    this.json.scripts["web-watch"] = "gulp runtime-web-watch";
                    this.json.scripts["web-build"] = "gulp runtime-web-build";
                    this.json.fabalous.codeStructure["webCommand"] = "${moduleName}/command/web/${fileName}WebCommand.ts";
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_APP:
                    this.json.devDependencies["@fabalous/runtime-cordova"] = "*";
                    this.json.fabalous.codeStructure["cordovaCommand"] = "${moduleName}/command/web/${fileName}CordovaCommand.ts";
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].TEST_JEST:
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
        var fs = __webpack_require__("fs-extra");
        fs.mkdirsSync(this.data.projectPath + "src");
        fs.mkdirsSync(this.data.projectPath + "src/common");
        for (var _i = 0, deps_2 = deps; _i < deps_2.length; _i++) {
            var dep = deps_2[_i];
            switch (dep) {
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_NODE:
                    fs.mkdirsSync(this.data.projectPath + "src/common/node");
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_WEB:
                    fs.mkdirsSync(this.data.projectPath + "src/common/web");
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_APP:
                    fs.mkdirsSync(this.data.projectPath + "src/common/cordova");
                    break;
            }
        }
    };
    CreatePackageJsonCommand.prototype.copyStarterFiles = function (deps) {
        var fs = __webpack_require__("fs-extra");
        fs.copySync(this.filePath + "/src/Routes.ts", this.data.projectPath + "src/common/Routes.ts");
        fs.copySync(this.filePath + "/tsconfig.json", this.data.projectPath + "tsconfig.json");
        fs.copySync(this.filePath + "/gitignore", this.data.projectPath + ".gitignore");
        fs.copySync(this.filePath + "/npmignore", this.data.projectPath + ".npmignore");
        fs.outputFileSync(this.data.projectPath + "gulpfile.js", this.compileGulpFile(), "utf8");
        for (var _i = 0, deps_3 = deps; _i < deps_3.length; _i++) {
            var dep = deps_3[_i];
            switch (dep) {
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_NODE:
                    fs.copySync(this.filePath + "/src/node/A_Node.ts", this.data.projectPath + "src/A_Node.ts");
                    fs.copySync(this.filePath + "/src/node/NodeStore.ts", this.data.projectPath + "src/common/node/NodeStore.ts");
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_WEB:
                    fs.copySync(this.filePath + "/src/web/index.ejs", this.data.projectPath + "src/common/web/index.ejs");
                    fs.copySync(this.filePath + "/src/web/A_Web.ts", this.data.projectPath + "src/A_Web.ts");
                    fs.copySync(this.filePath + "/src/web/RootLayout.tsx", this.data.projectPath + "src/common/web/RootLayout.tsx");
                    fs.copySync(this.filePath + "/src/web/WebStore.ts", this.data.projectPath + "src/common/web/WebStore.ts");
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_APP:
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
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_WEB:
                    data.web = true;
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_APP:
                    data.cordova = true;
                    break;
                case __WEBPACK_IMPORTED_MODULE_2__UiCommand__["a" /* UiCommandMenuTyes */].RUNTIMES_NODE:
                    data.node = true;
                    break;
            }
        }
        return this.compileFile(this.filePath + "gulpfile.js.hbs", data);
    };
    CreatePackageJsonCommand.prototype.compileFile = function (path, data) {
        var handlebar = __webpack_require__("handlebars");
        var source = Object(__WEBPACK_IMPORTED_MODULE_3_fs__["readFileSync"])(path, "utf8");
        var template = handlebar.compile(source);
        return template(data);
    };
    return CreatePackageJsonCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreatePackageJsonCommand);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src/command"))

/***/ }),

/***/ "./src/command/GetModulesCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");


var GetModulesCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GetModulesCommand, _super);
    function GetModulesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetModulesCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var fs, dirContent, _i, dirContent_1, obj, isDir;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                fs = __webpack_require__("fs");
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
                event.callBack();
                return [2];
            });
        });
    };
    return GetModulesCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (GetModulesCommand);


/***/ }),

/***/ "./src/command/GetPackageJsonCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__("fs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);



var GetPackageJsonCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GetPackageJsonCommand, _super);
    function GetPackageJsonCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetPackageJsonCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var path, packJson;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                path = __webpack_require__("path");
                try {
                    packJson = Object(__WEBPACK_IMPORTED_MODULE_2_fs__["readFileSync"])(this.data.projectPath + "package.json", "utf8");
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
                event.callBack();
                return [2];
            });
        });
    };
    return GetPackageJsonCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (GetPackageJsonCommand);


/***/ }),

/***/ "./src/command/InitFabalousCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_GetPackageJsonEvent__ = __webpack_require__("./src/event/GetPackageJsonEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_CreateAppEvent__ = __webpack_require__("./src/event/CreateAppEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");





var InitFabalousCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](InitFabalousCommand, _super);
    function InitFabalousCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitFabalousCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new __WEBPACK_IMPORTED_MODULE_1__event_GetPackageJsonEvent__["a" /* default */]().dispatch()];
                    case 1:
                        _a.sent();
                        if (this.data.json) {
                            new __WEBPACK_IMPORTED_MODULE_3__event_ShowMainMenuEvent__["a" /* default */]().dispatch();
                        }
                        else {
                            new __WEBPACK_IMPORTED_MODULE_2__event_CreateAppEvent__["a" /* default */]().dispatch();
                        }
                        return [2];
                }
            });
        });
    };
    return InitFabalousCommand;
}(__WEBPACK_IMPORTED_MODULE_4__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (InitFabalousCommand);


/***/ }),

/***/ "./src/command/InstallNPMDepsCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");


var InstallNPMDepsCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](InstallNPMDepsCommand, _super);
    function InstallNPMDepsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstallNPMDepsCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var cmdify, spawn, cmd;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
                cmdify = __webpack_require__("cmdify");
                spawn = __webpack_require__("child_process").spawn;
                if (event.yarnExist) {
                    cmd = spawn(cmdify("cd " + this.data.projectPath + " && yarn install"), { shell: true, stdio: 'pipe' });
                }
                else {
                    cmd = spawn(cmdify("cd " + this.data.projectPath + " && npm install"), { shell: true, stdio: 'pipe' });
                }
                cmd.stdout.on('data', function (data) {
                    if (event.yarnExist) {
                        console.log("" + data);
                    }
                });
                cmd.stderr.on('data', function (data) {
                });
                cmd.on('close', function () {
                    event.callBack();
                });
                return [2];
            });
        });
    };
    return InstallNPMDepsCommand;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (InstallNPMDepsCommand);


/***/ }),

/***/ "./src/command/UiCommand.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UiCommandMenuTyes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_ShowMainMenuEvent__ = __webpack_require__("./src/event/ShowMainMenuEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_CreateAppStep1DialogEvent__ = __webpack_require__("./src/event/CreateAppStep1DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__event_CreateAppStep2DialogEvent__ = __webpack_require__("./src/event/CreateAppStep2DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_CreateAppStep3DialogEvent__ = __webpack_require__("./src/event/CreateAppStep3DialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event_ShowCreateModuleDialogEvent__ = __webpack_require__("./src/event/ShowCreateModuleDialogEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fabalous_core_FabaCoreCommand__ = __webpack_require__("./node_modules/@fabalous/core/FabaCoreCommand.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event_CreateModuleEvent__ = __webpack_require__("./src/event/CreateModuleEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__event_ShowCreateEveCmdEvent__ = __webpack_require__("./src/event/ShowCreateEveCmdEvent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__event_CreateEveCmdEvent__ = __webpack_require__("./src/event/CreateEveCmdEvent.ts");










var chalk = __webpack_require__("chalk");
var UiCommand = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](UiCommand, _super);
    function UiCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inquirer = __webpack_require__("inquirer");
        return _this;
    }
    UiCommand.prototype.execute = function (event) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var _a, choice, ev, _b, ev_1, _c, ev_2, _d, ev_3, _e;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = event.name;
                        switch (_a) {
                            case __WEBPACK_IMPORTED_MODULE_1__event_ShowMainMenuEvent__["a" /* default */].name: return [3, 1];
                            case __WEBPACK_IMPORTED_MODULE_5__event_ShowCreateModuleDialogEvent__["a" /* default */].name: return [3, 3];
                            case __WEBPACK_IMPORTED_MODULE_8__event_ShowCreateEveCmdEvent__["a" /* default */].name: return [3, 5];
                            case __WEBPACK_IMPORTED_MODULE_2__event_CreateAppStep1DialogEvent__["a" /* default */].name: return [3, 7];
                            case __WEBPACK_IMPORTED_MODULE_3__event_CreateAppStep2DialogEvent__["a" /* default */].name: return [3, 9];
                            case __WEBPACK_IMPORTED_MODULE_4__event_CreateAppStep3DialogEvent__["a" /* default */].name: return [3, 11];
                        }
                        return [3, 12];
                    case 1: return [4, this.showMainMenu()];
                    case 2:
                        choice = _f.sent();
                        switch (choice.menu) {
                            case "Create new Module":
                                new __WEBPACK_IMPORTED_MODULE_7__event_CreateModuleEvent__["a" /* default */]().dispatch();
                                break;
                            case "Create Event / Command / Service":
                                new __WEBPACK_IMPORTED_MODULE_9__event_CreateEveCmdEvent__["a" /* default */]().dispatch();
                                break;
                        }
                        return [3, 12];
                    case 3:
                        ev = event;
                        _b = ev;
                        return [4, this.showCreateModule()];
                    case 4:
                        _b.data = _f.sent();
                        ev.callBack();
                        return [3, 12];
                    case 5:
                        ev_1 = event;
                        _c = ev_1;
                        return [4, this.showCreateECSModule()];
                    case 6:
                        _c.data = _f.sent();
                        ev_1.callBack();
                        return [3, 12];
                    case 7:
                        ev_2 = event;
                        _d = ev_2;
                        return [4, this.showAppDialogStep1()];
                    case 8:
                        _d.data = _f.sent();
                        ev_2.callBack();
                        return [3, 12];
                    case 9:
                        ev_3 = event;
                        _e = ev_3;
                        return [4, this.showAppDialogStep2()];
                    case 10:
                        _e.data = _f.sent();
                        ev_3.callBack();
                        return [3, 12];
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
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_a) {
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
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["__awaiter"](this, void 0, void 0, function () {
            var choices, _i, _a, lib;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["__generator"](this, function (_b) {
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
}(__WEBPACK_IMPORTED_MODULE_6__fabalous_core_FabaCoreCommand__["a" /* default */]));
/* harmony default export */ __webpack_exports__["b"] = (UiCommand);
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

/***/ "./src/event/CreateAppEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateAppEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateAppEvent, _super);
    function CreateAppEvent() {
        return _super.call(this, "CreateAppEvent") || this;
    }
    return CreateAppEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateAppEvent);


/***/ }),

/***/ "./src/event/CreateAppStep1DialogEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateAppStep1DialogEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateAppStep1DialogEvent, _super);
    function CreateAppStep1DialogEvent() {
        return _super.call(this, "CreateAppStep1DialogEvent") || this;
    }
    return CreateAppStep1DialogEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateAppStep1DialogEvent);


/***/ }),

/***/ "./src/event/CreateAppStep2DialogEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateAppStep2DialogEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateAppStep2DialogEvent, _super);
    function CreateAppStep2DialogEvent() {
        return _super.call(this, "CreateAppStep2DialogEvent") || this;
    }
    return CreateAppStep2DialogEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateAppStep2DialogEvent);


/***/ }),

/***/ "./src/event/CreateAppStep3DialogEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateAppStep3DialogEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateAppStep3DialogEvent, _super);
    function CreateAppStep3DialogEvent() {
        return _super.call(this, "CreateAppStep3DialogEvent") || this;
    }
    return CreateAppStep3DialogEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateAppStep3DialogEvent);


/***/ }),

/***/ "./src/event/CreateEveCmdEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateEveCmdEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateEveCmdEvent, _super);
    function CreateEveCmdEvent() {
        return _super.call(this, "CreateEveCmdEvent") || this;
    }
    return CreateEveCmdEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateEveCmdEvent);


/***/ }),

/***/ "./src/event/CreateHbsFileEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateHbsFileEventTypes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateHbsFileEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateHbsFileEvent, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["b"] = (CreateHbsFileEvent);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreateModuleEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreateModuleEvent, _super);
    function CreateModuleEvent() {
        return _super.call(this, "CreateModuleEvent") || this;
    }
    return CreateModuleEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreateModuleEvent);


/***/ }),

/***/ "./src/event/CreatePackageJsonEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var CreatePackageJsonEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](CreatePackageJsonEvent, _super);
    function CreatePackageJsonEvent() {
        return _super.call(this, "CreatePackageJsonEvent") || this;
    }
    return CreatePackageJsonEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CreatePackageJsonEvent);


/***/ }),

/***/ "./src/event/GetModulesEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var GetModulesEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GetModulesEvent, _super);
    function GetModulesEvent() {
        return _super.call(this, "GetModulesEvent") || this;
    }
    return GetModulesEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (GetModulesEvent);


/***/ }),

/***/ "./src/event/GetPackageJsonEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var GetPackageJsonEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GetPackageJsonEvent, _super);
    function GetPackageJsonEvent() {
        return _super.call(this, "GetPackageJsonEvent") || this;
    }
    return GetPackageJsonEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (GetPackageJsonEvent);


/***/ }),

/***/ "./src/event/HandleMainMenuEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var HandleMainMenuEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](HandleMainMenuEvent, _super);
    function HandleMainMenuEvent(data) {
        var _this = _super.call(this, "HandleMainMenuEvent") || this;
        _this.data = data;
        return _this;
    }
    return HandleMainMenuEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (HandleMainMenuEvent);


/***/ }),

/***/ "./src/event/InitFabalousEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var InitFabalousEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](InitFabalousEvent, _super);
    function InitFabalousEvent() {
        return _super.call(this, "InitFabalousEvent") || this;
    }
    return InitFabalousEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (InitFabalousEvent);


/***/ }),

/***/ "./src/event/InstallNPMDepsEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var InstallNPMDepsEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](InstallNPMDepsEvent, _super);
    function InstallNPMDepsEvent(yarnExist) {
        var _this = _super.call(this, "InstallNPMDepsEvent") || this;
        _this.yarnExist = yarnExist;
        return _this;
    }
    return InstallNPMDepsEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (InstallNPMDepsEvent);


/***/ }),

/***/ "./src/event/ShowCreateEveCmdEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var ShowCreateEveCmdEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ShowCreateEveCmdEvent, _super);
    function ShowCreateEveCmdEvent() {
        return _super.call(this, "ShowCreateEveCmdEvent") || this;
    }
    return ShowCreateEveCmdEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (ShowCreateEveCmdEvent);


/***/ }),

/***/ "./src/event/ShowCreateModuleDialogEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var ShowCreateModuleDialogEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ShowCreateModuleDialogEvent, _super);
    function ShowCreateModuleDialogEvent() {
        return _super.call(this, "ShowCreateModuleDialogEvent") || this;
    }
    return ShowCreateModuleDialogEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (ShowCreateModuleDialogEvent);


/***/ }),

/***/ "./src/event/ShowMainMenuEvent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ShowMainMenuEventTypes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("tslib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tslib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__ = __webpack_require__("./node_modules/@fabalous/core/FabaEvent.js");


var ShowMainMenuEvent = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ShowMainMenuEvent, _super);
    function ShowMainMenuEvent() {
        return _super.call(this, "ShowMainMenuEvent") || this;
    }
    return ShowMainMenuEvent;
}(__WEBPACK_IMPORTED_MODULE_1__fabalous_core_FabaEvent__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (ShowMainMenuEvent);
var ShowMainMenuEventTypes;
(function (ShowMainMenuEventTypes) {
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["CREATE_MODULE"] = 0] = "CREATE_MODULE";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["CREATE_EVENT"] = 1] = "CREATE_EVENT";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["ADD_RUNTIME"] = 2] = "ADD_RUNTIME";
    ShowMainMenuEventTypes[ShowMainMenuEventTypes["SHOW_HELP"] = 3] = "SHOW_HELP";
})(ShowMainMenuEventTypes || (ShowMainMenuEventTypes = {}));


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/A_CLI.ts");


/***/ }),

/***/ "chalk":
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "child_process":
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "cmdify":
/***/ (function(module, exports) {

module.exports = require("cmdify");

/***/ }),

/***/ "command-exists":
/***/ (function(module, exports) {

module.exports = require("command-exists");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-extra":
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "handlebars":
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),

/***/ "inquirer":
/***/ (function(module, exports) {

module.exports = require("inquirer");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "tslib":
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });