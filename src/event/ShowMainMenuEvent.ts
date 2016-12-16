import FabaEvent from "@fabalous/core/FabaEvent";

export default class ShowMainMenuEvent extends FabaEvent {
    constructor() {
        super("ShowMainMenuEvent");
    }
}