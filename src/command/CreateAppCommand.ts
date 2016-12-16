import FabaCommand from "@fabalous/core/FabaCommand";
import CreateAppEvent from "../event/CreateAppEvent";
import {IStore} from "../FabalousStore";
var chalk = require('chalk');

export default class CreateAppCommand extends FabaCommand<IStore> {
    async execute(event: CreateAppEvent) {
        console.log(chalk.bold(chalk.blue('-')  + ' Create App Structure...'));
        console.log(chalk.bold(chalk.blue('-')  + ' Write Package.json...'));
        console.log(chalk.bold(chalk.blue('-')  + ' Execute NPM install please wait!'));
    }
}