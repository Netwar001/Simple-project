import Routes from "./components/Routes";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import configureStore from "./store/store";
import {Provider} from "react-redux";
import {checkLoggedIn} from "./actions/session";


const renderApp = (preloadedState) => {
    const store = configureStore(preloadedState);
    window.state = store.getState;

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
};

(async () => renderApp(await checkLoggedIn()))();