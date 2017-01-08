import FabaEvent from "@fabalous/core/FabaEvent";

export default class InstallNPMDepsEvent extends FabaEvent {
    yarnExist:boolean;

    constructor(yarnExist:boolean) {
        super("InstallNPMDepsEvent");
        this.yarnExist = yarnExist;
    }
}