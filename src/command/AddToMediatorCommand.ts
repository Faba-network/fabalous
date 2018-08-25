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
import AddToMediatorEvent from "../event/AddToMediatorEvent";

export default class AddToMediatorCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: AddToMediatorEvent) {
        const fs = require('fs-extra');
        console.log(event);

        const baseName = event.data.baseName;
        const upperBaseName = event.data.upperBaseName;

        const moduleName = event.data.moduleName.toLowerCase();
        const upperModuleName = event.data.upperModuleName;

        const filePath = event.data.filePath;
        const runtime = (event.data.runtime) ? event.data.runtime : "";

        const mediatorPath = `${this.data.projectPath}src/${moduleName}/mediator/${upperModuleName}${runtime}Mediator.ts`;

        const imports = [
            `import ${baseName} from "../event/${baseName}";\n`,
            `import ${baseName}Command from "../command/${baseName}Command";\n`
        ];
        const appendimports = imports[0] + imports[1];

        const replaceCommand = `registerCommands():void {`;

        let file:string = fs.readFileSync(mediatorPath, 'utf8');
        file = appendimports + file;
        file = file.replace(replaceCommand, replaceCommand + `\n        this.addCommand(${baseName}, ${baseName}Command);`);
        fs.outputFileSync(mediatorPath, file, "utf8");
    }
}