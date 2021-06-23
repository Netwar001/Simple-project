import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combine from "../reducer/combine";

const preload = (preloadedState) =>
    createStore(
        combine,
        preloadedState,
        applyMiddleware(thunk)
    );

export default preload