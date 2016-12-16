import FabaCommand from "@fabalous/core/FabaCommand";
import InitFabalousEvent from "../event/InitFabalousEvent";
import {IStore} from "../FabalousStore";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
import CreateAppEvent from "../event/CreateAppEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import CreateAppDialogEvent from "../event/CreateAppDialogEvent";
import CreateAppStep1DialogEvent from "../event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "../event/CreateAppStep2DialogEvent";

export default class InitFabalousCommand extends FabaCommand<IStore> {
    async execute(event: InitFabalousEvent) {
        // Check i there is a PackageJosn and get it
        await new GetPackageJsonEvent().dispatch();

        if (this.store.data.json){
            // Json is alreadey avaible
            new ShowMainMenuEvent().dispatch();
        } else {
            // Json is missing create new Project
            var step1:CreateAppStep1DialogEvent = await new CreateAppStep1DialogEvent().dispatch();
            var step2:CreateAppStep2DialogEvent = await new CreateAppStep2DialogEvent().dispatch();
            this.store.set("step1Data", step1);
            this.store.set("step2Data", step2);
            new CreateAppEvent().dispatch();
        }
    }
 }