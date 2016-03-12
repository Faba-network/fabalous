import SynapseEvent from "./SynapseEvent";
/**
 * Created by creativecode on 12.01.16.
 */
export interface ISynapseCommand{
    execute(event:SynapseEvent);
    result(event:SynapseEvent);
    timeout(event:SynapseEvent);
    error(event:SynapseEvent);
    offline(event:SynapseEvent);
}