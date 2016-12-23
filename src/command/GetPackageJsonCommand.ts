import FabaCommand from "@fabalous/core/FabaCommand";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import FabalousStore from "../FabalousStore";

export default class GetPackageJsonCommand extends FabaCommand<FabalousStore> {
    async execute(event: GetPackageJsonEvent) {
        event.callBack();
    }
}