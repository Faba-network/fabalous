import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateAppStep2DialogEvent extends FabaEvent {
    data:any;

    constructor() {
        super("CreateAppStep2DialogEvent");
    }
}