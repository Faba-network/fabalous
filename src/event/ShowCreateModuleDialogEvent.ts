import FabaEvent from "@fabalous/core/FabaEvent";

export default class ShowCreateModuleDialogEvent extends FabaEvent {
    data:any;
    constructor() {
        super("ShowCreateModuleDialogEvent");
    }
}