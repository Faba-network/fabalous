export default class FabalousStore{
    parsedPackage:any;

    testPath = "/users/creativecode/Projekte/fab-test/";

    firstName:string = "firs";
    lastName:string = "sec";

    json:any = false;

    step1Data:any;
    step2Data:any;

    mainMenuData:any;

    get fullname():string{
        return `${this.firstName}  ${this.lastName}`;
    }

    constructor(){

    }
}