import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateAppStep3DialogEvent extends FabaEvent {
    data:any;

    constructor() {
        super("CreateAppStep3DialogEvent");
    }
}