import FabaEvent from "@fabalous/core/FabaEvent";

export interface CreateHbsFileEventData {
    filePath:string;
    modulePath:string;
    upperModuleName:string;
    moduleName:string;
    runtime?:string;
}

export default class CreateHbsFileEvent extends FabaEvent {
    type:CreateHbsFileEventTypes;
    data:CreateHbsFileEventData;

    constructor(type:CreateHbsFileEventTypes, data:CreateHbsFileEventData) {
        super("CreateHbsFileEvent");

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