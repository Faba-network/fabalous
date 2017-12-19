import * as React from "react";
import WebStore from "./WebStore";

interface IRootLayoutProps{
    childs:any;
    model: WebStore;
}

export default class RootLayout extends React.PureComponent<IRootLayoutProps>{
    render() {
        if (process.env.NODE_ENV == "development") {
            let AppContainer = require('react-hot-loader').AppContainer;
            return (
                <AppContainer>
                    {this.renderContent()}
                </AppContainer>
            );
        } else {
            return this.renderContent();
        }
    }

    renderContent() {
        return (
            <div>
                {this.props.childs}
            </div>
        );
    }
}