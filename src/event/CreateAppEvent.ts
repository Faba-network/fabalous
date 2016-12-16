import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateAppEvent extends FabaEvent {
    constructor() {
        super("CreateAppEvent");
    }
}