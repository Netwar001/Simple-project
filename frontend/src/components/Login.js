import React, {Component} from "react";
import {login} from "../actions/session";
import {FormErrors} from "./additions/Errors";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../style/Autherization.css";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
});

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            formErrors: {res: ''},
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        const user = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password,
        };
        let field = this.state.formErrors;
        login(user).then(r => {
            if (typeof r === "string") {
                field.res = r;
                this.setState({formErrors: field})
            } else
                window.location.href = "/main"
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="form-auth">
                <h1 className="center-text">Авторизация</h1>
                <div>
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="labels-form">
                    <label className="labels">
                        <span className="spans">Имя или почта: </span>
                        <input className="inputs" name="usernameOrEmail"
                               value={this.state.usernameOrEmail}
                               onChange={this.handleUserInput}/>
                    </label>
                    <label className="labels">
                        <span className="spans">Пароль: </span>
                        <input className="inputs" name="password"
                               value={this.state.password}
                               onChange={this.handleUserInput}/>
                    </label>
                </div>
                <div className="form-auth-margin">
                    <button onClick={this.submit} className="button-auth">Войти</button>
                </div>
                <div className="form-auth-margin">
                    <Link to="/signup" className="link-auth">Создать аккаунт</Link>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);