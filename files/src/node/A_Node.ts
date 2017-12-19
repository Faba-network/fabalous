import FabaNodeRuntime from "@fabalous/runtime-node/FabaRuntimeNode";
import NodeStore from "./common/node/NodeStore";
import FabaStore from "@fabalous/core/store/FabaStore";

class A_Server extends FabaNodeRuntime {
    constructor(data:FabaStore<NodeStore>){
        super(data, 8081);
    }
}

new A_Server(new FabaStore(new NodeStore()));