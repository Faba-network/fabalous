import CreatePackageJsonEvent from "../event/CreatePackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {fsync} from "fs";
import {UiCommandMenuTyes} from "./UiCommand";
import {readFileSync} from "fs";

export default class CreatePackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    fs = require('fs-extra');
    filePath;

    async execute(event: CreatePackageJsonEvent) {
        let path = require("path");
        let absolutePath = path.resolve("./");
        let dirString = path.dirname(this.fs.realpathSync("./"));

        console.log(process.cwd());
        console.log(dirString);
        console.log(require('path').basename(__dirname));
        //console.log(process.chdir());
        console.log(absolutePath);

        this.filePath = `${__dirname}/./../files/`;
        console.log(__dirname);
        console.log(this.filePath);

        this.setProjectName(this.data.step1Data.projectName);
        this.setDevDependencies(this.data.step1Data.libs);
        this.createDirs(this.data.step1Data.libs);

        this.copyStarterFiles(this.data.step1Data.libs);

        let fs = require('fs-extra');
        fs.writeJson(`${this.data.projectPath}package.json`, this.json, (err) => {
            event.callBack();
        });
    }

    setProjectName(name: string) {
        this.json.name = name;
    }

    setDevDependencies(deps: Array<UiCommandMenuTyes>) {
        for (let dep of deps) {
            switch (dep) {
                case UiCommandMenuTyes.RUNTIMES_NODE:
                    this.json.devDependencies["@fabalous/runtime-node"] = "*";
                    this.json.scripts["node-watch"] = "gulp runtime-node-watch";
                    this.json.scripts["node-build"] = "gulp runtime-node-build";
                    this.json.fabalous.codeStructure["nodeCommand"] = "${moduleName}/command/node/${fileName}NodeCommand.ts";
                    break;

                case UiCommandMenuTyes.RUNTIMES_WEB:
                    this.json.devDependencies["@fabalous/runtime-web"] = "*";
                    this.json.scripts["web-watch"] = "gulp runtime-web-watch";
                    this.json.scripts["web-build"] = "gulp runtime-web-build";
                    this.json.fabalous.codeStructure["webCommand"] = "${moduleName}/command/web/${fileName}WebCommand.ts";
                    break;

                case UiCommandMenuTyes.RUNTIMES_APP:
                    this.json.devDependencies["@fabalous/runtime-cordova"] = "*";
                    this.json.fabalous.codeStructure["cordovaCommand"] = "${moduleName}/command/web/${fileName}CordovaCommand.ts";
                    break;

                case UiCommandMenuTyes.TEST_JEST:
                    this.json.devDependencies["@fabalous/test-jest"] = "*";
                    this.json.scripts["test"] = "jest --no-cache --watch";
                    this.json["jest"] = this.jest;
                    break;
            }
        }

        for (let externalDep of this.data.step2Data.externalLibs) {
            for (let externalDepSingle of externalDep) {
                this.json.devDependencies[externalDepSingle] = "*"
            }
        }

        this.json.devDependencies["tslib"] = "*";

    }

    createDirs(deps: Array<UiCommandMenuTyes>) {
        let fs = require('fs-extra');

        fs.mkdirsSync(`${this.data.projectPath}src`);
        fs.mkdirsSync(`${this.data.projectPath}src/common`);

        for (let dep of deps) {
            switch (dep) {
                case UiCommandMenuTyes.RUNTIMES_NODE:
                    fs.mkdirsSync(`${this.data.projectPath}src/common/node`);
                    break;
                case UiCommandMenuTyes.RUNTIMES_WEB:
                    fs.mkdirsSync(`${this.data.projectPath}src/common/web`);
                    break;
                case UiCommandMenuTyes.RUNTIMES_APP:
                    fs.mkdirsSync(`${this.data.projectPath}src/common/cordova`);
                    break;
            }
        }
    }

    copyStarterFiles(deps: Array<UiCommandMenuTyes>) {
        let fs = require('fs-extra');

        fs.copySync(`${this.filePath}/src/Routes.ts`, `${this.data.projectPath}src/common/Routes.ts`);
        fs.copySync(`${this.filePath}/tsconfig.json`, `${this.data.projectPath}tsconfig.json`);
        fs.copySync(`${this.filePath}/gitignore`, `${this.data.projectPath}.gitignore`);
        fs.copySync(`${this.filePath}/npmignore`, `${this.data.projectPath}.npmignore`);

        fs.outputFileSync(`${this.data.projectPath}gulpfile.js`, this.compileGulpFile(), "utf8");

        for (let dep of deps) {
            switch (dep) {
                case UiCommandMenuTyes.RUNTIMES_NODE:
                    fs.copySync(`${this.filePath}/src/node/A_Node.ts`, `${this.data.projectPath}src/A_Node.ts`);
                    fs.copySync(`${this.filePath}/src/node/NodeStore.ts`, `${this.data.projectPath}src/common/node/NodeStore.ts`);
                    break;
                case UiCommandMenuTyes.RUNTIMES_WEB:
                    fs.copySync(`${this.filePath}/src/web/index.ejs`, `${this.data.projectPath}src/common/web/index.ejs`);
                    fs.copySync(`${this.filePath}/src/web/A_Web.ts`, `${this.data.projectPath}src/A_Web.ts`);
                    fs.copySync(`${this.filePath}/src/web/RootLayout.tsx`, `${this.data.projectPath}src/common/web/RootLayout.tsx`);
                    fs.copySync(`${this.filePath}/src/web/WebStore.ts`, `${this.data.projectPath}src/common/web/WebStore.ts`);
                    break;
                case UiCommandMenuTyes.RUNTIMES_APP:
                    fs.copySync(`${this.filePath}/src/cordova/index.ejs`, `${this.data.projectPath}src/common/cordova/index.ejs`);
                    fs.copySync(`${this.filePath}/src/cordova/A_Cordova.ts`, `${this.data.projectPath}src/A_Cordova.ts`);
                    fs.copySync(`${this.filePath}/src/cordova/CordovaStore.ts`, `${this.data.projectPath}src/common/cordova/CordovaStore.ts`);
                    break;
            }
        }
    }

    json = {
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

    jest = {
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
    }


    private compileGulpFile() {
        let data: any = {};
        for (let obj of this.data.step1Data.libs) {
            switch (obj) {
                case UiCommandMenuTyes.RUNTIMES_WEB:
                    data.web = true;
                    break;
                case UiCommandMenuTyes.RUNTIMES_APP:
                    data.cordova = true;
                    break;
                case UiCommandMenuTyes.RUNTIMES_NODE:
                    data.node = true;
                    break;
            }
        }

        return this.compileFile(`${this.filePath}gulpfile.js.hbs`, data);
    }

    private compileFile(path: string, data: any): string {
        const handlebar = require('handlebars');

        const source = readFileSync(path, "utf8");
        const template = handlebar.compile(source);
        return template(data);
    }
}