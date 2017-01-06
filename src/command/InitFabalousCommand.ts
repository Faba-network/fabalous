import InitFabalousEvent from "../event/InitFabalousEvent";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import CreateAppEvent from "../event/CreateAppEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import CreateAppStep1DialogEvent from "../event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "../event/CreateAppStep2DialogEvent";
import FabalousStore from "../FabalousStore";
import {ShowMainMenuEventTypes} from "../event/ShowMainMenuEvent";
import CreateModuleEvent from "../event/CreateModuleEvent";
import CreateEventEvent from "../event/CreateEventEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class InitFabalousCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: InitFabalousEvent) {
        // Check i there is a PackageJson and get it
        await new GetPackageJsonEvent().dispatch();
        if (this.data.json){
            // Json is alreadey avaible
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
            var step1:CreateAppStep1DialogEvent = await new CreateAppStep1DialogEvent().dispatch();
            var step2:CreateAppStep2DialogEvent = await new CreateAppStep2DialogEvent().dispatch();
            this.data.step1Data = step1.data;
            this.data.step2Data = step2.data;
            new CreateAppEvent().dispatch();
        }
    }
 }