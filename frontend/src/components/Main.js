import React, {Component} from "react";
import {logout, main} from "../actions/session";
import Table from "./additions/Table";
import {connect} from "react-redux";

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
            <div className="box">
                <button onClick={this.logout}>Выйти</button>
                <span className="text-center">Таблица пользователей для {this.state.session}</span>
                <Table data={this.state.users}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);