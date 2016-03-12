import FabaCore from "./FabaCore";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

export default class FabaEvent {

    identifyer:string;

    public callBack:any = function(){
        if (this.cbs) this.cbs(this);
    };

    private cbs:any;

    constructor() {
    }

    get name():string{
        return this.getClassName();
    }

    getClassName() : string{
        return this.constructor.toString().match(/\w+/g)[1];
    }




    dispatch(calb?:any, result?:boolean):void{
        if (calb){
            if (!this.callBack){
                this.callBack = function(){
                    this.cbs(this);
                };
            }
            this.cbs = calb;
        }

        FabaCore.dispatchEvent(this, result);
    }
}
