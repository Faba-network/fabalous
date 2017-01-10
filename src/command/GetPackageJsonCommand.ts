import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {readFileSync} from "fs";

export default class GetPackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: GetPackageJsonEvent) {
        let path = require('path');

        try {
            let packJson = readFileSync(`${this.data.projectPath}package.json`, "utf8");
            this.data.json = packJson;
        } catch (e){
            this.data.json = false;
        }

        event.callBack();
    }
}