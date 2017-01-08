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
                ev.data = await this.showAppDialogStep2();
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
                message: '(2 / 4) Libraries and Runtimes',
                name: 'libs',
                pageSize: 10,
                choices: [
                    new this.inquirer.Separator(' = Runtimes = '),
                    { name: 'Node (Server)',                value:UiCommandMenuTyes.RUNTIMES_NODE, checked: true},
                    { name: 'Web (React)',                  value:UiCommandMenuTyes.RUNTIMES_WEB},
                    { name: 'Web Mobile App (Cordova)',     value:UiCommandMenuTyes.RUNTIMES_APP},
                 //   { name: 'Web Desktop App (Electron)',   value:UiCommandMenuTyes.RUNTIMES_DESKTOP},
                 //   { name: 'Native Mobile (React Native)', value:UiCommandMenuTyes.RUNTIMES_NATIVE},
                 //   { name: 'VR (React VR)',                value:UiCommandMenuTyes.RUNTIMES_VR},

                    new this.inquirer.Separator(' = Testing = '),
                    { name: 'TDD / Specs (Jest)',           value:UiCommandMenuTyes.TEST_JEST, checked: true},
                    { name: 'E2E (Karma / Nightwatch)',     value:UiCommandMenuTyes.TEST_E2E},
                  //  { name: 'Visual Regression',            value:UiCommandMenuTyes.TEST_VISUAL}
                ]
            }
        ]);
    }

    async showAppDialogStep2() {
        let choices:Array<any> = [];

        for (let lib of this.data.step1Data.libs) {
            switch (lib){
                case UiCommandMenuTyes.RUNTIMES_WEB:
                    choices.push(new this.inquirer.Separator(' = Web UI = '));
                    choices.push({ name: 'Material UI', value:["material-ui", "@types/material-ui", "react-tap-event-plugin"]});
                    choices.push(new this.inquirer.Separator(' = Web Database = '));
                    choices.push({ name: 'PouchDB', value:["pouchdb", "@types/pouchdb"]});
                    break;
                case UiCommandMenuTyes.RUNTIMES_NODE:
                    choices.push(new this.inquirer.Separator(' = Node Transport = '));
                    choices.push({ name: 'Websocket (socket.io)', value:["socket.io", "@types/socket.io"]});
                    choices.push(new this.inquirer.Separator(' = Node Databases = '));
                    choices.push({ name: 'MongoDB', value:["mongodb", "@types/mongodb"]});
                    choices.push({ name: 'RethinkDB', value:["rethinkdb", "@types/rethinkdb"]});
                    choices.push({ name: 'PouchDB', value:["pouchdb", "@types/pouchdb"]});

                    break;
                default:
                    break;
            }
        }


        return this.inquirer.prompt([
            {
                type: 'checkbox',
                message: '(3 / 5) Here is a list of recommend external Libs based on your selection!',
                name: 'externalLibs',
                pageSize: 10,
                choices: choices
            }]
        );
    }
}

export enum UiCommandMenuTyes{
    RUNTIMES_NODE,
    RUNTIMES_WEB,
    RUNTIMES_NATIVE,
    RUNTIMES_VR,
    RUNTIMES_APP,
    RUNTIMES_DESKTOP,
    TEST_JEST,
    TEST_E2E,
    TEST_VISUAL,
}