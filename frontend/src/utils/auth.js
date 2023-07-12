export const BASE_URL = 'http://api.gnomdomen.nomoredomains.work';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: "include",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res)
            return res;
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: "include",
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res)
            return res;
        })
}