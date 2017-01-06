
import FabaEvent from "@fabalous/core/FabaEvent";

export default class HandleMainMenuEvent extends FabaEvent {
    data:string;
    constructor(data:string) {
        super("HandleMainMenuEvent");
        this.data = data;
    }
}