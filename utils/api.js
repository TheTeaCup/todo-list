async function fetcher(url, options) {
    const response = await fetch(`/api` + url, options);
    return await response.json();
}

/*
* Lets you login
* */
const login = async function (body) {
    return await fetcher(`/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

/*
* Creates a new account
* */
const register = async function (body) {
    return await fetcher(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
};

/*
* Logs you out
* */
const logout = async function (Token) {
    return await fetcher(`/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token || null,
        },
    });
}

/*
* Edit User
* */
const userEdit = async function (ID, Token, body) {
    return await fetcher(`/user/` + ID, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token || null,
        },
        body: JSON.stringify(body),
    });
};

export {fetcher, login, register, logout, userEdit};