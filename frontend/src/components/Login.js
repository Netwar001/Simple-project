import React, {Component} from "react";
import {login} from "../actions/session";
import {FormErrors} from "./additions/Errors";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

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
            <div className="box">
                <span className="text-center">Авторизация</span>
                <div>
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div>
                    <label>Имя или почта: <input name="usernameOrEmail"
                                                 value={this.state.usernameOrEmail}
                                                 onChange={this.handleUserInput}/></label>
                    <br/>
                    <label>Пароль: <input name="password"
                                          value={this.state.password}
                                          onChange={this.handleUserInput}/></label>
                </div>
                <button onClick={this.submit}>Войти</button>
                <br/>
                <Link to="/signup">Создать аккаунт</Link>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);