import React from "react";
import {Link} from "react-router-dom";
import "../style/Home.css"

const Form = () => (
    <>
        <div className="form">
            <h1 className="center-text">Добро пожаловать!</h1>
            <div className="form-margin">
                <Link className="button" to="/signup">
                    Регистрация
                </Link>
            </div>
            <div className="form-margin">
                <Link className="button" to="/login">
                    Авторизация
                </Link>
            </div>
        </div>
    </>
);

export default Form;