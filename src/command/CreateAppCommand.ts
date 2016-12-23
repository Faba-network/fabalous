import FabaCommand from "@fabalous/core/FabaCommand";
import CreateAppEvent from "../event/CreateAppEvent";
import CreatePackageJsonEvent from "../event/CreatePackageJsonEvent";
import FabalousStore from "../FabalousStore";
import InstallNPMDepsEvent from "../event/InstallNPMDepsEvent";
const chalk = require('chalk');


export default class CreateAppCommand extends FabaCommand<FabalousStore> {
    fs = require('fs-extra');
    path = require('path');

    perc = 0;

    async execute(event: CreateAppEvent) {
        console.log(chalk.bold(chalk.blue('-')  + ' Create App Structure...'));
        this.fs.removeSync(this.data.testPath);
        this.fs.mkdirsSync(this.data.testPath);

        await new CreatePackageJsonEvent().dispatch();
        console.log(chalk.bold(chalk.blue('-')  + ' Execute NPM install please wait!'));

        const inquirer = require("inquirer");
        const loader = [
            '/ ' + chalk.bold(`Installing`),
            '| ' + chalk.bold(`Installing` ),
            '\\ ' + chalk.bold(`Installing`),
            '- ' + chalk.bold(`Installing`)
        ];
        let i = 4;
        const ui = new inquirer.ui.BottomBar({bottomBar: loader[i % 4]});
        const interval = setInterval(()=>{
            ui.updateBottomBar(loader[i++ % 4]);
        }, 100);

       // await new InstallNPMDepsEvent().dispatch();

        clearInterval(interval);
        ui.updateBottomBar(chalk.bold(chalk.cyan('Installation done!\n')));
    }
}