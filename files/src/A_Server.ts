import FabaServer from "fabalous-core/runtimes/FabaServer";
/**
 * Created by joerg on 07.04.2016.
 */

class A_Server extends FabaServer{
    constructor(){
        console.log("Start Server");
        super();
    }
}

new A_Server();