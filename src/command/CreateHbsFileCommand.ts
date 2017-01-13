import CreateHbsFileEvent from "../event/CreateHbsFileEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabalousStore from "../FabalousStore";
import {CreateHbsFileEventTypes} from "../event/CreateHbsFileEvent";
import {readFileSync} from "fs";

export default class CreateHbsFileCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateHbsFileEvent) {
        const fs = require('fs-extra');

        const moduleName = event.data.moduleName;
        const upperModuleName = event.data.upperModuleName;
        const filePath = event.data.filePath;
        const runtime = "";

        switch(event.type){
            case CreateHbsFileEventTypes.COMMAND:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/command/Init${upperModuleName}${runtime}Command.ts`,
                        this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`,{
                            MODULE_EVENT:`/event/Init${upperModuleName}Event`,
                            MODULE_COMMAND:`/event/Init${upperModuleName}Command`,
                            RUNTIME:`${runtime}`
                        }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.EVENT:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/event/Init${upperModuleName}Event.ts`,
                    this.compileFile(`${filePath}module/command/ModuleCommand.ts.hbs`,{
                        MODULE_EVENT:`/event/Init${upperModuleName}Event`
                    }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.INDEX:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/index.ts`,
                    this.compileFile(`${filePath}module/index.ts.hbs`,{
                        MODULE_MEDIATOR_NODE:`./node/${upperModuleName}NodeMediator`,
                        MODULE_MEDIATOR_WEB:`./web/${upperModuleName}WebMediator`,
                        MODULE_MEDIATOR_CORDOVA:`./cordova/${upperModuleName}CordovaMediator`,
                        MODULE_EVENT:`/event/Init${upperModuleName}Event`
                    }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.MEDIATOR:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}Mediator.ts`,
                    this.compileFile(`${filePath}module/ModuleMediator.ts.hbs`,{
                        MODULE_MEDIATOR:`/event/${upperModuleName}Mediator`,
                        MODULE_EVENT:`/event/Init${upperModuleName}Event`,
                        MODULE_COMMAND:`/event/Init${upperModuleName}Command`,
                        RUNTIME_NODE:false,
                        RUNTIME_WEB:false,
                        RUNTIME:`${runtime}`
                    }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.SPEC:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/spec/${upperModuleName}${runtime}Spec.ts`,
                    this.compileFile(`${filePath}module/spec/ModuleSpec.tsx.hbs`,{
                        SPEC_NAME:``
                    }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.STORE:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/${upperModuleName}${runtime}Store.ts`,
                    this.compileFile(`${filePath}module/view/Module.tsx.hbs`,{
                        VIEW_NAME:`${upperModuleName}${runtime}`
                    }),
                    "utf8"
                );
                break;
            case CreateHbsFileEventTypes.VIEW:
                fs.outputFileSync(
                    `${this.data.projectPath}src/${moduleName}/${runtime.toLocaleLowerCase()}/view/${upperModuleName}${runtime}.ts`,
                    this.compileFile(`${filePath}module/view/Module.tsx.hbs`,{
                        VIEW_NAME:`${upperModuleName}${runtime}`
                    }),
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