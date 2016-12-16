import FabaEvent from "@fabalous/core/FabaEvent";

export default class InstallNPMDepsEvent extends FabaEvent {
    constructor() {
        super("InstallNPMDepsEvent");
    }
}