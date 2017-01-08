import {UiCommandMenuTyes} from "./command/UiCommand";
export default class FabalousStore{
    parsedPackage:any;

    testPath = "/users/creativecode/Projekte/fab-test/";

    firstName:string = "firs";
    lastName:string = "sec";

    // PackageJson
    json:any = false;

    // Runtimes
    runtimes:Array<string> = ["web", "node"];


    step1Data:IStep1Data;
    step2Data:IStep2Data;

    mainMenuData:any;

    get fullname():string{
        return `${this.firstName}  ${this.lastName}`;
    }

    constructor(){

    }
}

interface IStep1Data{
    projectName:string;
    libs:Array<UiCommandMenuTyes>;
}

interface IStep2Data{
    externalLibs:Array<Array<string>>;
}