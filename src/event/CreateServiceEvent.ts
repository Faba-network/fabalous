import FabaEvent from "@fabalous/core/FabaEvent";

export default class CreateServiceEvent extends FabaEvent {
    constructor() {
        super("CreateServiceEvent");
    }
}