import CreateModuleEvent from "../event/CreateModuleEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import {readFileSync} from "fs";

export default class CreateModuleCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateModuleEvent) {
        var ev:ShowCreateModuleDialogEvent = await new ShowCreateModuleDialogEvent().dispatch();

        let fs = require('fs-extra');
        const filePath = `${__dirname}../../files/`;

        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/index.ts`);

        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/event/Init${ev.data.moduleName}Event.ts`);

        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/web/command/index.ts`);
        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/web/view/index.tsx`);
        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/web/spec/index.tsx`);
        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/web/index.ts`);

        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/node/command/index.ts`);
        fs.copySync(`${filePath}src/Routes.ts`,`${this.data.projectPath}src/${ev.data.moduleName}/node/spec/index.tsx`);

        console.log(`Module ${ev.data.moduleName} created!`);

        new ShowMainMenuEvent().dispatch();
    }

    private compileFile(path:string, data:any){
        const handlebar = require('handlebars');

        const source = readFileSync(path, "utf8");
        const template = handlebar.compile(source);

        return template(data);
    }
}