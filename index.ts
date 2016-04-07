#!/usr/bin/env node --harmony
/// <reference path="typings/commander/commander.d.ts" />

import {statSync} from "fs";
console.log(__dirname);

import {mkdirSync} from "fs";
import {ncp} from "ncp";
import {log} from "util";
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');

program
    .usage('[options]')
    .version('0.0.5')
    .option('-i, --init', 'Init Project')
    .option('-h, --help', 'Help')
    .parse(process.argv);



if (program.init){
    co(function *() {
        var confirm = prompt.confirm;

        var name = yield prompt('Project name?: ');
        var folderName =  name.replace(/ /g,"-");
        var webApp = yield confirm('Do you create a WebApp? (yes/no): ');
        var phoneGap = yield confirm('Do you create a PhonegapApp? (yes/no): ');
        var reactNative = yield confirm('Do you create a React-Native App? (yes/no): ');
        var wallaby = yield confirm('Need a wallaby config? (yes/no): ');

        console.log('Props:');
        console.log(name);
        console.log(webApp);
        console.log(phoneGap);
        console.log(reactNative);
        console.log(wallaby);

        try {
            statSync("./"+folderName+"/");
        } catch(e){
            console.log("Folder does not exist");
            mkdirSync("./"+folderName+"/");
        }

        //ncp(__dirname+"/files/","./test/", function (e) {
         //   console.log(e);
        //});

        process.exit(0);
    });
}
