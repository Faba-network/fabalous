import FabaEvent from "@fabalous/core/FabaEvent";

export default class ShowCreateModuleDialogEvent extends FabaEvent {
    constructor() {
        super("ShowCreateModuleDialogEvent");
    }
}