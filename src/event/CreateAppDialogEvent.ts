import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateAppDialogEvent extends FabaEvent {
    step1Data:any;
    constructor() {
        super("CreateAppDialogEvent");
    }
}