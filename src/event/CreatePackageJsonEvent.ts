import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreatePackageJsonEvent extends FabaEvent {
    constructor() {
        super("CreatePackageJsonEvent");
    }
}