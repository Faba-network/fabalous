import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabalousStore from "../FabalousStore";
import CreateEveCmdEvent from "../event/CreateEveCmdEvent";
import ShowCreateEveCmdEvent from "../event/ShowCreateEveCmdEvent";
import {fsync} from "fs";
import {readFileSync} from "fs";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import GetModulesEvent from "../event/GetModulesEvent";

export default class CreateEveCmdCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateEveCmdEvent) {
        const fs = require('fs-extra');
        await new GetModulesEvent().dispatch();

        const ev:ShowCreateEveCmdEvent = await new ShowCreateEveCmdEvent().dispatch();
        const filePath = `${__dirname}/../../files/`;
        // Event
        fs.outputFileSync(
            `${this.data.projectPath}src/${ev.data.moduleName}/event/${ev.data.eventBaseName}Event.ts`,
            this.compileFile(`${filePath}module/event/ModuleEvent.ts.hbs`),
            "utf8"
        );

        // Command -- Foreach Runtime
        for (let runtime of this.data.runtimes) {
            fs.outputFileSync(
                `${this.data.projectPath}src/${ev.data.moduleName}/${runtime.toLocaleLowerCase()}/command/${ev.data.eventBaseName}${runtime}Command.ts`,
                this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`),
                "utf8"
            );
        }

        // TDD If avaible
        for (let runtime of this.data.runtimes) {
            fs.outputFileSync(
                `${this.data.projectPath}src/${ev.data.moduleName}/${runtime.toLocaleLowerCase()}/spec/${ev.data.eventBaseName}${runtime}Spec.ts`,
                this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`),
                "utf8"
            );
        }

        new ShowMainMenuEvent().dispatch();
    }

    private compileFile(path:string){
        const handlebar = require('handlebars');

        const source = readFileSync(`${path}`, "utf8");
        const template = handlebar.compile(source);
        const data = { "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

        return template(data);
    }
}