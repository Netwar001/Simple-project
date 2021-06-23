import React, {Component} from "react";
import {verify} from "../actions/session";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Активация аккаунта ...'
        }
    }

    componentDidMount() {
        verify({href: window.location.href}).then(r => {
            this.setState({status: r})
            if (r === "Аккаунт успешно активирован")
                window.location.href = "/login"
        });
    }

    render() {
        return (
            <div className="box">
                <span className="text-center">{this.state.status}</span>
            </div>
        );
    }
}

export default Form;