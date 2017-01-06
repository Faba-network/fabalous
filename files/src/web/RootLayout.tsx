import * as React from "react";
import {ReactElement} from "react";
import FabaWebBaseComponent from "@fabalous/runtime-web/FabaWebBaseComponent";

interface IRootLayoutProps{
    childs:any;
}

export default class RootLayout extends FabaWebBaseComponent<IRootLayoutProps>{
    constructor(props){
        super(props);
    }

    render(): ReactElement<any> {
        return(
            <div>
                {this.props.childs}
            </div>
        )
    }
}