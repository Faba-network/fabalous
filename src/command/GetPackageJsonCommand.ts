import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class GetPackageJsonCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: GetPackageJsonEvent) {
        event.callBack();
    }
}