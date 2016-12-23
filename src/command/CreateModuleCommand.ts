import FabaCommand from "@fabalous/core/FabaCommand";
import CreateModuleEvent from "../event/CreateModuleEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";

export default class CreateModuleCommand extends FabaCommand<FabalousStore> {
    async execute(event: CreateModuleEvent) {
        console.log("create module command");
        var data:ShowCreateModuleDialogEvent = await new ShowCreateModuleDialogEvent().dispatch();

    }
}