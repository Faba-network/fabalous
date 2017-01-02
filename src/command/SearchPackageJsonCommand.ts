import SearchPackageJson from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class SearchPackageJsonCommand extends FabaCoreCommand<FabalousStore> {
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