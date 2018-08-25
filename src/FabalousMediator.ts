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
import GetModulesCommand from "./command/GetModulesCommand";
import GetModulesEvent from "./event/GetModulesEvent";
import CreateHbsFileEvent from "./event/CreateHbsFileEvent";
import CreateHbsFileCommand from "./command/CreateHbsFileCommand";
import AddToMediatorEvent from "./event/AddToMediatorEvent";
import AddToMediatorCommand from "./command/AddToMediatorCommand";

export default class FabalousMediator extends FabaCoreMediator{
    addCommand(event: any, command: typeof FabaCoreCommand): void {
        super.addCommand(event, command);
    }

    registerCommands(): void {
        this.addCommand(AddToMediatorEvent, AddToMediatorCommand as any);
        this.addCommand(InitFabalousEvent, InitFabalousCommand as any);
        this.addCommand(GetPackageJsonEvent, GetPackageJsonCommand as any);
        this.addCommand(CreatePackageJsonEvent, CreatePackageJsonCommand as any);
        this.addCommand(InstallNPMDepsEvent, InstallNPMDepsCommand as any);

        this.addCommand(GetModulesEvent, GetModulesCommand as any);

        this.addCommand(CreateModuleEvent, CreateModuleCommand as any);
        this.addCommand(CreateEveCmdEvent, CreateEveCmdCommand as any);

        this.addCommand(CreateAppEvent, CreateAppCommand as any);
        this.addCommand(CreateAppStep1DialogEvent, UiCommand as any);
        this.addCommand(CreateAppStep2DialogEvent, UiCommand as any);
        this.addCommand(CreateAppStep3DialogEvent, UiCommand as any);
        this.addCommand(ShowMainMenuEvent, UiCommand as any);
        this.addCommand(HandleMainMenuEvent, UiCommand as any);

        this.addCommand(ShowCreateModuleDialogEvent, UiCommand as any);
        this.addCommand(ShowCreateEveCmdEvent, UiCommand as any);

        this.addCommand(CreateHbsFileEvent, CreateHbsFileCommand as any);
    }
}