import FabaCommand from "@fabalous/core/FabaCommand";
import CreateCommandEvent from "../event/CreateCommandEvent";
import FabalousStore from "../FabalousStore";

export default class CreateCommandCommand extends FabaCommand<FabalousStore> {
    async execute(event: CreateCommandEvent) {

    }

    async result(event: CreateCommandEvent) {

    }
}