import GetModulesEvent from "../event/GetModulesEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class GetModulesCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: GetModulesEvent) {
        let fs = require('fs');
        let dirContent = fs.readdirSync(`${this.data.projectPath}/src/`);

        this.data.modules = [];

        for (let obj of dirContent) {
            if (obj == "common") break;
            const isDir = (fs.lstatSync(`${this.data.projectPath}/src/${obj}`).nlink > 1);

            if (isDir){
                this.data.modules.push(obj);
            }

        }
    }
}