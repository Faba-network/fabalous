export interface IRoutes {
    route: string;
    module: any;
    view?: string;
}

export default class Routes {
    static INDEX: IRoutes = {
        route: "/", module: async(): Promise<void> => {
            if (process.env.FABALOUS_RUNTIME == "web"){
                return System.import("@fabalous/runtime-web/initModule/index");
            }

            if (process.env.FABALOUS_RUNTIME == "cordova"){
                return System.import("@fabalous/runtime-cordova/initModule/index");
            }
        }
    };

    static getRoutes() {
        let routes = [
            Routes.INDEX
        ];

        return routes;
    }
}