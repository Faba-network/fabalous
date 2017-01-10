import FabaEvent from "@fabalous/core/FabaEvent";

export default class GetModulesEvent extends FabaEvent {
    constructor() {
        super("GetModulesEvent");
    }
}