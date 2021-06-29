import React, {Component} from "react";
import {signup} from "../actions/session";
import {FormErrors} from "./additions/Errors";
import {Link} from "react-router-dom";
import "../style/Autherization.css";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            formErrors: {username: '', email: '', password: '', res: ''},
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            host: window.location.protocol + "//" + window.location.host,
        };
        let field = this.state.formErrors;
        signup(user).then(r => {
            field.res = r;
            this.setState({formErrors: field});
            if (r === "Ссылка для активации аккаунта была отправлена на указанную почту")
                window.location.href = "/login"
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'username':
                usernameValid = value.length >= 5;
                fieldValidationErrors.username = usernameValid ? '' : 'Никнейм слишком короткий';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Неправильная структура почты ' +
                    '*(example@gmail.com)';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Пароль слишком короткий';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.usernameValid && this.state.emailValid &&
                this.state.passwordValid
        });
    }

    render() {
        return (
            <div className="form-auth">
                <h1 className="center-text">Регистрация</h1>
                <div>
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="labels-form">
                    <label className="labels">
                        <span className="spans">Имя: </span>
                        <input className="inputs" name="username"
                               value={this.state.username}
                               onChange={this.handleUserInput}/>
                    </label>
                    <label className="labels">
                        <span className="spans">Почта: </span>
                        <input className="inputs" name="email"
                               value={this.state.email}
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
                    <button onClick={this.submit} disabled={!this.state.formValid} className="button-auth">
                        Создать аккаунт
                    </button>
                </div>
                <div className="form-auth-margin">
                    <Link to="/login" className="link-auth">Уже зарегистрированны?</Link>
                </div>
            </div>
        );
    }
}

export default Form;