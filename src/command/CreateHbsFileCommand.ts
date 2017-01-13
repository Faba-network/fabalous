import CreateHbsFileEvent from "../event/CreateHbsFileEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabalousStore from "../FabalousStore";
import {CreateHbsFileEventTypes} from "../event/CreateHbsFileEvent";
import {readFileSync} from "fs";

export default class CreateHbsFileCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateHbsFileEvent) {
        const fs = require('fs-extra');

        const baseName = event.data.baseName;
        const upperBaseName = event.data.upperBaseName;

        const moduleName = event.data.moduleName;
        const upperModuleName = event.data.upperModuleName;

        const filePath = event.data.filePath;
        const runtime = (event.data.runtime) ? event.data.runtime : "";

        let hbsVars = {
            MODULE_EVENT:`${baseName}Event`,
            MODULE_MEDIATOR:`${upperModuleName}${runtime}Mediator`,
            MODULE_COMMAND:`${baseName}${runtime}Command`,

            BASE_NAME:`${baseName}`,
            UPPER_MODULE_NAME:`${upperModuleName}`,

            RUNTIME_NODE:(runtime == "Node"),
            RUNTIME_WEB:(runtime == "Web"),
            RUNTIME_CORDOVA:(runtime == "Cordova"),
            RUNTIME:`${runtime}`
        };

        switch(event.type){
            case CreateHbsFileEventTypes.COMMAND:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/command/${baseName}${runtime}Command.ts`,
                        this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`,hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.EVENT:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/event/${baseName}Event.ts`,
                    this.compileFile(`${filePath}module/event/ModuleEvent.ts.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.INDEX:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/index.ts`,
                    this.compileFile(`${filePath}module/index.ts.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.MEDIATOR:
                console.log(runtime);
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}Mediator.ts`,
                    this.compileFile(`${filePath}module/ModuleMediator.ts.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.SPEC:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/spec/${upperModuleName}${runtime}Spec.ts`,
                    this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.STORE:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}Store.ts`,
                    this.compileFile(`${filePath}module/view/Module.tsx.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.VIEW:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/view/${upperModuleName}${runtime}.tsx`,
                    this.compileFile(`${filePath}module/view/Module.tsx.hbs`, hbsVars),
                    "utf8"
                );

                break;
        }
    }

     compileFile(path:string, data:any){
        try {
            const handlebar = require('handlebars');

            const source = readFileSync(path, "utf8");
            const template = handlebar.compile(source);

            return template(data);
        } catch(e){
            console.log(e);
        }
    }
}