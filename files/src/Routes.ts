export interface IRoutes {
    route: string;
    module: any;
    view?: string;
}

export default class Routes {
    static INDEX: IRoutes = {
        route: "/", module: async(): Promise<void> => {
            return System.import("@fabalous/runtime-web/initModule/index");
        }
    };

    static getRoutes() {
        let routes = [
            Routes.INDEX
        ];

        return routes;
    }
}