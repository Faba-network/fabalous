import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateMediatorEvent extends FabaEvent {
    constructor() {
        super("CreateMediatorEvent");
    }
}