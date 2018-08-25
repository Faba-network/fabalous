import FabaRuntimeWeb from "@fabalous/runtime-web/FabaRuntimeWeb";
import FabaApiConnection from "@fabalous/runtime-web/transport/FabaApiConnection";
import FabaImmutableStore from "@fabalous/core/store/FabaImmutableStore";
import WebLayout from "./common/web/WebLayout";
import Routes from "./Routes";
import AppState from "./AppState";

class AppWeb extends FabaRuntimeWeb{
    constructor(store:FabaImmutableStore<AppState>){
        let host: string = window.location.host + "/api/";

        FabaRuntimeWeb.addServerEndPoint(new FabaApiConnection(window.location.protocol + "//" + host), "api");
        super(store as any ,Routes ,WebLayout, module);
    }
}

new AppWeb(new FabaImmutableStore<AppState>(new AppState()));