import FabaCore from "@fabalous/core/FabaCore";
import FabaStore from "@fabalous/core/FabaStore";
import FabalousStore from "./FabalousStore";
import InitFabalousEvent from "./event/InitFabalousEvent";
import FabalousMediator from "./FabalousMediator";

class A_CLI extends FabaCore{
    constructor(store){
        super(store);
        FabaCore.addMediator(FabalousMediator);
        new InitFabalousEvent().dispatch();
    }
}

const appStore:FabaStore<FabalousStore> = new FabaStore<FabalousStore>(new FabalousStore());
new A_CLI(appStore);

