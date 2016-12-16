import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateEventEvent extends FabaEvent {
    constructor() {
        super("CreateEventEvent");
    }
}