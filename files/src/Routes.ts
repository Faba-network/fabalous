export interface IRoutes {
    route: string;
    module: any;
    view?: string;
}

export default class Routes {
    static INDEX: IRoutes = {
        route: "/", module: async(): Promise<void> => {
            if (process.env.FABALOUS_WEB || process.env.FABALOUS_NODE){
                return System.import("@fabalous/runtime-web/initModule/index");
            }

            if (process.env.FABALOUS_CORODVA){
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