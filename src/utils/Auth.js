import { authBaseUrl } from './constants';

const checkResponse = (response) => {
    console.log(response);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response.status);
}

export const register = (email, password) => {
    return fetch(`${authBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse);
}

export const login = (email, password) => {
    return fetch(`${authBaseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
}

export const getContent = (token) => {
    return fetch(`${authBaseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(checkResponse)
}
