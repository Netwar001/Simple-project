import React from "react";
import {Route} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Verify from "./Verify";
import Login from "./Login";
import Main from "./Main";
import {AuthRoute, ProtectedRoute} from "../util/route";

const Routes = () => (
    <>
            <Route exact path="/" component={Home}/>
            <AuthRoute path="/signup" component={Signup}/>
            <AuthRoute path="/verify" component={Verify}/>
            <AuthRoute path="/login" component={Login}/>
            <ProtectedRoute path="/main" component={Main}/>
    </>
);

export default Routes;