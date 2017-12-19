import CreateModuleEvent from "../event/CreateModuleEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import {readFileSync} from "fs";
import CreateHbsFileEvent from "../event/CreateHbsFileEvent";
import {CreateHbsFileEventTypes} from "../event/CreateHbsFileEvent";

export default class CreateModuleCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateModuleEvent) {
        const ev:ShowCreateModuleDialogEvent = await new ShowCreateModuleDialogEvent().dispatch();
        const fsn = require('fs');

        const filePath = `${__dirname}/../../files/`;
        const modulePath = `${this.data.projectPath}src/${ev.data.moduleName}/`;
        const upperModuleName = `${ev.data.moduleName.substr(0,1).toUpperCase()}${ev.data.moduleName.substr(1)}`;
        const baseName = `Init${upperModuleName}`;

        try{
            fsn.lstatSync(modulePath);
            console.log("Module already exsist");
            new ShowMainMenuEvent().dispatch();
            return;
        } catch(e){
        }

        const templateData = {
            filePath,
            modulePath,
            moduleName:ev.data.moduleName,
            baseName
        };


        new CreateHbsFileEvent(CreateHbsFileEventTypes.EVENT, templateData, true).dispatch();
        new CreateHbsFileEvent(CreateHbsFileEventTypes.INDEX, templateData, true).dispatch();

        for (let runtime of this.data.runtimes) {
            const runtObj = Object.assign({runtime},templateData);

            new CreateHbsFileEvent(CreateHbsFileEventTypes.MEDIATOR, runtObj, true).dispatch();
            new CreateHbsFileEvent(CreateHbsFileEventTypes.COMMAND, runtObj, true).dispatch();
            new CreateHbsFileEvent(CreateHbsFileEventTypes.SPEC, runtObj, true).dispatch();
            if (runtime != "Node"){
                new CreateHbsFileEvent(CreateHbsFileEventTypes.VIEW, runtObj, true).dispatch();
            }
        }

        console.log(`Module ${ev.data.moduleName} created!`);

        new ShowMainMenuEvent().dispatch();
    }

    private compileFile(path:string, data:any){
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