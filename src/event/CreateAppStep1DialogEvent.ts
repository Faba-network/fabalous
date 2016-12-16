import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateAppStep1DialogEvent extends FabaEvent {
    data:any;
    constructor() {
        super("CreateAppStep1DialogEvent");
    }
}