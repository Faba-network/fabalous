import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateEveCmdEvent extends FabaEvent {
    constructor() {
        super("CreateEveCmdEvent");
    }
}