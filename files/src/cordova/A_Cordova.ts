import FabaApiConnection from "@fabalous/runtime-web/transport/FabaApiConnection";
import FabaImmutableStore from "@fabalous/core/FabaImmutableStore";

import Layout from "./common/web/RootLayout";
import Routes from "./common/Routes";
import CordovaStore from "./common/web/CordovaStore";

class A_Cordova extends FabaRuntimeCordova{
    constructor(store:FabaImmutableStore<CordovaStore>){
        let host: string = window.location.host + "/api/";
        super(store ,Routes ,Layout, module);

        this.addServerEndPoint(new FabaApiConnection(window.location.protocol + "//" + host), "api");

    }
}

new A_Cordova(new FabaImmutableStore<CordovaStore>(new CordovaStore()));