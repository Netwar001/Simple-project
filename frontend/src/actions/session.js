import * as apiUtil from "../util/session";
import session from "../reducer/session";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user,
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

export async function signup(user) {
    const response = await apiUtil.signup(user);
    return await response.json();
}

export async function verify(href) {
    const response = await apiUtil.verify(href);
    return await response.json();
}

export async function login(user) {
    const response = await apiUtil.login(user);
    const data = await response.json();
    if (typeof data === "string")
        return data;
    else {
        receiveCurrentUser(data);
        return session;
    }
}

export async function logout() {
    const response = await apiUtil.logout();
    if (response.ok) {
        logoutCurrentUser();
        return session;
    }
}

export async function main(href) {
    const response = await apiUtil.main(href);
    return await response.json();
}

export async function checkLoggedIn() {
    const response = await apiUtil.checkLoggedIn();
    const {user} = await response.json();
    let preloadedState = {};
    if (user) {
        preloadedState = {
            session: user,
        };
    }
    return preloadedState;
}