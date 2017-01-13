import FabaEvent from "@fabalous/core/FabaEvent";

export interface CreateHbsFileEventData {
    filePath:string;
    modulePath:string;
    moduleName:string;

    upperModuleName?:string;
    baseName?:string;
    upperBaseName?:string;
    runtime?:string;
}

export default class CreateHbsFileEvent extends FabaEvent {
    type:CreateHbsFileEventTypes;
    data:CreateHbsFileEventData;

    constructor(type:CreateHbsFileEventTypes, data:CreateHbsFileEventData) {
        super("CreateHbsFileEvent");
        if (data) data.upperModuleName = `${data.moduleName.substr(0,1).toUpperCase()}${data.moduleName.substr(1)}`;

        this.type = type;
        this.data = data;
    }
}

export enum CreateHbsFileEventTypes{
    COMMAND,
    EVENT,
    SPEC,
    VIEW,
    INDEX,
    MEDIATOR,
    STORE
}