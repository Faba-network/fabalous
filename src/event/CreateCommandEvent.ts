import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateCommandEvent extends FabaEvent {
    constructor() {
        super("CreateCommandEvent");
    }
}