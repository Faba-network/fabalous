import CreateModuleEvent from "../event/CreateModuleEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class CreateModuleCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateModuleEvent) {
        console.log("create module command");
        var data:ShowCreateModuleDialogEvent = await new ShowCreateModuleDialogEvent().dispatch();

    }
}