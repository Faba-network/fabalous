import FabaEvent from "@fabalous/core/FabaEvent";

export default class GetPackageJsonEvent extends FabaEvent {
    constructor() {
        super("GetPackageJsonEvent");
    }
}