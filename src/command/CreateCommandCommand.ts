import FabaCommand from "@fabalous/core/FabaCommand";
import CreateCommandEvent from "../event/CreateCommandEvent";
import {IStore} from "../FabalousStore";

export default class CreateCommandCommand extends FabaCommand<IStore> {
    async execute(event: CreateCommandEvent) {

    }

    async result(event: CreateCommandEvent) {

    }
}