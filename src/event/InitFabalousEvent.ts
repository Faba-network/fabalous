import FabaEvent from "@fabalous/core/FabaEvent";

export default class InitFabalousEvent extends FabaEvent {
    constructor() {
        super("InitFabalousEvent");
    }
}