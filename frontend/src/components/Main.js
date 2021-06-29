import React, {Component} from "react";
import {logout, main} from "../actions/session";
import Table from "./additions/Table";
import {connect} from "react-redux";
import "../style/Main.css"

const mapStateToProps = ({session}) => ({
    session,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            session: props.session.username,
        }
    }

    componentDidMount() {
        main().then(r => {
            this.setState({users: r})
        });
    }

    logout() {
        logout().then(r => window.location.href = "/")
    }

    render() {
        return (
            <div>
                <div className="btn-to-right">
                    <button className="button-logout" onClick={this.logout}>Выйти</button>
                </div>
                <div className="form-main">
                    <h1 className="text-center">Таблица пользователей для {this.state.session}</h1>
                    <Table data={this.state.users}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);