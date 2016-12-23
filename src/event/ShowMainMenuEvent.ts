import FabaEvent from "@fabalous/core/FabaEvent";

export default class ShowMainMenuEvent extends FabaEvent {

    data:ShowMainMenuEventTypes;

    constructor() {
        super("ShowMainMenuEvent");
    }
}

export enum ShowMainMenuEventTypes{
    CREATE_MODULE,
    CREATE_EVENT,
    ADD_RUNTIME,
    SHOW_HELP
}