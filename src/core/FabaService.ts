
import FabaEvent from "./FabaEvent";

export default class FabaSerivce {
    sendToClient(ev:FabaEvent) {
        ev.callBack();
    }
}
