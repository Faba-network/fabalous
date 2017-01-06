import CreatePackageJsonEvent from "../event/CreatePackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {fsync} from "fs";

export default class CreatePackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    fs = require('fs-extra');

    async execute(event: CreatePackageJsonEvent) {
        this.setProjectName(this.data.step1Data.projectName);
        this.setDevDependencies(this.data.step1Data.libs);
        this.createDirs(this.data.step1Data.libs);

        this.copyStarterFiles(this.data.step1Data.libs);

        let fs = require('fs-extra');
        fs.writeJson(`${this.data.testPath}package.json`, this.json, (err) => {
             event.callBack();
        });
    }

    setProjectName(name: string) {
        this.json.name = name;
    }

    setDevDependencies(deps: Array<string>) {
        for (let dep of deps) {
            switch (dep) {
                case "Node (Server)":
                    this.json.devDependencies["@fabalous/runtime-node"] = "*";
                    this.json.scripts["node-watch"] = "gulp runtime-node-watch";
                    this.json.scripts["node-build"] = "gulp runtime-node-build";
                    this.json.fabalous.codeStructure["nodeCommand"] = "${moduleName}/command/node/${fileName}NodeCommand.ts";
                    break;

                case "Web (React)":
                    this.json.devDependencies["@fabalous/runtime-web"] = "*";
                    this.json.scripts["web-watch"] = "gulp runtime-web-watch";
                    this.json.scripts["web-build"] = "gulp runtime-web-build";
                    this.json.fabalous.codeStructure["webCommand"] = "${moduleName}/command/web/${fileName}WebCommand.ts";
                    break;

                case "Specs (Jest)":
                    //this.json.devDependencies["@fabalous/test-jest-enzyme"] = "*";
                    this.json.scripts["test"] = "jest --no-cache --watch";
                    this.json["jest"] = this.jest;
                    break;
            }
        }

    }

    createDirs(deps: Array<string>){
        let fs = require('fs-extra');

        fs.mkdirsSync(`${this.data.testPath}src`);
        fs.mkdirsSync(`${this.data.testPath}src/common`);

        for (let dep of deps) {
            switch (dep) {
                case "Node (Server)":
                    fs.mkdirsSync(`${this.data.testPath}src/common/node`);
                    break;
                case "Web (React)":
                    fs.mkdirsSync(`${this.data.testPath}src/common/web`);
                    break;
            }
        }
    }

    copyStarterFiles(deps: Array<string>){
        let fs = require('fs-extra');


        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/common/Routes.ts`);
        fs.copySync(`./../files/tsconfig.json`,`${this.data.testPath}tsconfig.json`);
        fs.copySync(`./../files/gitignore`,`${this.data.testPath}.gitignore`);
        fs.copySync(`./../files/npmignore`,`${this.data.testPath}.npmignore`);
        fs.copySync(`./../files/gulpfile.js`,`${this.data.testPath}gulpfile.js`);
        for (let dep of deps) {
            switch (dep) {
                case "Node (Server)":
                    fs.copySync(`./../files/src/node/A_Node.ts`,`${this.data.testPath}src/A_Node.ts`);
                    fs.copySync(`./../files/src/node/NodeStore.ts`,`${this.data.testPath}src/common/node/NodeStore.ts`);
                    break;
                case "Web (React)":
                    fs.copySync(`./../files/src/web/A_Web.ts`,`${this.data.testPath}src/A_Web.ts`);
                    fs.copySync(`./../files/src/web/RootLayout.tsx`,`${this.data.testPath}src/common/web/RootLayout.tsx`);
                    fs.copySync(`./../files/src/web/WebStore.ts`,`${this.data.testPath}src/common/web/WebStore.ts`);
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

}