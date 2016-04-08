#!/usr/bin/env node --harmony
/// <reference path="typings/commander/commander.d.ts" />

import {statSync} from "fs";
import {mkdirSync} from "fs";
import {ncp} from "ncp";
import {exec} from "child_process";

var jsonfile = require('jsonfile');
var util = require('util');
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');

var run = function(cmd:string, folderName:string){
    var child = exec(cmd,{
            cwd: folderName
        },
        function (error, stdout, stderr) {
            if (stderr !== null) {
                console.log('' + stderr);
            }
            if (stdout !== null) {
                console.log('' + stdout);
            }
            if (error !== null) {
                console.log('' + error);
            }

            console.log("NPM finish happy coding :)");
            process.exit(0);
        });
};

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

        if (name == "") throw new Error("No name provided");

        var folderName =  name.replace(/ /g,"-");
        var webApp = yield confirm('Do you create a WebApp? (yes/no): ');
        var phoneGap = yield confirm('Do you create a PhonegapApp? (yes/no): ');
        var reactNative = yield confirm('Do you create a React-Native App? (yes/no): ');
        var wallaby = yield confirm('Need a wallaby config? (yes/no): ');

        try {
            statSync("./"+folderName+"/");
        } catch(e){
            console.log("Folder does not exist, create it...");
            mkdirSync("./"+folderName+"/");
        }

        console.log("Copy files in " + folderName);

        ncp(__dirname+"/files/configs/","./"+folderName+"/", function (e) {
            ncp(__dirname+"/files/src/","./"+folderName+"/src/", function(e){});
            ncp(__dirname+"/files/dist/","./"+folderName+"/dist/", function(e){});

            var file = folderName+'/package.json';

            var obj = jsonfile.readFileSync(file);

            obj.name = folderName;

            jsonfile.writeFileSync(file, obj, {spaces: 2});
            console.log("Call npm install.... Coffee time?");
            run('npm install', folderName);
        });
    }).then(function (value) {
        //console.log(value);
        //process.exit(0);
    }, function (err) {
        console.error(err);
        process.exit(1);
    });
}


