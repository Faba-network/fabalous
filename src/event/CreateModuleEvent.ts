import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateModuleEvent extends FabaEvent {
    constructor() {
        super("CreateModuleEvent");
    }
}