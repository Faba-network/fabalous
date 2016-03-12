/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import FabaMediator from "./FabaMediator";
import FabaEvent from "./FabaEvent";

export default class FabaCore{
  static mediators:Array<FabaMediator> = new Array<FabaMediator>();
  static events:any = {}
  static vos:any = {}

  public addMediator(cls:FabaMediator):boolean {
    for (let obj in FabaCore.mediators) {
     // if (obj === cls){
     //   return false;
     // }
    }

    FabaCore.mediators.push(cls);
    return true;
  }

  static dispatchEvent(event:FabaEvent, resu?:boolean) {
    for(var a:number = 0; a < 1; a++){
      var routeItem:Array<any> = this.mediators[a].cmdList;

      for(var b:number = 0; b < routeItem.length; b++){
        if (routeItem[b] && routeItem[b].event && routeItem[b].event.name){
          if (routeItem[b].event.name === event.name){
            if (resu) new routeItem[b].cmd().result(event);
            else new routeItem[b].cmd().execute(event);
          }
        }
      }
    }
  }
}