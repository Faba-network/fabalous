import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateSpecEvent extends FabaEvent {
    constructor() {
        super("CreateSpecEvent");
    }
}