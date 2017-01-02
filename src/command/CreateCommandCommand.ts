import CreateCommandEvent from "../event/CreateCommandEvent";
import FabalousStore from "../FabalousStore";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";

export default class CreateCommandCommand extends FabaCoreCommand<FabalousStore> {
    async execute(event: CreateCommandEvent) {

    }

    async result(event: CreateCommandEvent) {

    }
}