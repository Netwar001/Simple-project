import React from "react";
import {Link} from "react-router-dom";

const Form = () => (
    <>
        <div className="box">
            <span className="text-center">Начальная страница</span>
            <div className="home">
                <Link className="input-container" to="/signup">
                    Регистрация
                </Link>
                <br/>
                <Link className="input-container" to="/login">
                    Авторизация
                </Link>
            </div>
        </div>
    </>
);

export default Form;