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

        const moduleName = event.data.moduleName.toLowerCase();
        const upperModuleName = event.data.upperModuleName;

        const filePath = event.data.filePath;
        const runtime = (event.data.runtime) ? event.data.runtime : "";

        let hbsVars = {
            MODULE_EVENT: `${baseName}`,
            MODULE_MEDIATOR: `${upperModuleName}${runtime}Mediator`,
            MODULE_COMMAND: `${baseName}Command`,
            MODULE_SERVICE: `${baseName}Service`,


            BASE_NAME: `${baseName}`,
            UPPER_MODULE_NAME: `${upperModuleName}`,

            RUNTIME_NODE: (runtime == "Node"),
            RUNTIME_WEB: (runtime == "Web"),
            RUNTIME_CORDOVA: (runtime == "Cordova"),
            RUNTIME: `${runtime}`,
            INIT_EVENT: event.init
        };

        switch (event.type) {
            case CreateHbsFileEventTypes.COMMAND:
                if (runtime == "Node") {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/service/${baseName}Service.ts`,
                        this.compileFile(`${filePath}module/service/ModuleService.ts.hbs`, hbsVars),
                        "utf8"
                    );
                } else if (runtime == "Web") {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/command/${baseName}Command.tsx`,
                        this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`, hbsVars),
                        "utf8"
                    );
                } else {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/command/${baseName}${runtime}Command.tsx`,
                        this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`, hbsVars),
                        "utf8"
                    );
                }

                break;
            case CreateHbsFileEventTypes.EVENT:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/event/${baseName}.ts`,
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
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/mediator/${upperModuleName}${runtime}Mediator.ts`,
                    this.compileFile(`${filePath}module/ModuleMediator.ts.hbs`, hbsVars),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.SPEC:
                if (runtime == "Node") {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/service/spec/${baseName}Service.spec.ts`,
                        this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`, hbsVars),
                        "utf8"
                    );
                } else if (runtime == "Web") {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/command/spec/${baseName}Command.spec.ts`,
                        this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`, hbsVars),
                        "utf8"
                    );
                } else {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}.spec.ts`,
                        this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`, hbsVars),
                        "utf8"
                    );
                }


                break;
            case CreateHbsFileEventTypes.STORE:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}Store.ts`,
                    this.compileFile(`${filePath}module/view/Module.tsx.hbs`, hbsVars),
                    "utf8"
                );
                break;

            case CreateHbsFileEventTypes.VIEW:
                if (runtime == "Node") return;

                if (runtime == "Web") {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/view/${upperModuleName}.tsx`,
                        this.compileFile(`${filePath}module/view/Module.tsx.hbs`, hbsVars),
                        "utf8"
                    );
                } else {
                    fs.outputFileSync(
                        `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/view/${upperModuleName}${runtime}.tsx`,
                        this.compileFile(`${filePath}module/view/Module.tsx.hbs`, hbsVars),
                        "utf8"
                    );
                }

                break;
        }
    }

    compileFile(path: string, data: any) {
        try {
            const handlebar = require('handlebars');

            const source = readFileSync(path, "utf8");
            const template = handlebar.compile(source);

            return template(data);
        } catch (e) {
            console.log(e);
        }
    }
}