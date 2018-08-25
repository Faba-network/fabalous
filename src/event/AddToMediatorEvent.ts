import FabaEvent from "@fabalous/core/FabaEvent";
import {CreateHbsFileEventData} from "./CreateHbsFileEvent";

export default class AddToMediatorEvent extends FabaEvent {
    constructor(public data:CreateHbsFileEventData) {
        super("AddToMediatorEvent");
    }
}