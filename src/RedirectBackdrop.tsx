import React, {Component} from "react";
import {Backdrop, CircularProgress} from "@mui/material";

type RedirectBackdropState = {
    open: boolean
    redirectUrl: string
}

type RedirectBackdropProps = {
    open: boolean
    redirectUrl: string
}

export class RedirectBackdrop extends Component<RedirectBackdropProps, RedirectBackdropState> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            redirectUrl: props.redirectUrl
        }
        this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.props.open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}