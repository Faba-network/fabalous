#!/usr/bin/env node --harmony
/// <reference path="typings/commander/commander.d.ts" />

import {statSync} from "fs";
import {mkdirSync} from "fs";
import {ncp} from "ncp";
import {exec} from "child_process";
import {readdirSync} from "fs";
import {renameSync} from "fs";

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
    .option('-a, --add', 'Init Project')
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
            ncp(__dirname+"/files/typings/","./"+folderName+"/", function(e){});

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
} else if(program.add){
  co(function *() {
    var confirm = prompt.confirm;

    var name = yield prompt('Module name?: ');

    var firstChar = name.substring(0,1);
    firstChar = firstChar.toUpperCase();
    var upperName = firstChar + "" + name.substring(1);
    firstChar = firstChar.toLowerCase();
    var lowerName = firstChar + "" + name.substring(1);

    var dirName = "./"+lowerName;


    ncp(__dirname+"/files/module/", dirName, function(e){
      // COMMAND
      try {
        renameSync(dirName+"/control/command/ModuleCommand.ts", dirName+"/control/command/"+upperName+"Command.ts");
      } catch(e){}

      // EVENT
      try {
        renameSync(dirName+"/control/event/ModuleEvent.ts", dirName+"/control/event/"+upperName+"Event.ts");
      } catch(e){}

      // SERVICE
      try {
        renameSync(dirName+"/control/service/ModuleService.ts", dirName+"/control/service/"+upperName+"Service.ts");
      } catch(e){}

      // Meditor
      try {
        renameSync(dirName+"/control/ModuleMediator.ts", dirName+"/control/"+upperName+"Mediator.ts");
      } catch(e){}

      // MODEL
      try {
        renameSync(dirName+"/model/ModuleModel.ts", dirName+"/model/"+upperName+"Model.ts");
      } catch(e){}

      // VIEW
      try {
        renameSync(dirName+"/view/Module.less", dirName+"/view/"+upperName+".less");
      } catch(e){}

      try {
        renameSync(dirName+"/view/Module.ts", dirName+"/view/"+upperName+".ts");
      } catch(e){}

      process.exit(0);
    });

  }).then(function (value) {
    //console.log(value);
    //process.exit(0);
  }, function (err) {
    console.error(err);
    process.exit(1);
  });
}


