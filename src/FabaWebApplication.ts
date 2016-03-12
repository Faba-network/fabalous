import FabaCore from "./core/FabaCore";
import FabaTransportBase from "./transport/FabaTransportBase";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

//import FabaCore from "./core/FabaCore";
//import FabaTransportBase from "./transport/FabaTransportBase";
//import FabaEvent from "./core/FabaEvent";


export default class FabaWebApplication extends FabaCore {
    static servers:Array<any> = [];
    test:string = "asdasd";

    constructor(){
        super();
        this.test = "super";

    }

    static addServerEndPoint(conn:FabaTransportBase, name:string){
        this.servers.push({name:name, conn:conn});
    }

    static sendToEndpoint(event:any, identifyer:string){
        if (this.servers.length == 0){
            throw new Error("NO ENDPOINT DEFINED");
        }

        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }
}