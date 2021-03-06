import InstallNPMDepsEvent from "../event/InstallNPMDepsEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class InstallNPMDepsCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: InstallNPMDepsEvent) {
        const cmdify = require('cmdify');
        const spawn = require('child_process').spawn;
        let cmd;

        /* Yarn still needed? */
        if (event.yarnExist){
            cmd = spawn(cmdify(`cd ${this.data.projectPath} && yarn install`), { shell: true, stdio: 'pipe'});
        } else {
            cmd = spawn(cmdify(`cd ${this.data.projectPath} && npm install`), { shell: true, stdio: 'pipe'});
        }

        cmd.stdout.on('data', (data) => {
            if (event.yarnExist){
                console.log(`${data}`);
            }
        });

        cmd.stderr.on('data', (data) => {
            //console.error("STDERR:", data.toString());
        });

        cmd.on('close', () => {
            event.callBack();
        });
    }
}