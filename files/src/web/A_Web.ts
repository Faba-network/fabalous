import FabaRuntimeWeb from "@fabalous/runtime-web/FabaRuntimeWeb";
import FabaApiConnection from "@fabalous/runtime-web/transport/FabaApiConnection";
import FabaImmutableStore from "@fabalous/core/FabaImmutableStore";

import Layout from "./common/web/RootLayout";
import Routes from "./common/Routes";
import WebStore from "./common/web/WebStore";

class A_Web extends FabaRuntimeWeb{
    constructor(store:FabaImmutableStore<WebStore>){
        let host: string = window.location.host + "/api/";

        FabaRuntimeWeb.addServerEndPoint(new FabaApiConnection(window.location.protocol + "//" + host), "api");
        super(store ,Routes ,Layout, module);
    }
}

new A_Web(new FabaImmutableStore<WebStore>(new WebStore()));