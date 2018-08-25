import * as React from "react";

interface Props {
    children: any;
}

export default class WebLayout extends React.PureComponent<Props> {
    render() {
        return (
            <>{this.props.children}</>
        );
    }
}