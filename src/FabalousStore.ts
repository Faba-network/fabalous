export default class FabalousStore{
    parsedPackage:any;

    testPath = "/users/creativecode/Projekte/fab-test/";

    firstName:string = "firs";
    lastName:string = "sec";

    // PackageJson
    json:any = false;

    // Runtimes
    runtimes:Array<string> = ["web", "node"];


    step1Data:any;
    step2Data:any;

    mainMenuData:any;

    get fullname():string{
        return `${this.firstName}  ${this.lastName}`;
    }

    constructor(){

    }
}