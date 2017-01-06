import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {realpath} from "fs";
import {readFileSync} from "fs";

export default class GetPackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: GetPackageJsonEvent) {
        let path = require('path');

        try {
            let packJson = readFileSync(`${this.data.testPath}package.json`, "utf8");
            JSON.parse(packJson);
            this.data.json = packJson;
        } catch (e){
            this.data.json = false;
        }

        event.callBack();
    }
}