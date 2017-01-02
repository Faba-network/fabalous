import CreatePackageJsonEvent from "../event/CreatePackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class CreatePackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    fs = require('fs-extra');

    async execute(event: CreatePackageJsonEvent) {
        let fs = require('fs-extra');
        fs.writeJson(`${this.data.testPath}package.json`, this.json, (err) => {
            event.callBack();
        });
    }

    json = {
        "name": "lingua",
        "version": "0.0.2",
        "scripts": {
            "db": "rethinkdb --http-port 8090",
            "frw": "gulp frontend-watch",
            "baw": "gulp backend-watch",
            "test": "jest --no-cache",
            "tdd": "gulp tdd",
            "coverage": "jest --no-cache --coverage",
            "build": "BABEL_ENV=production NODE_ENV=production gulp build"
        },
        "dependencies": {
            "enzyme": "^2.4.1",
            "express": "^4.14.0",
            "rethinkdb": "^2.3.3",
            "tslib": "^1.2.0",
            "typescript": "^2.1.4"
        },
        "devDependencies": {
            "@fabalous/core": "*",
            "@fabalous/runtime-web": "*",
            "@fabalous/test-karma": "*",
            "awesome-typescript-loader": "^3.0.0-beta.11",
            "babel-preset-react-optimize": "^1.0.1",
            "jest": "^17.0.3",
            "jest-cli": "^17.0.3",
            "material-ui": "^0.16.5",
            "react-addons-css-transition-group": "^15.4.1",
            "react-addons-perf": "^15.4.1",
            "react-addons-shallow-compare": "^15.4.0",
            "react-hot-loader": "^3.0.0-beta.6",
            "react-pull-to-refresh": "^1.0.6",
            "react-responsive": "^1.2.1",
            "react-responsive-carousel": "^3.0.21",
            "react-swipeable-views": "^0.7.11",
            "react-tap-event-plugin": "^2.0.1",
            "ts-jest": "^17.0.3",
            "typestyle": "^0.14.3"
        },
        "fabalous": {
            "codeStructure": {
                "command": "${moduleName}/command/${fileName}Command.ts",
                "event": "${moduleName}/event/${fileName}Event.ts",
                "service": "${moduleName}/service/${fileName}Service.ts",
                "mediator": "${moduleName}/${fileName}Mediator.ts"
            }
        },
        "jest": {
            "globals": {
                "__TS_CONFIG__": "tsconfig_jest.json",
                "CLIENT": true,
                "SERVER": false,
                "TEST": true
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

}