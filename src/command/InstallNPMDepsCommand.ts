import FabaCommand from "@fabalous/core/FabaCommand";
import InstallNPMDepsEvent from "../event/InstallNPMDepsEvent";
import FabalousStore from "../FabalousStore";

export default class InstallNPMDepsCommand extends FabaCommand<FabalousStore> {
    async execute(event: InstallNPMDepsEvent) {
        const cmdify = require('cmdify');
        const spawn = require('child_process').spawn;
        const cmd = spawn(cmdify(`cd ${this.data.testPath} && npm install`), { shell: true, stdio: 'pipe'});
        cmd.stdout.on('data', (data) => {
            //console.log(`${data}`);
        });

        cmd.stderr.on('data', (data) => {
            // console.error("STDERR:", data.toString());
        });

        cmd.on('close', () => {
            event.callBack();
        });
    }
}