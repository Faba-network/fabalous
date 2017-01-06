import FabaStore from "@fabalous/core/FabaStore";
import FabaNodeRuntime from "@fabalous/runtime-node/FabaNodeRuntime";
import NodeStore from "./common/node/NodeStore";

class A_Server extends FabaNodeRuntime {
    constructor(data:FabaStore<NodeStore>){
        super(data);
    }
}

new A_Server(new FabaStore(new NodeStore()));