import FabaMediator from "@fabalous/core/FabaMediator";
import {IFabaMediator} from "@fabalous/core/IFabaMediator";
/**
 * Created by creativecode on 13.12.16.
 */

export default class FabalousMediator extends FabaMediator implements IFabaMediator{

    registerCommands(): void {
        super.registerCommands();
        this.addCommand(require("./event/InitFabalousEvent"), require("./command/InitFabalousCommand"));
        this.addCommand(require("./event/GetPackageJsonEvent"), require("./command/GetPackageJsonCommand"));
        this.addCommand(require("./event/ShowMainMenuEvent"), require("./command/"));
        this.addCommand(require("./event/CreatePackageJsonEvent"), require("./command/CreatePackageJsonCommand"));

        this.addCommand(require("./event/CreateModuleEvent"), require("./command/CreateModuleCommand"));


        this.addCommand(require("./event/CreateAppEvent"), require("./command/CreateAppCommand"));
        this.addCommand(require("./event/CreateAppStep1DialogEvent"), require("./command/UiCommand"));
        this.addCommand(require("./event/CreateAppStep2DialogEvent"), require("./command/UiCommand"));
        this.addCommand(require("./event/CreateAppStep3DialogEvent"), require("./command/UiCommand"));
    }
}