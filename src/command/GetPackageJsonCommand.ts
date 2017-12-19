import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {readFileSync} from "fs";

export default class GetPackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: GetPackageJsonEvent) {
        let path = require('path');

        try {
            let packJson = readFileSync(`${this.data.projectPath}package.json`, "utf8");
            this.data.json = JSON.parse(packJson);

            console.log(this.data.json);

            if (this.data.json.devDependencies['@fabalous/runtime-node']){
                this.data.runtimes.push("Node");
            }

            if (this.data.json.devDependencies['@fabalous/runtime-web']){
                this.data.runtimes.push("Web");
            }

            if (this.data.json.devDependencies['@fabalous/runtime-cordova']){
                this.data.runtimes.push("Cordova");
            }

        } catch (e){
            this.data.json = false;
        }

        event.callBack();
    }
}