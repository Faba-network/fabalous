import FabaEvent from "@fabalous/core/FabaEvent";

export default class ShowCreateEveCmdEvent extends FabaEvent {
    data:any;
    constructor() {
        super("ShowCreateEveCmdEvent");
    }
}