export const signup = (user) =>
    fetch("api/users/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });

export const verify = (href) =>
    fetch("api/users/verify", {
        method: "POST",
        body: JSON.stringify(href),
        headers: {
            "Content-Type": "application/json",
        },
    })

export const login = (user) =>
    fetch("api/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });

export const main = () =>
    fetch("api/sessions/main", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

export const logout = () => fetch("api/users/logout", {method: "DELETE"});

export const checkLoggedIn = () =>
    fetch("api/users/loadUser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });