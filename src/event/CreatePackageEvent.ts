import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreatePackageEvent extends FabaEvent {
    constructor() {
        super("CreatePackageEvent");
    }
}