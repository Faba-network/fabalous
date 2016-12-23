export default class FabalousStore{
    readonly parsedPackage:any;

    readonly testPath = "/users/creativecode/Projekte/fab-test/";

    readonly firstName:string = "firs";
    readonly lastName:string = "sec";

    readonly json:any = true;

    readonly step1Data:any;
    readonly step2Data:any;

    readonly mainMenuData:any;

    get fullname():string{
        return `${this.firstName}  ${this.lastName}`;
    }

    constructor(){

    }
}