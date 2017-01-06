import FabaEvent from "@fabalous/core/FabaEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import CreateAppStep1DialogEvent from "../event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "../event/CreateAppStep2DialogEvent";
import CreateAppStep3DialogEvent from "../event/CreateAppStep3DialogEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import CreateModuleEvent from "../event/CreateModuleEvent";
import ShowCreateEveCmdEvent from "../event/ShowCreateEveCmdEvent";
import CreateEveCmdEvent from "../event/CreateEveCmdEvent";

const chalk = require('chalk');
export default class UiCommand extends FabaCoreCommand<FabalousStore> {
    inquirer = require("inquirer");
    async execute(event: FabaEvent) {
        switch (event.name) {
            case ShowMainMenuEvent.name:
                let choice = await this.showMainMenu();
                console.log(choice);
                switch(choice.menu){
                    case `Create new Module`:
                        new CreateModuleEvent().dispatch();
                    case `Create Event / Command / Service`:
                        new CreateEveCmdEvent().dispatch();
                    break;
                }
                break;

            case ShowCreateModuleDialogEvent.name:
                let ev: ShowCreateModuleDialogEvent = event as ShowCreateModuleDialogEvent;
                ev.data = await this.showCreateModule();
                ev.callBack();
                break;

            case ShowCreateEveCmdEvent.name:{
                let ev:ShowCreateModuleDialogEvent = event as ShowCreateModuleDialogEvent;
                ev.data = await this.showCreateECSModule();
                ev.callBack();
                break;
            }

            case CreateAppStep1DialogEvent.name: {
                let ev: CreateAppStep1DialogEvent = event as CreateAppStep1DialogEvent;
                ev.data = await this.showAppDialogStep1();
                ev.callBack();
                break;
            }

            case CreateAppStep2DialogEvent.name: {
                let ev: CreateAppStep2DialogEvent = event as CreateAppStep2DialogEvent;
                let data = await this.showAppDialogStep2();
                ev.data = data;
                ev.callBack();
                break;
            }

            case CreateAppStep3DialogEvent.name: {
                /*
                let ev: CreateAppStep3DialogEvent = event as CreateAppStep3DialogEvent;
                let data = await this.showAppDialogStep3();
                ev.data = data;
                ev.callBack();
                break;
                */
            }


        }
    }

    private showCreateModule(){
        return this.inquirer.prompt([
            {
                type: 'text',
                message: 'Whats the name of your new Module?',
                name: 'moduleName'
            }
        ]);
    }

    private showCreateECSModule(){
        return this.inquirer.prompt([
            {
                type: 'text',
                message: 'Please enter the module name?',
                name: 'moduleName'
            },
            {
                type: 'text',
                message: 'Please enter the Event-base name?',
                name: 'eventBaseName'
            },
        ]);
    }

    private showMainMenu() {
        console.log();
        console.log(chalk.bold(chalk.magenta('FABALOUS - Main Menu')));
        console.log(new this.inquirer.Separator().line);
        return this.inquirer.prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What do you want to do?',
                choices: [
                    'Create new Module',
                    'Create Event / Command / Service',
                    'Create View',
                    new this.inquirer.Separator(),
                    'Add Runtime',
                    'Add External Libs',
                    'Show Help'
                ]
            }
        ]);
    }

    async showAppDialogStep1() {
        return this.inquirer.prompt([
            {
                type: 'text',
                message: '(1 / 4) Whats the name of your new Fabalous Project?',
                name: 'projectName'
            },
            {
                type: 'checkbox',
                message: '(2 / 4) Core Libraries',
                name: 'libs',
                choices: [
                    new this.inquirer.Separator(' = Runtimes = '),
                    { name: 'Node (Server)'},
                    { name: 'Web (React)'},
                    { name: 'Native (React Native)'},
                    { name: 'VR (React VR)'},
                    { name: 'Web App (Phonegap)'},
                    { name: 'Desktop (Electron)'},

                    new this.inquirer.Separator(' = Testing = '),
                    { name: 'TDD / Specs (Jest)'},
                    { name: 'E2E (Karma / Nightwatch)'},
                    { name: 'CSS Regression'}
                ]
            }
        ]);
    }

    async showAppDialogStep2() {
        return this.inquirer.prompt([
            {
                type: 'text',
                message: '(3 / 5) Do you want some UI Libs?',
                name: 'UiLibs'
            }
        ]);
    }
}