import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabalousStore from "../FabalousStore";
import CreateEveCmdEvent from "../event/CreateEveCmdEvent";
import ShowCreateEveCmdEvent from "../event/ShowCreateEveCmdEvent";
import {fsync} from "fs";
import {readFileSync} from "fs";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";

export default class CreateEveCmdCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateEveCmdEvent) {
        const fs = require('fs-extra');
        var ev:ShowCreateEveCmdEvent = await new ShowCreateEveCmdEvent().dispatch();

        // Event
        fs.outputFileSync(
            `${this.data.projectPath}src/${ev.data.moduleName}/event/${ev.data.eventBaseName}Event.ts`,
            this.compileFile(`./../files/module/event/ModuleEvent.ts.hbs`),
            "utf8"
        );

        // Command -- Foreach Runtime
        for (let runtime of this.data.runtimes) {
            fs.outputFileSync(
                `${this.data.projectPath}src/${ev.data.moduleName}/${runtime}/command/${ev.data.eventBaseName}${runtime}Command.ts`,
                this.compileFile(`./../files/module/command/ModuleCommand.ts.hbs`),
                "utf8"
            );
        }

        // TDD If avaible
        for (let runtime of this.data.runtimes) {
            fs.outputFileSync(
                `${this.data.projectPath}src/${ev.data.moduleName}/${runtime}/spec/${ev.data.eventBaseName}${runtime}Spec.ts`,
                this.compileFile(`./../files/module/command/ModuleSpec.ts.hbs`),
                "utf8"
            );
        }

        new ShowMainMenuEvent().dispatch();
    }

    private compileFile(path:string){
        const handlebar = require('handlebars');

        const source = readFileSync(`./../files/module/index.ts.hbs`, "utf8");
        const template = handlebar.compile(source);
        const data = { "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

        return template(data);
    }
}