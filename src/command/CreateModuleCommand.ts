import CreateModuleEvent from "../event/CreateModuleEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";

export default class CreateModuleCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateModuleEvent) {
        var ev:ShowCreateModuleDialogEvent = await new ShowCreateModuleDialogEvent().dispatch();

        let fs = require('fs-extra');
        /*
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/mediators/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/event/Init${ev.data.moduleName}Event.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/command/web/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/command/node/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/view/index.tsx`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/spec/index.tsx`);
        */

        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/web/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/event/Init${ev.data.moduleName}Event.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/web/command/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/node/command/index.ts`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/web/view/index.tsx`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/web/spec/index.tsx`);
        fs.copySync(`./../files/src/Routes.ts`,`${this.data.testPath}src/${ev.data.moduleName}/node/spec/index.tsx`);

        console.log(`Module ${ev.data.moduleName} created!`);

        new ShowMainMenuEvent().dispatch();
    }
}