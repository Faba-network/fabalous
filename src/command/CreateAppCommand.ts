import CreateAppEvent from "../event/CreateAppEvent";
import CreatePackageJsonEvent from "../event/CreatePackageJsonEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import InstallNPMDepsEvent from "../event/InstallNPMDepsEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import CreateAppStep1DialogEvent from "../event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "../event/CreateAppStep2DialogEvent";
import GetPackageJsonEvent from "../event/GetPackageJsonEvent";
const chalk = require('chalk');

export default class CreateAppCommand extends FabaCoreCommand<FabalousStore> {
    fs = require('fs-extra');
    path = require('path');

    async execute(event: CreateAppEvent) {
        const step1:CreateAppStep1DialogEvent = await new CreateAppStep1DialogEvent().dispatch();
        this.data.step1Data = step1.data;

        const step2:CreateAppStep2DialogEvent = await new CreateAppStep2DialogEvent().dispatch();
        this.data.step2Data = step2.data;

        console.log(chalk.bold(chalk.blue('-')  + ' Create App Structure...'));

        try {
            await new CreatePackageJsonEvent().dispatch();    
        } catch (e){
            console.log(e);
        }
        
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

        let yarnExist:boolean = await this.commandExist() as boolean;
        let interval;

        if (!yarnExist){
            interval = setInterval(()=>{
                ui.updateBottomBar(loader[i++ % 4]);
            }, 100);
        }

        await new InstallNPMDepsEvent(yarnExist).dispatch();

        if (!yarnExist) clearInterval(interval);

        console.log();
        ui.updateBottomBar(chalk.bold(chalk.cyan('Installation done!\n')));
        console.log();
        await new GetPackageJsonEvent().dispatch();
        new ShowMainMenuEvent().dispatch();
        event.callBack();
    }

    async commandExist(){
        return new Promise((resolve,reject)=>{
            let commandExists = require('command-exists');
            commandExists('yarn', function(err, commandExists) {
                if (commandExists){
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}