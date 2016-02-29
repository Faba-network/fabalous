/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import {IFabaMediator} from "./IFabaMediator";
import FabaWebApplication from "../FabaWebApplication";

export default class FabaMediator implements IFabaMediator {
    cmdList = new Array<Object>();

    constructor() {
        // @ifdef CLIENT
        this.registerCommands();
        // @endif

        // @ifdef SERVER
        this.registerServices();
        // @endif
    }

    addCommand(eventName, command) {
        this.cmdList.push({event: eventName, cmd: command});
        FabaWebApplication.events[eventName.name] = eventName;
    }

    updateCommand(eventName, command) {
        this.cmdList = this.cmdList.map((md:any) => {
            if (md){
                if (md.event != eventName) return md;
            }
        });

        console.log(this.cmdList);

        this.cmdList.push({event: eventName, cmd: command});
        FabaWebApplication.events[eventName.name] = eventName;
    }

    addSerivce(eventName, command) {
        this.cmdList.push({event: eventName, cmd: command});
        FabaWebApplication.events[eventName.name] = eventName;
    }



    registerCommands() {

    }

    registerServices() {

    }
}
