import FabaStore from "@fabalous/core/FabaStore";
export default class FabalousStore{
    readonly parsedPackage:any;

    readonly firstName:string = "firs";
    readonly lastName:string = "sec";

    readonly json:any;

    readonly step1Data:any;
    readonly step2Data:any;

    get fullname():string{
        return `${this.firstName}  ${this.lastName}`;
    }
    constructor(){

    }
}

export interface IStore extends FabaStore<FabalousStore>{}
