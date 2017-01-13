import {UiCommandMenuTyes} from "./command/UiCommand";
export default class FabalousStore{
    parsedPackage:any;

    // projectpath
    projectPath = "./";

    // PackageJson
    json:any = false;

    // Runtimes
    runtimes:Array<string> = [];

    step1Data:IStep1Data;
    step2Data:IStep2Data;

    modules:Array<string> = [];

    moduleName:string;

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