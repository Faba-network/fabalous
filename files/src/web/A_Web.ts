import FabaRuntimeWeb from "@fabalous/runtime-web/FabaRuntimeWeb";
import FabaApiConnection from "@fabalous/runtime-web/transport/FabaApiConnection";
import FabaImStore from "@fabalous/core/store/FabaImStore";

import Layout from "./common/web/RootLayout";
import Routes from "./common/Routes";
import WebStore from "./common/web/WebStore";

class A_Web extends FabaRuntimeWeb{
    constructor(store:FabaImStore<WebStore>){
        let host: string = window.location.host + "/api/";

        FabaRuntimeWeb.addServerEndPoint(new FabaApiConnection(window.location.protocol + "//" + host), "api");
        super(store as any ,Routes ,Layout, module);
    }
}

new A_Web(new FabaImStore<WebStore>(new WebStore()));