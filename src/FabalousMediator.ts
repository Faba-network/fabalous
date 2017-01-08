import FabaCoreMediator from "@fabalous/core/FabaCoreMediator";
import InitFabalousEvent from "./event/InitFabalousEvent";
import InitFabalousCommand from "./command/InitFabalousCommand";
import GetPackageJsonEvent from "./event/GetPackageJsonEvent";
import GetPackageJsonCommand from "./command/GetPackageJsonCommand";
import ShowMainMenuEvent from "./event/ShowMainMenuEvent";
import CreatePackageJsonEvent from "./event/CreatePackageJsonEvent";
import CreatePackageJsonCommand from "./command/CreatePackageJsonCommand";
import CreateModuleEvent from "./event/CreateModuleEvent";
import CreateModuleCommand from "./command/CreateModuleCommand";
import CreateAppEvent from "./event/CreateAppEvent";
import CreateAppCommand from "./command/CreateAppCommand";
import CreateAppStep1DialogEvent from "./event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "./event/CreateAppStep2DialogEvent";
import CreateAppStep3DialogEvent from "./event/CreateAppStep3DialogEvent";
import UiCommand from "./command/UiCommand";
import HandleMainMenuEvent from "./event/HandleMainMenuEvent";
import InstallNPMDepsEvent from "./event/InstallNPMDepsEvent";
import InstallNPMDepsCommand from "./command/InstallNPMDepsCommand";
import ShowCreateModuleDialogEvent from "./event/ShowCreateModuleDialogEvent";
import ShowCreateEveCmdEvent from "./event/ShowCreateEveCmdEvent";
import CreateEveCmdEvent from "./event/CreateEveCmdEvent";
import CreateEveCmdCommand from "./command/CreateEveCmdCommand";
import FabaEvent from "@fabalous/core/FabaEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class FabalousMediator extends FabaCoreMediator{
    addCommand(event: any, command: typeof FabaCoreCommand): void {
        super.addCommand(event, command);
    }

    registerCommands(): void {
        this.addCommand(InitFabalousEvent, InitFabalousCommand);
        this.addCommand(GetPackageJsonEvent, GetPackageJsonCommand);
        this.addCommand(CreatePackageJsonEvent, CreatePackageJsonCommand);
        this.addCommand(InstallNPMDepsEvent, InstallNPMDepsCommand);

        this.addCommand(CreateModuleEvent, CreateModuleCommand);
        this.addCommand(CreateEveCmdEvent, CreateEveCmdCommand);

        this.addCommand(CreateAppEvent, CreateAppCommand);
        this.addCommand(CreateAppStep1DialogEvent, UiCommand);
        this.addCommand(CreateAppStep2DialogEvent, UiCommand);
        this.addCommand(CreateAppStep3DialogEvent, UiCommand);
        this.addCommand(ShowMainMenuEvent, UiCommand);
        this.addCommand(HandleMainMenuEvent, UiCommand);

        this.addCommand(ShowCreateModuleDialogEvent, UiCommand);
        this.addCommand(ShowCreateEveCmdEvent, UiCommand);
    }
}