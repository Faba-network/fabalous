// #!/usr/bin/env node
import FabaCore from "@fabalous/core/FabaCore";
import FabalousStore from "./FabalousStore";
import InitFabalousEvent from "./event/InitFabalousEvent";
import FabalousMediator from "./FabalousMediator";
import FabaStore from "@fabalous/core/store/FabaStore";

declare var process;

class A_CLI extends FabaCore{
    constructor(store){
        console.log("wot")
        process.on('uncaughtException', function(err) {
            throw err;
        });
        super(store);
        FabaCore.addMediator(FabalousMediator);
        new InitFabalousEvent().dispatch();
    }
}

const appStore:FabaStore<FabalousStore> = new FabaStore<FabalousStore>(new FabalousStore());
new A_CLI(appStore);