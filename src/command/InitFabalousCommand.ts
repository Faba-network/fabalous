import InitFabalousEvent from "../event/InitFabalousEvent";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import CreateAppEvent from "../event/CreateAppEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import FabalousStore from "../FabalousStore";
import {ShowMainMenuEventTypes} from "../event/ShowMainMenuEvent";
import CreateModuleEvent from "../event/CreateModuleEvent";
import CreateEventEvent from "../event/CreateEventEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import {readFileSync} from "fs";
import GetModulesEvent from "../event/GetModulesEvent";

export default class InitFabalousCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: InitFabalousEvent) {
        // Check i there is a PackageJson and get it
        await new GetPackageJsonEvent().dispatch();
        if (this.data.json){
            // Json is alreadey avaible

            let modules = await new GetModulesEvent().dispatch();
            console.log(modules);

            let mainMenu:ShowMainMenuEvent = await new ShowMainMenuEvent().dispatch();
            switch (mainMenu.data){
                case ShowMainMenuEventTypes.CREATE_MODULE:
                    new CreateModuleEvent().dispatch();
                    break;
                case ShowMainMenuEventTypes.CREATE_EVENT:
                    new CreateEventEvent().dispatch();
                    break;
                case ShowMainMenuEventTypes.ADD_RUNTIME:
                    break;
                case ShowMainMenuEventTypes.SHOW_HELP:
                    break;
            }
        } else {
            // Json is missing create new Project
            new CreateAppEvent().dispatch();
        }
    }
 }