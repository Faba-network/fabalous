
import {trace} from "../utils/Logger";
import FabaTransportBase from "./FabaTransportBase";
import FabaWebApplication from "../FabaWebApplication";
import FabaEvent from "../core/FabaEvent";
/**
 * Created by creativecode on 25.12.15.
 */
declare var require;
export default class FabaApiConnection extends FabaTransportBase{
    private url:string;

    constructor(url){
        super();
    }

    private completeHandler(data:any):void {
        var assign = require('object.assign').getPolyfill();

        let jsonString:string = data.target.response;
        var json = JSON.parse(jsonString);

        let currentEvent = new FabaWebApplication.events[json.identifyer];
        trace(currentEvent);
        var h:any = assign(currentEvent, json);

        h.dispatch(null,true);
    }

    public send(event:FabaEvent, timeoutTime:number = 5000, timeOut:boolean = true, compress:boolean = true){
        //trace(event + "dsfsd");

        var nRequest:XMLHttpRequest = new XMLHttpRequest();
        
        nRequest.addEventListener("load", this.completeHandler, false);
        nRequest.open("POST", "http://localhost:3000/api/", true);
        //nRequest.setRequestHeader('Content-Type', 'text/plain');
        nRequest.send(super.prepareEventToSend(event));

        //var sessionId = (CoreModel.instance.user != null) ? CoreModel.instance.user.sessionId : null;

        //if (CoreWebAppModel.instance.mobile == true)
        //compress = false;

        //var nRequest = new SynapseXmlRequest(evnid, this.url, prepareSendData(event, compress), timeOut, sessionId);
        //nRequest.addEventListener(SynapseXmlRequest.LOAD_EVENT, completeHandler);
        //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);
        //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);

        //return nRequest;
    }
}