import {Db, MongoClient, Collection} from "mongodb";
import {trace} from "../../utils/Logger";

export default class FabaMongoConnection {
  private dbUrl:string;
  dataBase:Db;

  constructor(dbUrl:string) {
    this.dbUrl = dbUrl;
  }

   connect():void {
     MongoClient.connect(this.dbUrl, (err, conDb) => {
       this.connectHandler(err,conDb);
     });
  }

  private connectHandler(err:any, conDb:Db) {
    if (err) {
      //trace(err);
      //trace("Could not connect to Database");
      setTimeout(() => {
        MongoClient.connect(this.dbUrl, null, (err, conDb) => {
          this.connectHandler(err, conDb)
        });
      }, 1000);
      return;
    }

    this.dataBase = conDb;

    console.log("Connect to Database");
  }
}