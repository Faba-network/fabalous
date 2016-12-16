import FabaCommand from "@fabalous/core/FabaCommand";
import {IStore} from "../FabalousStore";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";

export default class GetPackageJsonCommand extends FabaCommand<IStore> {
    async execute(event: GetPackageJsonEvent) {
        event.callBack();
    }
}