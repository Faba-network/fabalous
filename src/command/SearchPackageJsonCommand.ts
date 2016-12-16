import FabaCommand from "@fabalous/core/FabaCommand";
import SearchPackageJson from "../event/GetPackageJsonEvent";
import {IStore} from "../FabalousStore";

export default class SearchPackageJsonCommand extends FabaCommand<IStore> {
    async execute(event: SearchPackageJson) {

    }

    async esult(event: SearchPackageJson) {

    }

    timeout(event: SearchPackageJson) {
        console.log("Command timeout");
    }

    error(event: SearchPackageJson) {
        console.log("Command error");
    }

    offline(event: SearchPackageJson) {
        console.log("Command offline");
    }
}