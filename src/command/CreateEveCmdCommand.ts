import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabalousStore from "../FabalousStore";
import CreateEveCmdEvent from "../event/CreateEveCmdEvent";
import ShowCreateEveCmdEvent from "../event/ShowCreateEveCmdEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import GetModulesEvent from "../event/GetModulesEvent";
import CreateHbsFileEvent, {CreateHbsFileEventTypes} from "../event/CreateHbsFileEvent";
const chalk = require('chalk');

export default class CreateEveCmdCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateEveCmdEvent) {
        const fs = require('fs-extra');
        await new GetModulesEvent().dispatch();

        if (this.data.modules.length == 0){
            console.log(chalk.bold(chalk.red('NO MODULES AVAILABLE')));
            new ShowMainMenuEvent().dispatch();

            return;
        }

        const ev:ShowCreateEveCmdEvent = await new ShowCreateEveCmdEvent().dispatch();
        const filePath = `${__dirname}/../../files/`;
        const modulePath = `${this.data.projectPath}src/${ev.data.moduleName}/`;

        const templateData = {
            filePath,
            modulePath,
            moduleName:ev.data.moduleName,
            baseName:ev.data.eventBaseName
        };

        new CreateHbsFileEvent(CreateHbsFileEventTypes.EVENT, templateData, false).dispatch();

        // Command -- Foreach Runtime
        for (let runtime of this.data.runtimes) {
            const runtObj = Object.assign({runtime},templateData);

            new CreateHbsFileEvent(CreateHbsFileEventTypes.COMMAND, runtObj, false).dispatch();
            new CreateHbsFileEvent(CreateHbsFileEventTypes.SPEC, runtObj, false).dispatch();
        }

        new ShowMainMenuEvent().dispatch();
    }
}