import FabaEvent from "@fabalous/core/FabaEvent";
import ShowMainMenuEvent from "../event/ShowMainMenuEvent";
import CreateAppStep1DialogEvent from "../event/CreateAppStep1DialogEvent";
import CreateAppStep2DialogEvent from "../event/CreateAppStep2DialogEvent";
import CreateAppStep3DialogEvent from "../event/CreateAppStep3DialogEvent";
import FabalousStore from "../FabalousStore";
import ShowCreateModuleDialogEvent from "../event/ShowCreateModuleDialogEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class UiCommand extends FabaCoreCommand<FabalousStore> {
    inquirer = require("inquirer");
    async execute(event: FabaEvent) {
        switch (event.name) {
            case ShowMainMenuEvent.name:
                this.showMainMenu();
                break;


            case ShowCreateModuleDialogEvent.name:
                let data = await this.showCreateModule();
                break;

            case CreateAppStep1DialogEvent.name: {
                let ev: CreateAppStep1DialogEvent = event as CreateAppStep1DialogEvent;
                let data = await this.showAppDialogStep1();
                ev.data = data;
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
        this.inquirer.prompt([
            {
                type: 'list',
                name: 'theme',
                message: 'What do you want to do?',
                choices: [
                    'Create new Module',
                    'Create Event / Command / Service',
                    new this.inquirer.Separator(),
                    'Add Runtime',
                    'Show Help'
                ]
            }
        ]);
    }

    async showAppDialogStep1() {
        return this.inquirer.prompt([
            {
                type: 'text',
                message: '(1 / 5) Whats the name of your new Fabalous Project?',
                name: 'projectName'
            },
            {
                type: 'checkbox',
                message: '(2 / 5) Core Libraries',
                name: 'libs',
                choices: [
                    new this.inquirer.Separator(' = Runtimes = '),
                    {
                        name: 'Node (Server)'
                    },
                    {
                        name: 'Web (React)'
                    },
                    {
                        name: 'Native (React Native)'
                    },
                    {
                        name: 'Web App (Phonegap)'
                    },
                    {
                        name: 'Desktop (Electron)'
                    },
                    new this.inquirer.Separator(' = Testing = '),
                    {
                        name: 'Specs (Jest)',
                        checked: true
                    },
                    {
                        name: 'E2E (Karma / Nightwatch)'
                    },
                    {
                        name: 'CSS Regression'
                    },
                    new this.inquirer.Separator(' = Utils = '),
                    {
                        name: 'React Storybook',
                        checked: false
                    }
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