import FabaEvent from "./FabaEvent";
import FabaWebApplication from "../FabaWebApplication";

export default class FabaCommand {
    constructor() {
    }

    protected sendToEndpoint(event:FabaEvent, endPoint?:string) {
        FabaWebApplication.sendToEndpoint(event, endPoint)
    }
}
